import { describe, it } from "mocha";
import supertest from "supertest";
import app from "../src/app";
import chai from 'chai';
import chaiAsPromised from "chai-as-promised";
import path from "path"

const expect = chai.expect;
chai.use(chaiAsPromised);

// set both token before running testing
let adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJVVUlEIjoiMjdjMTk3NTMtNzk1NS00Mzg0LWE5MjEtNDAyNmI4Zjc1ZDM2IiwidXNlckZpcnN0TmFtZSI6IkFsZXhhbmRlciIsInVzZXJMYXN0TmFtZSI6IlZhc2lsZW5rbyIsInVzZXJFbWFpbCI6ImFsZXhhbmRlcnZqcjFAZ21haWwuY29tIiwidXNlckltYWdlTmFtZSI6IjhmYWY0MDJmLTAzNmUtNDk2Yi1hZGU1LTQ2OTIwZTcyZjMyMS5qcGVnIiwidXNlclJvbGVJZCI6MSwidXNlckltYWdlVXJsIjoiaHR0cDovLzQ1LjU1LjcwLjI0Mzo0MDAwL2FwaS91c2Vycy1pbWFnZS84ZmFmNDAyZi0wMzZlLTQ5NmItYWRlNS00NjkyMGU3MmYzMjEuanBlZyJ9LCJpYXQiOjE3MDczMDc4MDgsImV4cCI6MTcwNzMxODYwOH0.sSKWZP0RcshqrbotAedqFUzXwCecvn6nAvtIurlUXqI';
let userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJVVUlEIjoiOWI1MWJkYzgtMmQ0YS00OTUwLWFmM2EtNWMxM2VmZDQ3NGFhIiwidXNlckZpcnN0TmFtZSI6IkJlbiIsInVzZXJMYXN0TmFtZSI6IkRvdmVyIiwidXNlckVtYWlsIjoiYmVuZG9AZ21haWwuY29tIiwidXNlckltYWdlTmFtZSI6ImVkYzAzYTY2LTA1NWItNGM2ZC1iNWIyLWMzZDRjN2U3MmQ3Ni5wbmciLCJ1c2VyUm9sZUlkIjoyLCJ1c2VySW1hZ2VVcmwiOiJodHRwOi8vNDUuNTUuNzAuMjQzOjQwMDAvYXBpL3VzZXJzLWltYWdlL2VkYzAzYTY2LTA1NWItNGM2ZC1iNWIyLWMzZDRjN2U3MmQ3Ni5wbmcifSwiaWF0IjoxNzA3MzExMjczLCJleHAiOjE3MDczMjIwNzN9.0nVS8f5Id9u9j2QQxMMejkjV17QzJtk4ctbGFwrqfMQ';
let addedVacationUUID = '';
let addedVacationImageName = '';

