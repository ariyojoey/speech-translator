// Android permission (AndroidManifest.xml):
// <uses-permission android:name="android.permission.RECORD_AUDIO" />

// iOS permission (Info.plist):
// <key>NSMicrophoneUsageDescription</key>
// <string>This app needs access to your microphone to record speech for translation.</string>


import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import * as Speech from 'expo-speech';
import { Picker } from '@react-native-picker/picker';
import Voice from '@react-native-voice/voice';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [language, setLanguage] = useState('fr');
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (event) => {
    const results = event.value;
    if (results && results.length > 0) {
      setInputText(results[0]);
    }
  };

  const onSpeechError = (event) => {
    console.error('Speech recognition error:', event.error);
    Alert.alert('Error', 'Speech recognition failed.');
  };

  const startRecording = async () => {
    try {
      setIsRecording(true);
      await Voice.start('en-US');
    } catch (error) {
      console.error('Start recording error:', error);
      Alert.alert('Error', 'Could not start speech recognition.');
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setIsRecording(false);
    } catch (error) {
      console.error('Stop recording error:', error);
    }
  };

  const translateText = async () => {
    try {
      const response = await fetch('https://libretranslate.com/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: inputText,
          source: 'en',
          target: language,
          format: 'text',
        }),
      });

      const data = await response.json();
      setTranslatedText(data.translatedText);
      Speech.speak(data.translatedText, { language });
    } catch (error) {
      console.error('Translation error:', error);
      Alert.alert('Error', 'Translation failed.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Speech/Text Translator</Text>

      <Button
        title={isRecording ? 'Stop Recording' : 'Record Speech'}
        onPress={isRecording ? stopRecording : startRecording}
        color={isRecording ? 'red' : 'green'}
      />

      <Text style={styles.label}>Enter or Paste English Text:</Text>
      <TextInput
        multiline
        style={styles.input}
        placeholder="Type or speak English text"
        value={inputText}
        onChangeText={setInputText}
      />

      <Text style={styles.label}>Translate to:</Text>
      <Picker selectedValue={language} onValueChange={(itemValue) => setLanguage(itemValue)}>
        <Picker.Item label="French" value="fr" />
        <Picker.Item label="Spanish" value="es" />
        <Picker.Item label="German" value="de" />
        <Picker.Item label="Italian" value="it" />
        <Picker.Item label="Swahili" value="sw" />
        <Picker.Item label="Yoruba" value="yo" />
        <Picker.Item label="Hausa" value="ha" />
      </Picker>

      <Button title="Translate" onPress={translateText} />

      <Text style={styles.label}>Translated Text:</Text>
      <ScrollView style={styles.output}>
        <Text>{translatedText}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 16, marginTop: 20 },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10, minHeight: 60,
    marginTop: 5, borderRadius: 5,
  },
  output: {
    marginTop: 10,
    borderWidth: 1, borderColor: '#ccc',
    padding: 10, minHeight: 60,
    borderRadius: 5,
  },
});
