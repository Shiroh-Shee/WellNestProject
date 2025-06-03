import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  TextInput,
  Button,
  Text,
  Avatar,
  Checkbox,
  RadioButton,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import subcounties from '../data/subCounties';

const CompleteProfileScreen = () => {
  const navigation = useNavigation();

  // Profile Fields
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [surname, setSurname] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [subcounty, setSubcounty] = useState('');
  const [ward, setWard] = useState('');
  const [village, setVillage] = useState('');
  const [role, setRole] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [agreed, setAgreed] = useState(false);

  // Role-specific fields
  const [schoolName, setSchoolName] = useState('');
  const [teachingYears, setTeachingYears] = useState('');
  const [healthFacility, setHealthFacility] = useState('');
  const [areaAllocatedTo, setAreaAllocatedTo] = useState('');
  const [communityRole, setCommunityRole] = useState('');

  const [wardOptions, setWardOptions] = useState([]);

  useEffect(() => {
    if (subcounty) {
      const selected = subcounties.find((s) => s.name === subcounty);
      setWardOptions(selected ? selected.wards : []);
      setWard(''); // reset ward when subcounty changes
    }
  }, [subcounty]);

  const validateDate = (date) => {
    const regex = /^(\d{2})-(\d{2})-(\d{4})$/;
    const match = date.match(regex);
    if (!match) return false;
    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const year = parseInt(match[3], 10);
    if (
      day < 1 ||
      day > 31 ||
      month < 1 ||
      month > 12 ||
      year < 1900 ||
      year > 2100
    )
      return false;
    return true;
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'Permission to access photos is required.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.5,
      allowsEditing: true,
    });
    if (!result.canceled) {
      setProfilePhoto(result.assets[0].uri);
    }
  };

  const validateAndSave = async () => {
    if (!profilePhoto)
      return Alert.alert('Missing Photo', 'Please upload your profile photo.');

    if (
      !role ||
      !firstName ||
      !surname ||
      !dob ||
      !gender ||
      !nationalId ||
      !phoneNumber ||
      !subcounty ||
      !ward ||
      !village ||
      !agreed
    ) {
      return Alert.alert(
        'Missing Fields',
        'Please fill all required fields and agree to the declaration.'
      );
    }

    // Validate role-specific mandatory fields
    if (role === 'Teacher' && (!schoolName || !teachingYears)) {
      return Alert.alert(
        'Missing Fields',
        'Please fill all Teacher-specific fields.'
      );
    }

    if (role === 'Community Health Promoter' && (!healthFacility || !areaAllocatedTo)) {
      return Alert.alert(
        'Missing Fields',
        'Please fill all Community Health Promoter-specific fields.'
      );
    }

    if (role === 'Community Leader' && !communityRole) {
      return Alert.alert(
        'Missing Fields',
        'Please fill all Community Leader-specific fields.'
      );
    }

    if (!/^\d{10}$/.test(phoneNumber))
      return Alert.alert('Invalid Phone', 'Phone number must be 10 digits.');

    if (!/^\d+$/.test(nationalId))
      return Alert.alert('Invalid ID', 'National ID must contain only numbers.');

    if (!validateDate(dob))
      return Alert.alert(
        'Invalid Date',
        'Date must be in DD-MM-YYYY format and valid.'
      );

    const profileData = {
      firstName,
      middleName,
      surname,
      dob,
      gender,
      nationalId,
      phoneNumber,
      email,
      subcounty,
      ward,
      village,
      role,
      profilePhoto,
      agreed,
      ...(role === 'Teacher' && { schoolName, teachingYears }),
      ...(role === 'Community Health Promoter' && { healthFacility, areaAllocatedTo }),
      ...(role === 'Community Leader' && { communityRole }),
    };

    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify(profileData));
      await AsyncStorage.setItem('hasCompletedProfile', 'true');
      navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Error', 'Failed to save your profile.');
    }
  };

  const skipForNow = () => {
    navigation.reset({
  index: 0,
  routes: [{ name: 'MainTabs', state: { index: 0, routes: [{ name: 'Home' }] } }],
});

  };

  // Helper for mandatory label with red asterisk
  const MandatoryLabel = ({ label }) => (
    <Text>
      {label}
      <Text style={{ color: '#d00' }}> *</Text>
    </Text>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 80}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ padding: 20 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              {profilePhoto ? (
                <Avatar.Image size={100} source={{ uri: profilePhoto }} />
              ) : (
                <Avatar.Icon size={100} icon="account" />
              )}
              <Button onPress={pickImage} mode="outlined" style={{ marginTop: 10 }}>
                Upload Profile Photo <Text style={{ color: '#d00' }}>*</Text>
              </Button>
            </View>

            <Text style={{ marginTop: 10 }}>
              <MandatoryLabel label="Role" />
            </Text>
            <Picker selectedValue={role} onValueChange={setRole}>
              <Picker.Item label="Select Role" value="" />
              <Picker.Item label="Teacher" value="Teacher" />
              <Picker.Item label="Community Health Promoter" value="Community Health Promoter" />
              <Picker.Item label="Community Leader" value="Community Leader" />
            </Picker>

            <TextInput
              label={<MandatoryLabel label="First Name" />}
              value={firstName}
              onChangeText={setFirstName}
              mode="outlined"
              style={{ marginTop: 10 }}
            />
            <TextInput
              label="Middle Name"
              value={middleName}
              onChangeText={setMiddleName}
              mode="outlined"
              style={{ marginTop: 10 }}
            />
            <TextInput
              label={<MandatoryLabel label="Surname" />}
              value={surname}
              onChangeText={setSurname}
              mode="outlined"
              style={{ marginTop: 10 }}
            />
            <TextInput
              label={<MandatoryLabel label="Date of Birth (DD-MM-YYYY)" />}
              value={dob}
              onChangeText={setDob}
              mode="outlined"
              style={{ marginTop: 10 }}
            />

            <Text style={{ marginTop: 10 }}>
              <MandatoryLabel label="Gender" />
            </Text>
            <RadioButton.Group onValueChange={setGender} value={gender}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton value="Male" />
                <Text style={{ marginRight: 20 }}>Male</Text>
                <RadioButton value="Female" />
                <Text>Female</Text>
              </View>
            </RadioButton.Group>

            <TextInput
              label={<MandatoryLabel label="National ID Number" />}
              value={nationalId}
              onChangeText={setNationalId}
              mode="outlined"
              keyboardType="numeric"
              style={{ marginTop: 10 }}
            />
            <TextInput
              label={<MandatoryLabel label="Phone Number (07xxxxxxxx)" />}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              mode="outlined"
              keyboardType="phone-pad"
              style={{ marginTop: 10 }}
            />
            <TextInput
              label="Email (optional)"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              keyboardType="email-address"
              style={{ marginTop: 10 }}
            />

            <Text style={{ marginTop: 10 }}>
              <MandatoryLabel label="Sub-County" />
            </Text>
            <Picker selectedValue={subcounty} onValueChange={setSubcounty}>
              <Picker.Item label="Select Sub-County" value="" />
              {subcounties.map((s) => (
                <Picker.Item key={s.name} label={s.name} value={s.name} />
              ))}
            </Picker>

            <Text style={{ marginTop: 10 }}>
              <MandatoryLabel label="Ward" />
            </Text>
            <Picker selectedValue={ward} onValueChange={setWard} enabled={wardOptions.length > 0}>
              <Picker.Item label="Select Ward" value="" />
              {wardOptions.map((w) => (
                <Picker.Item key={w} label={w} value={w} />
              ))}
            </Picker>

            <TextInput
              label={<MandatoryLabel label="Village" />}
              value={village}
              onChangeText={setVillage}
              mode="outlined"
              style={{ marginTop: 10 }}
            />

            {role === 'Teacher' && (
              <>
                <TextInput
                  label={<MandatoryLabel label="School Name" />}
                  value={schoolName}
                  onChangeText={setSchoolName}
                  mode="outlined"
                  style={{ marginTop: 10 }}
                />
                <TextInput
                  label={<MandatoryLabel label="Years of Teaching" />}
                  value={teachingYears}
                  onChangeText={setTeachingYears}
                  mode="outlined"
                  keyboardType="numeric"
                  style={{ marginTop: 10 }}
                />
              </>
            )}

            {role === 'Community Health Promoter' && (
              <>
                <TextInput
                  label={<MandatoryLabel label="Health Facility Name" />}
                  value={healthFacility}
                  onChangeText={setHealthFacility}
                  mode="outlined"
                  style={{ marginTop: 10 }}
                />
                <TextInput
                  label={<MandatoryLabel label="Area Allocated To" />}
                  value={areaAllocatedTo}
                  onChangeText={setAreaAllocatedTo}
                  mode="outlined"
                  style={{ marginTop: 10 }}
                />
              </>
            )}

            {role === 'Community Leader' && (
              <TextInput
                label={<MandatoryLabel label="Community Role" />}
                value={communityRole}
                onChangeText={setCommunityRole}
                mode="outlined"
                style={{ marginTop: 10 }}
              />
            )}

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
              <Checkbox.Android
                status={agreed ? 'checked' : 'unchecked'}
                onPress={() => setAgreed(!agreed)}
              />
              <Text>
                I declare that the information provided is accurate and complete.
                <Text style={{ color: '#d00' }}> *</Text>
              </Text>
            </View>

            <Button
              mode="contained"
              onPress={validateAndSave}
              style={{ marginTop: 30 }}
            >
              Save Profile
            </Button>
            <Button
              mode="text"
              onPress={skipForNow}
              style={{ marginTop: 10 }}
            >
              Skip for Now
            </Button>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CompleteProfileScreen;
