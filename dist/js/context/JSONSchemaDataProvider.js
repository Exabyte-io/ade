"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable class-methods-use-this */
const JinjaContextProvider_1 = __importDefault(require("./JinjaContextProvider"));
/**
 * @summary Provides jsonSchema only.
 */
class JSONSchemaDataProvider extends JinjaContextProvider_1.default {
    get jsonSchema() {
        throw new Error("Not implemented.");
    }
}
exports.default = JSONSchemaDataProvider;
