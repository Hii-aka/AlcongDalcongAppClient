import React, { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { AnniversaryCalculatorProps } from '../types/anniversary';
import { calculateAnniversaryDates, formatDate } from '../../utils/date';

function AnniversaryCalculator({ startDate, onSelectDate }: AnniversaryCalculatorProps) {
  const theme = useTheme();
  const anniversaryDates = useMemo(() => calculateAnniversaryDates(startDate), [startDate]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.startDate}>
        시작일: {formatDate(startDate ?? new Date())}
      </Text>
      
      <View style={styles.grid}>
        {anniversaryDates.map((anniversary) => (
          <Pressable
            key={anniversary.days}
            style={[styles.card, { backgroundColor: theme.colors.card }]}
            onPress={() => onSelectDate?.(anniversary)}
          >
            <Text style={[styles.label, { color: theme.colors.text }]}>
              {anniversary.label}
            </Text>
            <Text style={[styles.date, { color: theme.colors.text }]}>
              {formatDate(anniversary.date)}
            </Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  startDate: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  card: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  label: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
  },
});

export default AnniversaryCalculator; 