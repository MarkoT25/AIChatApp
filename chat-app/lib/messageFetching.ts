"use server"

import { cookies } from "next/headers";



export const fetchMessages = async (userToChatId: string) => {
    const nextCookies = await cookies();
    const token = nextCookies.get('jwt')?.value;
    if (!token) {
        return 'No token found';
    }

    console.log('id: ', userToChatId);
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/messages/${userToChatId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error while fetching messages');
        }

        const data = await response.json();
        return data.messages;
    } catch (error) {
        console.error('Error while fetching messages:', error);
        throw error;
    }
};

// Function to send a message
export const sendMessage = async (recieverId: string, text: string | null, image?: string) => {
    const nextCookies = await cookies();
    const token = nextCookies.get('jwt')?.value;
    if (!token) {
        return 'No token found';
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/messages/send/${recieverId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text, image })
        });

        if (!response.ok) {
            console.error('Error while sending message:', response);
            throw new Error('Error while sending message');
        }

        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error('Error while sending message:', error);
        throw error;
    }
};


// export const fetchUsersWithLastMessages = async (userId: string) => {
//     const nextCookies = await cookies();
//     const token = nextCookies.get('jwt')?.value;
//     if (!token) {
//         return 'No token found';
//     }

//     try {
//         const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/messages/last/${userId}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             }
//         });

//         if (!response.ok) {
//             console.error('Error while fetching last messages:', response);
//             throw new Error('Error while fetching last messages');
//         }

//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error while fetching last messages:', error);
//         throw error;
//     }
// };

export const fetchUsersWithLastMessages = async () => {
    const nextCookies = await cookies();
    const token = nextCookies.get('jwt')?.value;
    if (!token) {
        return 'No token found';
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/messages/last`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            console.error('Error while fetching last messages:', response);
            throw new Error('Error while fetching last messages');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error while fetching last messages:', error);
        throw error;
    }
};