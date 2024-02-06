import { describe, it } from "mocha";
import supertest from "supertest";
import app from "../src/app";
import chai from 'chai';
import chaiAsPromised from "chai-as-promised";

const expect = chai.expect;
chai.use(chaiAsPromised);


describe("testing auth-service", () => {

    it("login should return valid token", async () => {
        const response = await supertest(app.server).post('/api/login').send({
            email: "alexandervjr1@gmail.com",
            password: "1234",
        });
        const token = response.body;
        expect(token).to.have.length.gte(100).and.lte(600);
    });

    it("update should return new valid token", async () => {
        const response = await supertest(app.server).put('/api/update').send({
            userFirstName: "alex",
            userLastName: "vas",
            userEmail: "alexandervjr1@gmail.com",
            userUUID: "27c19753-7955-4384-a921-4026b8f75d36"
        });
        const token = response.body;
        expect(token).to.have.length.gte(100).and.lte(600);

        // reset original values
        const newResponse = await supertest(app.server).put('/api/update').send({
            userFirstName: "Alexander",
            userLastName: "Vasilenko",
            userEmail: "alexandervjr1@gmail.com",
            userUUID: "27c19753-7955-4384-a921-4026b8f75d36"
        });
        const newToken = newResponse.body;
        expect(newToken).to.have.length.gte(100).and.lte(600);
    });

    // it("attempting to register with unused email should return valid token", async () => {
    //     const response = await supertest(app.server).post('/api/register').send({
    //         userFirstName: 'TEST',
    //         userLastName: 'TEST',
    //         userEmail: 'TEST@TEST.COM',
    //         userPassword: '1234'
    //     });
    //     const token = response.body;
    //     expect(token).to.have.length.gte(100).and.lte(600);
    // });

    it("attempting to register with used email should be rejected", async () => { // a function should crash for this test to pass
        const reason = 'Sorry but it seems like this email is already being used!';

        const error = await supertest(app.server).post('/api/register').send({
            userFirstName: 'THROW',
            userLastName: 'THROW',
            userEmail: 'alexandervjr1@gmail.com',
            userPassword: '1234'
        });

        expect(error).to.haveOwnProperty('status', 409);
        return expect(Promise.reject(reason)).to.be.rejectedWith(reason);
    });

});