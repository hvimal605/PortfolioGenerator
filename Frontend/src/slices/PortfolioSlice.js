import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 0, 
  portfolio: null,
  editPortfolio: false,
  templateId: null,
  paymentLoading: false,
  aiData: null,
  resumeFile: null,
  aiLoading: false,
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setPortfolio: (state, action) => {
      state.portfolio = action.payload;
    },
    setEditPortfolio: (state, action) => {
      state.editPortfolio = action.payload;
    },
    setTemplateId: (state, action) => {
      state.templateId = action.payload;
    },
    setPaymentLoading: (state, action) => {
      state.paymentLoading = action.payload
    },
    setAiData: (state, action) => {
      state.aiData = action.payload;
    },
    setResumeFile: (state, action) => {
      state.resumeFile = action.payload;
    },
    setAiLoading: (state, action) => {
      state.aiLoading = action.payload;
    },
    resetPortfolioState: (state) => {
      state.step = 0; 
      state.portfolio = null;
      state.editPortfolio = false;
      state.templateId = null; 
      state.aiData = null;
      state.resumeFile = null;
      state.aiLoading = false;
    },
  },
});

export const {
  setStep,
  setPortfolio,
  setEditPortfolio,
  resetPortfolioState,
  setTemplateId,
  setPaymentLoading,
  setAiData,
  setResumeFile,
  setAiLoading,
} = portfolioSlice.actions;

export default portfolioSlice.reducer;
