import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Profile from 'pages/home'
import Login from 'pages/login'
import SignUp from 'pages/cadastro'
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
                            <Profile />
                        </ProtectedRoutes>
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
