import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import BeachAccessOutlinedIcon from '@mui/icons-material/BeachAccessOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
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
        new SubNavItem(authStore.getState().user?.userFirstName + " " + authStore.getState().user?.userLastName,
            appConfig.userRoute + authStore.getState().user?.userUUID),
        new SubNavItem('Logout', "#")
    ]
    const vacationsSubNavItems: SubNavItem[] = authStore.getState().user?.userRoleId === 1 ? [
        new SubNavItem('All Vacations', appConfig.vacationsRoute),
        new SubNavItem('Add Vacation', appConfig.addVacationRoute)] : [new SubNavItem('All Vacations', appConfig.vacationsRoute)];

    const [identificationSubNavItems, setIdentificationSubNavItems] = useState<SubNavItem[]>(preIdentificationSubNavItems);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);


    useEffect(() => {
        // console.log(authStore.getState().user)
        window.addEventListener('click', (event) => {
            if (event.target instanceof HTMLAnchorElement) {
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
            const roleId = authStore.getState().user?.userRoleId;
            if (roleId === 1) setIsAdmin(true);
            setIdentificationSubNavItems(postIdentificationSubNavItems);
        }
        const unsubscribe = authStore.subscribe(() => {
            setIdentificationSubNavItems(postIdentificationSubNavItems);
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
                    {isLoggedIn && <NavbarItem isDropdown
                        itemText='Vacations' itemDestinationPagePath={appConfig.vacationsRoute}
                        subNavItems={vacationsSubNavItems}
                        itemSvgComponent={<BeachAccessOutlinedIcon />}
                    />}
                    {isAdmin && <NavbarItem
                        itemText='Reports' itemDestinationPagePath={appConfig.reportsRoute}
                        itemSvgComponent={<AssessmentOutlinedIcon />}
                    />}
                    <NavbarItem
                        itemText='About' itemDestinationPagePath={appConfig.aboutRoute}
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
