// import { UploadedFile } from "express-fileupload"
class VacationModel {
    public vacationId: number;
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
}
export default VacationModel;