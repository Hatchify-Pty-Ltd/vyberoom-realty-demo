import React, { useState, useCallback } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
  Animated,
} from 'react-native';
import { AppColors } from '../../constants/colors';

interface FormInputProps extends TextInputProps {
  label: string;
  error?: string;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  rightIcon,
  onRightIconPress,
  style,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [borderAnim] = useState(new Animated.Value(0));

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    Animated.timing(borderAnim, {
      toValue: 1,
      duration: 180,
      useNativeDriver: false,
    }).start();
    rest.onFocus?.({} as any);
  }, [borderAnim, rest]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    Animated.timing(borderAnim, {
      toValue: 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
    rest.onBlur?.({} as any);
  }, [borderAnim, rest]);

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      error ? AppColors.error : AppColors.border,
      error ? AppColors.error : AppColors.primary,
    ],
  });

  const borderWidth = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2],
  });

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.label, error && styles.labelError]}>{label}</Text>
      <Animated.View
        style={[
          styles.inputContainer,
          { borderColor, borderWidth },
          error && !isFocused && styles.inputContainerError,
        ]}
      >
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={AppColors.placeholder}
          autoCapitalize="none"
          autoCorrect={false}
          {...rest}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={styles.rightIconButton}
            accessibilityRole="button"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </Animated.View>
      {error ? (
        <Text style={styles.errorText} accessibilityRole="alert">
          ⚠ {error}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: AppColors.textSecondary,
    marginBottom: 6,
    letterSpacing: 0.1,
  },
  labelError: {
    color: AppColors.error,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: AppColors.surface,
    paddingHorizontal: 14,
    minHeight: 50,
  },
  inputContainerError: {
    borderColor: AppColors.error,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: AppColors.textPrimary,
    paddingVertical: 12,
  },
  rightIconButton: {
    paddingLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 12,
    color: AppColors.error,
    marginTop: 5,
    marginLeft: 2,
    letterSpacing: 0.1,
  },
});

export default FormInput;