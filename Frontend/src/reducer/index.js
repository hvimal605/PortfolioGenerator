import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../slices/authSlice'
import profileReducer from "../slices/profileSlice";
import portfolioReducer from "../slices/PortfolioSlice";
const rootReducer = combineReducers({
    auth: authReducer,
    profile:profileReducer,
    portfolio:portfolioReducer,
   


})

export default rootReducer