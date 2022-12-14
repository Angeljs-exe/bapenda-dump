import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, Header} from '../../components';
import {
  fonts,
  IconEditPass,
  IconEditProfile,
  IconFAQs,
  IconProfilePhoto,
} from '../../assets';

const Profile = ({navigation}) => {
  return (
    <SafeAreaView style={styles.page}>
      <Header title="Profile" onBack={() => navigation.navigate('Dashboard')} />
      <View style={styles.profileContainer}>
        <IconProfilePhoto />
        <View style={styles.titleContainer}>
          <Text style={styles.titleName}>Name</Text>
          <Text style={styles.titleLastPayment}>Last Payment</Text>
        </View>
      </View>
      <View>
        <View style={styles.line} />
        <View style={styles.menuContainer}>
          <IconEditProfile />
          <View style={styles.textMenuContainer}>
            <Text style={styles.titleMenu}>Edit Profil</Text>
            <Button
              click="iconOnly"
              icon="iconArrow"
              onPress={() => navigation.navigate('EditProfile')}
            />
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.menuContainer}>
          <IconEditPass />
          <View style={styles.textMenuContainer}>
            <Text style={styles.titleMenu}>Pengaturan Kata Sandi</Text>
            <Button
              click="iconOnly"
              icon="iconArrow"
              onPress={() => navigation.navigate('EditPassword')}
            />
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.menuContainer}>
          <IconFAQs />
          <View style={styles.textMenuContainer}>
            <Text style={styles.titleMenu}>FAQs</Text>
            <Button
              click="iconOnly"
              icon="iconArrow"
              onPress={() => navigation.navigate('Faqs')}
            />
          </View>
        </View>
        <View style={styles.line} />
      </View>
      <View style={styles.button}>
        <Button title={'Keluar'} />
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 45 / 2,
  },
  titleContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  titleName: {
    fontSize: 18,
    fontFamily: fonts.Poppins.semibold,
    color: '#242424',
  },
  titleLastPayment: {
    fontSize: 12,
    fontFamily: fonts.Poppins.regular,
    color: '#75757580',
    marginBottom: 40,
  },
  line: {
    borderWidth: 1,
    borderColor: '#F5E6E6',
  },
  menuContainer: {
    paddingHorizontal: 25,
    paddingVertical: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textMenuContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 40,
  },
  titleMenu: {
    fontSize: 16,
    fontFamily: fonts.Poppins.regular,
    color: '#000000',
  },
  button: {
    paddingHorizontal: 25,
    marginTop: 143 / 2,
  },
});
