interface Profile {
    id: number;
    email: string;
    nickname: string;
    loginType: string;
    gender: string;
    profileImage: string;
    coupleStatus: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
}

interface User {
    id: number;
    email: string;
    nickname: string;
}

interface Couple {
    id: number;
    status: string;
    firstMetDate: string;
    sender: User;
    receiver: User;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
}

export type {Profile, Couple};