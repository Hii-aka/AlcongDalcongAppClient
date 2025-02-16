import {SafeAreaView, View} from 'react-native';
import CoupleChat from "@/components/chat/CoupleChat";
import AiChat from "@/components/chat/AiChat";

export type Message = {
    id: number;
    sender: "partner" | "AI" | "me";
    text: string;
};

export default function ChatHome() {
    return (
        <SafeAreaView className="flex-1 bg-gray-100">
            <View className="flex-1">
                <CoupleChat/>
            </View>
            <View className="flex-1 border-t border-gray-300">
                <AiChat/>
            </View>
        </SafeAreaView>
    );
}
