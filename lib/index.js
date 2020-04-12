"use strict";
exports.__esModule = true;
exports.ifMethodChain = function (target, config) {
    var returnItem = target;
    for (var i = 0; i < config.length; i++) {
        if (Array.isArray(config[i])) {
            if (config[i][1]) {
                if (typeof config[i][1] !== "function") {
                    returnItem = config[i][0](returnItem);
                }
                else if (config[i][1](returnItem)) {
                    returnItem = config[i][0](returnItem);
                }
            }
        }
        else if (typeof config[i] === "function") {
            var func = config[i];
            returnItem = func(returnItem);
        }
    }
    return returnItem;
};
