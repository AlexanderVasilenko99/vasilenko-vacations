import cors from "cors";
import express from "express";
import expressFileUpload from "express-fileupload";
import path from "path";
import { fileSaver } from "uploaded-file-saver";
import appConfig from "./2-utils/app-config";
import activities from "./4-middlewares/activities";
import catchAll from "./4-middlewares/catch-all";
import { pageNotFound, routeNotFound } from "./4-middlewares/not-found";
import sanitize from "./4-middlewares/sanitize";
import authController from "./6-controllers/auth-controller";
import vacationsController from "./6-controllers/vacations-controller";


// creating the server
const server = express();
if (appConfig.isDevelopment) server.use(cors());
else server.use(cors({ origin: "" }))

// set the images folder for the fileSaver library
fileSaver.config(path.join(__dirname, "1-assets", "images"));

// creating a request body obj containing the request body data
server.use(express.json());
server.use("/", express.static(path.join(__dirname, "7-frontend")))

// log every activity
server.use(activities);

// sanitize
server.use(sanitize);

// create a request.files obj containing the request body data
server.use(expressFileUpload());

server.use("/api", vacationsController, authController);
server.use("/api/*", routeNotFound);
server.use("/*", pageNotFound);

// catchall middleware 
server.use(catchAll)

// running 
server.listen(appConfig.port, () => {
    console.log("listening on port " + appConfig.port);
});

// export the express server for integration testing
export default { server };