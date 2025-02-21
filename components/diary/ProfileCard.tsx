import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SHADOWS, SPACING } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

interface ProfileCardProps {
  daysCount: number;
  daysUntilAnniversary: number;
}

export function ProfileCard({ daysCount, daysUntilAnniversary }: ProfileCardProps) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.love + '20', COLORS.background]}
        style={styles.card}
      >
        <View style={styles.header}>
          <View style={styles.profileContainer}>
            <Pressable style={styles.profile}>
              <Image
                source={{ uri: 'https://picsum.photos/200' }}
                style={styles.profileImage}
              />
              <View style={styles.badge}>
                <Ionicons name="heart" size={12} color={COLORS.background} />
              </View>
            </Pressable>
            <View style={styles.divider}>
              <Ionicons name="heart" size={20} color={COLORS.love} />
            </View>
            <Pressable style={styles.profile}>
              <Image
                source={{ uri: 'https://picsum.photos/201' }}
                style={styles.profileImage}
              />
              <View style={styles.badge}>
                <Ionicons name="heart" size={12} color={COLORS.background} />
              </View>
            </Pressable>
          </View>
          <Pressable style={styles.editButton}>
            <Ionicons name="pencil" size={16} color={COLORS.love} />
          </Pressable>
        </View>

        <View style={styles.content}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{daysCount}</Text>
            <Text style={styles.statLabel}>함께한 일수</Text>
          </View>
          <View style={styles.dividerVertical} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>D-{daysUntilAnniversary}</Text>
            <Text style={styles.statLabel}>기념일까지</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.lg,
  },
  card: {
    borderRadius: 24,
    padding: SPACING.lg,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  profile: {
    position: 'relative',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: COLORS.love,
  },
  badge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: COLORS.love,
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.background,
  },
  divider: {
    width: 32,
    alignItems: 'center',
  },
  editButton: {
    padding: SPACING.xs,
    backgroundColor: COLORS.love + '20',
    borderRadius: 20,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: SPACING.sm,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.love,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  dividerVertical: {
    width: 1,
    height: 24,
    backgroundColor: COLORS.border,
  },
});