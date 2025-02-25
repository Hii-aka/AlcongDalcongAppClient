import React, { ReactNode } from 'react';
import {StyleSheet, View} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import useAuth from '@/hooks/queries/useAuth';
interface AuthRouteProps {
    children: ReactNode;
}

function AuthRoute({children}: AuthRouteProps) {
    const {isAuthenticated} = useAuth();
    useFocusEffect(()=>{
        !isAuthenticated && router.replace('/');
    })  
    return (
        <>
            {children}
        </>
    )
}

const styles = StyleSheet.create({});

export default AuthRoute;