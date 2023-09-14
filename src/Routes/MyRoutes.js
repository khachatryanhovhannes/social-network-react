import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Profile from "../Pages/Profile/Profile";
import AuthMiddleware from "./AuthMiddleware/AuthMiddleware";
import Settings from "../Pages/Settings/Settings";
import SearchUser from "../Pages/SearchUser/SearchUser";
import Account from "../Pages/Account/Account";


export default function MyRoutes() {
    return (
        <Routes>
            <Route index element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/profile" element={<AuthMiddleware />}>
                <Route path="" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
                <Route path="search" element={<SearchUser />} />
                <Route path="user/account/:id" element={<Account />} />
            </Route>
        </Routes>
    )
} 
