import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fonts, IconRegisError} from '../../assets';
import {Button} from '../../components';
import Dashboard from '../Dashboard';

const RegisError = ({numberRangka, navigation}) => {
  return (
    <View style={styles.page}>
      <View style={styles.regisCompletedContainer}>
        <IconRegisError />
        <View style={styles.titleCompletedContainer}>
          <Text style={styles.titleCompleted}>
            Mohon Maaf Nomor Rangka {numberRangka}{' '}
            <Text style={styles.titleRegisError}>Tidak Ditemukan.</Text>
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Beranda"
          onPress={() => navigation.replace('Dashboard')}
        />
      </View>
    </View>
  );
};

export default RegisError;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  regisCompletedContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 156.14,
  },
  titleCompletedContainer: {
    marginTop: 60,
  },
  titleCompleted: {
    fontSize: 16,
    fontFamily: fonts.Poppins.medium,
    color: '#000000',
    width: 248,
    textAlign: 'center',
  },
  titleRegisError: {
    color: '#CA0B00',
  },
  buttonContainer: {
    paddingHorizontal: 25,
    marginTop: 128.5,
  },
});
