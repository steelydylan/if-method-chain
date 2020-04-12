type Check = (data?: any) => boolean;
type ConfigItem = Function | [Function, boolean | Check];
type Config = ConfigItem[];

export const ifMethodChain = <T extends unknown, U extends unknown>(target: T, config: Config): U => {
  let returnItem = target as U;
  for (let i = 0; i < config.length; i++) {
    if (Array.isArray(config[i])) {
      if (config[i][1]) {
        if (typeof config[i][1] !== "function") {
          returnItem = config[i][0](returnItem);
        } else if (config[i][1](returnItem)) {
          returnItem = config[i][0](returnItem);
        }
      }
    } else if (typeof config[i] === "function") {
      const func = config[i] as Function;
      returnItem = func(returnItem);
    }
  }
  return returnItem;
}