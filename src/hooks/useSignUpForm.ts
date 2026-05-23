import { useState, useCallback } from 'react';

interface SignUpFormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignUpFormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface UseSignUpFormReturn {
  values: SignUpFormValues;
  errors: SignUpFormErrors;
  isLoading: boolean;
  isGoogleLoading: boolean;
  handleChange: (field: keyof SignUpFormValues, value: string) => void;
  handleSubmit: () => void;
  handleGoogleSignUp: () => void;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = (values: SignUpFormValues): SignUpFormErrors => {
  const errors: SignUpFormErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = 'Full name is required.';
  } else if (values.fullName.trim().length < 2) {
    errors.fullName = 'Name must be at least 2 characters.';
  }

  if (!values.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!values.password) {
    errors.password = 'Password is required.';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  } else if (!/[A-Z]/.test(values.password)) {
    errors.password = 'Password must include at least one uppercase letter.';
  } else if (!/[0-9]/.test(values.password)) {
    errors.password = 'Password must include at least one number.';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password.';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return errors;
};

const useSignUpForm = (): UseSignUpFormReturn => {
  const [values, setValues] = useState<SignUpFormValues>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<SignUpFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleChange = useCallback(
    (field: keyof SignUpFormValues, value: string) => {
      setValues(prev => ({ ...prev, [field]: value }));
      // Clear error on change
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: undefined }));
      }
    },
    [errors],
  );

  const handleSubmit = useCallback(async () => {
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      // TODO: replace with real sign-up API call
      await new Promise(resolve => setTimeout(resolve, 1800));
      console.log('Sign up submitted:', values.email);
      // TODO: navigate to onboarding or home after success
    } catch (err) {
      setErrors({ email: 'Sign up failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  }, [values]);

  const handleGoogleSignUp = useCallback(async () => {
    setIsGoogleLoading(true);
    try {
      // TODO: replace with real Google OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Google sign up initiated');
    } catch (err) {
      console.error('Google sign up failed', err);
    } finally {
      setIsGoogleLoading(false);
    }
  }, []);

  return {
    values,
    errors,
    isLoading,
    isGoogleLoading,
    handleChange,
    handleSubmit,
    handleGoogleSignUp,
  };
};

export default useSignUpForm;