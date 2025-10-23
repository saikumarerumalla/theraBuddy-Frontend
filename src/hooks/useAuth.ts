import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [biometricAvailable, setBiometricAvailable] = useState(false);

  const {
    user,
    isAuthenticated,
    login,
    register,
    logout,
  
  } = useAuthStore();

  useEffect(() => {
    checkBiometricAvailability();
    loadStoredAuth();
  }, []);

  const checkBiometricAvailability = async () => {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      setBiometricAvailable(compatible && enrolled);
    } catch (error) {
      console.error('Error checking biometric availability:', error);
    }
  };

  const loadStoredAuth = async () => {
    try {
      const token = await SecureStore.getItemAsync('authToken');
      if (token) {
        // Validate token and restore session
        // For now, we'll just set loading to false
      }
    } catch (error) {
      console.error('Error loading stored auth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const handleRegister = async (email: string, password: string, name: string) => {
    try {
      await register(email, password, name);
      return true;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync('authToken');
      logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const authenticateWithBiometric = async (): Promise<boolean> => {
    if (!biometricAvailable) {
      return false;
    }

    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'ログインするために認証してください',
        fallbackLabel: 'パスワードを使用',
        cancelLabel: 'キャンセル',
      });
      return result.success;
    } catch (error) {
      console.error('Biometric authentication error:', error);
      return false;
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    biometricAvailable,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    authenticateWithBiometric,
  };
};
