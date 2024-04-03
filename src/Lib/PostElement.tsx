
import React, { useEffect } from 'react';
import type { Post } from '@meower-media/meower/dist/api/posts';
import { Image, ImageRequireSource, StyleSheet, Text, View } from 'react-native';
import colors from '../Colors';
import ClientContext from '../context/client';

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
        alignSelf: 'center',
    },
    text: {
        fontSize: 20,
        color: colors.foreground,
        flexWrap: "nowrap"
    },
    username: {
        fontSize: 21,
        color: colors.foreground,
        fontStyle: 'italic'
    },
    pfp: {
        width: 50,
        height: 50,
        borderRadius: 25,

    }
});



function Badge({ src }: { src: ImageRequireSource }) {
    return (
        <Image source={src} style={{ width: 25, height: 25, margin: 5 }} />
    )
}


export default function Post({ post }: Props) {
    const client = React.useContext(ClientContext);
    const [pfpUrl, setPfpUrl] = React.useState<string>("https://3r1s-s.github.io/meo/images/avatars-webp/icon_-2.svg");

    useEffect(() => { }, [pfpUrl]);
    client.api.users.get(post.u).then((user) => {
        if (user.body.error) return;

        if (user.body.avatar !== null) {
            setPfpUrl(`https://uploads.meower.org/icons/${user.body.avatar}`);
            return;
        }
        setPfpUrl(`https://3r1s-s.github.io/meo/images/avatars-webp/icon_${user.body.pfp_data}.webp`);
    }).catch((err) => { });

    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
            }}>
                <Image src={pfpUrl} style={styles.pfp} />
                <Text style={styles.username}> {post.u} {post.bridged && post.bridged.u === "Discord" ? <Badge src={require("../assets/discord.png")} /> : <View />} </Text>
            </View>
            <Text style={styles.text}>{post.p}</Text>

        </View>
    )
}