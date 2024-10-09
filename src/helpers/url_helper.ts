//REGISTER
export const ACCOUNT_REGISTER = "/auth/signup";

//LOGIN
export const ACCOUNT_LOGIN = "/auth/signin";
export const ACCOUNT_LOGIN_JWT = "/post-jwt-login";
export const ACCOUNT_FORGET_PASSWORD = "/auth/forgot-password";
export const ACCOUNT_FORGET_PASSWORD_JWT = "/jwt-forget-pwd";
export const ACCOUNT_LOGIN_SOCIAL = "/social-login";
export const ACCOUNT_TOKEN = "/api/v1/token";

//PROFILE
export const ACCOUNT_EDIT_PROFILE_JWT = "/post-jwt-profile";
export const ACCOUNT_EDIT_PROFILE = "/user";

// QUIZS
export const GET_QUIZ_LIST = "/api/v1/quizzes";
export const GET_QUIZ_DETAILS = "/api/v1/quizzes/{0}";
export const ADD_QUIZ = "/api/v1/quizzes";
export const UPDATE_QUIZ = "/api/v1/quizzes/{0}";
export const DELETE_QUIZ = "/api/v1/quizzes/{0}";

// QUESTION
export const ADD_QUESTION = "/api/v1/question";
export const UPDATE_QUESTION = "/api/v1/question/{0}";
export const DELETE_QUESTION = "/api/v1/question/{0}";

// http://103.82.31.215:8028/Interactive_GM/api/v1/question