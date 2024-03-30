import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, TextInput, useWindowDimensions } from 'react-native';
import { RootStackParamList } from '../App';
import { useNavigation } from '@react-navigation/native';
import ClientContext from '../context/client';
import colors from '../Colors';

const styles = StyleSheet.create({
    footerContainer: {
        backgroundColor: colors.foregroundGrey,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: 100,
        height: 50,
        borderRadius: 50,
        backgroundColor: colors.orange,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 30,
        color: colors.background,
    }
});

export default function Footer() {
    const navigation = useNavigation();
    const client = useContext(ClientContext);
    useEffect(() => { }, [client.user]);

    return (
        <View style={styles.footerContainer}>

        </View>

    );
};

