import React from 'react';

import {Button, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../Colors';
import ClientContext from '../context/client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Home, { HomeProps } from './Home';
import { RootStackParamList } from '../App';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background
  },
  text: {
    fontSize: 25,
    color: colors.foreground

  },
  button: {
    width: "95%",
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.orange,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.foreground,
    margin: 10
 }
});

type StartProps = NativeStackScreenProps<RootStackParamList, "start">;

export default function StartPage({ navigation }: StartProps): React.JSX.Element {
  const client = React.useContext(ClientContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("login", {});
        }}
      >
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log('Skip button pressed');
          client.login(null, null)
              navigation.reset({
                index: 0,
                routes: [{ name: 'home' }],
          }); 
        }}
      >
        <Text style={styles.text}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
}
