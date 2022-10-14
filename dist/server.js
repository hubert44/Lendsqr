"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const app_1 = tslib_1.__importDefault(require("./app"));
app_1.default.listen(process.env.PORT || 4000, () => {
    console.log("connected");
});
