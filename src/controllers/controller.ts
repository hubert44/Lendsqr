import {Request, Response, NextFunction} from "express";
import bcrypt from "bcrypt";
import {knex} from "knex";
import otpGenerator from "otp-generator";

const options = {
    client: 'mysql2',
    connection: process.env.MYSQL_CONNECTION
};

export const test = (_req: Request, res: Response, _next: NextFunction): any => {
    res.json({message: "Working now!"});
};

export const signup = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const knexx = knex(options);
    const otp = otpGenerator.generate(10, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
    const hashPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = [{email: req.body.email, password: hashPassword, balance: 0.00, pin: req.body.pin, walletID: otp}];
    knexx('users').where('email', req.body.email)
    .then((users) => {
        if(users.length > 0){
            throw new Error("Email already exists");
        }
        return knexx('users').insert(newUser);
    })
    .then(() => res.status(201).json({message: `Account created successfully, your wallet ID is ${otp}`}))
    .catch((err: any) => { return next(err); })
    .finally(() => {
        knexx.destroy();
    });
};

export const fundAccount = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const knexx = knex(options);
    let newBalance: any;
    knexx('users')
    .where('walletID', req.body.walletID)
    .then((users) => {
        if(users.length < 1){
            throw new Error("Account does not exist");
        }
        if(+req.body.amount <= 0){
            throw new Error(`Invalid amount provided`);
        }
        newBalance = users[0].balance + +req.body.amount; 
        return knexx('users').where('walletID', req.body.walletID).update({
            balance: newBalance
        });
    })
    .then(() => {
        res.status(201).json({message: `Funding successful, your balance is $${newBalance}`});
    })
    .catch((err: any) => { return next(err); })
    .finally(() => {
        knexx.destroy();
    });
};

export const withdrawFunds = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const knexx = knex(options);
    let newBalance: any;
    knexx('users')
    .where({walletID: req.body.walletID, pin: req.body.pin})
    .then((users) => {
        if(users.length < 1){
            throw new Error("Account does not exist");
        }
        if(+req.body.amount <= 0){
            throw new Error(`Invalid amount provided`);
        }
        if((users[0].balance - +req.body.amount) < 0){
            throw new Error(`Withdrawal failed due to insufficient funds, your balance is $${users[0].balance}`);
        }
        newBalance = users[0].balance - +req.body.amount; 
        return knexx('users').where('walletID', req.body.walletID).update({
            balance: newBalance
        });
    })
    .then(() => {
        res.status(201).json({message: `Withdrawal successful, your balance is $${newBalance}`});
    })
    .catch((err: any) => { return next(err); })
    .finally(() => {
        knexx.destroy();
    });
};

export const transferFunds = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const knexx = knex(options);
    let newBalance: any;
    let senderCurrentBalance: any;
    let receiverCurrentBalance: any;
    knexx('users')
    .where({walletID: req.body.senderID, pin: req.body.pin})
    .then((users) => {
        if(users.length < 1){
            throw new Error("Invalid source wallet number or pin");
        }
        senderCurrentBalance = users[0].balance;
        return knexx('users').where('walletID', req.body.receiverID);
    })
    .then((users) => {
        if(users.length < 1){
            throw new Error("Invalid receiver wallet number");
        }
        receiverCurrentBalance = users[0].balance;
        if(+req.body.amount <= 0){
            throw new Error(`Invalid amount provided`);
        }
        if((senderCurrentBalance - +req.body.amount) < 0){
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
        res.status(201).json({message: `Transfer successful, your balance is $${newBalance}`});
    })
    .catch((err: any) => { return next(err); })
    .finally(() => {
        knexx.destroy();
    });
};