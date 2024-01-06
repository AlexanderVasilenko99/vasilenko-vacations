import express, { Request, Response, NextFunction } from "express";
import StatusCode from "../3-models/status-codes";
import { fileSaver } from "uploaded-file-saver";
// import verifyToken from "../4-middlewares/verifyToken";
// import verifyAdmin from "../4-middlewares/verifyAdmin";
import vacationServices from "../5-services/vacationServices";
import VacationModel from "../3-models/vacationModel";
const router = express.Router();

router.get("/vacations/:userUUID", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userUUID = request.params.userUUID;
        const vacations = await vacationServices.getAllVacations(userUUID);
        response.json(vacations);
    } catch (err: any) {
        next(err);
    }
});
// router.get("/get-vacations/:userId", async (request: Request, response: Response, next: NextFunction) => {
//     try {
//         const userId = +request.params.userId;
//         const vacations = await vacationServices.getAllVacations(userId);
//         response.json(vacations);
//     } catch (err: any) {
//         next(err);
//     }
// });
router.delete("/vacations/:vacationUUID", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationUUID = request.params.vacationUUID;
        await vacationServices.deleteVacation(vacationUUID);
        response.sendStatus(StatusCode.NoContent);
    } catch (err: any) {
        next(err);
    }
});
router.put("/vacations/:vacationUUID", async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.vacationUUID = request.params.vacationUUID;
        request.body.vacationUploadedImage = request.files?.vacationUploadedImage;

        const vacation = new VacationModel(request.body);
        const updatedVacation:VacationModel = await vacationServices.editVacation(vacation);
        console.log("updated vacation: " + updatedVacation);
        
        response.json(updatedVacation);

    } catch (err: any) {
        next(err);
    }
});
router.post("/vacations", async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.vacationUploadedImage = request.files?.vacationUploadedImage;
        const vacation = new VacationModel(request.body);

        const addedVacation = await vacationServices.addVacation(vacation);
        response.json(addedVacation);

    } catch (err: any) {
        next(err);
    }
});
router.get("/vacations-image/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = fileSaver.getFilePath(imageName);
        response.sendFile(absolutePath);
    } catch (err: any) {
        next(err);
    }
});
router.post("/vacations/follow/:userUUID/:vacationUUID", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userUUID = request.params.userUUID;
        const vacationUUID = request.params.vacationUUID;
        await vacationServices.followVacation(userUUID, vacationUUID);
        response.status(StatusCode.Created).json();
    } catch (err: any) {
        next(err);
    }
});
router.delete("/vacations/unfollow/:userUUID/:vacationUUID", async (request: Request, response: Response, next: NextFunction) => {
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