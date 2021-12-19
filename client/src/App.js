import React from "react";
import Navbar from "./components/Navbar";
import ChatApp from "./components/chat";
import { Route, Routes, } from "react-router-dom";
import { UseGlobalContext } from "./components/Provider/Context";
import Loading from "./components/SingleComponent/Loading";
import PrivateRoute from './components/privateRoute/PrivateRoute'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import ResetPassword from './components/Auth/ResetPassword'
import ForgetPassword from './components/Auth/ForgetPassword'
import PublicRoute from './components/privateRoute/AuthPublicRoute'

const App = () => {

  // let { pathname } = useLocation();

  const { loading } = UseGlobalContext();

  if (loading) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <Navbar />
      {/* {pathname !== "/user/login" && pathname !== "/user/signup" && pathname !== "/admin/login" && pathname !== "/user/forget-password" && pathname !== "/user/reset-password/" && <Navbar />} */}

      <Routes>
        <Route path="/" element={
          <PrivateRoute>
            <ChatApp />
          </PrivateRoute>
        } />


        <Route path='/user/login' element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path='/user/signup' element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
        <Route path='/user/reset-password/:resetToken' element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        } />
        <Route path='/user/forget-password' element={
          <PublicRoute>
            <ForgetPassword />
          </PublicRoute>
        } />


      </Routes>
    </React.Fragment>
  );
};



export default App;
