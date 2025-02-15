import {FlatList, Pressable, Text, TextInput, View} from "react-native";
import {useRef, useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faRobot} from '@fortawesome/free-solid-svg-icons'

type Message = {
    id: number;
    sender: "AI" | "me";
    text: string;
};

const AiChat = () => {
    const [messagesWithAi, setMessagesWithAi] = useState<Message[]>([
        {id: 1, sender: "AI", text: "안녕하세요! 데이트 코스를 추천해 드릴까요?"}
    ]);

    const [aiInput, setAiInput] = useState<string>("");
    const flatListRef = useRef<FlatList>(null);

    const handleSendAiMessage = () => {
        if (!aiInput.trim()) {
            return;
        }

        setMessagesWithAi((prev) => [
            ...prev,
            {id: Date.now(), sender: "me", text: aiInput}
        ]);
        setAiInput("");

        setTimeout(() => flatListRef.current?.scrollToEnd({animated: true}), 100);
    };

    return (
        <View className="flex-1 bg-gray-100 px-4">
            <View className="bg-white rounded-lg p-4 shadow-md flex-1">
                <View className="flex flex-row items-center mb-2">
                    <View className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <FontAwesomeIcon icon={faRobot} size={18} color="#2563EB"/>
                    </View>
                    <View className="ml-2">
                        <Text className="text-lg font-bold">AI 어시스턴트</Text>
                        <Text className="text-sm text-gray-500">데이트 코스 추천받기</Text>
                    </View>
                </View>

                <FlatList
                    ref={flatListRef}
                    data={messagesWithAi}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <View
                            className={`p-2 rounded-lg mb-2 ${item.sender === 'me' ? 'bg-black self-end' : 'bg-blue-100 self-start'}`}>
                            <Text className={item.sender === 'me' ? "text-white" : "text-black"}>{item.text}</Text>
                        </View>
                    )}
                    style={{flex: 1}}
                    contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-start', paddingBottom: 60}}
                />

                <View className="flex flex-row items-center border-t pt-2 border-gray-300">
                    <TextInput
                        className="flex-1 border rounded-md px-3 py-2 bg-gray-200"
                        placeholder="AI에게 질문하기"
                        value={aiInput}
                        onChangeText={setAiInput}
                    />
                    <Pressable onPress={handleSendAiMessage} className="ml-2 bg-blue-500 p-2 rounded-md">
                        <Ionicons name="send" size={20} color="white"/>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

export default AiChat;
