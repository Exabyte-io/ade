import { getOneMatchFromObject } from "@mat3ra/code/dist/js/utils/object";
import type {
    ApplicationSchemaBase,
    ExecutableSchema,
    TemplateSchema,
} from "@mat3ra/esse/dist/js/types";
import { ApplicationStandata } from "@mat3ra/standata";

import Application from "./Application";
import Executable from "./Executable";
import Flavor from "./Flavor";
import Template from "./Template";

type ApplicationVersion = {
    [build: string]: ApplicationSchemaBase;
};

type ApplicationTreeItem = {
    defaultVersion: string;
    [version: string]: ApplicationVersion | string;
};

export type CreateApplicationConfig = {
    name: string;
    version?: string | null;
    build?: string | null;
};

type ApplicationTree = Partial<Record<string, ApplicationTreeItem>>;

export default class ApplicationRegistry {
    // applications
    static applicationsTree?: ApplicationTree;

    static applicationsArray?: ApplicationSchemaBase[];

    static createApplication({ name, version = null, build = null }: CreateApplicationConfig) {
        const staticConfig = ApplicationRegistry.getApplicationConfig({ name, version, build });
        return new Application({
            ...staticConfig,
            name,
            ...(version && { version }),
            ...(build && { build }),
        });
    }

    static getUniqueAvailableApplicationNames() {
        return new ApplicationStandata().getAllApplicationNames();
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

        const applicationsTree: ApplicationTree = {};
        const applicationsArray: ApplicationSchemaBase[] = [];

        const allApplications = new ApplicationStandata().getAllApplicationNames();
        allApplications.forEach((appName) => {
            const { versions, defaultVersion, ...appData } =
                new ApplicationStandata().getAppDataForApplication(appName);

            const appTreeItem: ApplicationTreeItem = { defaultVersion };

            versions.forEach((versionInfo) => {
                const { version, build } = versionInfo;

                let buildToUse = build;
                if (!build) {
                    buildToUse = ApplicationStandata.getDefaultBuildForApplicationAndVersion(
                        appName,
                        version,
                    );
                    versionInfo.build = buildToUse;
                }

                const appVersion =
                    version in appTreeItem && typeof appTreeItem[version] === "object"
                        ? appTreeItem[version]
                        : {};

                appTreeItem[version] = appVersion;

                const applicationConfig: ApplicationSchemaBase = {
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
    static getApplicationConfig({ name, version = null, build = null }: CreateApplicationConfig) {
        const { applicationsTree } = this.getAllApplications();
        const app = applicationsTree[name];

        if (!app) {
            throw new Error(`Application ${name} not found`);
        }

        let buildToUse: string | null = build;
        if (!build) {
            try {
                buildToUse = ApplicationStandata.getDefaultBuildForApplicationAndVersion(
                    name,
                    version || app.defaultVersion,
                );
            } catch (error) {
                console.warn(
                    `Failed to get default build for ${name} version ${
                        version || app.defaultVersion
                    }: ${error}`,
                );
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

        return appVersion[buildToUse] ?? null;
    }

    static getExecutables({ name, version }: { name: string; version?: string }) {
        const tree = new ApplicationStandata().getAppTreeForApplication(name);

        return Object.keys(tree)
            .filter((key) => {
                const executable = tree[key];
                const { supportedApplicationVersions } = executable;
                return (
                    !supportedApplicationVersions ||
                    (version && supportedApplicationVersions.includes(version))
                );
            })
            .map((key) => new Executable({ ...tree[key], name: key }));
    }

    static getExecutableByName(appName: string, execName?: string) {
        const appTree = new ApplicationStandata().getAppTreeForApplication(appName);

        Object.entries(appTree).forEach(([name, exec]) => {
            exec.name = name;
        });

        const config = execName
            ? appTree[execName]
            : (getOneMatchFromObject(appTree, "isDefault", true) as ExecutableSchema);

        return new Executable(config);
    }

    // TODO: remove this method and use getApplicationExecutableByName directly
    static getExecutableByConfig(appName: string, config?: { name: string }) {
        return this.getExecutableByName(appName, config?.name);
    }

    static getExecutableFlavors(executable: Executable) {
        const flavorsTree = executable.prop("flavors", {}) as Record<string, any>;

        return Object.keys(flavorsTree).map((key) => {
            return new Flavor({
                ...flavorsTree[key],
                name: key,
            });
        });
    }

    static getFlavorByName(executable: Executable, name?: string) {
        return this.getExecutableFlavors(executable).find((flavor) =>
            name ? flavor.name === name : flavor.isDefault,
        );
    }

    static getFlavorByConfig(executable: Executable, config?: { name: string }) {
        return this.getFlavorByName(executable, config?.name);
    }

    static getInputAsTemplates(flavor: Flavor) {
        return this.getInput(flavor).map((template) => new Template(template));
    }

    static getInput(flavor: Flavor): TemplateSchema[] {
        const appName = flavor.applicationName || "";
        const execName = flavor.executableName || "";

        return flavor.input.map((input): TemplateSchema => {
            const inputName = input.templateName || input.name;

            const filtered = new ApplicationStandata().getTemplatesByName(
                appName,
                execName,
                inputName,
            );

            if (filtered.length !== 1) {
                console.log(
                    `found ${filtered.length} templates for app=${appName} exec=${execName} name=${inputName} expected 1`,
                );
            }

            return { ...filtered[0], name: input.name || "" };
        });
    }

    // static getInputAsRenderedTemplates(flavor: Flavor, context: ContextProviderConfig) {
    //     return this.getInputAsTemplates(flavor).map((template) => {
    //         return template.setContext(context).render().toJSON();
    //     });
    // }

    static getAllFlavorsForApplication(appName: string, version?: string) {
        const allExecutables = this.getExecutables({ name: appName, version });

        return allExecutables.flatMap((executable) => this.getExecutableFlavors(executable));
    }
}
