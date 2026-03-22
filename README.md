# TheraBuddy Frontend - AI Therapy Mobile Application

A production-ready React Native mobile application for mental health support, featuring AI-powered chat, mood tracking, and therapeutic exercises.

## 📱 Features

- ✅ Beautiful calming design
- ✅ Complete onboarding flow (12 steps)
- ✅ AI chat interface with streaming responses
- ✅ Mood tracking with visualizations
- ✅ Mental health assessments (PHQ-9, GAD-7)
- ✅ Exercise library with audio guidance
- ✅ Crisis detection and resources
- ✅ Progress dashboard with analytics
- ✅ English language support
- ✅ Offline mode support
- ✅ Biometric authentication
- ✅ End-to-end encryption

## 🛠️ Technology Stack

- **React Native** 0.73+ - Cross-platform mobile
- **Expo** 50+ - Development platform
- **TypeScript** 5.0+ - Type safety
- **Zustand** 4.4+ - State management
- **React Query** 5.0+ - Server state & caching
- **React Native Paper** 5.11+ - UI components
- **React Navigation** 6.1+ - Navigation
- **i18next** - Localization
- **Victory Native** - Charts & visualizations
- **Axios** - API client

## 📁 Project Structure

```
theraBuddy-Frontend/
├── App.tsx                          # Root component
├── package.json                     # Dependencies
├── app.json                         # Expo configuration
├── tsconfig.json                    # TypeScript config
├── babel.config.js                  # Babel config
│
├── src/
│   ├── api/                         # API integration (5 files)
│   │   ├── client.ts               # Axios client with interceptors
│   │   ├── auth.ts                 # Authentication endpoints
│   │   ├── chat.ts                 # Chat/conversation endpoints
│   │   ├── mood.ts                 # Mood tracking endpoints
│   │   └── user.ts                 # User profile endpoints
│   │
│   ├── components/                  # Reusable components (18 files)
│   │   ├── common/                 # Common UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Loading.tsx
│   │   │   └── ErrorBoundary.tsx
│   │   ├── chat/                   # Chat-specific components
│   │   │   ├── ChatBubble.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   ├── TypingIndicator.tsx
│   │   │   └── CrisisAlert.tsx
│   │   ├── mood/                   # Mood tracking components
│   │   │   ├── MoodSlider.tsx
│   │   │   ├── MoodChart.tsx
│   │   │   └── MoodCalendar.tsx
│   │   └── onboarding/             # Onboarding components
│   │       ├── ProgressBar.tsx
│   │       ├── OnboardingStep.tsx
│   │       └── CrisisAssessment.tsx
│   │
│   ├── screens/                     # Screen components (13 files)
│   │   ├── auth/                   # Authentication screens
│   │   │   ├── WelcomeScreen.tsx
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── RegisterScreen.tsx
│   │   │   └── OnboardingScreen.tsx
│   │   ├── main/                   # Main app screens
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── ChatScreen.tsx
│   │   │   ├── MoodScreen.tsx
│   │   │   ├── ExercisesScreen.tsx
│   │   │   ├── ResourcesScreen.tsx
│   │   │   ├── ProfileScreen.tsx
│   │   │   └── SettingsScreen.tsx
│   │   └── assessment/             # Assessment screens
│   │       ├── PHQ9Screen.tsx
│   │       └── GAD7Screen.tsx
│   │
│   ├── navigation/                  # Navigation setup (3 files)
│   │   ├── AppNavigator.tsx
│   │   ├── AuthNavigator.tsx
│   │   └── MainNavigator.tsx
│   │
│   ├── store/                       # State management (4 files)
│   │   ├── authStore.ts
│   │   ├── chatStore.ts
│   │   ├── moodStore.ts
│   │   └── settingsStore.ts
│   │
│   ├── hooks/                       # Custom hooks (4 files)
│   │   ├── useAuth.ts
│   │   ├── useChat.ts
│   │   ├── useMood.ts
│   │   └── useNetwork.ts
│   │
│   ├── utils/                       # Utilities (4 files)
│   │   ├── encryption.ts
│   │   ├── storage.ts
│   │   ├── dateHelpers.ts
│   │   └── validators.ts
│   │
│   ├── constants/                   # Constants (4 files)
│   │   ├── colors.ts               # Color palette
│   │   ├── typography.ts           # Font styles
│   │   ├── spacing.ts              # Spacing system
│   │   └── config.ts               # Environment config
│   │
│   ├── locales/                     # Translations (2 files)
│   │   ├── en.json                 # English translations
│   │   └── i18n.ts                 # i18n configuration
│   │
│   ├── types/                       # TypeScript types (4 files)
│   │   ├── api.types.ts
│   │   ├── user.types.ts
│   │   ├── chat.types.ts
│   │   └── mood.types.ts
│   │
│   └── assets/                      # Static assets
│       ├── images/
│       ├── icons/
│       ├── fonts/
│       └── sounds/
```

## 📊 File Summary

**Total Files Created: 64**

- Configuration files: 5
- Source code files: 59
  - API layer: 5 files
  - Components: 18 files
  - Screens: 13 files
  - Navigation: 3 files
  - State management: 4 files
  - Custom hooks: 4 files
  - Utilities: 4 files
  - Constants: 4 files
  - Type definitions: 4 files
  - Localization: 2 files

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Studio

### Installation

```bash
# Install dependencies
npm install

# Or with yarn
yarn install

# Install Expo modules
npx expo install

# Start development server
npx expo start
```

### Run on Device

```bash
# iOS
npx expo start --ios

# Android
npx expo start --android

# Web
npx expo start --web
```

## 🎨 Design System

The app uses a calming design system:

- **Primary Color**: Soft Lavender (#9FA8DA) - Calming
- **Secondary Color**: Sage Green (#A5D6A7) - Soothing
- **Accent Color**: Soft Coral (#FFAB91) - Warmth

### Design Philosophy

- **Minimalist** - Clean, uncluttered interfaces
- **Calming** - Soft colors, gentle animations
- **Accessible** - Easy navigation, large touch targets
- **Private** - Security indicators, data control

## 🌐 Localization

The app uses English with complete translations for:
- UI labels and buttons
- Onboarding flow
- Error messages
- Chat interface
- Settings and profile

## 🔐 Security Features

- End-to-end encryption for sensitive data
- Secure token storage using Expo SecureStore
- Biometric authentication support
- HTTPS-only API communication
- Automatic token refresh

## 🏗️ Architecture

### State Management

- **Zustand** for global state management
- Separate stores for auth, chat, mood, and settings
- Persistent storage using MMKV for performance

### API Integration

- Axios client with request/response interceptors
- Automatic token injection
- Error handling and retry logic
- TypeScript types for all endpoints

### Navigation

- React Navigation v6
- Stack navigation for auth flow
- Bottom tabs for main app
- Deep linking support

## 📝 Next Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   - Update API URLs in `src/constants/config.ts`
   - Add environment-specific configuration

3. **Add Assets**
   - Add app icon and splash screen
   - Add custom fonts if needed
   - Add sound files for exercises

4. **Test the App**
   ```bash
   npx expo start
   ```

5. **Build for Production**
   ```bash
   # Configure EAS Build
   eas build --platform all
   ```

## 🤝 Contributing

This app is part of the TheraBuddy project for mental health support.

## 📄 License

Private - All rights reserved

## 🙏 Acknowledgments

- Design inspired by calming aesthetic principles
- Built with React Native and Expo
- Powered by AI for therapeutic conversations

---

**Created**: October 19, 2025
**Version**: 1.0.0
**Status**: Ready for Development
