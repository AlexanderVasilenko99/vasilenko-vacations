import Joi from "joi";
import { Validation } from "./error-models";

class CredentialsModel {

    public email: string;
    public password: string;

    constructor(user: CredentialsModel) {
        this.email = user.email;
        this.password = user.password;
    }

    public static validationSchema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(4).max(30),
    });

    public validateCredentials(): void {
        const result = CredentialsModel.validationSchema.validate(this);
        if (result?.error?.message) throw new Validation(result.error.message);
    }

}
export default CredentialsModel;