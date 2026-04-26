import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../slices/authSlice'
import profileReducer from "../slices/profileSlice";
import portfolioReducer from "../slices/PortfolioSlice";
import cartReducer from "../slices/cartSlice"
const rootReducer = combineReducers({
    auth: authReducer,
    profile:profileReducer,
    portfolio:portfolioReducer,
    cart:cartReducer,
   


})

export default rootReducer
