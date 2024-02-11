import { NavLink, useNavigate } from "react-router-dom";
import { NavbarItemModel } from "../../../Models/NavbarItemModel";
import { SubNavItem } from "../../../Models/SubNavItem";
import "./NavbarItem.css";


function NavbarItem(props: NavbarItemModel): JSX.Element {
    // console.log(props.subNavItems);
    let arr: SubNavItem[] = props.subNavItems;
    const navigate = useNavigate();
    return (
        // <NavLink to={props.itemDestinationPagePath} className="NavbarItem">
        <ul className="NavbarItem"
            onClick={() => {
                if (!props.subNavItems) navigate(props.itemDestinationPagePath);
            }}
        >
            <li>{props.itemSvgComponent}|&nbsp;{props.itemText}</li>
            {props.isDropdown &&
                <div className="NavbarItemDropdownContent" >
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
