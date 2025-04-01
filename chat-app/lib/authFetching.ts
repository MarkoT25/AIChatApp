"use server"

import { cookies } from "next/headers";

export const fetchSignUp = async (
    username: string,
    email: string,
    password: string,
) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/sign-up`;
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password,
            }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error(`Failed to fetch resource from ${url}:`, errorData);
            return errorData.message;
        }

        return res.json()
    } catch (error) {
        console.error(`Failed to fetch resource from ${url}:`, error);
    }
};


export const fetchSignIn = async (
    email: string,
    password: string,
) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`;
    const nextCookies = await cookies();
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error(`Failed to fetch resource from ${url}:`, errorData);
            return errorData.message;
        }

        const { token, message } = await res.json();

        nextCookies.set('jwt', token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        });
        return message;
    } catch (error) {
        console.error(`Failed to fetch resource from ${url}:`, error);
    }
};

export const authUser = async (
) => {
    const nextCookies = await cookies();
    const token = nextCookies.get('jwt')?.value;

    if (!token) {
        console.error('No token found');
        return;
    }


    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/check`;
    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error(`Failed to fetch resource from ${url}:`, errorData);
            return errorData.message;
        }


        return await res.json();
    } catch (error) {
        console.error(`Failed to fetch resource from ${url}:`, error);
    }
};


export const fetchLogout = async () => {
    const nextCookies = await cookies();
    const token = nextCookies.get('jwt')?.value;

    if (!token) {
        console.error('No token found');
        return { message: "Token is required" };
    }

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`;
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error(`Failed to fetch resource from ${url}:`, errorData);
            return errorData.message;
        }

        nextCookies.delete('jwt');
        return { message: "User logged out successfully" };
    } catch (error) {
        console.error(`Failed to fetch resource from ${url}:`, error);
        return;
    }
};
