import { Navigate, Route, Routes } from "react-router-dom";

import appConfig from "../../../Utils/AppConfig";
import AboutArea from "../../AboutArea/AboutArea";
import Login from "../../AuthArea/Login/Login";
import RegisterComponent from "../../AuthArea/Register/Register";
import Home from "../../HomeArea/Home/Home";

import EditProduct from "../../ProductsArea/EditProduct/EditProduct";
import ProductDetails from "../../ProductsArea/ProductDetails/ProductDetails";
import ProductsArea from "../../ProductsArea/ProductsArea";
import UserArea from "../../UserArea/UserArea";
import VacationPage from "../../VacationsArea/VacationPage/VacationPage";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
import PageNotFound from "../PageNotFound/PageNotFound";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";


function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                {/* Default Route */}
                <Route path="/" element={<Navigate to={"/home"} />}></Route>
                <Route path="/home/" element={<Home />} />
                <Route path={appConfig.productsRoute} element={<ProductsArea />} />
                <Route path="/products/product/:productId/" element={<ProductDetails />} />
                {/* <Route path="/products/new/" element={<AddProduct />} /> */}
                <Route path="/products/edit/:prodId" element={<EditProduct />} />

                <Route path="/vacations/" element={<VacationsList />} />
                <Route path="/vacations/new" element={<AddVacation />} />
                <Route path="/vacations/:uuid" element={<VacationPage />} />

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
