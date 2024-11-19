
import React, { useState, useEffect } from "react";
import { getUsers, deleteUser } from "../api";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserForm from "./UserForm";
import "../styles/UserList.css";
import { FaEdit, FaTrash } from 'react-icons/fa';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await getUsers();
            setUsers(response.data);
        } catch (error) {
            toast.error("Failed to fetch users.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            fetchUsers();
            toast.success("User deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete user.");
        }
    };

    // Pagination Logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(users.length / usersPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="user-list-container">
            <UserForm 
                user={editingUser} 
                onSubmit={() => {
                    fetchUsers();
                    setEditingUser(null);
                }}
                onCancel={() => setEditingUser(null)}
            />
            
            <table className="user-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((user, index) => (
                        <tr key={user.id} style={{'--i': index}}>
                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.department}</td>
                
                            <td>
                                <button 
                                    className="edit-btn" 
                                    onClick={() => setEditingUser(user)}
                                >
                                    <FaEdit className="icon-edit" />
                                </button>
                                <button 
                                    className="delete-btn" 
                                    onClick={() => handleDelete(user.id)}
                                >
                                    <FaTrash className="icon-delete" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button 
                        key={i} 
                        onClick={() => paginate(i + 1)}
                        className={currentPage === i + 1 ? 'active' : ''}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default UserList;

