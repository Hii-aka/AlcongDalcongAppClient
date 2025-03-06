import { View, SafeAreaView, ScrollView } from "react-native";
import Calendar from "@/components/calendar/Calendar";
import { useEffect, useState } from "react";
import { getMonthYearDetails, getNewMonthYear } from "@/utils/date";
import ScheduledDate from "@/components/date/ScheduledDate";
import { COLORS } from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import useGetCoupleRequestAccepted from "@/hooks/queries/useGetCoupleRequestAccepted";
import { getDaysDifference } from "@/utils/date";
import NotYetConnect from "@/components/couple/NotYetConnect";
import { useGetAllDateCalendars } from "@/hooks/queries/useGetAllDateCalendars";
interface Schedule {
  id: number;
  title: string;
  time: string;
  location: string;
}

type ScheduleMap = {
  [key: number]: Schedule[];
};

const SAMPLE_SCHEDULES: ScheduleMap = {
  14: [{ 
    id: 1,
    title: '롯데월드 데이트',
    time: '14:00',
    location: '잠실역 2번 출구',
  }],
  20: [{ 
    id: 2,
    title: '한강 피크닉',
    time: '12:00',
    location: '여의도 한강공원',
  }],
  25: [{ 
    id: 3,
    title: '영화 데이트',
    time: '19:00',
    location: 'CGV 홍대입구',
  }],
};

export default function CalendarHome() {
    const currentMonthYear = getMonthYearDetails(new Date());
    const [monthYear, setMonthYear] = useState(currentMonthYear);
    const [selectedDate, setSelectedDate] = useState(0);
    const { data: couple, isLoading: isCoupleLoading } = useGetCoupleRequestAccepted();
    const { data: dateCalendars, isLoading: isDateCalendarsLoading } = useGetAllDateCalendars(monthYear.year, monthYear.month);

    // TODO: 실제 연인 연결 상태를 가져오는 로직으로 대체
    const [daysCount, setDaysCount] = useState(couple ? getDaysDifference(couple.firstMetDate) : 0);

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

    if (isCoupleLoading || !couple) {
      return <NotYetConnect 
        isCoupleLoading={isCoupleLoading} 
        icon="calendar" 
        title="아직 연인과 연결되지 않았어요" 
        description={"연인과 함께 소중한 추억을\n기록하고 공유해보세요"}
      />;
    }

    return (
        <SafeAreaView className="flex-1">
            <LinearGradient
                colors={[COLORS.backgroundAlt, COLORS.background]}
                className="flex-1"
            >
                <ScrollView 
                    className="flex-1"
                    contentContainerStyle={{ paddingBottom: 24 }}
                    showsVerticalScrollIndicator={false}
                >
                    <Calendar
                        monthYear={monthYear}
                        selectedDate={selectedDate}
                        schedules={dateCalendars || []}
                        moveToToday={moveToToday}
                        onPressDate={handlePressDate}
                        onChangeMonth={handleChangeMonth}
                        daysCount={daysCount}
                    />
                    
                    {couple && selectedDate > 0 && (
                        <View className="px-6">
                            <ScheduledDate 
                                selectedDate={selectedDate} 
                                schedules={dateCalendars || []}
                            />
                        </View>
                    )}
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    );
}