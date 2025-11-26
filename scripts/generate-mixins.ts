#!/usr/bin/env node

/**
 * Script to generate mixin properties from JSON schema
 *
 * This script generates mixin functions for property/holder, property/meta_holder,
 * and property/proto_holder schemas automatically.
 *
 * Usage:
 *   npx ts-node scripts/generate-mixin-properties.ts
 */

import generateSchemaMixin from "@mat3ra/code/dist/js/generateSchemaMixin";
import allSchemas from "@mat3ra/esse/dist/js/schemas.json";
import type { JSONSchema7 } from "json-schema";

/**
 * Output file paths for each schema
 */
const OUTPUT_PATHS = {
    "software/executable_properties": "src/js/generated/ExecutableSchemaMixin.ts",
    "software/flavor_properties": "src/js/generated/FlavorSchemaMixin.ts",
    "software/application_properties": "src/js/generated/ApplicationSchemaMixin.ts",
    "software/template_properties": "src/js/generated/TemplateSchemaMixin.ts",
};

function main() {
    // Type assertion to handle schema compatibility - the schemas from esse may have slightly different types
    const result = generateSchemaMixin(allSchemas as JSONSchema7[], OUTPUT_PATHS);

    if (result.errorCount > 0) {
        process.exit(1);
    }
}

// Run the script if it's executed directly
main();
