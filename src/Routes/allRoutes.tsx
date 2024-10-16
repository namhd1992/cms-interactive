import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard
// import DashboardAnalytics from "../pages/DashboardAnalytics";
// import DashboardCrm from "../pages/DashboardCrm";
import DashboardEcommerce from "../pages/DashboardEcommerce";

import Home from "../pages/Home";

// //AuthenticationInner pages
import BasicSignIn from '../pages/AuthenticationInner/Login/BasicSignIn';
import CoverSignIn from '../pages/AuthenticationInner/Login/CoverSignIn';
import BasicSignUp from '../pages/AuthenticationInner/Register/BasicSignUp';
import CoverSignUp from "../pages/AuthenticationInner/Register/CoverSignUp";
import BasicPasswReset from '../pages/AuthenticationInner/PasswordReset/BasicPasswReset';

// // //pages
import CoverPasswReset from '../pages/AuthenticationInner/PasswordReset/CoverPasswReset';
import BasicLockScreen from '../pages/AuthenticationInner/LockScreen/BasicLockScr';
import CoverLockScreen from '../pages/AuthenticationInner/LockScreen/CoverLockScr';
import BasicLogout from "../pages/AuthenticationInner/Logout/BasicLogout";
import CoverLogout from '../pages/AuthenticationInner/Logout/CoverLogout';
import BasicSuccessMsg from '../pages/AuthenticationInner/SuccessMessage/BasicSuccessMsg';
import CoverSuccessMsg from '../pages/AuthenticationInner/SuccessMessage/CoverSuccessMsg';
import BasicTwosVerify from '../pages/AuthenticationInner/TwoStepVerification/BasicTwosVerify';
import CoverTwosVerify from '../pages/AuthenticationInner/TwoStepVerification/CoverTwosVerify';
import Basic404 from '../pages/AuthenticationInner/Errors/Basic404';
import Cover404 from '../pages/AuthenticationInner/Errors/Cover404';
import Alt404 from '../pages/AuthenticationInner/Errors/Alt404';
import Error500 from '../pages/AuthenticationInner/Errors/Error500';

// import BasicPasswCreate from "../pages/AuthenticationInner/PasswordCreate/BasicPasswCreate";
// import CoverPasswCreate from "../pages/AuthenticationInner/PasswordCreate/CoverPasswCreate";
// import Offlinepage from "../pages/AuthenticationInner/Errors/Offlinepage";

// //APi Key
// import APIKey from "../pages/APIKey/index";

// //login
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";

// User Profile
import UserProfile from "../pages/Authentication/user-profile";

// Quizs
import QuizzeList from "../pages/Quizs/Quizzes/QuizzeList";
import QuizzeCreate from "../pages/Quizs/Quizzes/QuizzeCreate";
import QuizzeDetails from "../pages/Quizs/Quizzes/QuizzeDetails";

// Question

import QuestionCreate from "../pages/Pages/Question/QuestionCreate";
import QuestionDetails from "../pages/Pages/Question/QuestionDetails";
import QuestionList from "../pages/Pages/Question/QuestionList";


const authProtectedRoutes = [
    { path: "/dashboard", component: <DashboardEcommerce /> },
    { path: "/home", component: <Home /> },

    //User Profile
    { path: "/profile", component: <UserProfile /> },

    // this route should be at the end of all other routes
    // eslint-disable-next-line react/display-name
    {
        path: "/",
        exact: true,
        component: <Navigate to="/dashboard" />,
    },
    { path: "*", component: <Navigate to="/dashboard" /> },

    //Invoices
    { path: "/interactive-quizs-list", component: <QuizzeList /> },
    { path: "/interactive-quizs-details", component: <QuestionList /> },
    { path: "/interactive-quizs-create", component: <QuizzeCreate /> },

    //Question
    { path: "/interactive-question-update", component: <QuestionDetails /> },
    { path: "/interactive-question-create", component: <QuestionCreate /> },
];



const publicRoutes = [
    // Authentication Page
    { path: "/logout", component: <Logout /> },
    { path: "/login", component: <Login /> },
    { path: "/forgot-password", component: <ForgetPasswordPage /> },
    { path: "/register", component: <Register /> },

    // //AuthenticationInner pages
    { path: "/auth-signin-basic", component: <BasicSignIn /> },
    { path: "/auth-signin-cover", component: <CoverSignIn /> },
    { path: "/auth-signup-basic", component: <BasicSignUp /> },
    { path: "/auth-signup-cover", component: <CoverSignUp /> },
    { path: "/auth-pass-reset-basic", component: <BasicPasswReset /> },
    { path: "/auth-pass-reset-cover", component: <CoverPasswReset /> },
    { path: "/auth-lockscreen-basic", component: <BasicLockScreen /> },
    { path: "/auth-lockscreen-cover", component: <CoverLockScreen /> },
    { path: "/auth-logout-basic", component: <BasicLogout /> },
    { path: "/auth-logout-cover", component: <CoverLogout /> },
    { path: "/auth-success-msg-basic", component: <BasicSuccessMsg /> },
    { path: "/auth-success-msg-cover", component: <CoverSuccessMsg /> },
    { path: "/auth-twostep-basic", component: <BasicTwosVerify /> },
    { path: "/auth-twostep-cover", component: <CoverTwosVerify /> },
    { path: "/auth-404-basic", component: <Basic404 /> },
    { path: "/auth-404-cover", component: <Cover404 /> },
    { path: "/auth-404-alt", component: <Alt404 /> },
    { path: "/auth-500", component: <Error500 /> }   
];

export { authProtectedRoutes, publicRoutes };