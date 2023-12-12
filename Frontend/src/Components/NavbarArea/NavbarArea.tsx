import "./NavbarArea.css";
import site_logo from "../../Assets/Images/UtilityImages/vasilenko_vacations_logo.png"
import person_logo from "../../Assets/Images/UtilityImages/person_logo.png"
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import appConfig from "../../Utils/AppConfig";
import { AuthActionTypes, AuthState, authStore } from "../../Redux/AuthState";
import NavbarItem from "./NavbarItem/NavbarItem";
import { SubNavItem } from "../../Models/SubNavItem";
import authService from "../../Services/AuthService";
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useEffect, useState } from "react";
function NavbarArea(): JSX.Element {

    function myFunc(): void { console.log("click"); }


    const preIdentificationSubNavItems: SubNavItem[] = [
        new SubNavItem('Login', appConfig.loginRoute),
        new SubNavItem('Register', appConfig.registerRoute)
    ];
    const postIdentificationSubNavItems: SubNavItem[] = [
        new SubNavItem('Logout', "#")
    ];
    const [identificationSubNavItems, setIdentificationSubNavItems] = useState<SubNavItem[]>(preIdentificationSubNavItems);
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener('click', (event) => {
            if (event.target instanceof HTMLAnchorElement) {
                console.log(event.target);
                const anchor: HTMLAnchorElement = event.target;
                if (anchor.innerHTML === "Logout") {
                    authService.logout();
                    setIdentificationSubNavItems(preIdentificationSubNavItems);
                    navigate("/home");
                }
            }
        });



        if (authStore.getState().token) setIdentificationSubNavItems(postIdentificationSubNavItems);
        const unsubscribe = authStore.subscribe(() => {
            setIdentificationSubNavItems(postIdentificationSubNavItems);
        });

        return unsubscribe;
    }, []);


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
                        // subNavItems={authStore.getState().token ? postIdentificationSubNavItems : preIdentificationSubNavItems}
                        subNavItems={identificationSubNavItems}

                        itemSvgComponent={<VpnKeyOutlinedIcon />}
                    />
                </ul>
            </div>
        </div >
    );
}

export default NavbarArea;
