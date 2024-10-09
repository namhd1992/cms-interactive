import { createSlice } from "@reduxjs/toolkit";
import { getQuizs, addQuizs, updateQuizs, deleteQuizs } from './thunk';
export const initialState: any = {
    quizData: [],
    error: {},
};

const QuizsSlice = createSlice({
    name: 'QuizsSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getQuizs.fulfilled, (state: any, action: any) => {
            state.quizData = action.payload.data;
            state.isQuizCreated = false;
            state.isQuizSuccess = true;
        });
        builder.addCase(getQuizs.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
            state.isQuizCreated = false;
            state.isQuizSuccess = false;
        });
        builder.addCase(addQuizs.fulfilled, (state: any, action: any) => {
            state.quizData.unshift(action.payload);
            state.isQuizCreated = true;
        });
        builder.addCase(addQuizs.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });
        builder.addCase(updateQuizs.fulfilled, (state: any, action: any) => {
            state.quizData = state.quizData.map((quiz: any) =>
                quiz._id.toString() === action.payload.data._id.toString()
                    ? { ...quiz, ...action.payload.data }
                    : quiz
            );
        });
        builder.addCase(updateQuizs.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });
        builder.addCase(deleteQuizs.fulfilled, (state: any, action: any) => {
            state.quizData = state.quizData.filter(
                (quiz: any) => quiz._id.toString() !== action.payload.quiz.toString()
            );
        });
        builder.addCase(deleteQuizs.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });
    }
});

export default QuizsSlice.reducer;