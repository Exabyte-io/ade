"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = require("@mat3ra/code/dist/js/entity");
const DefaultableMixin_1 = require("@mat3ra/code/dist/js/entity/mixins/DefaultableMixin");
const NamedEntityMixin_1 = require("@mat3ra/code/dist/js/entity/mixins/NamedEntityMixin");
const applicationMixin_1 = require("./applicationMixin");
class Application extends entity_1.InMemoryEntity {
    constructor(data = {}) {
        super({
            ...data,
        });
    }
}
exports.default = Application;
(0, NamedEntityMixin_1.namedEntityMixin)(Application.prototype);
(0, DefaultableMixin_1.defaultableEntityMixin)(Application);
(0, applicationMixin_1.applicationMixin)(Application);
