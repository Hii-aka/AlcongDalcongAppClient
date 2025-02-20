import React from 'react';
import { View, Text, Switch, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  defaultValue: boolean;
}

const notificationSettings: NotificationSetting[] = [
  {
    id: 'diary',
    title: '일기 알림',
    description: '상대방이 일기를 작성했을 때 알림을 받습니다',
    icon: 'book',
    defaultValue: true,
  },
  {
    id: 'anniversary',
    title: '기념일 알림',
    description: '특별한 기념일이 다가올 때 알림을 받습니다',
    icon: 'cake',
    defaultValue: true,
  },
  {
    id: 'message',
    title: '메시지 알림',
    description: '상대방이 메시지를 보냈을 때 알림을 받습니다',
    icon: 'message',
    defaultValue: true,
  },
  {
    id: 'photo',
    title: '사진 알림',
    description: '상대방이 사진을 공유했을 때 알림을 받습니다',
    icon: 'photo-library',
    defaultValue: true,
  },
];

export default function NotificationSettings() {
  const [settings, setSettings] = useState(
    Object.fromEntries(
      notificationSettings.map(setting => [setting.id, setting.defaultValue])
    )
  );

  const toggleSwitch = (id: string) => {
    setSettings(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView>
        <View className="p-4">
          {/* 헤더 */}
          <View className="mb-6">
            <Text className="text-2xl font-bold text-gray-900">알림 설정</Text>
            <Text className="text-gray-500 mt-1">
              원하는 알림을 선택하여 설정하세요
            </Text>
          </View>

          {/* 알림 설정 목록 */}
          <View className="space-y-4">
            {notificationSettings.map((setting) => (
              <View
                key={setting.id}
                className="bg-white p-4 rounded-xl shadow-sm"
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center flex-1 mr-4">
                    <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
                      <MaterialIcons
                        name={setting.icon}
                        size={24}
                        color="#4B5563"
                      />
                    </View>
                    <View className="ml-3 flex-1">
                      <Text className="text-gray-900 font-medium text-base">
                        {setting.title}
                      </Text>
                      <Text className="text-gray-500 text-sm mt-0.5">
                        {setting.description}
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={settings[setting.id]}
                    onValueChange={() => toggleSwitch(setting.id)}
                    trackColor={{ false: '#D1D5DB', true: '#000' }}
                    thumbColor="#FFFFFF"
                  />
                </View>
              </View>
            ))}
          </View>

          {/* 추가 정보 */}
          <View className="mt-6 bg-blue-50 p-4 rounded-xl">
            <View className="flex-row items-center mb-2">
              <MaterialIcons name="info" size={20} color="#3B82F6" />
              <Text className="ml-2 font-medium text-blue-600">
                알림 설정 안내
              </Text>
            </View>
            <Text className="text-blue-600 text-sm">
              알림 설정은 언제든지 변경할 수 있습니다.
              기기의 시스템 설정에서도 알림을 관리할 수 있습니다.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 