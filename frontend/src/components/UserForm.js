
import React, { useState, useEffect } from "react";
import { addUser, updateUser } from "../api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/UserForm.css";

const UserForm = ({ user, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        department: "",
    });

    useEffect(() => {
        if (user) {
            setFormData(user);
        } else {
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                department: "",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (user) {
                await updateUser(user.id, formData);
                toast.success("User updated successfully!");
            } else {
                await addUser(formData);
                toast.success("User added successfully!");
            }

            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                department: "",
            });

            onSubmit();
        } catch (error) {
            if (error.response?.status === 400 && error.response?.data?.message === "User with this email already exists") {
                toast.error("User with this email already exists.");
            } else {
                toast.error("An error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="form-container">
            <ToastContainer 
                position="top-right" 
                autoClose={3000} 
                hideProgressBar={false} 
                newestOnTop={false} 
                closeOnClick 
                rtl={false} 
                pauseOnFocusLoss 
                draggable 
                pauseOnHover 
            />
            <form className="user-form" onSubmit={handleSubmit}>
                
                <div className="form-grid">
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        required
                    />
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        placeholder="Department"
                        required
                    />
                </div>
       
            <div className="form-actions">
                <button type="submit" className="submit-btn">
                    {user ? "Update User" : "Add User"}
                </button>
                {user && (
                    <button 
                        type="button" 
                        className="cancel-btn" 
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                )}
            </div>
            </form>
        </div>
    );
};


export default UserForm;

