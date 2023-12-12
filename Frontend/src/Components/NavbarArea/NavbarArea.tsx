import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import BeachAccessOutlinedIcon from '@mui/icons-material/BeachAccessOutlined';
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import site_logo from "../../Assets/Images/UtilityImages/vasilenko_vacations_logo.png";
import { SubNavItem } from "../../Models/SubNavItem";
import { authStore } from "../../Redux/AuthState";
import authService from "../../Services/AuthService";
import appConfig from "../../Utils/AppConfig";
import "./NavbarArea.css";
import NavbarItem from "./NavbarItem/NavbarItem";
function NavbarArea(): JSX.Element {

    const navigate = useNavigate();
    const preIdentificationSubNavItems: SubNavItem[] = [
        new SubNavItem('Login', appConfig.loginRoute),
        new SubNavItem('Register', appConfig.registerRoute)
    ];
    const postIdentificationSubNavItems: SubNavItem[] = [
        new SubNavItem(authStore.getState().user?.userFirstName, "#"),
        new SubNavItem('Logout', "#")
    ];
    const vacationsSubNavItems: SubNavItem[] = [
        new SubNavItem('All Vacations', appConfig.vacationsRoute)
    ];
    const [identificationSubNavItems, setIdentificationSubNavItems] = useState<SubNavItem[]>(preIdentificationSubNavItems);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);


    useEffect(() => {
        console.log(authStore.getState().user)
        window.addEventListener('click', (event) => {
            if (event.target instanceof HTMLAnchorElement) {
                console.log(event.target);
                const anchor: HTMLAnchorElement = event.target;
                if (anchor.innerHTML === "Logout") {
                    authService.logout();
                    setIsLoggedIn(false);
                    setIdentificationSubNavItems(preIdentificationSubNavItems);
                    navigate(appConfig.homeRoute);
                }
            }
        });



        if (authStore.getState().token) {
            setIsLoggedIn(true);
            setIdentificationSubNavItems(postIdentificationSubNavItems);
        }
        const unsubscribe = authStore.subscribe(() => {
            setIdentificationSubNavItems(postIdentificationSubNavItems);
            setIsLoggedIn(true);
        });

        return unsubscribe;
    }, [isLoggedIn]);


    return (
        <div className="NavbarArea">
            <div className="list-container">
                <ul>
                    <li className="site_logo">
                        <NavLink to={appConfig.homeRoute}>
                            <img src={site_logo} />
                        </NavLink>
                    </li>
                    {isLoggedIn && <NavbarItem isDropdown
                        itemText='Vacations' itemDestinationPagePath={appConfig.vacationsRoute}
                        subNavItems={vacationsSubNavItems}
                        itemSvgComponent={<BeachAccessOutlinedIcon />}
                    />}
                    <NavbarItem
                        itemText='About' itemDestinationPagePath={"#"}
                        itemSvgComponent={<InfoOutlinedIcon />}
                    />
                    <NavbarItem isDropdown
                        itemText='Identify' itemDestinationPagePath={"#"}
                        subNavItems={identificationSubNavItems}
                        itemSvgComponent={<VpnKeyOutlinedIcon />}
                    />
                </ul>
            </div>
        </div >
    );
}

export default NavbarArea;
