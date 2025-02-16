import {FlatList, Pressable, TextInput, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Dispatch, RefObject, SetStateAction, useState} from "react";
import {Message} from "@/app/(main)/(tabs)/chat";

interface InputWindowProps<Message> {
    setMessages: Dispatch<SetStateAction<Message[]>>;
    flatListRef: RefObject<FlatList<Message>>;
    placeholder: string;
}

const InputWindow = ({setMessages, flatListRef, placeholder}: InputWindowProps<Message>) => {
    const [partnerInput, setPartnerInput] = useState<string>("");
    const handleSendMessage = () => {
        if (!partnerInput.trim()) {
            return;
        }

        setMessages((prev) => [
            ...prev,
            {id: Date.now(), sender: "me", text: partnerInput}
        ]);
        setPartnerInput("");

        setTimeout(() => flatListRef.current?.scrollToEnd({animated: true}), 100);
    };

    return (
        <View className="flex flex-row items-center border-t pt-2 border-gray-300">
            <TextInput
                className="flex-1 border rounded-md px-3 py-2 bg-gray-200"
                placeholder={placeholder}
                value={partnerInput}
                onChangeText={setPartnerInput}
            />
            <Pressable onPress={handleSendMessage} className="ml-2 bg-blue-500 p-2 rounded-md">
                <Ionicons name="send" size={20} color="white"/>
            </Pressable>
        </View>
    );
};

export default InputWindow;
