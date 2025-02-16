import {FlatList, Text, View} from "react-native";
import {useRef, useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import InputWindow from "@/components/chat/InputWindow";
import {Message} from "@/app/(main)/(tabs)/chat";

const CoupleChat = () => {
    const [messagesWithPartner, setMessagesWithPartner] = useState<Message[]>([
        {id: 1, sender: "partner", text: "오늘 저녁에 뭐 먹을까?"},
        {id: 2, sender: "me", text: "파스타 어때?"}
    ]);

    const flatListRef = useRef<FlatList>(null);

    return (
        <View className="flex-1 bg-gray-100 px-4">
            <View className="bg-white rounded-lg p-4 shadow-md flex-1">
                <View className="flex flex-row items-start mb-2">
                    <View className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                        <Ionicons name="heart" size={18} color="#020202"/>
                    </View>
                    <View className="ml-2">
                        <Text className="text-lg font-bold">연인과의 대화</Text>
                        <Text className="text-sm text-gray-500">실시간 채팅</Text>
                    </View>
                </View>

                <FlatList
                    ref={flatListRef}
                    data={messagesWithPartner}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <View
                            className={`p-2 rounded-lg mb-2 ${item.sender === 'me' ? 'bg-black self-end' : 'bg-gray-300 self-start'}`}>
                            <Text className={item.sender === 'me' ? "text-white" : "text-black"}>{item.text}</Text>
                        </View>
                    )}
                    style={{flex: 1}}
                    contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-start', paddingBottom: 60}}
                />

                <InputWindow setMessages={setMessagesWithPartner} flatListRef={flatListRef} placeholder="메시지를 입력하세요"/>
            </View>
        </View>
    );
};

export default CoupleChat;
