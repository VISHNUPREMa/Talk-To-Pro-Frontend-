import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from "../pages/admin/adminLogin";
import AdminDashboard from "../pages/admin/dashboard";


function AdminRouter(){
    return(
        <BrowserRouter>
        <Routes>
        <Route path="/admin" element={<LoginPage/>} />
        <Route path="/admin/dashboard" element={<AdminDashboard/>} />
        

        </Routes>
        </BrowserRouter>

    )
}

export default AdminRouter