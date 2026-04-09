/* Central Routing */

import { BrowserRouter, Routes, Route } from "react-router-dom";

// import HomePage from '../features/home/pages/HomePage.jsx'
// import AboutUs from '../features/home/pages/AboutUs.jsx'
import AdminLoginPage from '@/features/admin/pages/AdminLoginPage.jsx'
import AdminAppointmentPage from "@/features/admin/pages/AdminAppointmentPage.jsx";
import AdminOverviewPage from "@/features/admin/pages/AdminOverviewPage.jsx";
import AdminStaffPage from "../features/admin/pages/AdminStaffPage.jsx";
import AdminBranchesPage from "../features/admin/pages/AdminBranchesPage.jsx";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="/" element={<HomePage />}></Route> */}
                {/* <Route path="/aboutus" element={<AboutUs />}></Route> */}
                <Route path="/admin" element={<AdminLoginPage />}></Route>
                <Route path="/admin/overview" element={<AdminOverviewPage />}></Route>
                <Route path="/admin/appointments" element={<AdminAppointmentPage />}></Route>
                <Route path="/admin/staffs" element={<AdminStaffPage />}></Route>
                <Route path="/admin/branches" element={<AdminBranchesPage />}></Route>
            </Routes>
        </BrowserRouter>
    )
}