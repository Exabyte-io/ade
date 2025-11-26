"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = require("@mat3ra/code/dist/js/entity");
const NamedEntityMixin_1 = require("@mat3ra/code/dist/js/entity/mixins/NamedEntityMixin");
const templateMixin_1 = require("./templateMixin");
class Template extends entity_1.InMemoryEntity {
    constructor(data = {}) {
        super({
            applicationName: "",
            executableName: "",
            content: "",
            contextProviders: [],
            ...data,
        });
    }
}
exports.default = Template;
(0, NamedEntityMixin_1.namedEntityMixin)(Template.prototype);
(0, templateMixin_1.templateMixin)(Template);
