"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("./Util");
(0, Util_1.define)(Date, {
    nowSeconds: function () {
        return Math.floor(Date.now() / 1000);
    },
});
//# sourceMappingURL=Date.js.map