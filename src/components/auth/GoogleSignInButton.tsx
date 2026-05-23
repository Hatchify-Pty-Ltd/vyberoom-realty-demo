import React, { useRef, useCallback } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { AppColors } from '../../constants/colors';

interface GoogleSignInButtonProps {
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

/**
 * Google "G" logo rendered with colored Text spans
 * matching the official 4-color Google logo style.
 */
const GoogleGLogo: React.FC = () => (
  <View style={logoStyles.container} accessibilityLabel="Google logo">
    <Text style={logoStyles.blue}>G</Text>
    <View style={logoStyles.colorBar}>
      <View style={[logoStyles.dot, { backgroundColor: '#4285F4' }]} />
      <View style={[logoStyles.dot, { backgroundColor: '#DB4437' }]} />
      <View style={[logoStyles.dot, { backgroundColor: '#F4B400' }]} />
      <View style={[logoStyles.dot, { backgroundColor: '#0F9D58' }]} />
    </View>
  </View>
);

const logoStyles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  blue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4285F4',
    lineHeight: 20,
  },
  colorBar: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: -3,
    gap: 1,
  },
  dot: {
    width: 4,
    height: 2,
    borderRadius: 1,
  },
});

export const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  onPress,
  isLoading = false,
  disabled = false,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  }, [scaleAnim]);

  const handlePressOut = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  }, [scaleAnim]);

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={[styles.button, (disabled || isLoading) && styles.buttonDisabled]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || isLoading}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel="Sign in with Google"
        accessibilityState={{ busy: isLoading, disabled: disabled || isLoading }}
      >
        <View style={styles.inner}>
          {isLoading ? (
            <ActivityIndicator size="small" color={AppColors.textSecondary} />
          ) : (
            <>
              <View style={styles.logoWrapper}>
                <GoogleGLogo />
              </View>
              <Text style={styles.label}>Sign in with Google</Text>
            </>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: AppColors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AppColors.border,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: AppColors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonDisabled: {
    opacity: 0}})