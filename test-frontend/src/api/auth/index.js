import { postRequest } from "../apiConfig.js";

const DEFAULT_AUTH_URL = '/api/auth'

const LOGIN_URL = DEFAULT_AUTH_URL + "/login";
const UPDATE_URL = DEFAULT_AUTH_URL + "/update";
const REGISTER_URL = DEFAULT_AUTH_URL + "/register";

export const loginRequest = (requestData) => {
  return postRequest({
    url: LOGIN_URL,
    ...requestData,
  });
};

export const updateRequest = (requestData) => {
  return postRequest({
    url: UPDATE_URL,
    ...requestData,
  });
};

export const registerRequest = (requestData) => {
  return postRequest({
    url: REGISTER_URL,
    ...requestData,
  });
};
