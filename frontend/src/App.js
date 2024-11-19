// src/App.js
import React from 'react';
import { ToastContainer } from 'react-toastify';
import UserList from './components/UserList';
import 'react-toastify/dist/ReactToastify.css';
import './styles/App.css';

const App = () => {
    return (
        <div className="app-container">
            
            <main>
            <h1>User Management Dashboard</h1>

                <UserList />
            </main>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default App;