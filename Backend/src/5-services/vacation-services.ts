import { randomUUID } from "crypto";
import { OkPacket } from "mysql";
import { fileSaver } from "uploaded-file-saver";
import appConfig from "../2-utils/app-config";
import dal from "../2-utils/dal";
import { FollowerNotFound, ResourceNotFound } from "../3-models/error-models";
import VacationModel from "../3-models/vacation-model";

class VacationServices {
    public async getAllVacations(userUUID: string): Promise<VacationModel[]> {
        const sql = `
            SELECT DISTINCT
            V.vacationId,
            V.vacationUUID,
            V.vacationCountry,
            V.vacationCity,
            V.vacationDescription,
            DATE_FORMAT(V.vacationStartDate,"%Y-%m-%d") AS vacationStartDate,
            DATE_FORMAT(V.vacationEndDate,"%Y-%m-%d") AS vacationEndDate,
            V.vacationPrice,
            V.vacationCountryISO,
            V.vacationImageName,
                EXISTS(SELECT * FROM followers WHERE vacationUUID = F.vacationUUID AND userUUID = ?) AS vacationIsFollowing,
                COUNT(F.userUUID) AS vacationFollowersCount
            FROM vacations as V LEFT JOIN followers as F
            ON V.vacationUUID = F.vacationUUID
            GROUP BY vacationUUID,vacationId
            ORDER BY vacationStartDate;`;

        const vacations = await dal.execute(sql, [userUUID]);
        return vacations;
    }
    // func returns vacation's image name stored in db 
    public async getExistingVacationImageName(vacationUUID: string): Promise<string> {
        const sql = 'SELECT vacationImageName from vacations WHERE vacationUUID = ?'
        const info = await dal.execute(sql, [vacationUUID]);
        const imageName = info[0].vacationImageName;

        if (!imageName) return "";
        return imageName;
    }
    // func returns path to vacations's image
    public async getExistingVacationImagePath(vacationUUID: string): Promise<string> {
        const sql = 'SELECT VacationImageName from vacations WHERE vacationUUID = ?'
        const info: OkPacket = await dal.execute(sql, [vacationUUID]);
        const vacation = info[0];

        if (!vacation) return "";
        const existingImagePath = appConfig.appHost + "/api/image/" + vacation.VacationImageName;
        return existingImagePath;
    }

    public async addVacation(vacation: VacationModel): Promise<VacationModel> {
        vacation.addVacationValidate();

        const imageName = await fileSaver.add(vacation.vacationUploadedImage);
        vacation.vacationImageName = imageName;
        vacation.vacationUUID = randomUUID();

        const sql = `INSERT INTO vacations VALUES(DEFAULT,?,?,?,?,?,?,?,?,?);`

        const info: OkPacket = await dal.execute(sql, [
            vacation.vacationUUID,
            vacation.vacationCountry,
            vacation.vacationCity,
            vacation.vacationDescription,
            vacation.vacationStartDate,
            vacation.vacationEndDate,
            vacation.vacationPrice,
            vacation.vacationCountryISO,
            vacation.vacationImageName
        ]);
        vacation.vacationId = info.insertId;
        vacation.vacationImageUrl = appConfig.appHost + "/api/vacations-image/" + imageName;

        delete vacation.vacationUploadedImage;
        return vacation;
    }

    public async deleteVacation(vacationUUID: string): Promise<void> {
        const sql = `DELETE FROM vacations WHERE vacationUUID = ?;`
        const existingImageName = await this.getExistingVacationImageName(vacationUUID);
        const info: OkPacket = await dal.execute(sql, [vacationUUID]);

        fileSaver.delete(existingImageName)

        if (info.affectedRows === 0) throw new ResourceNotFound(vacationUUID);
    }

    public async editVacation(vacation: VacationModel): Promise<VacationModel> {
        vacation.editVacationValidate();

        const existingImageName = await this.getExistingVacationImageName(vacation.vacationUUID);

        const imageName = vacation.vacationUploadedImage ? await fileSaver.update(
            existingImageName, vacation.vacationUploadedImage) : existingImageName;

        const sql = `UPDATE vacations SET
                    vacationCountry = ?,
                    vacationCity = ?,
                    vacationDescription = ?,
                    vacationStartDate = ?,
                    vacationEndDate = ?,
                    vacationPrice = ?,
                    vacationCountryISO = ?,
                    vacationImageName = ?
                    WHERE vacationUUID = ?;`
        const info: OkPacket = await dal.execute(sql, [
            vacation.vacationCountry,
            vacation.vacationCity,
            vacation.vacationDescription,
            vacation.vacationStartDate,
            vacation.vacationEndDate,
            vacation.vacationPrice,
            vacation.vacationCountryISO,
            imageName,
            vacation.vacationUUID
        ]);
        if (info.affectedRows === 0) throw new ResourceNotFound(vacation.vacationUUID);

        vacation.vacationImageUrl = appConfig.appHost + "/api/vacations-image/" + imageName;
        delete vacation.vacationUploadedImage;

        return vacation;
    }

    public async followVacation(userUUID: string, vacationUUID: string): Promise<void> {
        const sql = "INSERT INTO followers VALUES(?,?)";
        await dal.execute(sql, [userUUID, vacationUUID]);
    }

    public async unfollowVacation(userUUID: string, vacationUUID: string): Promise<void> {
        const sql = "DELETE from followers WHERE userUUID = ? AND vacationUUID = ?";
        const info: OkPacket = await dal.execute(sql, [userUUID, vacationUUID]);
        if (info.affectedRows === 0) throw new FollowerNotFound(userUUID, vacationUUID);
    }
}
const vacationServices = new VacationServices();
export default vacationServices;