import express, { Request, Response, NextFunction } from "express";
import productService from "../5-services/product-service";
import ProductModel from "../3-models/product-model";
import StatusCode from "../3-models/status-codes";
import { fileSaver } from "uploaded-file-saver";
import verifyToken from "../4-middlewares/verifyToken";
import verifyAdmin from "../4-middlewares/verifyAdmin";
import vacationServices from "../5-services/vacationServices";
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
})
// router.get("/image/:id", async (request: Request, response: Response, next: NextFunction) => {
//     try {
//         const id = +request.params.id;
//         const vacation = await vacationServices.getExistingVacationImageName(id);
//         console.log("vacation: " + vacation);

//         response.send(vacation);
//     } catch (err: any) {
//         next(err);
//     }
// })
// // GET https://localhost:4000/api/products/:id
// router.get("/products/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
//     try {
//         const id = +request.params.id;
//         const product = await productService.getOneProduct(id);
//         response.json(product);
//     } catch (err: any) {
//         next(err);
//     }
// })
// // POST https://localhost:4000/api/products
// router.post("/products",verifyToken, async (request: Request, response: Response, next: NextFunction) => {
//     try {
//         request.body.image = request.files?.image;
//         const product = new ProductModel(request.body);
//         const addedProduct = await productService.addProduct(product);
//         response.status(StatusCode.Created).json(addedProduct);
//     } catch (err: any) {
//         next(err);
//     }
// })
// // PUT https://localhost:4000/api/products/:id
// router.put("/products/:id([0-9]+)",verifyToken, async (request: Request, response: Response, next: NextFunction) => {
//     try {
//         request.body.id = +request.params.id
//         request.body.image = request.files?.image
//         const product = new ProductModel(request.body);
//         const updatedProduct = await productService.editProduct(product);
//         response.json(updatedProduct);

//     } catch (err: any) {
//         next(err);
//     }
// })
// // DELETE  https://localhost:4000/api/products/:id
// // GET https://localhost:4000/api/products-by-price/:min/:max
// router.get("/products-by-price/:min/:max", async (request: Request, response: Response, next: NextFunction) => {
//     try {
//         const min = +request.params.min;
//         const max = +request.params.max;
//         const products = await productService.getProductsByPrice(min, max);
//         response.json(products);
//     } catch (err: any) {
//         next(err);
//     }
// })
// // GET https://localhost:4000/api/products-by-price2/?min&?:max
// router.get("/products-by-price2", async (request: Request, response: Response, next: NextFunction) => {
//     try {
//         const min = +request.query.min;
//         const max = +request.query.max;
//         const products = await productService.getProductsByPrice(min, max);
//         response.json(products);
//     } catch (err: any) {
//         next(err);
//     }
// })
// // GET https://localhost:4000/api/products-by-category?id=
// router.get("/products-by-category", async (request: Request, response: Response, next: NextFunction) => {
//     try {
//         const id = +request.query.id;
//         const products = await productService.getProductsByCategoryId(id);
//         response.json(products);
//     } catch (err: any) {
//         next(err);
//     }
// })
// // GET https://localhost:4000/api/add-product-by-procedure
// router.post("/add-product-by-procedure",verifyToken, async (request: Request, response: Response, next: NextFunction) => {
//     try {
//         const product = new ProductModel(request.body);
//         const addedProduct = await productService.addProductByProcedure(product);
//         response.status(StatusCode.Created).json(addedProduct);
//     } catch (err: any) {
//         next(err);
//     }
// })
// // GET https://localhost:4000/api/products-by-category?id=
router.get("/vacations/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = fileSaver.getFilePath(imageName);
        response.sendFile(absolutePath);
    } catch (err: any) {
        next(err);
    }
})

export default router;