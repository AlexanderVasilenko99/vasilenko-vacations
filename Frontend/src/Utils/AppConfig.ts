class AppConfig {
    public readonly homeRoute: string = "/home/";
    public readonly loginRoute: string = "/login/";
    public readonly registerRoute: string = "/register/";
    public readonly vacationsRoute: string = "/vacations/";
    public readonly addVacationRoute: string = "/vacations/new";
    public readonly aboutRoute: string = "/about/";
    public readonly reportsRoute: string = "/reports/";
    public readonly userRoute: string = "/users/";

    public readonly vacationsUrl: string = this.baseUrl + '/api/vacations/';
    public readonly loginUrl: string = this.baseUrl + '/api/login/';
    public readonly updateUrl: string = this.baseUrl + '/api/update/';
    public readonly registerUrl: string = this.baseUrl + '/api/register/';
    public readonly vacationsFollowUrl: string = this.vacationsUrl + 'follow/';
    public readonly vacationsUnfollowUrl: string = this.vacationsUrl + 'unfollow/';
    public readonly vacationsImageUrl: string = this.baseUrl + '/api/vacations-image/';

    private readonly SITE_PRIMARY_COLOR: string = '#1a5785'
    private readonly SITE_SECONDARY_COLOR: string = '#2e6ba0'
    private readonly SITE_BACKGROUND_COLOR: string = '#F6F1F1'

    public constructor(private baseUrl: string) { }
}

class DevelopmentConfig extends AppConfig {
    public constructor() {
        super("http://localhost:4000");
    }
}

class ProductionConfig extends AppConfig {
    public constructor() {
        super("");
    }
}

// const appConfig = new DevelopmentConfig();
const appConfig = new ProductionConfig();

export default appConfig;