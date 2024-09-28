import React, { useEffect, useState } from 'react';
import { NativeEventEmitter, NativeModules, PermissionsAndroid } from 'react-native';
import Overlay from './overlay'; // Adjust the path if necessary

const App = () => {
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  useEffect(() => {
    const requestOverlayPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.SYSTEM_ALERT_WINDOW,
          {
            title: 'Overlay Permission',
            message: 'This app needs permission to display overlays on other apps.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Overlay permission granted');
        } else {
          console.log('Overlay permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestOverlayPermission();

    const { CallReceiver } = NativeModules;
    const eventEmitter = new NativeEventEmitter(CallReceiver);

    const eventListener = eventEmitter.addListener('callStateChanged', (state) => {
      if (state === 'ringing') {
        setOverlayVisible(true); // Show overlay when the call is ringing
      }
    });

    return () => {
      eventListener.remove();
    };
  }, []);

  return (
    <>
      <Overlay
        isVisible={isOverlayVisible}
        onClose={() => setOverlayVisible(false)} // Close overlay
      />
    </>
  );
};

export default App;
