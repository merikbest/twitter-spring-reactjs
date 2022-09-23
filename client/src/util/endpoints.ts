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

// ChatApi
export const API_CHAT_USERS = `${API_ENDPOINT}/chat/users`;
export const API_CHAT_CREATE = `${API_ENDPOINT}/chat/create`;
export const API_CHAT_MESSAGES = (chatId: number) => `${API_ENDPOINT}/chat/${chatId}/messages`;
export const API_CHAT_READ_MESSAGES = (chatId: number) => `${API_ENDPOINT}/chat/${chatId}/read/messages`;
export const API_CHAT_ADD_MESSAGE = `${API_ENDPOINT}/chat/add/message`;
export const API_CHAT_ADD_MESSAGE_TWEET = `${API_ENDPOINT}/chat/add/message/tweet`;
export const API_CHAT_PARTICIPANT = `${API_ENDPOINT}/chat/participant`;
export const API_CHAT_LEAVE = `${API_ENDPOINT}/chat/leave`;
export const API_CHAT_SEARCH = `${API_ENDPOINT}/chat/search`;
