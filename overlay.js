// CallOverlay.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';

const CallOverlay = ({ isCallOngoing }) => {
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  useEffect(() => {
    setOverlayVisible(isCallOngoing);
  }, [isCallOngoing]);

  return (
    <Modal transparent={true} visible={isOverlayVisible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.dialogBox}>
          <Text style={styles.text}>Call is Ongoing!</Text>
          <Pressable style={styles.button} onPress={() => setOverlayVisible(false)}>
            <Text style={styles.buttonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dialogBox: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default CallOverlay; // Ensure this line is correct
