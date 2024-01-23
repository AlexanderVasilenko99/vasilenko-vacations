class VacationModel {
    public vacationId: number;
    public vacationUUID: string;
    public vacationCountry: string;
    public vacationCity: string;
    public vacationDescription: string;
    public vacationStartDate: Date;
    public vacationEndDate: Date;
    public vacationPrice: number;
    public vacationCountryISO: string;
    public vacationImageName: string;
    public vacationImageUrl: string;
    public vacationUploadedImage: File;
    public vacationIsFollowing: number;
    public vacationFollowersCount: number;
}
export default VacationModel;