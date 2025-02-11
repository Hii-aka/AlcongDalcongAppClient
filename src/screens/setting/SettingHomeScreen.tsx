import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import useAuth from '@/hooks/queries/useAuth';
interface SettingHomeScreenProps {

}

function SettingHomeScreen({}: SettingHomeScreenProps) {
  const {logoutMutation} = useAuth();
  const handleLogout = () => {
    logoutMutation.mutate();
  }
  return (
    <View>
      <Text>SettingHomeScreen</Text>
      <Button title="로그아웃" onPress={handleLogout} />
    </View>
  )
}

const styles = StyleSheet.create({});

export default SettingHomeScreen;