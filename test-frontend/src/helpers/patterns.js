import { REG_EXP } from "@/constants/regExps.js";
import { PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH } from "@/constants/rules.js";

const { EMAIL, NUMBER_EXIST, SPECIAL_SYMBOL_EXIST, SPECIAL_SYMBOL_RIGH_PALCE } =
  REG_EXP;
export const passwordPattern = (value = "") => {
  const stringValue = String(value);

  const isNumber = NUMBER_EXIST.test(stringValue);
  const isCharacterNotStartEnd = SPECIAL_SYMBOL_RIGH_PALCE.test(stringValue);
  const isCharacter = SPECIAL_SYMBOL_EXIST.test(stringValue);
  const isCapitals = stringValue.toLowerCase() !== stringValue;
  const isMinLength = stringValue.length >= PASSWORD_MIN_LENGTH;
  const isMaxLength = stringValue.length <= PASSWORD_MAX_LENGTH;

  return {
    isNumber,
    isCharacter,
    isCapitals,
    isCharacterNotStartEnd,
    isMinLength,
    isMaxLength,
  };
};

export const emailPattern = (value = "") => {
  const isEmail = EMAIL.test(value);

  return { isEmail };
};

export const getIsSuccsessPattern = (patternObject = {}) => {
  return Object.values(patternObject).every(Boolean);
};
