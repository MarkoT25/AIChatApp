"use server"

import { cookies } from 'next/headers';

export const fetchUsers = async () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`;
    const nextCookies = await cookies();
    const token = nextCookies.get('jwt')?.value;
    if (!token) {
        return 'No token found';
    }

    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch users: ${res.statusText}`);
        }

        const { users } = await res.json();
        return users;
    } catch (error) {
        console.error(`Failed to fetch resource from ${url}:`, error);
        return error;
    }
};

interface UpdateProfileBody {
    username?: string;
    profilePic?: string;
    description?: string;
    gender?: string;
    age?: number;
}

export const updateProfile = async (params: { username?: string, profilePic?: string, description?: string, gender?: string, age?: number }) => {
    const nextCookies = await cookies();
    const token = nextCookies.get('jwt')?.value;
    if (!token) {
        return 'No token found';
    }

    console.log('params', params);

    const body: UpdateProfileBody = {};
    if (params.username) body.username = params.username;
    if (params.profilePic) body.profilePic = params.profilePic;
    if (params.description) body.description = params.description;
    if (params.gender) body.gender = params.gender;
    if (params.age) body.age = params.age;
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/update-profile`;
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`Failed to update profile: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to update profile:', error);
        return error;
    }
};