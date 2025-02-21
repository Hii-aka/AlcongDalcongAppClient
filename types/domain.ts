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

interface Couple {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
}

export type {Profile, Couple};