describe("testing vacations-service", () => {
    if (!adminToken || !userToken)
        throw new Error('********* Provide valid user & admin tokens before running test! *********');

    it("getting vacations without being logged in should return an unauthorized error", async () => {
        const response = await supertest(app.server)
            .get('/api/vacations/9b51bdc8-2d4a-4950-af3a-5c13efd474aa');
        expect(response.status).to.equal(401);
    });

    it("should return a list of vacations", async () => {
        const response = await supertest(app.server)
            .get('/api/vacations/19600e57-d1fa-48de-9ef2-740d53af673d')
            .set({ "Authorization": `Bearer ${adminToken}` });
        expect(response.status).to.equal(200);
        const vacations = response.body;

        expect(vacations).to.have.length.gte(1);
        expect((vacations[0])).to.have.keys('vacationId',
            'vacationUUID',
            'vacationCountry',
            'vacationCity',
            'vacationDescription',
            'vacationStartDate',
            'vacationEndDate',
            'vacationPrice',
            'vacationCountryISO',
            'vacationImageName',
            'vacationIsFollowing',
            'vacationFollowersCount');
    });

    // it("should return a user not found", async () => {})

    it("should add a vacation", async () => {
        const response = await supertest(app.server)
            .post('/api/vacations')
            .set({ "Authorization": `Bearer ${adminToken}` })
            .field('vacationCountry', 'test country')
            .field('vacationCity', 'test city')
            .field('vacationDescription', 'test description')
            .field('vacationStartDate', '2100.01.01')
            .field('vacationEndDate', '2101.01.01')
            .field('vacationPrice', '1234')
            .field('vacationCountryISO', 'il')
            .attach('vacationUploadedImage', path.resolve(__dirname, '../../Frontend/src/Assets/Images/UtilityImages/project-logo.png'))

        expect(response.status).to.equal(201);
        expect(response.body).to.haveOwnProperty('vacationUUID');
        addedVacationUUID = response.body.vacationUUID;
        addedVacationImageName = response.body.vacationImageName;
    });

    it("should allow user to follow a vacation", async () => {
        const response = await supertest(app.server)
            .post(`/api/vacations/follow/9b51bdc8-2d4a-4950-af3a-5c13efd474aa/${addedVacationUUID}`)
            .set({ "Authorization": `Bearer ${userToken}` })

        expect(response.status).to.equal(201);
    });

    it("should not allow user to follow a vacation he is already following", async () => {
        const response = await supertest(app.server)
            .post(`/api/vacations/follow/9b51bdc8-2d4a-4950-af3a-5c13efd474aa/${addedVacationUUID}`)
            .set({ "Authorization": `Bearer ${userToken}` })

        expect(response.status).to.equal(400);
    });

    it("should allow user to unfollow a vacation", async () => {
        const response = await supertest(app.server)
            .delete(`/api/vacations/unfollow/9b51bdc8-2d4a-4950-af3a-5c13efd474aa/${addedVacationUUID}`)
            .set({ "Authorization": `Bearer ${userToken}` })

        expect(response.status).to.equal(204);
    });

    it("should not allow user to unfollow a vacation he is not following", async () => {
        const response = await supertest(app.server)
            .delete(`/api/vacations/unfollow/9b51bdc8-2d4a-4950-af3a-5c13efd474aa/${addedVacationUUID}`)
            .set({ "Authorization": `Bearer ${userToken}` })

        expect(response.status).to.equal(404);
    });

    it("should update a vacation", async () => {
        const response = await supertest(app.server)
            .put(`/api/vacations/${addedVacationUUID}`)
            .set({ "Authorization": `Bearer ${adminToken}` })
            .field('vacationCountry', 'updated test country')
            .field('vacationCity', 'updated test city')
            .field('vacationDescription', 'test description')
            .field('vacationStartDate', '2200.02.02')
            .field('vacationEndDate', '2201.02.02')
            .field('vacationPrice', '4567')
            .field('vacationCountryISO', 'ua')
            .field('vacationImageName', `${addedVacationImageName}`)
        expect(response.status).to.equal(201);
    });

    it("should return a vacation image", async () => {
        const response = await supertest(app.server)
            .get(`/api/vacations-image/${addedVacationImageName}`);
        expect(response.status).to.equal(200);
        expect(response.headers['content-type']).to.include('image');
    });

    it("should return vacation image not found", async () => {
        const response = await supertest(app.server)
            .get(`/api/vacations-image/aa7042e0-c109-49bd-9f92-7badfd9452dd`);
        expect(response.status).to.equal(404);
    });

    it("should delete a vacation", async () => {
        const response = await supertest(app.server)
            .delete(`/api/vacations/${addedVacationUUID}`)
            .set({ "Authorization": `Bearer ${adminToken}` });

        expect(response.status).to.equal(204);
    });

    it("should not allow a regular user to add a vacation", async () => {
        const response = await supertest(app.server)
            .post('/api/vacations')
            .set({ "Authorization": `Bearer ${userToken}` })
            .field('vacationCountry', 'test country')
            .field('vacationCity', 'test city')
            .field('vacationDescription', 'test description')
            .field('vacationStartDate', '2100.01.01')
            .field('vacationEndDate', '2101.01.01')
            .field('vacationPrice', '1234')
            .field('vacationCountryISO', 'il')
            .attach('vacationUploadedImage', path.resolve(__dirname, '../../Frontend/src/Assets/Images/UtilityImages/project-logo.png'))

        expect(response.status).to.equal(403);
    });

    it("should not allow a regular user to delete a vacation", async () => {
        const response = await supertest(app.server)
            .delete(`/api/vacations/${addedVacationUUID}`)
            .set({ "Authorization": `Bearer ${userToken}` });
        expect(response.status).to.equal(403);
    });

    it("should not allow a regular user to update a vacation", async () => {
        const response = await supertest(app.server)
            .put(`/api/vacations/${addedVacationUUID}`)
            .set({ "Authorization": `Bearer ${userToken}` })
            .field('vacationCountry', 'updated test country')
            .field('vacationCity', 'updated test city')
            .field('vacationDescription', 'test description')
            .field('vacationStartDate', '2200.02.02')
            .field('vacationEndDate', '2201.02.02')
            .field('vacationPrice', '4567')
            .field('vacationCountryISO', 'ua')
            .field('vacationImageName', `${addedVacationImageName}`)
        expect(response.status).to.equal(403);
    });

})