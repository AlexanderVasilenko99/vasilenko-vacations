import express, { Request, Response, NextFunction } from "express";
import StatusCode from "../3-models/status-codes";
import { fileSaver } from "uploaded-file-saver";
// import verifyToken from "../4-middlewares/verifyToken";
// import verifyAdmin from "../4-middlewares/verifyAdmin";
import vacationServices from "../5-services/vacationServices";
import VacationModel from "../3-models/vacationModel";
const router = express.Router();

router.get("/vacations", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacations = await vacationServices.getAllVacations();
        response.json(vacations);
    } catch (err: any) {
        next(err);
    }
});
router.get("/get-vacations", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacations = await vacationServices.getVacations(3);
        response.json(vacations);
    } catch (err: any) {
        next(err);
    }
});
router.delete("/vacations/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await vacationServices.deleteVacation(id);
        response.sendStatus(StatusCode.NoContent);
    } catch (err: any) {
        next(err);
    }
});
router.put("/vacations/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.vacationId = +request.params.id;
        request.body.vacationUploadedImage = request.files?.vacationUploadedImage;

        const vacation = new VacationModel(request.body);
        const updatedVacation = await vacationServices.editVacation(vacation);
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
router.get("/vacations/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = fileSaver.getFilePath(imageName);
        response.sendFile(absolutePath);
    } catch (err: any) {
        next(err);
    }
});
router.post("/vacations/follow/:userId([0-9]+)/:vacationId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = +request.params.userId;
        const vacationId = +request.params.vacationId;
        await vacationServices.followVacation(userId, vacationId);
        response.status(StatusCode.Created).json();
    } catch (err: any) {
        next(err);
    }
});
router.delete("/vacations/unfollow/:userId([0-9]+)/:vacationId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = +request.params.userId;
        const vacationId = +request.params.vacationId;
        await vacationServices.unfollowVacation(userId, vacationId);
        response.status(StatusCode.NoContent).json();
    } catch (err: any) {
        next(err);
    }
});

export default router;