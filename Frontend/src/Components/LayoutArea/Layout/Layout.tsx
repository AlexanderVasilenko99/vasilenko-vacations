import FooterArea from "../../FooterArea/FooterArea";
import NavbarArea from "../../NavbarArea/NavbarArea";
// import Footer from "../Footer/Footer";
// import Header from "../Header/Header";
// import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";
import "./Layout.css";
function Layout(): JSX.Element {
    return (
        <div className="Layout">
            <nav><NavbarArea /></nav>
            <main><Routing /></main>
            <footer><FooterArea /></footer>
        </div>
    )
}
export default Layout;