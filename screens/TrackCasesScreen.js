import React from 'react'; 
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Card, Divider, useTheme, Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const dummyCases = [
  {
    id: '1',
    status: 'Resolved',
    category: 'Physical Abuse',
    location: 'Gatundu South, Gachika Village',
    description: 'Child was repeatedly beaten by a family member.',
    victim: '10-year-old girl',
    dateReported: '2025-05-15',
    kcdcsUpdate: {
      medical: [
        'Child was taken to Kiambu Level 5 Hospital.',
        'A full medical assessment confirmed soft tissue injuries.',
        'Child admitted for overnight monitoring and treatment.'
      ],
      mentalHealth: [
        'Mental health trauma counseling provided to support recovery.',
        'Number of counseling sessions recommended by psychologist/counselor: 8 sessions.',
        'Sessions conducted weekly by a licensed child mental health provider.',
        'Ongoing assessment to monitor psychological progress and adapt support.'
      ],
      legal: [
        'KCDCS invoked Section 120 of the Children Act (2022).',
        'Coordinated with local police to arrest the perpetrator.',
        'A temporary safe custody order was obtained from Kiambu Children’s Court.',
        'The case was heard, and the abuser was convicted.'
      ],
      currentStatus: [
        'Case closed.',
        'Child permanently placed with a foster guardian.',
        'Follow-up by Kiambu KCDCS completed.'
      ],
      lastUpdated: '2025-05-30',
    },
  },
  {
    id: '2',
    status: 'In Court',
    category: 'Sexual Abuse',
    location: 'Thika Town, Section 9',
    description: 'Reported case of sexual assault by a neighbor.',
    victim: '13-year-old boy',
    dateReported: '2025-05-20',
    kcdcsUpdate: {
      medical: [
        'Child was referred to Nairobi Women’s Hospital GVRC for forensic examination.',
        'Medical report and evidence preserved under chain-of-custody.'
      ],
      mentalHealth: [
        'Weekly trauma counseling initiated to address mental health needs.',
        'Number of sessions planned: 12, to be adjusted based on ongoing evaluations.',
        'Counseling provided by certified trauma psychologists.',
        'Family included in psychosocial support sessions.'
      ],
      legal: [
        'KCDCS filed an urgent protection order.',
        'Supported the child’s statement to the police.',
        'The accused was arrested and charged under the Sexual Offences Act (2006).',
        'The case is currently under trial at Thika Law Courts.'
      ],
      currentStatus: [
        'Child is receiving ongoing psychosocial support.',
        'Victim and family enrolled in KCDCS mental health programs.'
      ],
      lastUpdated: '2025-06-01',
    },
  },
  {
    id: '3',
    status: 'Ongoing',
    category: 'Neglect',
    location: 'Ruiru, Kihunguro',
    description: 'Child left alone for long hours without food.',
    victim: '5-year-old girl',
    dateReported: '2025-06-01',
    kcdcsUpdate: {
      medical: [
        'Initial screening revealed moderate acute malnutrition.',
        'Nutritional rehabilitation commenced at Ruiru Sub-County Hospital.',
        'Daily feeding and health monitoring ongoing.'
      ],
      mentalHealth: [
        'Mental health counseling provided to address emotional trauma.',
        'Sessions scheduled bi-weekly, focusing on trauma and attachment issues.',
        'Caregiver involvement encouraged to support child’s emotional wellbeing.'
      ],
      legal: [
        'KCDCS initiated a Child in Need of Care and Protection inquiry under Section 119 of the Children Act.',
        'Investigations into the caregiver’s history are ongoing.'
      ],
      currentStatus: [
        'Monitoring visits by the Community Health Promoter continue.',
        'Caregiver undergoing mandatory parenting sessions with social worker supervision.'
      ],
      lastUpdated: '2025-06-02',
    },
  },
];

const getStatusColor = (status, colors) => {
  switch (status) {
    case 'Resolved':
      return colors.primary;
    case 'In Court':
      return '#FFA500'; // orange
    case 'Ongoing':
      return '#FF5252'; // red
    default:
      return colors.backdrop;
  }
};

function renderBulletPoints(points) {
  return points.map((point, index) => (
    <View key={index} style={styles.bulletPointContainer}>
      <Text style={styles.bulletPoint}>{'\u2022'}</Text>
      <Text style={styles.bulletText}>{point}</Text>
    </View>
  ));
}

export default function TrackCasesScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>My Reported Cases</Text>

        {dummyCases.map((item) => (
          <Card key={item.id} style={styles.card}>
            <Card.Title
              title={item.category}
              subtitle={`Victim: ${item.victim}`}
              left={() => (
                <MaterialCommunityIcons
                  name="alert-circle"
                  size={30}
                  color={colors.primary}
                  style={{ marginLeft: 8 }}
                />
              )}
              right={() => (
                <Chip
                  style={{
                    backgroundColor: getStatusColor(item.status, colors),
                    marginRight: 10,
                  }}
                  textStyle={{ color: '#fff', fontWeight: 'bold' }}
                >
                  {item.status}
                </Chip>
              )}
            />
            <Card.Content style={styles.cardContent}>
              <Text style={styles.label}>Date Reported:</Text>
              <Text>{item.dateReported}</Text>

              <Text style={styles.label}>Location:</Text>
              <Text>{item.location}</Text>

              <Text style={styles.label}>Description:</Text>
              <Text>{item.description}</Text>

              <Divider style={{ marginVertical: 14 }} />

              <Text style={styles.sectionTitle}>KCDCS Officer Updates</Text>

              <Text style={styles.subHeader}>Medical Support:</Text>
              {renderBulletPoints(item.kcdcsUpdate.medical)}

              <Text style={styles.subHeader}>Mental Health Trauma Counseling:</Text>
              {renderBulletPoints(item.kcdcsUpdate.mentalHealth)}

              <Text style={styles.subHeader}>Legal Follow-up:</Text>
              {renderBulletPoints(item.kcdcsUpdate.legal)}

              <Text style={styles.subHeader}>Current Status:</Text>
              {renderBulletPoints(item.kcdcsUpdate.currentStatus)}

              <Text style={styles.subHeader}>Last Updated:</Text>
              <Text>{item.kcdcsUpdate.lastUpdated}</Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  card: {
    marginBottom: 24,
    borderRadius: 12,
    elevation: 4,
    paddingBottom: 16,
  },
  cardContent: {
    paddingBottom: 12,
  },
  label: {
    fontWeight: '600',
    marginTop: 10,
    color: '#444',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 8,
    color: '#6200EE',
  },
  subHeader: {
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 12,
    marginBottom: 6,
    color: '#1a1a1a',
  },
  bulletPointContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
    paddingLeft: 12,
  },
  bulletPoint: {
    fontSize: 18,
    lineHeight: 22,
    marginRight: 8,
    color: '#6200EE',
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
});
