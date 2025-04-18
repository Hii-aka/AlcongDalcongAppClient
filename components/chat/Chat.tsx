import { FlatList, KeyboardAvoidingView, Platform, Pressable, Text, TouchableOpacity, View } from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SHADOWS, TAB_BAR } from '@/constants/theme';
import InputWindow from "@/components/chat/InputWindow";
import { Message } from "@/app/(main)/(tabs)/chat";
import Animated, { FadeInDown } from 'react-native-reanimated';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import dayjs from 'dayjs';
import Markdown from 'react-native-markdown-display';
import { useRouter } from 'expo-router';

declare global {
    var aiMessagesCallback: ((message: Message) => void) | null;
    var aiUpdateMessageCallback: ((messageId: number, chunk: string) => void) | null;
}

type ChatType = 'couple' | 'ai';

const Chat = () => {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [chatType, setChatType] = useState<ChatType>('couple');
    const [messagesWithPartner, setMessagesWithPartner] = useState<Message[]>([
        { id: 1, sender: "partner", text: "오늘 저녁에 뭐 먹을까?", timestamp: new Date().toISOString() },
        { id: 2, sender: "me", text: "파스타 어때?", timestamp: new Date().toISOString() }
    ]);
    const [messagesWithAi, setMessagesWithAi] = useState<Message[]>([
        {
            id: 1,
            sender: "AI",
            text: "안녕하세요! 데이트 코스를 추천해 드릴까요? 원하시는 분위기나 선호하는 활동이 있다면 말씀해 주세요.",
            timestamp: new Date().toISOString()
        }
    ]);

    const flatListRef = useRef<FlatList>(null);
    const currentMessages = chatType === 'couple' ? messagesWithPartner : messagesWithAi;
    const setCurrentMessages = chatType === 'couple' ? setMessagesWithPartner : setMessagesWithAi;

    const scrollToBottom = useCallback(() => {
        if (flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    }, []);

    useEffect(() => {
        const addAiMessage = (message: Message) => {
            if (chatType === 'ai') {
                setMessagesWithAi(prev => [...prev, message]);
                setTimeout(scrollToBottom, 100);
            }
        };

        const updateAiMessage = (messageId: number, chunk: string) => {
            if (chatType === 'ai') {
                setMessagesWithAi(prev => {
                    return prev.map(msg => {
                        if (msg.id === messageId) {
                            return {
                                ...msg,
                                text: msg.text + chunk
                            };
                        }
                        return msg;
                    });
                });

                setTimeout(scrollToBottom, 100);
            }
        };

        global.aiMessagesCallback = addAiMessage;
        global.aiUpdateMessageCallback = updateAiMessage;

        return () => {
            global.aiMessagesCallback = null;
            global.aiUpdateMessageCallback = null;
        };
    }, [chatType, scrollToBottom]);

    const renderMessageTime = (timestamp: string) => {
        return dayjs(timestamp).format('HH:mm');
    };

    const ListEmptyComponent = () => (
        <View className="flex-1 items-center justify-center">
            <Text className="text-gray-500 text-center">
                {chatType === 'couple'
                    ? '아직 대화가 없습니다. 첫 메시지를 보내보세요!'
                    : 'AI에게 데이트 코스를 추천받아보세요!'}
            </Text>
        </View>
    );

    const markdownStyles = {
        body: {
            color: COLORS.text,
            fontSize: 15,
            lineHeight: 24,
        },
        paragraph: {
            marginVertical: 8,
        },
        code_inline: {
            backgroundColor: COLORS.backgroundAlt,
            color: COLORS.primary,
            padding: 4,
            borderRadius: 4,
        },
        code_block: {
            backgroundColor: COLORS.backgroundAlt,
            color: COLORS.primary,
            padding: 8,
            borderRadius: 4,
            marginVertical: 4,
        },
        link: {
            color: COLORS.primary,
        },
        list_item: {
            marginVertical: 4,
        },
        bullet_list: {
            marginVertical: 4,
        },
        ordered_list: {
            marginVertical: 4,
        },
        hardbreak: {
            height: 1,
            marginVertical: 4,
        },
        softbreak: {
            height: 1,
            marginVertical: 2,
        },
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
            <View className="flex-1">
                <LinearGradient
                    colors={[COLORS.backgroundAlt, COLORS.background]}
                    className="flex-1 px-4 pt-4"
                    style={{ paddingBottom: insets.bottom + TAB_BAR.TOTAL_HEIGHT + 20 }}
                >
                    <Animated.View
                        entering={FadeInDown.duration(600)}
                        className="flex-1 bg-white/80 rounded-3xl shadow-sm border border-pink-100 overflow-hidden"
                    >
                        {/* 채팅 타입 선택 */}
                        <View className="flex-row border-b border-pink-100">
                            <Pressable
                                className={`flex-1 py-4 px-6 flex-row items-center justify-center ${chatType === 'couple' ? 'border-b-2 border-pink-500' : ''
                                    }`}
                                onPress={() => setChatType('couple')}
                            >
                                <Ionicons
                                    name="heart"
                                    size={18}
                                    color={chatType === 'couple' ? COLORS.love : COLORS.textLight}
                                />
                                <Text
                                    className={`ml-2 font-semibold ${chatType === 'couple' ? 'text-pink-500' : 'text-gray-500'
                                        }`}>
                                    연인과 대화
                                </Text>
                            </Pressable>
                            <Pressable
                                className={`flex-1 py-4 px-6 flex-row items-center justify-center ${chatType === 'ai' ? 'border-b-2 border-pink-500' : ''
                                    }`}
                                onPress={() => setChatType('ai')}
                            >
                                <FontAwesomeIcon
                                    icon={faRobot}
                                    size={18}
                                    color={chatType === 'ai' ? COLORS.love : COLORS.textLight}
                                />
                                <Text
                                    className={`ml-2 font-semibold ${chatType === 'ai' ? 'text-pink-500' : 'text-gray-500'
                                        }`}>
                                    AI 어시스턴트
                                </Text>
                            </Pressable>
                        </View>

                        {/* 헤더 */}
                        <LinearGradient
                            colors={[COLORS.love, COLORS.primary]}
                            className="px-4 py-3 flex-row items-center"
                        >
                            <View className="w-10 h-10 rounded-full bg-white/20 items-center justify-center">
                                {chatType === 'couple' ? (
                                    <Ionicons name="heart" size={20} color="#FFFFFF" />
                                ) : (
                                    <FontAwesomeIcon icon={faRobot} size={20} color="#FFFFFF" />
                                )}
                            </View>
                            <View className="ml-3 flex-1">
                                <Text className="text-lg font-bold text-white">
                                    {chatType === 'couple' ? '연인과의 대화' : 'AI 어시스턴트'}
                                </Text>
                                <Text className="text-sm text-white/80">
                                    {chatType === 'couple' ? '실시간 채팅' : '데이트 코스 추천받기'}
                                </Text>
                            </View>
                            <TouchableOpacity
                                className="w-10 h-10 rounded-full bg-white/20 items-center justify-center active:opacity-70"
                                style={SHADOWS.small}
                            >
                                <Ionicons
                                    name={chatType === 'couple' ? "images" : "bulb"}
                                    size={20}
                                    color="#FFFFFF"
                                />
                            </TouchableOpacity>
                        </LinearGradient>

                        {/* 메시지 목록 */}
                        <FlatList
                            ref={flatListRef}
                            data={currentMessages}
                            keyExtractor={(item) => item.id.toString()}
                            className="flex-1"
                            contentContainerStyle={{
                                flexGrow: 1,
                                paddingHorizontal: 16,
                                paddingBottom: 16,
                                paddingTop: chatType === 'ai' ? 80 : 16,
                            }}
                            onContentSizeChange={scrollToBottom}
                            onLayout={scrollToBottom}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={ListEmptyComponent}
                            renderItem={({ item, index }) => (
                                <Animated.View
                                    entering={FadeInDown.delay(index * 100).duration(400)}
                                    className={item.sender === 'me' ? "items-end" : "items-start"}
                                >
                                    <View className="flex-row items-end mb-4 max-w-[80%]">
                                        {item.sender !== 'me' && (
                                            <View className="mr-2">
                                                <View
                                                    className={`w-8 h-8 rounded-full items-center justify-center ${chatType === 'couple' ? 'bg-pink-100' : 'bg-blue-100'
                                                        }`}>
                                                    {chatType === 'couple' ? (
                                                        <Ionicons name="heart" size={16} color={COLORS.love} />
                                                    ) : (
                                                        <FontAwesomeIcon icon={faRobot} size={16}
                                                            color={COLORS.secondary} />
                                                    )}
                                                </View>
                                            </View>
                                        )}
                                        <View>
                                            <View
                                                className={`p-3 rounded-2xl ${item.sender === 'me'
                                                    ? 'bg-pink-500'
                                                    : `bg-white border ${chatType === 'couple' ? 'border-pink-100' : 'border-blue-100'}`
                                                    }`}
                                                style={SHADOWS.small}
                                            >
                                                {item.sender === 'me' ? (
                                                    <Text className="text-white text-[15px]">{item.text}</Text>
                                                ) : (
                                                    <Markdown
                                                        style={{
                                                            ...markdownStyles,
                                                            body: {
                                                                ...markdownStyles.body,
                                                                color: item.sender === 'me' ? 'white' : COLORS.text,
                                                            },
                                                        }}
                                                    >
                                                        {item.text}
                                                    </Markdown>
                                                )}
                                            </View>
                                            <Text
                                                className={`text-xs text-gray-500 mt-1 ${item.sender === 'me' ? 'text-right' : 'text-left'
                                                    }`}>
                                                {renderMessageTime(item.timestamp)}
                                            </Text>
                                        </View>
                                    </View>
                                </Animated.View>
                            )}
                        />

                        {/* 입력창 */}
                        <View className="px-4 py-3 border-t border-pink-100 bg-white">
                            <InputWindow
                                setMessages={setCurrentMessages}
                                flatListRef={flatListRef}
                                chatType={chatType}
                            />
                        </View>

                        {chatType === 'ai' && (
                            <View
                                className="absolute top-[136px] left-0 right-0 px-4 py-2 bg-white/95 border-b border-pink-100 z-10">
                                <TouchableOpacity
                                    className="bg-pink-500 px-4 py-2 rounded-xl border-pink-400 flex-row items-center justify-center"
                                    style={SHADOWS.medium}
                                    onPress={() => router.push("/(main)/(tabs)/chat/option" as any)}
                                >
                                    <Ionicons name="options-outline" size={18} color="#FFFFFF" />
                                    <Text className="text-white font-semibold ml-2 text-sm">선택한 옵션으로 데이트 코스 추천받기</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Animated.View>
                </LinearGradient>
            </View>
        </KeyboardAvoidingView>
    );
};

export default Chat;
