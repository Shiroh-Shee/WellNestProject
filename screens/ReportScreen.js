import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Button, RadioButton } from 'react-native-paper';

export default function ReportScreen() {
  const [location, setLocation] = useState(null);
  const [manualLocation, setManualLocation] = useState('');
  const [evidence, setEvidence] = useState(null);

  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [schoolGoing, setSchoolGoing] = useState('');
  const [incidentDate, setIncidentDate] = useState('');
  const [abuseType, setAbuseType] = useState('');
  const [incidentDescription, setIncidentDescription] = useState('');
  const [perpetrator, setPerpetrator] = useState('');
  const [condition, setCondition] = useState('');
  const [visibleInjuries, setVisibleInjuries] = useState('');
  const [injuryDescription, setInjuryDescription] = useState('');

  // 🔁 Auto-fetch location on screen load
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc.coords);
      }
    })();
  }, []);

  const fetchLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    } else {
      Alert.alert('Permission denied', 'Location permission is required to fetch GPS coordinates.');
    }
  };

  const pickEvidence = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });
    if (!result.cancelled) {
      setEvidence(result.assets[0]);
    }
  };

  const handleSubmit = () => {
    if (!age.trim()) {
      Alert.alert('Validation error', 'Please enter approximate age or age range.');
      return;
    }
    if (!gender) {
      Alert.alert('Validation error', 'Please select gender.');
      return;
    }
    if (!schoolGoing) {
      Alert.alert('Validation error', 'Please indicate if victim is school-going.');
      return;
    }
    if (!incidentDate.trim()) {
      Alert.alert('Validation error', 'Please enter the date of incident.');
      return;
    }
    if (!abuseType.trim()) {
      Alert.alert('Validation error', 'Please enter type of abuse.');
      return;
    }
    if (!incidentDescription.trim()) {
      Alert.alert('Validation error', 'Please enter description of incident.');
      return;
    }
    if (!condition) {
      Alert.alert('Validation error', 'Please select physical condition of victim.');
      return;
    }
    if (!visibleInjuries.trim()) {
      Alert.alert('Validation error', 'Please specify if there are visible injuries (Yes / No).');
      return;
    }

    const reportData = {
      fullName: fullName.trim() || 'Unknown',
      age: age.trim(),
      gender,
      schoolGoing,
      incidentDate: incidentDate.trim(),
      abuseType: abuseType.trim(),
      incidentDescription: incidentDescription.trim(),
      perpetrator: perpetrator.trim() || 'Unknown',
      location: location
        ? { latitude: location.latitude, longitude: location.longitude }
        : manualLocation.trim() || 'Unknown',
      physicalCondition: condition,
      visibleInjuries: visibleInjuries.trim(),
      injuryDescription: injuryDescription.trim() || 'None',
      evidence: evidence ? evidence.uri : null,
      submittedAt: new Date().toISOString(),
    };

    Alert.alert('Report submitted', 'Thank you for submitting the report.');

    setFullName('');
    setAge('');
    setGender('');
    setSchoolGoing('');
    setIncidentDate('');
    setAbuseType('');
    setIncidentDescription('');
    setPerpetrator('');
    setLocation(null);
    setManualLocation('');
    setCondition('');
    setVisibleInjuries('');
    setInjuryDescription('');
    setEvidence(null);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'android' ? 100 : 0}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.sectionHeader}>🧒 Victim Details</Text>
        <TextInput
          placeholder="Full Name (optional if unknown)"
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          placeholder="Approximate Age / Age Range"
          style={styles.input}
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
        <Text style={styles.radioLabel}>Gender</Text>
        <RadioButton.Group onValueChange={value => setGender(value)} value={gender}>
          <View style={styles.radioRow}>
            <RadioButton.Item label="Male" value="Male" color="#007B8A" uncheckedColor="#aaa" />
            <RadioButton.Item label="Female" value="Female" color="#007B8A" uncheckedColor="#aaa" />
          </View>
        </RadioButton.Group>

        <Text style={styles.radioLabel}>School-going?</Text>
        <RadioButton.Group onValueChange={value => setSchoolGoing(value)} value={schoolGoing}>
          <View style={styles.radioRow}>
            <RadioButton.Item label="Yes" value="Yes" color="#007B8A" uncheckedColor="#aaa" />
            <RadioButton.Item label="No" value="No" color="#007B8A" uncheckedColor="#aaa" />
            <RadioButton.Item label="Unknown" value="Unknown" color="#007B8A" uncheckedColor="#aaa" />
          </View>
        </RadioButton.Group>

        <Text style={styles.sectionHeader}>🗓️ Incident Details</Text>
        <TextInput
          placeholder="Date of Incident (e.g. 2025-06-02)"
          style={styles.input}
          value={incidentDate}
          onChangeText={setIncidentDate}
        />
        <TextInput
          placeholder="Type of Abuse (e.g. Physical, Sexual, Neglect)"
          style={styles.input}
          value={abuseType}
          onChangeText={setAbuseType}
        />
        <TextInput
          placeholder="Description of Incident"
          multiline
          style={styles.multiline}
          value={incidentDescription}
          onChangeText={setIncidentDescription}
        />
        <TextInput
          placeholder="Suspected Perpetrator (Optional)"
          style={styles.input}
          value={perpetrator}
          onChangeText={setPerpetrator}
        />

        <Text style={styles.sectionHeader}>📍 Location</Text>
        <Button onPress={fetchLocation} mode="outlined" style={styles.locationButton}>
          Use Current Location
        </Button>
        {location && (
          <Text style={styles.locationText}>
            GPS: Lat {location.latitude}, Lon {location.longitude}
          </Text>
        )}
        <TextInput
          placeholder="Edit location manually (if GPS not available)"
          value={manualLocation}
          onChangeText={setManualLocation}
          style={styles.input}
        />

        <Text style={styles.sectionHeader}>🚑 Physical Condition of Victim</Text>
        <RadioButton.Group onValueChange={value => setCondition(value)} value={condition}>
          <View style={styles.radioCol}>
            <RadioButton.Item
              label="Critical – Requires immediate medical attention"
              value="Critical"
              position="leading"
              color="#007B8A"
              uncheckedColor="#aaa"
              labelStyle={styles.radioLabelLeft}
            />
            <RadioButton.Item
              label="Emergency – Requires urgent medical attention"
              value="Emergency"
              position="leading"
              color="#007B8A"
              uncheckedColor="#aaa"
              labelStyle={styles.radioLabelLeft}
            />
            <RadioButton.Item
              label="Stable"
              value="Stable"
              position="leading"
              color="#007B8A"
              uncheckedColor="#aaa"
              labelStyle={styles.radioLabelLeft}
            />
            <RadioButton.Item
              label="Unknown"
              value="Unknown"
              position="leading"
              color="#007B8A"
              uncheckedColor="#aaa"
              labelStyle={styles.radioLabelLeft}
            />
          </View>
        </RadioButton.Group>

        <TextInput
          placeholder="Visible Injuries? (Yes / No)"
          style={styles.input}
          value={visibleInjuries}
          onChangeText={setVisibleInjuries}
        />
        <TextInput
          placeholder="Description of Injuries"
          multiline
          style={styles.multiline}
          value={injuryDescription}
          onChangeText={setInjuryDescription}
        />

        <Text style={styles.sectionHeader}>🧾 Evidence</Text>
        <Button onPress={pickEvidence} mode="outlined" style={styles.evidenceButton}>
          Upload Image/Video/Document
        </Button>
        {evidence && <Text style={styles.evidenceText}>Attached: {evidence.uri.split('/').pop()}</Text>}

        <Button mode="contained" style={styles.submitButton} onPress={handleSubmit}>
          Submit Report
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 50,
    backgroundColor: '#f5f5f5',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  multiline: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    textAlignVertical: 'top',
  },
  radioLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 10,
  },
  radioLabelLeft: {
    textAlign: 'left',
    flex: 1,
    flexWrap: 'wrap',
  },
  radioRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  radioCol: {
    flexDirection: 'column',
  },
  locationButton: {
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    marginBottom: 10,
  },
  evidenceButton: {
    marginBottom: 10,
  },
  evidenceText: {
    fontStyle: 'italic',
    fontSize: 14,
    marginBottom: 15,
  },
  submitButton: {
    marginTop: 20,
    padding: 8,
    borderRadius: 6,
  },
});
