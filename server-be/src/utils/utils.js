const crypto = require("crypto");

const { SYSTEM_PASSWORD_SALT } = require("./constant.js");

/**
 * 根据指定的字符串生成本系统所需加密密码
 * @param str 字符串
 * @returns {string}加密密码
 */
const createPassword = function (str) {
  return crypto
    .createHash("md5")
    .update(str + SYSTEM_PASSWORD_SALT)
    .digest("base64");
};

module.exports = { createPassword };
