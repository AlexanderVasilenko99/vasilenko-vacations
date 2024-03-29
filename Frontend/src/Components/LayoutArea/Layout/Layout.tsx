import FooterArea from "../../FooterArea/FooterArea";
import NavbarArea from "../../NavbarArea/NavbarArea";
import Routing from "../Routing/Routing";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import "./Layout.css";
function Layout(): JSX.Element {
    return (
        <div className="Layout">
            <ScrollToTop />
            <nav><NavbarArea /></nav>
            <main><Routing /></main>
            <footer><FooterArea /></footer>
        </div>
    )
}
export default Layout;