import axios from "axios";

const BASE_URL = "https://user-management-backend-zlta.onrender.com";

export const getUsers = async () => {
    return await axios.get(`${BASE_URL}/users`);
};

export const addUser = async (user) => {
    return await axios.post(`${BASE_URL}/users`, user);
};

export const updateUser = async (id, user) => {
    return await axios.put(`${BASE_URL}/users/${id}`, user);
};

export const deleteUser = async (id) => {
    return await axios.delete(`${BASE_URL}/users/${id}`);
};
