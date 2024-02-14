import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import BeachAccessOutlinedIcon from '@mui/icons-material/BeachAccessOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import site_logo from "../../Assets/Images/UtilityImages/project-logo.png";
import { SubNavItem } from "../../Models/SubNavItem";
import { authStore } from "../../Redux/AuthState";
import authService from "../../Services/AuthService";
import appConfig from "../../Utils/AppConfig";
import ContactIcons from './ContactIcons/ContactIcons';
import "./NavbarArea.css";
import NavbarItem from "./NavbarItem/NavbarItem";
function NavbarArea(): JSX.Element {

    // navbar is dynamic and renders
    // child components depending on:
    // is user logged in and is user
    // admin/regular user

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const navigate = useNavigate();

    const userFullName = authStore.getState().user?.userFirstName + " " + authStore.getState().user?.userLastName;
    const userProfileRoute = appConfig.userRoute + authStore.getState().user?.userUUID;

    const profileSubNavItems: SubNavItem[] = [
        new SubNavItem(userFullName, userProfileRoute),
        new SubNavItem('Logout', "#")
    ]
    const vacationsSubNavItems: SubNavItem[] = authStore.getState().user?.userRoleId === 1 ? [
        new SubNavItem('All Vacations', appConfig.vacationsRoute),
        new SubNavItem('Add Vacation', appConfig.addVacationRoute)] : [new SubNavItem('All Vacations', appConfig.vacationsRoute)];

    useEffect(() => {
        window.addEventListener('click', (event) => {
            if (event.target instanceof HTMLAnchorElement) {
                const anchor: HTMLAnchorElement = event.target;
                if (anchor.innerHTML === "Logout") {
                    authService.logout();
                    setIsLoggedIn(false);
                    navigate(appConfig.homeRoute);
                }
            }
        });

        if (authStore.getState().token) {
            setIsLoggedIn(true);
            const roleId = authStore.getState().user?.userRoleId;
            if (roleId === 1) setIsAdmin(true);
        }

        const unsubscribe = authStore.subscribe(() => {
            setIsLoggedIn(true);
            setIsAdmin(false)
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
                    {isLoggedIn && <NavbarItem
                        isDropdown
                        itemText='Vacations'
                        subNavItems={vacationsSubNavItems}
                        itemSvgComponent={<BeachAccessOutlinedIcon />}
                        itemDestinationPagePath={appConfig.vacationsRoute}
                    />}
                    {isAdmin && <NavbarItem
                        itemText='Reports'
                        itemSvgComponent={<AssessmentOutlinedIcon />}
                        itemDestinationPagePath={appConfig.reportsRoute}
                    />}
                    <NavbarItem
                        itemText='About'
                        itemSvgComponent={<InfoOutlinedIcon />}
                        itemDestinationPagePath={appConfig.aboutRoute}
                    />
                    {!isLoggedIn && <NavbarItem
                        itemText='Login'
                        itemSvgComponent={<VpnKeyOutlinedIcon />}
                        itemDestinationPagePath={appConfig.loginRoute}
                    />}
                    {isLoggedIn && <NavbarItem
                        isDropdown
                        itemText='Profile'
                        itemDestinationPagePath={"#"}
                        subNavItems={profileSubNavItems}
                        itemSvgComponent={<AccountCircleOutlinedIcon />}
                    />}
                </ul>
            </div>
            {window.location.pathname !== '/home' && window.location.pathname !== '/home/' && <ContactIcons />}
        </div >
    );
}

export default NavbarArea;
