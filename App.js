import React, { useRef, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';

export default function App() {
  const [phoneValue, setPhoneValue] = useState(null)
  const [isValidNumber, setIsValidNumber] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  
  const phoneRef = useRef(null);
  const countryPickerRef = useRef(null);

  const onPressFlag = () => {
    setIsVisible(true);
  }

  const selectCountry = (country) => {
    phoneRef.current.selectCountry(country.cca2.toLowerCase());
  }

  return (
    <View style={styles.container}>
      <PhoneInput
        style={styles.phoneInput}
        ref={phoneRef}
        autoFormat
        onChangePhoneNumber={value => {
          setPhoneValue(value);
          setIsValidNumber(phoneRef.current.isValidNumber())
        }}
        onPressFlag={onPressFlag}
        
      />
      <CountryPicker
        ref={countryPickerRef}
        onSelect={value => selectCountry(value)}
        translation="eng"
        visible={isVisible}
        onClose={() => setIsVisible(false)}
      />
      <Text>Is Valid Number: {isValidNumber ? 'Yes' : 'No'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  phoneInput: {
    borderColor: '#ddd',
    borderWidth: 2,
    borderRadius: 2,
    padding: 16
  },
});