import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { ResourceNotFound } from "../3-models/error-models";
import ProductModel from "../3-models/product-model";
import { fileSaver } from "uploaded-file-saver"
import appConfig from "../2-utils/app-config";
import VacationModel from "../3-models/vacationModel";

class VacationServices {
    public async getAllVacations(): Promise<VacationModel[]> {
        const sql = `SELECT * FROM vacations`;
        const products = await dal.execute(sql);
        return products;
    }
    public async getVacations(userId: number): Promise<VacationModel[]> {
        const sql = `
            SELECT DISTINCT
                V.*,
                EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing,
                COUNT(F.userId) AS followersCount
            FROM vacations as V LEFT JOIN followers as F
            ON V.vacationId = F.vacationId
            GROUP BY vacationId
            ORDER BY vacationStartDate
            `;

        const vacations = await dal.execute(sql, [userId]);
        return vacations;
    }
    // public async getOneProduct(id: number): Promise<ProductModel> {
    //     // create sql query
    //     const sql = `SELECT
    //                     ProductId AS id,
    //                     ProductName AS name,
    //                     UnitPrice AS price,
    //                     UnitsInStock AS stock,
    //                     CONCAT('${appConfig.appHost}','/api/products/',ImageName) AS imageUrl
    //                 FROM products
    //                 WHERE ProductId = ${id}`
    //     // get products array containing one product from db
    //     const products = await dal.execute(sql);
    //     // extract that product to single object
    //     const product = products[0];
    //     // if id not found
    //     if (!product) throw new ResourceNotFound(id);
    //     return product;
    // }

    public async getExistingVacationImageName(id: number): Promise<string> {
        const sql = 'SELECT VacationImageName from vacations WHERE vacationId = ?'
        const info: OkPacket = await dal.execute(sql, [id]);

        const vacation = info[0];
        if (!vacation) return "";
        const existingImageName = vacation.VacationImageName;
        return existingImageName;
    }
    public async getExistingVacationImagePath(id: number): Promise<string> {
        const sql = 'SELECT VacationImageName from vacations WHERE vacationId = ?'
        const info: OkPacket = await dal.execute(sql, [id]);

        const vacation = info[0];
        if (!vacation) return "";
        const existingImagePath = appConfig.appHost + "/api/image/" + vacation.VacationImageName;
        return existingImagePath;
    }

    public async addVacation(vacation: VacationModel): Promise<VacationModel> {
        vacation.addVacationValidate();

        const imageName = await fileSaver.add(vacation.vacationUploadedImage);
        vacation.vacationImageName = imageName;

        const sql = `INSERT INTO vacations values(DEFAULT,?,?,?,?,?,?,?);`

        const info: OkPacket = await dal.execute(sql, [
            vacation.vacationCountry,
            vacation.vacationCity,
            vacation.vacationDescription,
            vacation.vacationStartDate,
            vacation.vacationEndDate,
            vacation.vacationPrice,
            vacation.vacationImageName
        ]);
        vacation.vacationId = info.insertId;
        vacation.vacationImageUrl = appConfig.appHost + "/api/vacations/" + imageName;
        delete vacation.vacationUploadedImage;
        return vacation;
    }
    public async deleteVacation(id: number): Promise<void> {
        // create sql delete query
        const sql = `DELETE FROM vacations WHERE vacationId = ?;`
        const existingImageName = await this.getExistingVacationImageName(id);
        console.log(existingImageName);
        

        // delete in db
        const info: OkPacket = await dal.execute(sql, [id]);

        fileSaver.delete(existingImageName)

        // if id is invalid:
        if (info.affectedRows === 0) throw new ResourceNotFound(id);
    }
    public async editVacation(vacation: VacationModel): Promise<VacationModel> {
        vacation.editVacationValidate();

        const existingImageName = await this.getExistingVacationImageName(vacation.vacationId);

        // update image if exists and get existing or updated imagename
        const imageName = vacation.vacationUploadedImage ? await fileSaver.update(
            existingImageName, vacation.vacationUploadedImage) : existingImageName;

        const sql = `UPDATE vacations SET
                    vacationCountry = ?,
                    vacationCity = ?,
                    vacationDescription = ?,
                    vacationStartDate = ?,
                    vacationEndDate = ?,
                    vacationPrice = ?,
                    vacationImageName = ?
                    WHERE vacationId = ${vacation.vacationId};`

        // update db with new product
        const info: OkPacket = await dal.execute(sql, [
            vacation.vacationCountry,
            vacation.vacationCity,
            vacation.vacationDescription,
            vacation.vacationStartDate,
            vacation.vacationEndDate,
            vacation.vacationPrice,
            imageName,
            vacation.vacationId]);
        console.log(info);

        // if id is invalid:
        if (info.affectedRows === 0) throw new ResourceNotFound(vacation.vacationId);

        // update image url
        vacation.vacationImageUrl = appConfig.appHost + "/api/vacations/" + imageName;

        // delete uploaded file from returned file
        delete vacation.vacationUploadedImage;

        return vacation;
    }







    // // get image name by product id
    // private async getExistingImageName(id: number): Promise<string> {
    //     const sql = `SELECT ImageName from products WHERE ProductID = ${id}`;
    //     const products = await dal.execute(sql);
    //     const product = products[0];
    //     if (!product) return "";
    //     return product.ImageName;
    // }
}
const vacationServices = new VacationServices();
export default vacationServices;