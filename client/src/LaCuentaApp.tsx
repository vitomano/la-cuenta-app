import { AuthProvider } from "./context/AuthContext"
import { Toaster } from 'react-hot-toast';
import { AppRouter } from './routes/AppRouter';


export const LaCuentaApp = () => {
    return (
        <AuthProvider>
            <Toaster position="top-center" reverseOrder={false} />
            <AppRouter />
        </AuthProvider>
    )
}