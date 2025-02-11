const authNavigations = {
    AUTH_HOME: 'AuthHome',
    SIGNUP: 'Signup',
} as const; 

const mainNavigations = {
    HOME: 'Home',
} as const;

const diaryNavigations = {
    DIARY_HOME: 'DiaryHome',
    DIARY_POST: 'DiaryPost',
} as const;

const mainTabNavigations = {
    DIARY_HOME: 'DiaryHome',
    CALENDAR_HOME: 'CalendarHome',
    CHATTING_HOME: 'ChattingHome',
    SETTING_HOME: 'SettingHome',
} as const;

const calendarNavigations = {
    CALENDAR_HOME: 'CalendarHome',
    CALENDAR_POST: 'CalendarPost',
} as const;
    
export { 
    authNavigations, 
    mainNavigations, 
    diaryNavigations, 
    mainTabNavigations, 
    calendarNavigations 
};