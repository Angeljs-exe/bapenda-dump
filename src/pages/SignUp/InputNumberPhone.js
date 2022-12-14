import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';

const InputNumberPhone = ({placeholder, onChangeText, value}) => {
  return (
    <>
      <View style={styles.inputStyle}>
        <TextInput
          placeholder={placeholder}
          keyboardType="number-pad"
          onChangeText={onChangeText}
          value={value}
        />
      </View>
    </>
  );
};

export default InputNumberPhone;

const styles = StyleSheet.create({
  inputStyle: {
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#C6C6C6',
    height: 41,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    flex: 1,
  },
});
