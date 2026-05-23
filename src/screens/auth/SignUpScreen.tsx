import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import Colors from '../../constants/colors';
import InputField from '../../components/auth/InputField';
import GoogleSignUpButton from '../../components/auth/GoogleSignUpButton';
import useSignUpForm from '../../hooks/useSignUpForm';

interface SignUpScreenProps {
  navigation?: any;
}

const EyeIcon = ({ visible }: { visible: boolean }) => (
  <Text style={{ fontSize: 18 }}>{visible ? '🙈' : '👁️'}</Text>
);

const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const {
    values,
    errors,
    isLoading,
    isGoogleLoading,
    handleChange,
    handleSubmit,
    handleGoogleSignUp,
  } = useSignUpForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header / Logo ── */}
        <View style={styles.headerSection}>
          <View style={styles.logoMark}>
            <Text style={[styles.logoLetter, { color: Colors.googleBlue }]}>V</Text>
            <Text style={[styles.logoLetter, { color: Colors.googleRed }]}>i</Text>
            <Text style={})}