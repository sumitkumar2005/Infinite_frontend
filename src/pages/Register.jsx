import React, { useState } from "react";
import { Eye, EyeOff, User, Mail, Phone, Shield, Lock, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);

    const [showRoleDropdown, setShowRoleDropdown] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        role: "",
        password: "",

    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const roles = [
        { value: "student", label: "Student", color: "bg-blue-600" },
        { value: "organiser", label: "Organiser", color: "bg-blue-400" },
        { value: "admin", label: "Admin", color: "bg-blue-800" },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleRoleSelect = (roleValue) => {
        setFormData((prev) => ({ ...prev, role: roleValue }));
        setShowRoleDropdown(false);
        if (errors.role) setErrors((prev) => ({ ...prev, role: "" }));
    };

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;

        if (!formData.name.trim()) newErrors.name = "Name is required";

        if (!formData.email) newErrors.email = "Email is required";
        else if (!emailRegex.test(formData.email)) newErrors.email = "Enter a valid email";

        if (!formData.phone) newErrors.phone = "Phone is required";
        else if (!phoneRegex.test(formData.phone.replace(/\D/g, "")))
            newErrors.phone = "Enter a valid 10-digit phone number";

        if (!formData.role) newErrors.role = "Please select a role";

        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 6)
            newErrors.password = "Password must be at least 6 characters";



        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            console.log("Register submitted:", formData);
            alert("Account created successfully!");
            setFormData({
                name: "",
                email: "",
                phone: "",
                role: "",
                password: "",

            });
        } catch (err) {
            alert("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const selectedRole = roles.find((role) => role.value === formData.role);

    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-6 border">
                <h2 className="text-center text-2xl font-bold text-blue-600">Register</h2>

                {/* Name */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <User className="h-4 w-4 text-blue-600" />
                        Full Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter full name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full h-12 px-4 border-2 rounded-lg focus:outline-none ${
                            errors.name ? "border-red-500" : "border-gray-200 focus:border-indigo-500"
                        }`}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

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

                {/* Phone */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <Phone className="h-4 w-4 text-blue-600" />
                        Phone
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Enter 10-digit phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full h-12 px-4 border-2 rounded-lg focus:outline-none ${
                            errors.phone ? "border-red-500" : "border-gray-200 focus:border-indigo-500"
                        }`}
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>

                {/* Role */}
                <div className="space-y-2 relative">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <Shield className="h-4 w-4 text-blue-600" />
                        Select Role
                    </label>
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                            className={`w-full h-12 px-4 flex items-center justify-between border-2 rounded-lg ${
                                errors.role
                                    ? "border-red-500"
                                    : "border-gray-200 hover:border-gray-300 focus:border-indigo-500"
                            }`}
                        >
              <span className={selectedRole ? "text-gray-900" : "text-gray-500"}>
                {selectedRole ? (
                    <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 ${selectedRole.color} rounded-full`}></div>
                        {selectedRole.label}
                    </div>
                ) : (
                    "Choose your role"
                )}
              </span>
                            <ChevronDown
                                className={`h-4 w-4 text-blue-400 transition-transform ${
                                    showRoleDropdown ? "rotate-180" : ""
                                }`}
                            />
                        </button>
                        {showRoleDropdown && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 rounded-lg shadow-lg z-50">
                                {roles.map((role) => (
                                    <button
                                        key={role.value}
                                        type="button"
                                        onClick={() => handleRoleSelect(role.value)}
                                        className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 ${role.color} rounded-full`}></div>
                                            <span className="text-base">{role.label}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
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

                {/* Confirm Password */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <Lock className="h-4 w-4 text-blue-600" />
                        Confirm Password
                    </label>
                    <div className="relative">


                    </div>

                </div>

                {/* Submit */}
                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-70"
                >
                    {isLoading ? "Creating account..." : "Create Account"}
                </button>

                {/* Switch to Login */}
                <div className="text-center">
                    <p className="text-gray-600 text-sm">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>

            {/* Role dropdown overlay */}
            {showRoleDropdown && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowRoleDropdown(false)}
                ></div>
            )}
        </div>
    );
};

export default Register;
