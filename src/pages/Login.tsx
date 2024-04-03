import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../App';
import colors from '../Colors';
import ClientContext from '../context/client';

type LoginProps = NativeStackScreenProps<RootStackParamList, "login">

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignContent: 'center',
    },
    text: {
        fontSize: 30,
        color: '#FFFFFF',
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
    },
    align: {
        width: "95%",
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    textInput: {
        borderStyle: 'dotted',
        borderColor: colors.orange,
        borderWidth: 1,
    }
});

export default function Login({ navigation }: LoginProps) {
    const [username, setUsername] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [error, setError] = React.useState<string>('')
    const client = React.useContext(ClientContext);

    useEffect(() => {
        const loginListener = () => {
            if (typeof client.user === 'undefined' || client.user === null) {
                setError('Failed to login. Please try again.');
                return;
            };
            client.off('login', loginListener);
            setError("You have logged in successfully!")
            navigation.reset({
                index: 0,
                routes: [{ name: 'home' }],
            });
        };

        const errorListener = (err: Error) => {
            setError('Failed to login. Please try again.');
        }

        client.onLogin(loginListener);
        client.on('.error', errorListener);
        return () => {
            client.off('login', loginListener);
            client.off('.error', errorListener);
        }
    }, []);

    return (
        <View style={styles.container}>
            <Text>Login</Text>
            <TextInput style={{...styles.textInput, ...styles.align}} placeholder="Username" maxLength={20} autoComplete="username" onChange={
                (e) => {
                    setUsername(e.nativeEvent.text)
                }
            } />
            <TextInput style={{...styles.textInput, ...styles.align}} secureTextEntry={true} placeholder="Password" autoComplete="password" onChange={
                (e) => {
                    setPassword(e.nativeEvent.text)
                }
            } />
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    client.login(username, password);

                }}
            >
                <Text style={styles.text}>Login</Text>
            </TouchableOpacity>
            {error !== "" ? <Text style={styles.align}>{error}</Text> : <View />}
        </View>
    )
}