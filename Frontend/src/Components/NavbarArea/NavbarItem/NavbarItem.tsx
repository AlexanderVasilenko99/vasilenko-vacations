import { NavLink, useNavigate } from "react-router-dom";
import { NavbarItemModel } from "../../../Models/NavbarItemModel";
import { SubNavItem } from "../../../Models/SubNavItem";
import "./NavbarItem.css";


function NavbarItem(props: NavbarItemModel): JSX.Element {
    let arr: SubNavItem[] = props.subNavItems;
    const navigate = useNavigate();
    return (
        <ul className={props.isDropdown ? "NavbarItem no-drop" : "NavbarItem"}
            onClick={() => {
                if (!props.subNavItems) navigate(props.itemDestinationPagePath);
            }}
        >
            <li>{props.itemSvgComponent}|&nbsp;{props.itemText}</li>
            {props.isDropdown &&
                <div className="NavbarItemDropdownContent">
                    {arr?.map(i => <div key={i.subNavItemHeading}>
                        <NavLink to={i.subNavItemRedirectPath}>{i.subNavItemHeading}</NavLink>
                    </div>
                    )}
                </div>
            }
        </ul >
    );
}

export default NavbarItem;
