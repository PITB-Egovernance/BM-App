// UserDetails.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserDetails = ({ route }) => {
  const { name, cnic, tehsil, category, assign_to, ddverify } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.text}>{name}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>CNIC:</Text>
        <Text style={styles.text}>{cnic}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Tehsil:</Text>
        <Text style={styles.text}>{tehsil}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Category:</Text>
        <Text style={styles.text}>{category}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Assign To:</Text>
        <Text style={styles.text}>{assign_to}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>DD Verify:</Text>
        <Text style={styles.text}>{ddverify || 'Non-verified'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#EBF1F1',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  text: {
    fontSize: 16,
    marginTop: 5,
    color: 'black',
  },
});

export default UserDetails;
