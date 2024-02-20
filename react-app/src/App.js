import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import Home from "./components/dashboard/Home";
import UserSetting from "./components/dashboard/UserSetting";
import AddUserFeedBack from "./components/dashboard/AddUserFeedBack";
import Index from "./components/Index";
import UserFeedBackWithComment from "./components/UserFeedBackWithComment";

function App() {
    const accessToken = !!localStorage.getItem('access_token');
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/post-comment/:id" element={<UserFeedBackWithComment />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                { accessToken ? (
                    <>
                        <Route path="/home" element={<Home />} />
                        <Route path="/add-feedback" element={<AddUserFeedBack />} />
                        <Route path="/user-settings" element={<UserSetting />} />
                    </>
                ) : <Route
                    path="/*"
                    element={<Navigate to="/" replace />}
                />
                }
            </Routes>
        </Router>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
export default App;
