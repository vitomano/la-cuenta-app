import { useContext, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Login } from "../pages/auth/Login";
import { Register } from '../pages/auth/Register';
import { AuthContext } from '../context/AuthContext';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { Spinner } from '../components/ui/Spinner';
import { Dashboard } from './Dashboard';

export const AppRouter = () => {

    const { user:{logged, user, checking}, starChecking } = useContext(AuthContext)

    useEffect(() => {
        starChecking()
    }, [])

    if(checking){
        return <Spinner />
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={
                    <PublicRoute logged={logged}>
                        <Login />
                    </PublicRoute>
                } />
                <Route path="/register" element={
                    <PublicRoute logged={logged}>
                        <Register />
                    </PublicRoute>
                } />


                <Route path="/*" element={
                    <PrivateRoute logged={logged}>
                        <Dashboard />
                    </PrivateRoute>
                } />

            </Routes>
        </BrowserRouter>
    )
}
