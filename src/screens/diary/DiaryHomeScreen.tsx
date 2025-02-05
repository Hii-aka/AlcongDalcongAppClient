import React from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';

interface DiaryHomeScreenProps {

}

function DiaryHomeScreen({}: DiaryHomeScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
        <Text>다이어리입니다</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 14,
      paddingBottom: 16,
    },
});

export default DiaryHomeScreen;