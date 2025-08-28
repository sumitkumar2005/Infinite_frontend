import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from '../services/api';

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.email) newErrors.email = "Email is required";
        else if (!emailRegex.test(formData.email)) newErrors.email = "Enter a valid email";

        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            // Send data to backend API
            const response = await authAPI.login({
                email: formData.email,
                password: formData.password,
            });

            console.log("Login successful:", response);
            alert("Login successful!");

            // Clear form
            setFormData({ email: "", password: "" });

            // Redirect based on user role or to a default dashboard
            // You can modify this based on the response from your backend
            if (response.user && response.user.role) {
                switch (response.user.role) {
                    case 'admin':
                        navigate('/admin/dashboard');
                        break;
                    case 'organiser':
                        navigate('/organizer/dashboard');
                        break;
                    case 'student':
                        navigate('/student/dashboard');
                        break;
                    default:
                        navigate('/');
                }
            } else {
                navigate('/');
            }

        } catch (error) {
            console.error("Login failed:", error);
            alert(error.message || "Login failed. Please check your credentials.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-6 border">
                <h2 className="text-center text-2xl font-bold text-blue-600">Login</h2>

                {/* Email */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <Mail className="h-4 w-4 text-blue-600" />
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full h-12 px-4 border-2 rounded-lg focus:outline-none ${
                            errors.email ? "border-red-500" : "border-gray-200 focus:border-indigo-500"
                        }`}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <Lock className="h-4 w-4 text-blue-600" />
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className={`w-full h-12 px-4 pr-12 border-2 rounded-lg focus:outline-none ${
                                errors.password ? "border-red-500" : "border-gray-200 focus:border-indigo-500"
                            }`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-600"
                        >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>

                {/* Submit */}
                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-70"
                >
                    {isLoading ? "Signing in..." : "Sign In"}
                </button>

                {/* Switch to Register */}
                <div className="text-center">
                    <p className="text-gray-600 text-sm">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                        >
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
