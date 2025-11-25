"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = require("@mat3ra/code/dist/js/entity");
const DefaultableMixin_1 = require("@mat3ra/code/dist/js/entity/mixins/DefaultableMixin");
const NamedEntityMixin_1 = require("@mat3ra/code/dist/js/entity/mixins/NamedEntityMixin");
const RuntimeItemsStringMixin_1 = require("@mat3ra/code/dist/js/entity/mixins/RuntimeItemsStringMixin");
const executableMixin_1 = require("./executableMixin");
class Executable extends entity_1.InMemoryEntity {
    constructor(data = {}) {
        super({
            monitors: [],
            results: [],
            postProcessors: [],
            preProcessors: [],
            ...data,
        });
    }
}
exports.default = Executable;
// Apply mixins
(0, RuntimeItemsStringMixin_1.runtimeItemsStringMixin)(Executable.prototype);
(0, executableMixin_1.executableMixin)(Executable.prototype);
(0, executableMixin_1.executableStaticMixin)(Executable);
(0, NamedEntityMixin_1.namedEntityMixin)(Executable.prototype);
(0, DefaultableMixin_1.defaultableEntityMixin)(Executable);
