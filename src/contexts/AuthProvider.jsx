import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import axios from 'axios';


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [roleLoading, setRoleLoading] = useState(true)
    const [role, setRole] = useState('')
    const [userStatus, setUserStatus] = useState('')

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const singInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    const updateInfo = (updateUser) => {
        return updateProfile(auth.currentUser, updateUser)
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false)

        });

        return () => {
            unsubscribe();
        }
    }, [])

    useEffect(() => {
        if (!user) return;
        axios.get(`https://blood-donation-server-lilac.vercel.app/users/role/${user.email}`)
            .then(res => {
                setRole(res.data.role)
                setUserStatus(res.data.status)
                setRoleLoading(false)
            })
    }, [user])

    const authInfo = {
        createUser,
        singInUser,
        logOut,
        updateInfo,
        user,
        setUser,
        loading,
        roleLoading,
        setLoading,
        role,
        userStatus
    }
    return (
        <div>
            <AuthContext value={authInfo}>
                {children}
            </AuthContext>
        </div>
    );
};

export default AuthProvider;