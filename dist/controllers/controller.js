"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferFunds = exports.withdrawFunds = exports.fundAccount = exports.signup = exports.test = void 0;
const tslib_1 = require("tslib");
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const knex_1 = require("knex");
const otp_generator_1 = tslib_1.__importDefault(require("otp-generator"));
const options = {
    client: 'mysql2',
    connection: process.env.MYSQL_CONNECTION
};
const test = (_req, res, _next) => {
    res.json({ message: "Working now!" });
};
exports.test = test;
const signup = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const knexx = (0, knex_1.knex)(options);
    const otp = otp_generator_1.default.generate(10, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
    const hashPassword = yield bcrypt_1.default.hash(req.body.password, 12);
    const newUser = [{ email: req.body.email, password: hashPassword, balance: 0.00, pin: req.body.pin, walletID: otp }];
    knexx('users').where('email', req.body.email)
        .then((users) => {
        if (users.length > 0) {
            throw new Error("Email already exists");
        }
        return knexx('users').insert(newUser);
    })
        .then(() => res.status(201).json({ message: `Account created successfully, your wallet ID is ${otp}` }))
        .catch((err) => { return next(err); })
        .finally(() => {
        knexx.destroy();
    });
});
exports.signup = signup;
const fundAccount = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const knexx = (0, knex_1.knex)(options);
    let newBalance;
    knexx('users')
        .where('walletID', req.body.walletID)
        .then((users) => {
        if (users.length < 1) {
            throw new Error("Account does not exist");
        }
        if (+req.body.amount <= 0) {
            throw new Error(`Invalid amount provided`);
        }
        newBalance = users[0].balance + +req.body.amount;
        return knexx('users').where('walletID', req.body.walletID).update({
            balance: newBalance
        });
    })
        .then(() => {
        res.status(201).json({ message: `Funding successful, your balance is $${newBalance}` });
    })
        .catch((err) => { return next(err); })
        .finally(() => {
        knexx.destroy();
    });
});
exports.fundAccount = fundAccount;
const withdrawFunds = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const knexx = (0, knex_1.knex)(options);
    let newBalance;
    knexx('users')
        .where({ walletID: req.body.walletID, pin: req.body.pin })
        .then((users) => {
        if (users.length < 1) {
            throw new Error("Account does not exist");
        }
        if (+req.body.amount <= 0) {
            throw new Error(`Invalid amount provided`);
        }
        if ((users[0].balance - +req.body.amount) < 0) {
            throw new Error(`Withdrawal failed due to insufficient funds, your balance is $${users[0].balance}`);
        }
        newBalance = users[0].balance - +req.body.amount;
        return knexx('users').where('walletID', req.body.walletID).update({
            balance: newBalance
        });
    })
        .then(() => {
        res.status(201).json({ message: `Withdrawal successful, your balance is $${newBalance}` });
    })
        .catch((err) => { return next(err); })
        .finally(() => {
        knexx.destroy();
    });
});
exports.withdrawFunds = withdrawFunds;
const transferFunds = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const knexx = (0, knex_1.knex)(options);
    let newBalance;
    let senderCurrentBalance;
    let receiverCurrentBalance;
    knexx('users')
        .where({ walletID: req.body.senderID, pin: req.body.pin })
        .then((users) => {
        if (users.length < 1) {
            throw new Error("Invalid source wallet number or pin");
        }
        senderCurrentBalance = users[0].balance;
        return knexx('users').where('walletID', req.body.receiverID);
    })
        .then((users) => {
        if (users.length < 1) {
            throw new Error("Invalid receiver wallet number");
        }
        receiverCurrentBalance = users[0].balance;
        if (+req.body.amount <= 0) {
            throw new Error(`Invalid amount provided`);
        }
        if ((senderCurrentBalance - +req.body.amount) < 0) {
            throw new Error(`Transfer failed due to insufficient funds, your balance is $${senderCurrentBalance}`);
        }
        newBalance = senderCurrentBalance - +req.body.amount;
        return knexx('users').where('walletID', req.body.senderID).update({
            balance: newBalance
        });
    })
        .then((_users) => {
        return knexx('users').where('walletID', req.body.receiverID).update({
            balance: receiverCurrentBalance + +req.body.amount
        });
    })
        .then(() => {
        res.status(201).json({ message: `Transfer successful, your balance is $${newBalance}` });
    })
        .catch((err) => { return next(err); })
        .finally(() => {
        knexx.destroy();
    });
});
exports.transferFunds = transferFunds;
