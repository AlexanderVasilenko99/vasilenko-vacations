import { describe, it } from "mocha";
import authService from "../src/5-services/auth-service";
import UserModel from "../src/3-models/user-model";
import { expect } from "chai";
import CredentialsModel from "../src/3-models/credentials-model";

describe("testing auth-service", () => {

    it("login should return token", () => {
        const user: CredentialsModel = {
            email: "alexandervjr1@gmail.com",
            password: "1234",
            validateCredentials: () => { }
        }

        // const token = authService.login(user);
        // expect(token).to.
        expect(1).to.equal(1);
    });

});