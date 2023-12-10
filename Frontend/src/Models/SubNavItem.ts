export class SubNavItem {
    public subNavItemHeading: string;
    public subNavItemRedirectPath: string;

    constructor(subNavItemHeading: string, subNavItemRedirectPath: string) {
        this.subNavItemHeading = subNavItemHeading;
        this.subNavItemRedirectPath = subNavItemRedirectPath;
    }
}
