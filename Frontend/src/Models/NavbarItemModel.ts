import { SubNavItem } from "./SubNavItem";
export class NavbarItemModel {
    public itemText: string;
    public itemDestinationPagePath: string;
    public itemSvgComponent?: any;
    public isDropdown?: boolean = false;
    public subNavItems?: SubNavItem[];
}
