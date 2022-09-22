export const HOST = "http://localhost:8080";
export const API_ENDPOINT = HOST + "/api/v1";

// AuthApi
export const API_AUTH_LOGIN = `${API_ENDPOINT}/auth/login`;
export const API_AUTH_REGISTRATION_CHECK = `${API_ENDPOINT}/auth/registration/check`;
export const API_AUTH_REGISTRATION_CODE = `${API_ENDPOINT}/auth/registration/code`;
export const API_AUTH_REGISTRATION_ACTIVATE = `${API_ENDPOINT}/auth/registration/activate`;
export const API_AUTH_REGISTRATION_CONFIRM = `${API_ENDPOINT}/auth/registration/confirm`;
export const API_AUTH_FORGOT_EMAIL = `${API_ENDPOINT}/auth/forgot/email`;
export const API_AUTH_FORGOT = `${API_ENDPOINT}/auth/forgot`;
export const API_AUTH_RESET = `${API_ENDPOINT}/auth/reset`;
export const API_AUTH_RESET_CURRENT = `${API_ENDPOINT}/auth/reset/current`;
export const API_AUTH_USER = `${API_ENDPOINT}/auth/user`;
