import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState({ username: 'Demo', walletBalance: 0, email: "", userId:"" });

    const fetchNameWallet = async () => {
        console.log("ok")
        const userData = localStorage.getItem('user');
        console.log(userData, "user")
        if (!userData) {
            console.error('User data not found in localStorage');
            return;
        }
        const objectId = JSON.parse(userData);
        const id = objectId.id; // Extract the user ID
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/name/${id}`);
            setProfile({
                username: res.data.username,
                walletBalance: res.data.walletBalance,
                email: res.data.email,
                userId : id
            });
        } catch (err) {
            console.error('Error fetching profile:', err);
        }
    };
    // console.log(profile)
    useEffect(() => {
        fetchNameWallet();
    }, []); // Automatically fetch profile data on mount

    return (
        <ProfileContext.Provider value={{ profile, fetchNameWallet }}>
            {children}
        </ProfileContext.Provider>
    );
};

// Custom hook for using profile context
export const useProfile = () => useContext(ProfileContext);
