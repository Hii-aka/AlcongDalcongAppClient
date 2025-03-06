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
    coupleId?: number;
}

interface ProfileWithCouple  {
    user: Profile;
    partner: Profile;
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

type DateCalendarRequest = {
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
};

type createDateCalendarResponse = {
    id: number;
    date: Date;
};

type DateCalendarResponse = {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    coupleId: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
};

export type {
    Profile,
    Couple,
    ProfileWithCouple,
    User,
    DateCalendarRequest,
    DateCalendarResponse,
    createDateCalendarResponse,
};