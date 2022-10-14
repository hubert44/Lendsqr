"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const controller_1 = require("../controllers/controller");
const router = express_1.default.Router();
router.get("/", controller_1.test);
router.post("/signup", controller_1.signup);
router.post("/fundAccount", controller_1.fundAccount);
router.post("/withdrawFunds", controller_1.withdrawFunds);
router.post("/transferFunds", controller_1.transferFunds);
exports.default = router;
