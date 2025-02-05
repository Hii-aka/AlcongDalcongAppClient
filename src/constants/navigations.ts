const authNavigations = {
    AUTH_HOME: 'AuthHome',
    SIGNUP: 'Signup',
} as const; 

const mainNavigations = {
    HOME: 'Home',
} as const;

const diaryNavigations = {
    DIARY_HOME: '알콩달콩',
} as const;

const mainTabNavigations = {
    DIARY_HOME: 'DiaryHome',
    CALENDAR_HOME: 'CalendarHome',
    CHATTING_HOME: 'ChattingHome',
    SETTING_HOME: 'SettingHome',
} as const;
    
export { authNavigations, mainNavigations, diaryNavigations, mainTabNavigations };