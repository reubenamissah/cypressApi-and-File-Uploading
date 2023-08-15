//// <reference types="Cypress" />

describe('CRUD API AUTOMATION TEST', () => {
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let number = parseInt(Math.random() * 10000000, 10);
    let phone_number = '09034' + number;
    let userEmail = phone_number + '@yopmail.com';
    let firstName = 'Christy';
    let lastName = 'Fagbohungbe';
    let clientId = "PPYaXQZc7Jz9O5We";
    var Otp;

    it.only('Users should be able to sign up ', () => {
        //1. create user (POST)
        cy.api({
            method: 'POST',
            url: '/user/signUp',
            body: {
                "email": userEmail,
                firstName: firstName,
                lastName: lastName,
                userType: "customer",
                password: "Bamikole1@",
                confirmPassword: "Bamikole1@",
                clientId: clientId

            }
        }).then((res) => {
            expect(res.status).to.eq(201);
            cy.log(JSON.stringify(res))
            Otp = res.body.data.otp
            cy.log("The otp is: " + Otp)
        })
    })
    it.only('Users should be able to verify OTP ', () => {
        cy.api({
            method: 'POST',
            url: '/user/verifyOTP',
            body: {
                email: userEmail,
                otp: Otp
            }
        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).has.property('message', 'OTP verified successfully')
        })
    })
    it.only('Users should be able to Login ', () => {

        cy.api({
            method: 'POST',
            url: '/user/login',
            body: {
                email: userEmail,
                password: "Bamikole1@",
                clientId: clientId,
                grantType: "password"
            }
        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).has.property('message', 'Login successful')
        })
    })
    it.only('Users should be able to get providers ', () => {

        cy.api({
            method: 'GET',
            url: '/provider/getProviders',
        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).has.property('message', 'Providers found')
        })
    })
})
