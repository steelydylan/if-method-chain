declare type Check = (data?: any) => boolean;
declare type ConfigItem = Function | [Function, boolean | Check];
declare type Config = ConfigItem[];
export declare const ifMethodChain: <T extends unknown, U extends unknown>(target: T, config: Config) => U;
export {};
