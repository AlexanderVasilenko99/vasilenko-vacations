import express, { Request, Response, NextFunction } from "express";
import StatusCode from "../3-models/status-codes";
import { fileSaver } from "uploaded-file-saver";
import verifyToken from "../4-middlewares/verifyToken";
import verifyAdmin from "../4-middlewares/verifyAdmin";
import vacationServices from "../5-services/vacationServices";
import VacationModel from "../3-models/vacationModel";
const router = express.Router();

router.get("/vacations/:userUUID([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})",
    verifyToken, async (request: Request, response: Response, next: NextFunction) => {
        try {
            const userUUID = request.params.userUUID;
            const vacations = await vacationServices.getAllVacations(userUUID);
            response.json(vacations);
        } catch (err: any) {
            next(err);
        }
    });

router.delete("/vacations/:vacationUUID([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})",
    verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
        try {
            const vacationUUID = request.params.vacationUUID;
            await vacationServices.deleteVacation(vacationUUID);
            response.sendStatus(StatusCode.NoContent);
        } catch (err: any) {
            next(err);
        }
    });

router.put("/vacations/:vacationUUID([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})",
    verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
        try {
            request.body.vacationUUID = request.params.vacationUUID;
            request.body.vacationUploadedImage = request.files?.vacationUploadedImage;

            const vacation = new VacationModel(request.body);
            const updatedVacation: VacationModel = await vacationServices.editVacation(vacation);

            response.status(StatusCode.Created).json(updatedVacation);
        } catch (err: any) {
            next(err);
        }
    });

router.post("/vacations",
    verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
        try {
            request.body.vacationUploadedImage = request.files?.vacationUploadedImage;
            const vacation = new VacationModel(request.body);

            const addedVacation = await vacationServices.addVacation(vacation);
            response.status(StatusCode.Created).json(addedVacation);

        } catch (err: any) {
            next(err);
        }
    });

router.get("/vacations-image/:imageName([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}.(jpg|jpeg|png))",
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const imageName = request.params.imageName;
            const absolutePath = fileSaver.getFilePath(imageName);
            response.sendFile(absolutePath);
        } catch (err: any) {
            next(err);
        }
    });

router.post(`/vacations/follow/:userUUID([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/:vacationUUID([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})`,
    verifyToken, async (request: Request, response: Response, next: NextFunction) => {
        try {
            const userUUID = request.params.userUUID;
            const vacationUUID = request.params.vacationUUID;
            await vacationServices.followVacation(userUUID, vacationUUID);
            response.status(StatusCode.Created).json();
        } catch (err: any) {
            next(err);
        }
    });

router.delete(`/vacations/unfollow/:userUUID([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/:vacationUUID([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})`,
    verifyToken, async (request: Request, response: Response, next: NextFunction) => {
        try {
            const userUUID = request.params.userUUID;
            const vacationUUID = request.params.vacationUUID;
            await vacationServices.unfollowVacation(userUUID, vacationUUID);
            response.status(StatusCode.NoContent).json();
        } catch (err: any) {
            next(err);
        }
    });

export default router;