
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PostList from "../Lib/PostList";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import colors from "../Colors";
import Footer from "../Lib/Footer";

const styles = StyleSheet.create({
    header: {
        fontSize: 30,
        color: '#FFFFFF',
    },
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
});

export type HomeProps = NativeStackScreenProps<RootStackParamList, "home">;

export default function Home({ navigation }: HomeProps){

    
    return (
        <View style={styles.container}>
            <PostList chat="home"/>
            <Footer/>
        </View>
    )
}