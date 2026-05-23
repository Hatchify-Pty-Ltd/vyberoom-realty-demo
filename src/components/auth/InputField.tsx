import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import Colors from '../../constants/colors';

interface InputFieldProps extends TextInputProps {
  label: string;
  error?: string;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  rightIcon,
  onRightIconPress,
  containerStyle,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = error
    ? Colors.borderError
    : isFocused
    ? Colors.borderFocus
    : Colors.borderDefault;

  const labelColor = error
    ? Colors.error
    : isFocused
    ? Colors.googleBlue
    : Colors.textSecondary;

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
      <View style={[styles.inputWrapper, { borderColor }]}>
        <TextInput
          style={styles.input}
          placeholderTextColor={Colors.textMuted}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...textInputProps}
        />
        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={styles.rightIcon}
            activeOpacity={0.6}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      {error ? (
        <Text style={styles.errorText}>⚠ {error}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.4,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 8,
    backgroundColor: Colors.inputBackground,
    paddingHorizontal: 14,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.textPrimary,
    paddingVertical: 0,
  },
  rightIcon: {
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    marginTop: 5,
    fontSize: 12,
    color: Colors.error,
    fontWeight: '500',
  },
});

export default InputField;