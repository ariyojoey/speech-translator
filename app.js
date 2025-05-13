import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TextInput } from 'react-native';
import * as Speech from 'expo-speech';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [language, setLanguage] = useState('fr');

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

      // Optional: speak out the translated text
      Speech.speak(data.translatedText, { language });
    } catch (error) {
      console.error('Translation error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Speech/Text to Translator</Text>

      <Text style={styles.label}>Enter or Paste English Text:</Text>
      <TextInput
        multiline
        style={styles.input}
        placeholder="Type or paste English text here"
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
