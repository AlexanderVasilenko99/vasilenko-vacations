import { NavLink } from "react-router-dom";
import "./Menu.css"
import TotalProducts from "../../ProductsArea/TotalProducts/TotalProducts";
function Menu(): JSX.Element {



    return (
        <div className="Menu">
            <NavLink to="/home/">Home</NavLink>
            <NavLink to="/products/">Products</NavLink>
            <TotalProducts />

            {/* <a href="/home">Home</a>
            <a href="/products">Products</a>
            <a href="/about">About</a> */}
        </div>
    )
}
export default Menu;