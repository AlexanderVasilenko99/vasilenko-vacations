class ContactInfoModel {
    public imageName: string;
    public link: string;
    public tooltip?: string;
    public constructor(imageName: string, link: string, tooltip?: string) {
        this.imageName = imageName;
        this.link = link;
        this.tooltip = tooltip;
    }
}
export default ContactInfoModel;