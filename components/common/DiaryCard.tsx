import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, Animated } from 'react-native';
import { COLORS, CARD_STYLES, TYPOGRAPHY, SPACING } from '../../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface DiaryCardProps {
  title: string;
  date: string;
  content: string;
  image?: string;
  mood?: string;
  location?: string;
  weather?: string;
  likes?: number;
  onPress?: () => void;
  onLike?: () => void;
}

export function DiaryCard({
  title,
  date,
  content,
  image,
  mood,
  location,
  weather,
  likes = 0,
  onPress,
  onLike,
}: DiaryCardProps) {
  const scale = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ scale }] }]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {image && (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: image }}
              style={styles.image}
              resizeMode="cover"
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.3)']}
              style={styles.imageOverlay}
            />
          </View>
        )}
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {title}
              </Text>
              <Text style={styles.date}>{date}</Text>
            </View>
            {weather && (
              <View style={styles.weatherContainer}>
                <Ionicons 
                  name={weather === 'sunny' ? 'sunny' : 'rainy'} 
                  size={16} 
                  color={COLORS.accent}
                />
              </View>
            )}
          </View>
          
          <Text style={styles.text} numberOfLines={3}>
            {content}
          </Text>
          
          <View style={styles.footer}>
            <View style={styles.tags}>
              {mood && (
                <View style={[styles.tag, { backgroundColor: COLORS.love }]}>
                  <Ionicons name="heart" size={12} color={COLORS.background} />
                  <Text style={[styles.tagText, { color: COLORS.background }]}>
                    {mood}
                  </Text>
                </View>
              )}
              {location && (
                <View style={[styles.tag, { backgroundColor: COLORS.memory }]}>
                  <Ionicons name="location" size={12} color={COLORS.background} />
                  <Text style={[styles.tagText, { color: COLORS.background }]}>
                    {location}
                  </Text>
                </View>
              )}
            </View>
            {onLike && (
              <Pressable style={styles.likeButton} onPress={onLike}>
                <Ionicons name="heart" size={16} color={COLORS.love} />
                <Text style={styles.likeCount}>{likes}</Text>
              </Pressable>
            )}
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...CARD_STYLES,
    marginVertical: SPACING.sm,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    marginHorizontal: -SPACING.md,
    marginTop: -SPACING.md,
    marginBottom: SPACING.sm,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  titleContainer: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  title: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
    marginBottom: 2,
  },
  date: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textLight,
  },
  weatherContainer: {
    padding: SPACING.xs,
    backgroundColor: COLORS.together,
    borderRadius: 8,
  },
  text: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    marginBottom: SPACING.md,
    lineHeight: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
    flex: 1,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
    gap: 4,
  },
  tagText: {
    ...TYPOGRAPHY.caption,
    fontWeight: '500',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.together,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
    gap: 4,
  },
  likeCount: {
    ...TYPOGRAPHY.caption,
    color: COLORS.love,
    fontWeight: '500',
  },
}); 