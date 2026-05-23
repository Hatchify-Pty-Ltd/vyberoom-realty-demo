import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../constants/colors';

interface GoogleSignUpButtonProps {
  onPress: () => void;
  loading?: boolean;
  label?: string;
}

const GoogleSignUpButton: React.FC<GoogleSignUpButtonProps> = ({
  onPress,
  loading = false,
  label = 'Sign up with Google',
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, loading && styles.buttonDisabled]}
      onPress={onPress}
      activeOpacity={0.75}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color={Colors.textSecondary} />
      ) : (
        <>
          {/* Google "G" Logo */}
          <View style={styles.logoContainer}>
            <Text style={styles.gLetter}>
              <Text style={{ color: Colors.googleBlue }}>G</Text>
            </Text>
            <View style={styles.colorBar}>
              <View style={[styles.colorDot, { backgroundColor: Colors.googleBlue }]} />
              <View style={[styles.colorDot, { backgroundColor: Colors.googleRed }]} />
              <View style={[styles.colorDot, { backgroundColor: Colors.googleYellow }]} />
              <View style={[styles.colorDot, { backgroundColor: Colors.googleGreen }]} />
            </View>
          </View>
          <Text style={styles.label}>{label}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.borderDefault,
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  logoContainer: {
    alignItems: 'center',
    marginRight: 12,
  },
  gLetter: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 20,
  },
  colorBar: {
    flexDirection: 'row',
    marginTop: 2,
  },
  colorDot: {
    width: 4,
    height: 3,
    borderRadius: 1,
    marginHorizontal: 0.5,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
    letterSpacing: 0.2,
  },
});

export default GoogleSignUpButton;