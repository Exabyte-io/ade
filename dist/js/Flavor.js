"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = require("@mat3ra/code/dist/js/entity");
const DefaultableMixin_1 = require("@mat3ra/code/dist/js/entity/mixins/DefaultableMixin");
const NamedEntityMixin_1 = require("@mat3ra/code/dist/js/entity/mixins/NamedEntityMixin");
const RuntimeItemsMixin_1 = require("@mat3ra/code/dist/js/entity/mixins/RuntimeItemsMixin");
const JSONSchemasInterface_1 = __importDefault(require("@mat3ra/esse/dist/js/esse/JSONSchemasInterface"));
const FlavorSchemaMixin_1 = require("./generated/FlavorSchemaMixin");
class Flavor extends entity_1.InMemoryEntity {
    constructor(data) {
        super({
            monitors: [],
            results: [],
            postProcessors: [],
            preProcessors: [],
            ...data,
        });
    }
    static get jsonSchema() {
        const schema = JSONSchemasInterface_1.default.getSchemaById("software/flavor");
        if (schema === undefined) {
            throw new Error('JSONSchemasInterface: missing schema id "software/flavor"');
        }
        return schema;
    }
}
(0, NamedEntityMixin_1.namedEntityMixin)(Flavor.prototype);
(0, DefaultableMixin_1.defaultableEntityMixin)(Flavor);
(0, RuntimeItemsMixin_1.runtimeItemsMixin)(Flavor.prototype);
(0, FlavorSchemaMixin_1.flavorSchemaMixin)(Flavor.prototype);
exports.default = Flavor;
