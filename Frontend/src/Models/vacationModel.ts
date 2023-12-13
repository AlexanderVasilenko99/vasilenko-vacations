// import { UploadedFile } from "express-fileupload"
class VacationModel {
    public vacationId: number;
    public vacationUUID: string;
    public vacationCountry: string;
    public vacationCity: string;
    public vacationDescription: string;
    public vacationStartDate: Date;
    public vacationEndDate: Date;
    public vacationPrice: number;
    public vacationImageName: string;
    public vacationImageUrl: string;
    // public vacationUploadedImage: UploadedFile;
    public vacationUploadedImage: File;

    // constructor(vacation: VacationModel) {
    //     this.vacationId = vacation.vacationId;
    //     this.vacationCountry = vacation.vacationCountry;
    //     this.vacationCity = vacation.vacationCity;
    //     this.vacationDescription = vacation.vacationDescription;
    //     this.vacationStartDate = vacation.vacationStartDate;
    //     this.vacationEndDate = vacation.vacationEndDate;
    //     this.vacationPrice = vacation.vacationPrice;
    //     this.vacationImageName = vacation.vacationImageName;
    //     this.vacationImageUrl = vacation.vacationImageUrl;
    //     // this.vacationUploadedImage = vacation.vacationUploadedImage;
    //     this.vacationUploadedImage = vacation.vacationUploadedImage;
    // }
}
export default VacationModel;