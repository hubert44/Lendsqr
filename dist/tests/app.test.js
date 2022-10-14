"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const supertest_1 = tslib_1.__importDefault(require("supertest"));
const globals_1 = require("@jest/globals");
const app_1 = tslib_1.__importDefault(require("../app"));
(0, globals_1.describe)("POST /lendsqr/signup", () => {
    (0, globals_1.describe)("given an email, password and pin", () => {
        (0, globals_1.test)("should respond with a 201 status code", () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).post("/lendsqr/signup").send({
                email: "test7@gmail.com",
                password: "password",
                pin: 1234
            });
            (0, globals_1.expect)(response.status).toBe(201);
        }));
    });
});
(0, globals_1.describe)("POST /lendsqr/fundAccount", () => {
    (0, globals_1.describe)("given a wallet ID and amount", () => {
        (0, globals_1.test)("should respond with a 201 status code", () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).post("/lendsqr/fundAccount").send({
                walletID: "6376980301",
                amount: 1000
            });
            (0, globals_1.expect)(response.status).toBe(201);
        }));
    });
});
(0, globals_1.describe)("POST /lendsqr/withdrawFunds", () => {
    (0, globals_1.describe)("given a wallet ID, amount and pin", () => {
        (0, globals_1.test)("should respond with a 201 status code", () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).post("/lendsqr/withdrawFunds").send({
                walletID: "6376980301",
                amount: 100,
                pin: 5678
            });
            (0, globals_1.expect)(response.status).toBe(201);
        }));
    });
});
(0, globals_1.describe)("POST /lendsqr/transferFunds", () => {
    (0, globals_1.describe)("given a sender's wallet ID, receiver's wallet ID, amount and pin", () => {
        (0, globals_1.test)("should respond with a 201 status code", () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).post("/lendsqr/transferFunds").send({
                receiverID: "7353135418",
                senderID: "6376980301",
                amount: 100,
                pin: 5678
            });
            (0, globals_1.expect)(response.status).toBe(201);
        }));
    });
});
