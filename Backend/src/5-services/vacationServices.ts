import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { ResourceNotFound } from "../3-models/error-models";
import ProductModel from "../3-models/product-model";
import { fileSaver } from "uploaded-file-saver"
import appConfig from "../2-utils/app-config";
import VacationModel from "../3-models/vacationModel";

class VacationServices {
    public async getAllVacations(): Promise<VacationModel[]> {
        // create sql query
        // appConfig.appHost + "/api/products/" + imageName;
        const sql = `SELECT * FROM vacations`
        // get products from db
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



    // public async addProduct(product: ProductModel): Promise<ProductModel> {
    //     // validate
    //     product.postValidate();

    //     // save image to disk
    //     const imageName = await fileSaver.add(product.image);

    //     // create sql insert query
    //     const sql = `INSERT INTO products(ProductName,UnitPrice,UnitsInStock,ImageName)
    //                 values('${product.name}',${product.price},${product.stock},'${imageName}');`

    //     // add the product to db
    //     const info: OkPacket = await dal.execute(sql);
    //     // add id given back by OkPacket to product
    //     product.id = info.insertId;

    //     // update image url
    //     product.imageUrl = appConfig.appHost + "/api/products/" + imageName;

    //     // delete uploaded file from returned file
    //     delete product.image;

    //     return product;
    // }

    // // get image name by product id
    // private async getExistingImageName(id: number): Promise<string> {
    //     const sql = `SELECT ImageName from products WHERE ProductID = ${id}`;
    //     const products = await dal.execute(sql);
    //     const product = products[0];
    //     if (!product) return "";
    //     return product.ImageName;
    // }



    // public async editProduct(product: ProductModel): Promise<ProductModel> {
    //     // validate
    //     product.putValidate();

    //     // get existing image name
    //     const existingImageName = await this.getExistingImageName(product.id);

    //     // update image if exists and get existing or updated imagename
    //     const imageName = product.image ? await fileSaver.update(existingImageName, product.image) : existingImageName;

    //     // create sql update query
    //     const sql = `UPDATE products SET
    //                     ProductName = '${product.name}',
    //                     UnitPrice = ${product.price},
    //                     UnitsInStock = ${product.stock},
    //                     ImageName = '${imageName}'
    //                 WHERE ProductId = ${product.id};`

    //     // update db with new product
    //     const info: OkPacket = await dal.execute(sql);
    //     // if id is invalid:
    //     if (info.affectedRows === 0) throw new ResourceNotFound(product.id);

    //     // update image url
    //     product.imageUrl = appConfig.appHost + "/api/products/" + imageName;

    //     // delete uploaded file from returned file
    //     delete product.image;

    //     return product;
    // }
    // public async deleteProduct(id: number): Promise<void> {
    //     // create sql delete query
    //     const sql = `DELETE FROM products WHERE ProductId = ${id};`
    //     const existingImageName = await this.getExistingImageName(id);

    //     // delete in db
    //     const info: OkPacket = await dal.execute(sql);

    //     fileSaver.delete(existingImageName)

    //     // if id is invalid:
    //     if (info.affectedRows === 0) throw new ResourceNotFound(id);
    // }
}
const vacationServices = new VacationServices();
export default vacationServices;