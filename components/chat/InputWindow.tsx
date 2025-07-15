import { requestAiChat } from "@/api/ai";
import { Message } from "@/app/(main)/(tabs)/chat";
import { Ionicons } from "@expo/vector-icons";
import { Dispatch, RefObject, SetStateAction, useState } from "react";
import { FlatList, Pressable, TextInput, View } from "react-native";

interface InputWindowProps {
    setMessages: Dispatch<SetStateAction<Message[]>>;
    flatListRef: RefObject<FlatList<Message>>;
    chatType: string;
}

const InputWindow = ({ setMessages, flatListRef, chatType }: InputWindowProps) => {
    const [partnerInput, setPartnerInput] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const placeholder = chatType === 'couple' ? "메시지를 입력하세요" : "AI에게 질문하기";

    const handleSendMessage = async () => {
        if (!partnerInput.trim() || isLoading) {
            return;
        }

        const userMessage: Message = { id: Date.now(), sender: "me", text: partnerInput };
        setMessages((prev) => [...prev, userMessage]);

        if (chatType === "ai") {
            await fetchAiRequest();
            return;
        }

        setPartnerInput("");
        setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    };

    const fetchAiRequest = async () => {
        setIsLoading(true);
        let aiResponse = "";
        const aiMessageId = Date.now() + 1;

        setMessages(prev => [...prev, { id: aiMessageId, sender: "AI", text: "" }]);

        try {
            await requestAiChat(partnerInput, (chunk) => {
                aiResponse += chunk;

                let processedResponse = aiResponse
                    .replace(/^- /gm, '∙ ')
                    .replace(/^\* /gm, '∙ ')
                    .replace(/\n- /g, '\n∙ ')
                    .replace(/\n\* /g, '\n∙ ');

                setMessages(prev => prev.map(msg =>
                    msg.id === aiMessageId ? { ...msg, text: processedResponse } : msg
                ));

                flatListRef.current?.scrollToEnd({ animated: true });
            });
        } catch (error) {
            console.error('Error in AI chat:', error);
            setMessages(prev => prev.map(msg =>
                msg.id === aiMessageId ? { ...msg, text: "오류가 발생했습니다. 다시 입력해 주세요." } : msg
            ));
        } finally {
            setIsLoading(false);
            setPartnerInput("");
        }
    }

    return (
        <View className="flex flex-row items-center border-t pt-2 border-gray-300">
            <TextInput
                className="flex-1 border rounded-md px-3 py-2 bg-gray-200"
                placeholder={placeholder}
                value={partnerInput}
                onChangeText={setPartnerInput}
                editable={!isLoading}
            />
            <Pressable
                onPress={handleSendMessage}
                className={`ml-2 p-2 rounded-md ${isLoading ? 'bg-gray-400' : 'bg-blue-500'}`}
                disabled={isLoading}
            >
                <Ionicons name="send" size={20} color="white" />
            </Pressable>
        </View>
    );
};

export default InputWindow;
