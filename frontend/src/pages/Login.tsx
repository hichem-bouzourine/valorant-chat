import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { login } from "../services/AuthService";
import { useAuth } from "../context/AuthProvider";

const Login = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [email, setEmail] = useState('hichem.bouzourine@etu.sorbonne-universite.fr');
    const [password, setPassword] = useState('projet_pc3r');

    useEffect(() => {
        // Check if user is logged in after successful login
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleSubmit = async () => {
        // regex for email validation
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email');
            return;
        }
        
        const data = await login(email, password);
        if (data?.tokens) {
            window.location.href = '/';
            // navigate('/');
        }else {
            console.log('error');
        }
    }
    
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-800">
            <div className="w-1/5">
                <img src={"/valorant.png"} alt="" />
            </div>
            <div className="flex flex-col items-center justify-center w-2/5 h-2/5 shadow-slate-400">
                <h1 className="text-3xl font-bold text-red-500">Login</h1>
                <form className="flex flex-col items-center justify-center">
                    <input
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-100"
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div 
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 hover:cursor-pointer"
                        onClick={handleSubmit}
                        >
                        Login
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;