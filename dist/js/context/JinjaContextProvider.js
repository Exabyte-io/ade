"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ContextProvider_1 = __importDefault(require("./ContextProvider"));
class JinjaContextProvider extends ContextProvider_1.default {
    constructor(config) {
        super(config);
        this.isUsingJinjaVariables = Boolean(config.isUsingJinjaVariables);
    }
}
exports.default = JinjaContextProvider;
