
import React from 'react';
import type { Post } from '@meower-media/meower/dist/api/posts';
import { Image, ImageRequireSource, StyleSheet, Text, View } from 'react-native';
import colors from '../Colors';

type Props = {
    post: Post;
}

const styles = StyleSheet.create({
    container: {
        width: "95%",
        backgroundColor: colors.popup,
        borderColor: colors.orangeLight,
        padding: 10,
        margin: 5,
        borderRadius: 10,
    },
    text: {
        fontSize: 20,
        color: colors.foreground,
    },
    username: {
        fontSize: 21,
        color: colors.foreground,
        fontStyle: 'italic'
    },
});



function Badge({src}: {src: ImageRequireSource}) {
    return (
        <Image source={src} style={{width: 25, height: 25, margin: 5}} />
    )
}


export default function Post({ post }: Props)  {
    return (
        <View style={styles.container}>
            <Text style={styles.username}> {post.u} {post.bridged && post.bridged.u === "Discord" ?  <Badge src={require("../assets/discord.png")} /> : <View/>} </Text> 
            <Text style={styles.text}>{post.p}</Text>
        </View>
    )
}