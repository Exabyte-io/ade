"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const object_1 = require("@mat3ra/code/dist/js/utils/object");
const standata_1 = require("@mat3ra/standata");
const Application_1 = __importDefault(require("./Application"));
const Executable_1 = __importDefault(require("./Executable"));
const Flavor_1 = __importDefault(require("./Flavor"));
const Template_1 = __importDefault(require("./Template"));
class ApplicationRegistry {
    static createApplication({ name, version = null, build = null }) {
        const staticConfig = ApplicationRegistry.getApplicationConfig({ name, version, build });
        return new Application_1.default({
            ...staticConfig,
            name,
            ...(version && { version }),
            ...(build && { build }),
        });
    }
    static getUniqueAvailableApplicationNames() {
        return new standata_1.ApplicationStandata().getAllApplicationNames();
    }
    /**
     * @summary Return all applications as both a nested object of Applications and an array of config objects
     * @returns containing applications and applicationConfigs
     */
    static getAllApplications() {
        if (this.applicationsTree && this.applicationsArray) {
            return {
                applicationsTree: this.applicationsTree,
                applicationsArray: this.applicationsArray,
            };
        }
        const applicationsTree = {};
        const applicationsArray = [];
        const allApplications = new standata_1.ApplicationStandata().getAllApplicationNames();
        allApplications.forEach((appName) => {
            const { versions, defaultVersion, ...appData } = new standata_1.ApplicationStandata().getAppDataForApplication(appName);
            const appTreeItem = { defaultVersion };
            versions.forEach((versionInfo) => {
                const { version, build } = versionInfo;
                let buildToUse = build;
                if (!build) {
                    buildToUse = standata_1.ApplicationStandata.getDefaultBuildForApplicationAndVersion(appName, version);
                    versionInfo.build = buildToUse;
                }
                const appVersion = version in appTreeItem && typeof appTreeItem[version] === "object"
                    ? appTreeItem[version]
                    : {};
                appTreeItem[version] = appVersion;
                const applicationConfig = {
                    ...appData,
                    // @ts-ignore
                    build: buildToUse,
                    ...versionInfo,
                };
                if (buildToUse) {
                    appVersion[buildToUse] = applicationConfig;
                }
                applicationsArray.push(applicationConfig);
            });
            applicationsTree[appName] = appTreeItem;
        });
        this.applicationsTree = applicationsTree;
        this.applicationsArray = applicationsArray;
        return {
            applicationsTree,
            applicationsArray: this.applicationsArray,
        };
    }
    /**
     * @summary Get an application from the constructed applications
     * @param name name of the application
     * @param version version of the application (optional, defaults to defaultVersion)
     * @param build  the build to use (optional, defaults to Default)
     * @return an application
     */
    static getApplicationConfig({ name, version = null, build = null }) {
        var _a;
        const { applicationsTree } = this.getAllApplications();
        const app = applicationsTree[name];
        if (!app) {
            throw new Error(`Application ${name} not found`);
        }
        let buildToUse = build;
        if (!build) {
            try {
                buildToUse = standata_1.ApplicationStandata.getDefaultBuildForApplicationAndVersion(name, version || app.defaultVersion);
            }
            catch (error) {
                console.warn(`Failed to get default build for ${name} version ${version || app.defaultVersion}: ${error}`);
                return null;
            }
        }
        const version_ = version || app.defaultVersion;
        const appVersion = app[version_];
        if (!appVersion || typeof appVersion === "string") {
            console.warn(`Version ${version_} not available for ${name} !`);
            return null;
        }
        if (!buildToUse) {
            console.warn(`No build specified for ${name} version ${version_}`);
            return null;
        }
        return (_a = appVersion[buildToUse]) !== null && _a !== void 0 ? _a : null;
    }
    static getExecutables({ name, version }) {
        const tree = new standata_1.ApplicationStandata().getAppTreeForApplication(name);
        return Object.keys(tree)
            .filter((key) => {
            const executable = tree[key];
            const { supportedApplicationVersions } = executable;
            return (!supportedApplicationVersions ||
                (version && supportedApplicationVersions.includes(version)));
        })
            .map((key) => new Executable_1.default({ ...tree[key], name: key }));
    }
    static getExecutableByName(appName, execName) {
        const appTree = new standata_1.ApplicationStandata().getAppTreeForApplication(appName);
        Object.entries(appTree).forEach(([name, exec]) => {
            exec.name = name;
        });
        const config = execName
            ? appTree[execName]
            : (0, object_1.getOneMatchFromObject)(appTree, "isDefault", true);
        return new Executable_1.default(config);
    }
    // TODO: remove this method and use getApplicationExecutableByName directly
    static getExecutableByConfig(appName, config) {
        return this.getExecutableByName(appName, config === null || config === void 0 ? void 0 : config.name);
    }
    static getExecutableFlavors(executable) {
        const flavorsTree = executable.prop("flavors", {});
        return Object.keys(flavorsTree).map((key) => {
            return new Flavor_1.default({
                ...flavorsTree[key],
                name: key,
            });
        });
    }
    static getFlavorByName(executable, name) {
        return this.getExecutableFlavors(executable).find((flavor) => name ? flavor.name === name : flavor.isDefault);
    }
    static getFlavorByConfig(executable, config) {
        return this.getFlavorByName(executable, config === null || config === void 0 ? void 0 : config.name);
    }
    static getInputAsTemplates(flavor) {
        return this.getInput(flavor).map((template) => new Template_1.default(template));
    }
    static getInput(flavor) {
        const appName = flavor.applicationName || "";
        const execName = flavor.executableName || "";
        return flavor.input.map((input) => {
            const inputName = input.templateName || input.name;
            const filtered = new standata_1.ApplicationStandata().getTemplatesByName(appName, execName, inputName);
            if (filtered.length !== 1) {
                console.log(`found ${filtered.length} templates for app=${appName} exec=${execName} name=${inputName} expected 1`);
            }
            return { ...filtered[0], name: input.name || "" };
        });
    }
    // static getInputAsRenderedTemplates(flavor: Flavor, context: ContextProviderConfig) {
    //     return this.getInputAsTemplates(flavor).map((template) => {
    //         return template.setContext(context).render().toJSON();
    //     });
    // }
    static getAllFlavorsForApplication(appName, version) {
        const allExecutables = this.getExecutables({ name: appName, version });
        return allExecutables.flatMap((executable) => this.getExecutableFlavors(executable));
    }
}
exports.default = ApplicationRegistry;
