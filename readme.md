# Expo Speech/Text Translator with Voice Input

This is a React Native app built with Expo that allows users to enter or speak English text, translate it to major European and some African languages, and listen to the translated speech using text-to-speech.

## ✨ Features

- Input text manually or via speech (voice recognition)
- Translate using the free [LibreTranslate API](https://libretranslate.com)
- Text-to-Speech (TTS) in the target language (where supported)
- Speech-to-Text (voice-to-text) using `react-native-voice`
- Works on Android and iOS (via custom Expo Dev Client)

## 🌍 Supported Languages

- 🇫🇷 French (`fr`)
- 🇪🇸 Spanish (`es`)
- 🇩🇪 German (`de`)
- 🇮🇹 Italian (`it`)
- 🌍 Swahili (`sw`)
- 🟤 Yoruba (`yo`)
- 🟡 Hausa (`ha`)

## 🚀 Installation Instructions

### Prerequisites

- Node.js (https://nodejs.org)
- Expo CLI: `npm install -g expo-cli`
- Custom Expo Dev Client (required for voice support)

### Setup

1. Clone or download the project and navigate into it:

   ```bash
   cd ExpoSpeechTranslator
   ```

2. Install dependencies:

   ```bash
   npm install
   npx expo install react-native-voice
   ```

3. Install and build the custom dev client:

   ```bash
   npx expo install expo-dev-client
   npx expo run:android   # or: npx expo run:ios
   ```

4. Run the app:

   ```bash
   npx expo start --dev-client
   ```

## 📱 Permissions Required

### Android (`android/app/src/main/AndroidManifest.xml`)

```xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
```

### iOS (`ios/YourAppName/Info.plist`)

```xml
<key>NSMicrophoneUsageDescription</key>
<string>This app needs access to your microphone to record speech for translation.</string>
```

## ✅ Notes

- Speech recognition requires physical devices (not simulators/emulators).
- The Expo Go app does **not** support `react-native-voice`. Use a custom dev client or EAS Build.
