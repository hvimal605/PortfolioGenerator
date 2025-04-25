import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import StrongPassword from './Pages/Try';
import Login from './Pages/Login';
import TemplatesPage from './Pages/TemplatesPage';
import DeveloperUpload from './Pages/DevloperUpload';
import './App.css'
import DeveloperDashboard from './Pages/DeveloperDashboard';
import PortfolioCreatePage from './Pages/PortfolioCreatePage';
import UploadDetailsPage from './Pages/UploadDetailsPage';
import DeployPage from './Pages/DeployPage';
import CustomizeTemplate from './Pages/CustomizeTemplate';
import PortfolioDashboardData from './components/core/PorfolioCreation/PorttfolioDashboardData/PortfolioDashboardData';
import MessagingInsights from './components/core/UserDashboard/MessagingInsights.jsx';
import PageViewCounter from './Pages/PageViews.jsx';
import MyPortfolios from './components/core/UserDashboard/MyPortfolios.jsx';
import UserDashboard from './Pages/UserDashboard.jsx';
import AdminDashboard from './Pages/AdminDashboard.jsx';
import VerifyEmail from './Pages/VerifyEmail.jsx';
import MainNavbar from './components/common/MainNavbar.jsx';
import ForgotPassword from './Pages/ForgotPassword.jsx';
import UpdatePassword from './Pages/UpdatePassword.jsx';
import Footer from './components/common/Footer.jsx';
import PrivateRoute from './components/common/PrivateRoute.jsx';
import { ACCOUNT_TYPE } from './utils/constants.js';
import { useSelector } from 'react-redux';
import Error from './Pages/Error.jsx';
import OpenRoute from './components/common/OpenRoute.jsx';
// import GoogleLoginComponent from './Pages/GoogleLogin';


const App = () => {
  const { user } = useSelector((state) => state.profile)

  return (

    <div className='    ' >
      <div className='  bg-black h-[6vh]'>
        <MainNavbar />
      </div>

      <Routes className="">
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<OpenRoute><Login /></OpenRoute>} />
        <Route path="/signup" element={<OpenRoute><Signup /></OpenRoute>} />

        <Route path='/forgot-password' element={<OpenRoute><ForgotPassword /></OpenRoute>} />
        <Route path='/update-password/:id' element={<OpenRoute><UpdatePassword /></OpenRoute>} />
        <Route path='/VerifyEmail' element={<OpenRoute><VerifyEmail /></OpenRoute>} />
        <Route path='/templates' element={<TemplatesPage />} />


        {
          user?.accountType === ACCOUNT_TYPE.USER && (
            <>
              <Route path='/UserDas' element={<UserDashboard />} />

              <Route path='/portfolio/deploy' element={<DeployPage />} />


            </>
          )
        }
<Route path='/PortfolioCreate/UploadDetails' element={<UploadDetailsPage />} />
        {
          user?.accountType === ACCOUNT_TYPE.DEVELOPER && (
            <>
              <Route path='/developerDas' element={<DeveloperDashboard />} />
            </>
          )
        }
        {
          user?.accountType === ACCOUNT_TYPE.ADMIN && (
            <>
              <Route path='/AdminDas' element={<AdminDashboard />} />
            </>
          )
        }




        <Route path='/portfolioCreate' element={<PortfolioCreatePage />} />




        <Route path='*' element={<Error />} />


      </Routes>


    </div>
  )
}

export default App