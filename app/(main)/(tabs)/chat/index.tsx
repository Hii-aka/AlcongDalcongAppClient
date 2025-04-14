import { SafeAreaView, View } from 'react-native';
import Chat from "@/components/chat/Chat";

export type Message = {
    id: number;
    sender: "partner" | "AI" | "me";
    text: string;
    timestamp?: string;
};

export default function ChatHome() {
    return (
        <SafeAreaView className="flex-1 bg-gray-100">
            <View className="flex-1">
                <Chat />
            </View>

        </SafeAreaView>
    );
}
