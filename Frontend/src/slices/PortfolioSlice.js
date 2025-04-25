import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 0, 
  portfolio: null,
  editPortfolio: false,
  templateId: null,
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
    resetPortfolioState: (state) => {
      state.step = 0; 
      state.portfolio = null;
      state.editPortfolio = false;
      state.templateId = null; 
    },
  },
});

export const {
  setStep,
  setPortfolio,
  setEditPortfolio,
  resetPortfolioState,
  setTemplateId,
} = portfolioSlice.actions;

export default portfolioSlice.reducer;
