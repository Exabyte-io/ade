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
const ExecutableSchemaMixin_1 = require("./generated/ExecutableSchemaMixin");
class Executable extends entity_1.InMemoryEntity {
    constructor(data) {
        var _a, _b, _c, _d;
        super({
            ...data,
            monitors: (_a = data.monitors) !== null && _a !== void 0 ? _a : [],
            results: (_b = data.results) !== null && _b !== void 0 ? _b : [],
            postProcessors: (_c = data.postProcessors) !== null && _c !== void 0 ? _c : [],
            preProcessors: (_d = data.preProcessors) !== null && _d !== void 0 ? _d : [],
        });
    }
    static get jsonSchema() {
        const schema = JSONSchemasInterface_1.default.getSchemaById("software/executable");
        if (schema === undefined) {
            throw new Error('JSONSchemasInterface: missing schema id "software/executable"');
        }
        return schema;
    }
}
(0, NamedEntityMixin_1.namedEntityMixin)(Executable.prototype);
(0, DefaultableMixin_1.defaultableEntityMixin)(Executable);
(0, RuntimeItemsMixin_1.runtimeItemsMixin)(Executable.prototype);
(0, ExecutableSchemaMixin_1.executableSchemaMixin)(Executable.prototype);
exports.default = Executable;
