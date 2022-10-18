import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fonts, IconVehicleDashboard} from '../../assets';
import {Button, HomeProfile} from '../../components';
import NewsSamsatCard from './NewsSamsatCard';
import RegisterVehicleCard from './RegisterVehicleCard';
import {getData} from '../../utils';
import {baseUrl} from '../../utils/config';
import axios from 'axios';

const Dashboard = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [touchAdd, setTouchAdd] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
  });
  const [listDetail, setListDetail] = useState();
  console.log('list', listDetail);
  // const [checkVehicle, setCheckVehicle] = useState({

  // });

  const touchAddSubmit = () => {
    navigation.navigate('AddVehicle');
  };

  const getDataUser = () => {
    getData('user').then(res => {
      setProfile(res);
      if (!res.name && !res.email) {
        // user login with email
        const data = {
          gEmail: res.gEmail,
          uid: res.uid,
          phoneNumber: res.phoneNumber,
        };
        navigation.replace('PersonalData', data);
      } else if (res.name === '' && (!res.email || !res.gEmail)) {
        // user login with phone number
        const data = {
          phoneNumber: res.phoneNumber,
          uid: res.uid,
        };
        const email = '';
        navigation.replace('PersonalData', data, {phoneNumber, email});
      }
    });
  };

  const checkCondition = () => {
    getData('user').then(res => {
      console.log('hehe', res);
      axios
        .get(`${baseUrl}/api/posts/vehicle/${res.id}`)
        .then(response => {
          setListDetail(response);
          console.log('response db', response.data[response.data.length - 1]);
          if (response.data.length === 0) {
            setTouchAdd(false);
          } else {
            setTouchAdd(true);
          }
        })
        .catch(error => {
          console.log(error);
        });
    });
  };

  useEffect(() => {
    // navigation.addListener('focus', () => {
    getDataUser();
    checkCondition();
    // });
  }, []);

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.pageDashboard}>
        <View style={styles.profileContainer}>
          <HomeProfile
            profile={profile}
            onPress={() => navigation.navigate('Profile')}
          />
          <View style={styles.notifContainer}>
            <Button
              click="iconOnly"
              icon="iconNotif"
              onPress={() => navigation.navigate('Notification')}
            />
            <View style={styles.notif}>
              <Text style={styles.titleNotif}>{}</Text>
            </View>
          </View>
        </View>
        {/* <View style={styles.locationContainer}>
          <Button click="iconOnly" icon="iconLocation" />
          <Text style={styles.titleLocation}>
            Airmadidi, Minahasa Utara, Sulawesi Utara
          </Text>
        </View> */}
        <View style={styles.registerVehicleContainer}>
          <View style={styles.wrapperRegister}>
            <Text style={styles.registerVehicleTitle}>Daftar Kendaraan</Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.replace('ListVehicle')}>
              <Text style={styles.titleLook}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>
        </View>
        {touchAdd && (
          <RegisterVehicleCard
            onPress={() => navigation.navigate('DetailsVehicle')}
          />
        )}
        {!touchAdd && (
          <View>
            <View style={styles.iconVehicleDashboardContainer}>
              <IconVehicleDashboard />
            </View>
            <View style={styles.wrapperAddContainer}>
              <Text style={styles.wrapperAdd}>
                Silahkan tambahkan kendaraan anda.
              </Text>
              <TouchableOpacity activeOpacity={0.5} onPress={touchAddSubmit}>
                <Text style={styles.textAdd}> Tambah</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View style={styles.newsContainer}>
          <Text style={styles.titleNews}>Berita Samsat</Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.replace('News')}>
            <Text style={styles.titleLook}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>
      </View>
      <NewsSamsatCard navigation={navigation} />
      <View style={styles.buttomHeight} />
      <View style={styles.buttom}>
        <Button
          click="iconOnly"
          icon="iconHome"
          onPress={() => navigation.replace('Dashboard')}
        />
        <Button
          click="iconOnly"
          icon="iconAddVehicle"
          onPress={() => navigation.replace('AddVehicle')}
        />
        <Button
          click="iconOnly"
          icon="iconListVehicle"
          onPress={() => navigation.replace('ListVehicle')}
        />
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  pageDashboard: {
    paddingHorizontal: 20,
    marginTop: 15,
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notifContainer: {
    width: 30,
    height: 30,
  },
  notif: {
    backgroundColor: '#ED1616',
    position: 'absolute',
    width: 13,
    height: 13,
    borderRadius: 15,
    top: -5,
    left: 15,
  },
  titleNotif: {
    fontSize: 12,
    fontFamily: fonts.Poppins.regular,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 17,
  },
  titleLocation: {
    fontSize: 12,
    fontFamily: fonts.Poppins.regular,
    color: '#242424',
    marginLeft: 10,
  },
  registerVehicleContainer: {
    marginTop: 25,
  },
  wrapperRegister: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  registerVehicleTitle: {
    fontSize: 16,
    fontFamily: fonts.Poppins.medium,
    color: '#242422',
  },
  iconVehicleDashboardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  wrapperAddContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  wrapperAdd: {
    fontSize: 14,
    fontFamily: fonts.Poppins.regular,
    color: '#2E2E2E',
  },
  textAdd: {
    fontFamily: fonts.Poppins.semibold,
    color: '#9C1C21',
  },
  newsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 56,
  },
  titleNews: {
    fontSize: 16,
    fontFamily: fonts.Poppins.medium,
    color: '#242424',
  },
  titleLook: {
    fontSize: 12,
    fontFamily: fonts.Poppins.regular,
    color: '#9B9B9B',
    textDecorationLine: 'underline',
  },
  buttomHeight: {
    height: 40,
  },
  buttom: {
    backgroundColor: '#9A0000',
    width: '100%',
    height: 68,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 20,
    paddingHorizontal: 60,
  },
});
