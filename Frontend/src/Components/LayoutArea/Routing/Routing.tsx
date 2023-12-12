import { Navigate, Route, Routes } from "react-router-dom";

import Home from "../../HomeArea/Home/Home";
import ProductDetails from "../../ProductsArea/ProductDetails/ProductDetails";
import ProductsArea from "../../ProductsArea/ProductsArea";
import PageNotFound from "../PageNotFound/PageNotFound";
import AddProduct from "../../ProductsArea/AddProduct/AddProduct";
import EditProduct from "../../ProductsArea/EditProduct/EditProduct";
import appConfig from "../../../Utils/AppConfig";
import RegisterComponent from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
import AboutArea from "../../AboutArea/AboutArea";
import UserArea from "../../UserArea/UserArea";


function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                {/* Default Route */}
                <Route path="/" element={<Navigate to={"/home"} />}></Route>
                <Route path="/home/" element={<Home />} />
                <Route path={appConfig.productsRoute} element={<ProductsArea />} />
                <Route path="/products/product/:productId/" element={<ProductDetails />} />
                <Route path="/products/new/" element={<AddProduct />} />
                <Route path="/products/edit/:prodId" element={<EditProduct />} />

                <Route path="/vacations/" element={<VacationsList />} />

                <Route path="/about/" element={<AboutArea />} />

                <Route path="/users/:uuid" element={<UserArea />} />
                
                <Route path="/register/" element={<RegisterComponent />} />
                <Route path="/login/" element={<Login />} />


                <Route path="/*" element={<PageNotFound />}></Route>

            </Routes>
        </div>
    );
}

export default Routing;
