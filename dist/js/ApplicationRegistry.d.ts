import type { ApplicationSchema, TemplateSchema } from "@mat3ra/esse/dist/js/types";
import Application from "./Application";
import Executable from "./Executable";
import Flavor from "./Flavor";
import Template from "./Template";
type ApplicationVersion = {
    [build: string]: ApplicationSchema;
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
    static applicationsTree?: ApplicationTree;
    static applicationsArray?: ApplicationSchema[];
    static createApplication({ name, version, build }: CreateApplicationConfig): Application;
    static getUniqueAvailableApplicationNames(): string[];
    /**
     * @summary Return all applications as both a nested object of Applications and an array of config objects
     * @returns containing applications and applicationConfigs
     */
    static getAllApplications(): {
        applicationsTree: Partial<Record<string, ApplicationTreeItem>>;
        applicationsArray: ApplicationSchema[];
    };
    /**
     * @summary Get an application from the constructed applications
     * @param name name of the application
     * @param version version of the application (optional, defaults to defaultVersion)
     * @param build  the build to use (optional, defaults to Default)
     * @return an application
     */
    static getApplicationConfig({ name, version, build }: CreateApplicationConfig): ApplicationSchema | null;
    static getExecutables({ name, version }: {
        name: string;
        version?: string;
    }): Executable[];
    static getExecutableByName(appName: string, execName?: string): Executable;
    static getExecutableByConfig(appName: string, config?: {
        name: string;
    }): Executable;
    static getExecutableFlavors(executable: Executable): Flavor[];
    static getFlavorByName(executable: Executable, name?: string): Flavor | undefined;
    static getFlavorByConfig(executable: Executable, config?: {
        name: string;
    }): Flavor | undefined;
    static getInputAsTemplates(flavor: Flavor): Template[];
    static getInput(flavor: Flavor): TemplateSchema[];
    static getAllFlavorsForApplication(appName: string, version?: string): Flavor[];
}
export {};
