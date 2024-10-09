import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { APIClient } from "../../helpers/api_helper";
import * as apiUrlEnpoint from "../../helpers/url_helper";
const api = new APIClient();

//Include Both Helper File with needed methods
//import {
//    getInvoices as getInvoicesApi,
//    addNewInvoice as addNewInvoiceApi,
//    updateInvoice as updateInvoiceApi,
//    deleteInvoice as deleteInvoiceApi
//} from "../../helpers/fakebackend_helper";

export const getQuizs = createAsyncThunk("quiz/getQuizs", async (data:any) => {
    try {
        const response = api.get(apiUrlEnpoint.GET_QUIZ_LIST, data)
        return response;
    } catch (error) {
        return error;
    }
});

export const addQuizs = createAsyncThunk("quizs/addQuizs", async (quiz: any) => {
    try {
        const response = api.create(apiUrlEnpoint.ADD_QUIZ, quiz);
        toast.success("Quiz Added Successfully", { autoClose: 3000 });
        return response;
    } catch (error) {
        toast.error("Quiz Added Failed", { autoClose: 3000 });
        return error;
    }
});

export const updateQuizs = createAsyncThunk("quizs/updateQuizs", async (quiz: any) => {
    try {
        const response = api.create(apiUrlEnpoint.UPDATE_QUIZ, quiz);
        toast.success("Quiz Updated Successfully", { autoClose: 3000 });
        const data = await response;
        return data;
    } catch (error) {
        toast.error("Quiz Updated Failed", { autoClose: 3000 });
        return error;
    }
});

export const deleteQuizs = createAsyncThunk("quizs/deleteQuizs", async (quiz: any) => {
    try {
        const response = api.create(apiUrlEnpoint.DELETE_QUIZ, quiz);
        toast.success("Quiz Delete Successfully", { autoClose: 3000 });
        return { quiz, ...response };
    }
    catch (error) {
        toast.error("Quiz Delete Failed", { autoClose: 3000 });
        return error;
    }
});