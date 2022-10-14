import supertest from "supertest";
import { expect, describe, test } from '@jest/globals'
import app from "../app";

describe("POST /lendsqr/signup", () => {
    describe("given an email, password and pin", () => {
        test("should respond with a 201 status code", async () => {
            const response = await supertest(app).post("/lendsqr/signup").send({
                email: "test7@gmail.com",
                password: "password",
                pin: 1234
            })
            expect(response.status).toBe(201)
        })
    })
})

describe("POST /lendsqr/fundAccount", () => {
    describe("given a wallet ID and amount", () => {
        test("should respond with a 201 status code", async () => {
            const response = await supertest(app).post("/lendsqr/fundAccount").send({
                walletID: "6376980301",
                amount: 1000
            })
            expect(response.status).toBe(201)
        })
    })
})

describe("POST /lendsqr/withdrawFunds", () => {
    describe("given a wallet ID, amount and pin", () => {
        test("should respond with a 201 status code", async () => {
            const response = await supertest(app).post("/lendsqr/withdrawFunds").send({
                walletID: "6376980301",
                amount: 100,
                pin: 5678
            })
            expect(response.status).toBe(201)
        })
    })
})

describe("POST /lendsqr/transferFunds", () => {
    describe("given a sender's wallet ID, receiver's wallet ID, amount and pin", () => {
        test("should respond with a 201 status code", async () => {
            const response = await supertest(app).post("/lendsqr/transferFunds").send({
                receiverID: "7353135418",
                senderID: "6376980301",
                amount: 100,
                pin: 5678
            })
            expect(response.status).toBe(201)
        })
    })
})