import { View, Text } from "react-native";

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

function DayOfWeeks() {
    return (
        <View className='flex-row border-b border-pink-100 mb-2'>
            {WEEKDAYS.map((day, index) => (
                <View key={index} className='flex-1 items-center py-3'>
                    <Text 
                        className={`text-sm font-medium ${
                            day === '일' ? 'text-red-500' : 
                            day === '토' ? 'text-blue-500' : 
                            'text-gray-500'
                        }`}
                    >
                        {day}
                    </Text>
                </View>
            ))}
        </View>
    );
}     

export default DayOfWeeks;