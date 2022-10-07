import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {fonts, LgApple, LgGoogle, LgPhone} from '../../assets';
import React, {useEffect, useState} from 'react';
import {
  Button,
  CheckBoxx,
  Loading,
  Password,
  TextInput,
} from '../../components';

import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {storeData} from '../../utils';

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [useData, setUseData] = useState({});

  const [loading, setLoading] = useState(false);

  const googleSignIn = async () => {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };

  // const signOut = async () => {
  //   try {
  //     await GoogleSignin.revokeAccess();
  //     await auth().signOut();
  //     console.log('Sign out success');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const submitCreateAccount = () => {
    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(google => {
        setEmail(google.user.uid);
        setLoading(false);
        const data = {
          email: email,
          uid: google.user.uid,
        };

        const phoneNumber = '';
        storeData('user', data);
        console.log('res: ', data);
        navigation.replace('PersonalData', data, {email, phoneNumber});
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '92751038746-eid3u1dtpf5bet826ri12lt0sd9t3d46.apps.googleusercontent.com',
    });
  }, []);

  return (
    <>
      <SafeAreaView style={styles.page}>
        <View style={styles.titleWelcomeContainer}>
          <Text style={styles.textWelcome}>Daftarkan Akun Anda</Text>
          <Text style={styles.subText}>Silahkan membuat akun anda</Text>
          <View style={styles.wrapperContent}>
            <TextInput
              title={'Email'}
              placeholder={'Masukan email anda'}
              value={email}
              onChangeText={text => setEmail(text)}
            />
            <Password
              title={'Kata Sandi'}
              placeholder={'Masukkan kata sandi'}
              value={password}
              onChangeText={text => setPassword(text)}
            />
            <View style={styles.checkBoxContainer}>
              <CheckBoxx />
            </View>
            <Button title={'Daftar'} onPress={() => submitCreateAccount()} />
          </View>
          <View style={styles.orContainer}>
            <View style={styles.line} />
            <Text style={styles.titleOr}>Atau</Text>
            <View style={styles.line} />
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('Otp')}>
            <View style={styles.signInContainer}>
              <View style={styles.wrapperSignIn}>
                <LgPhone />
                <Text style={styles.titleSignIn}>
                  Masuk dengan nomor telepon
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              googleSignIn()
                .then(google => {
                  setUseData(google.user.email);
                  // console.log('res user', res.user.email);
                  const data = {
                    gEmail: google.user.email,
                    uid: google.user.uid,
                  };
                  storeData('user', data);
                  // console.log('data', data);
                  // console.log('nav', navigation);
                  navigation.replace('PersonalData', data);
                })
                .catch(error => console.log(error))
            }>
            <View style={styles.signInContainer}>
              <View style={styles.wrapperSignIn}>
                <LgGoogle />
                <Text style={styles.titleSignIn}>Masuk Dengan Google</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <View style={styles.signInContainer}>
              <View style={styles.wrapperSignIn}>
                <LgApple />
                <Text style={styles.titleSignIn}>Masuk Dengan Apple</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* <TouchableOpacity activeOpacity={0.5} 
          onPress={signOut}>
            <View style={styles.wrapperButtonGoogle}>
              <View style={styles.containerLgGoogle}>
                <LgGoogle />
                <View style={styles.titleGoogleContainer}>
                  <Text style={styles.titleGoogle}>
                    Keluar Dari Akun Google
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity> */}
        </View>
        <View style={styles.loginContainer}>
          <View style={styles.wrapperLoginContainer}>
            <Text style={styles.wrapperLogin}>Sudah memiliki akun?</Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate('Login')}>
              <Text style={styles.textLogin}> Masuk</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      {loading && <Loading />}
    </>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  titleWelcomeContainer: {
    paddingVertical: 60,
    paddingHorizontal: 25,
  },
  textWelcome: {
    fontSize: 24,
    fontFamily: fonts.Poppins.semibold,
    color: '#242424',
  },
  subText: {
    fontSize: 12,
    fontFamily: fonts.Poppins.regular,
    color: '#9E9E9E',
  },
  wrapperContent: {
    marginTop: 40,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 13,
  },
  titleForgetPass: {
    fontSize: 12,
    fontFamily: fonts.Poppins.medium,
    textDecorationLine: 'underline',
    color: '#3F96CD',
  },
  orContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  line: {
    borderTopWidth: 0.5,
    borderColor: '#000000',
    width: 140,
    paddingHorizontal: 25,
    marginTop: 10,
  },
  titleOr: {
    fontSize: 14,
    fontFamily: fonts.Poppins.semibold,
    color: '#999EA1',
  },
  signInContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#C6C6C6',
    width: '100%',
    height: 44,
    justifyContent: 'center',
    marginTop: 15,
  },
  wrapperSignIn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleSignIn: {
    fontSize: 14,
    fontFamily: fonts.Poppins.medium,
    color: '#242424',
    marginLeft: 10,
  },
  loginContainer: {
    flex: 1,
  },
  wrapperLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  wrapperLogin: {
    fontSize: 14,
    fontFamily: fonts.Poppins.regular,
    color: '#000000',
  },
  textLogin: {
    fontFamily: fonts.Poppins.semibold,
    color: '#00ADF8',
  },
});
