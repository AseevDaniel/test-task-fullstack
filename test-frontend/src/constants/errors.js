import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "./rules.js";

export const PASSWORD_ERRORS = [
  {
    name: "isNumber",
    message: "Include numbers",
  },
  {
    name: "isCharacter",
    message: "Include special characters (@, #, *, etc.)",
  },
  {
    name: "isCharacterNotStartEnd",
    message: "The special character cannot be at the beginning and at the end",
  },
  {
    name: "isCapitals",
    message: "Include capitals",
  },
  {
    name: "isMinLength",
    message: `Be at least ${PASSWORD_MIN_LENGTH} characters long`,
  },
  {
    name: "isMaxLength",
    message: `Be max ${PASSWORD_MAX_LENGTH} characters long`,
  },
];

export const EMAIL_ERRORS = [
  {
    name: "isEmail",
    message: "Email should be valid",
  },
];

export const PRIVATE_ROUTE_ERROR =
  "This page available only for authorized users. Please log in.";
