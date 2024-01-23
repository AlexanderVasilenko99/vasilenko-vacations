class AppConfig {
    public readonly homeRoute: string = "/home/";
    public readonly loginRoute: string = "/login/";
    public readonly registerRoute: string = "/register/";
    public readonly vacationsRoute: string = "/vacations/";
    public readonly addVacationRoute: string = "/vacations/new";
    public readonly aboutRoute: string = "/about/";
    public readonly reportsRoute: string = "/reports/";
    public readonly userRoute: string = "/users/";

    // public readonly addVacationRoute: string = this.vacationsRoute + "new/"
    // public readonly editVacationRoute: string = this.vacationsRoute + "edit/"
    // public readonly editVacationDetails: string = this.vacationsRoute + "details/"

    public readonly vacationsUrl: string = 'http://localhost:4000/api/vacations/';
    public readonly loginUrl: string = 'http://localhost:4000/api/login/';
    public readonly updateUrl: string = 'http://localhost:4000/api/update/';
    public readonly registerUrl: string = 'http://localhost:4000/api/register/';
    public readonly vacationsFollowUrl: string = this.vacationsUrl + 'follow/';
    public readonly vacationsUnfollowUrl: string = this.vacationsUrl + 'unfollow/';
    public readonly vacationsImageUrl: string = 'http://localhost:4000/api/vacations-image/';

    private readonly SITE_PRIMARY_COLOR: string = '#1a5785'
    private readonly SITE_SECONDARY_COLOR: string = '#2e6ba0'
    private readonly SITE_BACKGROUND_COLOR: string = '#F6F1F1'
}
const appConfig = new AppConfig();
export default appConfig;