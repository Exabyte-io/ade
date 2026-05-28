"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = require("@mat3ra/code/dist/js/entity");
const DefaultableMixin_1 = require("@mat3ra/code/dist/js/entity/mixins/DefaultableMixin");
const HashedEntityMixin_1 = require("@mat3ra/code/dist/js/entity/mixins/HashedEntityMixin");
const NamedEntityMixin_1 = require("@mat3ra/code/dist/js/entity/mixins/NamedEntityMixin");
const JSONSchemasInterface_1 = __importDefault(require("@mat3ra/esse/dist/js/esse/JSONSchemasInterface"));
const ApplicationSchemaMixin_1 = require("./generated/ApplicationSchemaMixin");
class Application extends entity_1.InMemoryEntity {
    constructor(data = {}) {
        super({
            ...data,
        });
    }
    static get jsonSchema() {
        const schema = JSONSchemasInterface_1.default.getSchemaById("software/application");
        if (schema === undefined) {
            throw new Error('JSONSchemasInterface: missing schema id "software/application"');
        }
        return schema;
    }
    getHashObject() {
        return {
            name: this.name,
            version: this.version,
            build: this.build,
        };
    }
}
(0, NamedEntityMixin_1.namedEntityMixin)(Application.prototype);
(0, DefaultableMixin_1.defaultableEntityMixin)(Application);
(0, ApplicationSchemaMixin_1.applicationSchemaMixin)(Application.prototype);
(0, HashedEntityMixin_1.hashedEntityMixin)(Application.prototype);
exports.default = Application;
