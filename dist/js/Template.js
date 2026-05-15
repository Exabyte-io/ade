"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = require("@mat3ra/code/dist/js/entity");
const NamedEntityMixin_1 = require("@mat3ra/code/dist/js/entity/mixins/NamedEntityMixin");
const JSONSchemasInterface_1 = __importDefault(require("@mat3ra/esse/dist/js/esse/JSONSchemasInterface"));
const TemplateSchemaMixin_1 = require("./generated/TemplateSchemaMixin");
class Template extends entity_1.InMemoryEntity {
    constructor(data) {
        const templateData = {
            content: "",
            contextProviders: [],
            ...data,
        };
        super(templateData);
    }
    static get jsonSchema() {
        const schema = JSONSchemasInterface_1.default.getSchemaById("software/template");
        if (schema === undefined) {
            throw new Error('JSONSchemasInterface: missing schema id "software/template"');
        }
        return schema;
    }
}
(0, NamedEntityMixin_1.namedEntityMixin)(Template.prototype);
(0, TemplateSchemaMixin_1.templateSchemaMixin)(Template.prototype);
exports.default = Template;
