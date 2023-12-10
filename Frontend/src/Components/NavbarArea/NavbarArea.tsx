import "./NavbarArea.css";
import site_logo from "../../Assets/Images/UtilityImages/vasilenko_vacations_logo.png"
import person_logo from "../../Assets/Images/UtilityImages/person_logo.png"
import { NavLink } from "react-router-dom";
import appConfig from "../../Utils/AppConfig";
import { AuthActionTypes, authStore } from "../../Redux/AuthState";
import NavbarItem from "./NavbarItem/NavbarItem";
import { SubNavItem } from "../../Models/SubNavItem";
import authService from "../../Services/AuthService";
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
function NavbarArea(): JSX.Element {


    const fleetSubNavItems: SubNavItem[] = [
        new SubNavItem('Login', appConfig.loginRoute),
        new SubNavItem('Register', appConfig.registerRoute),
        new SubNavItem('Logout', appConfig.registerRoute),
    ];

    return (
        <div className="NavbarArea">
            <div className="list-container">
                <ul>
                    <li className="site_logo">
                        <NavLink to={appConfig.homeRoute}>
                            <img src={site_logo} />
                        </NavLink>
                    </li>

                    <NavbarItem
                        itemText='About' itemDestinationPagePath={"#"}
                        itemSvgComponent={<InfoOutlinedIcon />}
                    />
                    <NavbarItem isDropdown
                        itemText='Identify' itemDestinationPagePath={"#"}
                        subNavItems={fleetSubNavItems}
                        itemSvgComponent={<VpnKeyOutlinedIcon />}
                    />


                    {authStore.getState().token && <li>
                        Welcome {authStore.getState().user.firstName}
                        <NavLink to={"#"} onClick={() => authService.logout()}>Logout</NavLink>
                    </li>
                    }
                </ul>
            </div>
        </div >
    );
}

export default NavbarArea;
