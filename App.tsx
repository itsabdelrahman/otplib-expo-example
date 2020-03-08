global.Buffer = global.Buffer || require('buffer').Buffer;

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { totpToken, totpOptions } from '@otplib/core';
import { createDigest } from '@otplib/plugin-crypto-js';

export default function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const secret = 'CFNMN7VBAIC5XYVG';

      const totp = totpToken(
        secret,
        totpOptions({
          createDigest,
        }),
      );

      setToken(totp);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.token}>{token}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  token: {
    fontSize: 40,
  },
});
