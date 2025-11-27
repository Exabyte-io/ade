import JSONSchemasInterface from "@mat3ra/esse/dist/js/esse/JSONSchemasInterface";
import type { JSONSchema } from "@mat3ra/esse/dist/js/esse/utils";
import { readFileSync } from "fs";
import { resolve } from "path";

const schemasPath = resolve(process.cwd(), "node_modules/@mat3ra/esse/dist/js/schemas.json");
const schemas = JSON.parse(readFileSync(schemasPath, "utf-8")) as JSONSchema[];

// Global setup that runs once before all tests
before(() => {
    const Interface = (JSONSchemasInterface as any).default || JSONSchemasInterface;
    Interface.setSchemas(schemas);
});
