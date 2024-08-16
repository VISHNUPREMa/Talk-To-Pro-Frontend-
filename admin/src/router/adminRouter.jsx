import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from "../pages/admin/adminLogin";
import AdminDashboard from "../pages/admin/dashboard";
import ProtectedRoute from "../pages/middleware/adminProtector";
import ProRequestDetails from "../pages/admin/proRequestDetails";


function AdminRouter(){
    return(
        <BrowserRouter>
        <Routes>
        <Route path="/admin" element={<LoginPage/>} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard/></ProtectedRoute>} />
        <Route path="/admin/prorequestdetails" element={<ProtectedRoute><ProRequestDetails/></ProtectedRoute>} />
        

        </Routes>
        </BrowserRouter>

    )
}

export default AdminRouter