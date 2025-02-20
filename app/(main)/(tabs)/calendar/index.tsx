import { View, SafeAreaView } from "react-native";
import Calendar from "@/components/calendar/Calendar";
import { useEffect, useState } from "react";
import { getMonthYearDetails, getNewMonthYear } from "@/utils/date";
import ScheduledDate from "@/components/date/ScheduledDate";

export default function CalendarHome() {
    const currentMonthYear = getMonthYearDetails(new Date());
    const [monthYear, setMonthYear] = useState(currentMonthYear);
    const [selectedDate, setSelectedDate] = useState(0);

    const schedules = {};

    const handlePressDate = (date: number) => {
        setSelectedDate(date);
    };

    const handleChangeMonth = (increment: number) => {
      setSelectedDate(0);
      setMonthYear(prev => getNewMonthYear(prev, increment));
    };

    const moveToToday = () => {
      setSelectedDate(new Date().getDate());
      setMonthYear(getMonthYearDetails(new Date()));
    };

    useEffect(() => { 
      moveToToday();
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1">
                <View className="flex-shrink-0">
                    <Calendar
                        monthYear={monthYear}
                        selectedDate={selectedDate}
                        schedules={schedules}
                        moveToToday={moveToToday}
                        onPressDate={handlePressDate}
                        onChangeMonth={handleChangeMonth}
                    />
                </View>
                
                <View className="flex-1">
                    <ScheduledDate />
                </View>
            </View>
        </SafeAreaView>
    );
}