import express, { NextFunction, Request, Response } from "express";
import UserModel from "../3-models/user-model";
import StatusCode from "../3-models/status-codes";
import authService from "../5-services/auth-service";
import CredentialsModel from "../3-models/credentials-model";
import { fileSaver } from "uploaded-file-saver";
const router = express.Router();


router.post("/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = new UserModel(request.body);
        const token = await authService.register(user);
        response.status(StatusCode.Created).json(token);
    } catch (err: any) {
        next(err);
    }
})

router.post("/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const credentials = new CredentialsModel(request.body);
        const token = await authService.login(credentials);
        response.json(token);
    } catch (err: any) {
        next(err);
    }
})

router.put("/update", async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.userUploadedImage = request.files?.userUploadedImage;
        const user = new UserModel(request.body);
        const token = await authService.update(user);
        response.json(token);
    } catch (err: any) {
        next(err);
    }
});

router.get("/users-image/:imageName([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}.(jpg|jpeg|png))",
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const imageName = request.params.imageName;
            const absolutePath = fileSaver.getFilePath(imageName);

            response.sendFile(absolutePath);
        } catch (err: any) {
            next(err);
        }
    });

export default router;