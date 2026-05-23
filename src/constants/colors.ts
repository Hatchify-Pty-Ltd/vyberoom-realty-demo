/**
 * Color tokens for New Vin Mobile App
 * Google Material palette + app-specific tokens
 */

export const GoogleColors = {
  blue: '#4285F4',
  red: '#DB4437',
  yellow: '#F4B400',
  green: '#0F9D58',
  darkText: '#202124',
  secondaryText: '#5F6368',
  border: '#DADCE0',
  surface: '#FFFFFF',
  background: '#F8F9FA',
  buttonHover: '#3367D6',
  errorRed: '#D93025',
  focusBorder: '#4285F4',
  shadowColor: '#000000',
};

export const AppColors = {
  primary: GoogleColors.blue,
  primaryDark: GoogleColors.buttonHover,
  background: GoogleColors.background,
  surface: GoogleColors.surface,
  textPrimary: GoogleColors.darkText,
  textSecondary: GoogleColors.secondaryText,
  border: GoogleColors.border,
  error: GoogleColors.errorRed,
  success: GoogleColors.green,
  divider: '#E8EAED',
  placeholder: '#9AA0A6',
  iconMuted: '#80868B',
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(0,0,0,0.4)',
};

export default AppColors;