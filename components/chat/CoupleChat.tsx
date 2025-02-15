import {FlatList, Pressable, Text, TextInput, View} from "react-native";
import {useRef, useState} from "react";
import {Ionicons} from "@expo/vector-icons";

type Message = {
    id: number;
    sender: "partner" | "me";
    text: string;
};

const CoupleChat = () => {
    const [messagesWithPartner, setMessagesWithPartner] = useState<Message[]>([
        {id: 1, sender: "partner", text: "오늘 저녁에 뭐 먹을까?"},
        {id: 2, sender: "me", text: "파스타 어때?"}
    ]);

    const [partnerInput, setPartnerInput] = useState<string>("");
    const flatListRef = useRef<FlatList>(null);

    const handleSendPartnerMessage = () => {
        if (!partnerInput.trim()) {
            return;
        }

        setMessagesWithPartner((prev) => [
            ...prev,
            {id: Date.now(), sender: "me", text: partnerInput}
        ]);
        setPartnerInput("");

        setTimeout(() => flatListRef.current?.scrollToEnd({animated: true}), 100);
    };

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

                <View className="flex flex-row items-center border-t pt-2 border-gray-300">
                    <TextInput
                        className="flex-1 border rounded-md px-3 py-2 bg-gray-200"
                        placeholder="메시지를 입력하세요"
                        value={partnerInput}
                        onChangeText={setPartnerInput}
                    />
                    <Pressable onPress={handleSendPartnerMessage} className="ml-2 bg-blue-500 p-2 rounded-md">
                        <Ionicons name="send" size={20} color="white"/>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

export default CoupleChat;
