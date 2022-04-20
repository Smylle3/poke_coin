import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from 'pages/home'
import Login from 'pages/login'
import SignUp from 'pages/cadastro'
import Profile from 'pages/profile'
import RequestPass from 'pages/requestPass'
import ProtectedRoutes from './protectedRoutes'

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    exact
                    path="/"
                    element={
                        <ProtectedRoutes>
                            <Home />
                        </ProtectedRoutes>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoutes>
                            <Profile />
                        </ProtectedRoutes>
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/password-recovery" element={<RequestPass />} />
                <Route path="/cadastro" element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
