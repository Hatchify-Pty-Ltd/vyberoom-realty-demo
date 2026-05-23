import { useState, useCallback } from 'react';

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface LoginFormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export interface UseLoginFormReturn {
  values: LoginFormValues;
  errors: LoginFormErrors;
  isLoading: boolean;
  isPasswordVisible: boolean;
  handleChange: (field: keyof LoginFormValues, value: string) => void;
  handleSubmit: () => Promise<void>;
  handleGoogleSignIn: () => Promise<void>;
  togglePasswordVisibility: () => void;
  clearError: (field: keyof LoginFormErrors) => void;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm(values: LoginFormValues): LoginFormErrors {
  const errors: LoginFormErrors = {};

  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (!values.password) {
    errors.password = 'Password is required.';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }

  return errors;
}

export function useLoginForm(
  onSuccess?: () => void,
): UseLoginFormReturn {
  const [values, setValues] = useState<LoginFormValues>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChange = useCallback(
    (field: keyof LoginFormValues, value: string) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      // Clear field error on change
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    [],
  );

  const clearError = useCallback((field: keyof LoginFormErrors) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible((prev) => !prev);
  }, []);

  const handleSubmit = useCallback(async () => {
    const validationErrors = validateForm(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // TODO: Replace with real auth API call (e.g. Firebase, Supabase, custom JWT)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      onSuccess?.();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Login failed. Please try again.';
      setErrors({ general: message });
    } finally {
      setIsLoading(false);
    }
  }, [values, onSuccess]);

  const handleGoogleSignIn = useCallback(async () => {
    setIsLoading(true);
    setErrors({});

    try {
      // TODO: Replace with real Google Sign-In SDK call
      // e.g. GoogleSignin.signIn() from @react-native-google-signin/google-signin
      await new Promise((resolve) => setTimeout(resolve, 1500));
      onSuccess?.();
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Google Sign-In failed. Please try again.';
      setErrors({ general: message });
    } finally {
      setIsLoading(false);
    }
  }, [onSuccess]);

  return {
    values,
    errors,
    isLoading,
    isPasswordVisible,
    handleChange,
    handleSubmit,
    handleGoogleSignIn,
    togglePasswordVisibility,
    clearError,
  };
}