import React, { useEffect, useReducer, useState } from "react";

import { PropsWithoutRef } from "react";
import ClientContext from "../context/client";
import { Post } from "@meower-media/meower/dist/api/posts";
import { bridges, Packet } from "@meower-media/meower";
import { ActivityIndicator, FlatList, FlatListComponent, ScrollView, StyleSheet, Text, View } from "react-native";
import PostElement from "./PostElement";
import colors from "../Colors";

import { PagedAPIResp } from "@meower-media/meower/dist/api";
type SectionProps = {
    chat: string;

};


function _PostList({ posts }: { posts: Array<Post> }): React.JSX.Element {
    return (
        <View>
            <ScrollView>
                {posts.map((post) => {
                    return <PostElement post={post} key={post._id} />
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    }
});


export default function PostList({ chat }: SectionProps): React.JSX.Element {

    const client = React.useContext(ClientContext);
    const [posts, setPosts] = useState<Array<Post> | null>(null);
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    if (chat !== "home" && !client.user) {
        throw new Error("User must be logged in to view chats");
    }

    useEffect(() => {
        (async () => {
            //@ts-expect-error: Don't want to deal with this right now
            const resp: { body: PagedAPIResp<undefined> & { autoget: Array<Post> } } = await client.api.posts.get(chat);
            if (resp.body.error) {
                setPosts([]);
                return;
            }
            let normiliazedPosts: Array<Post> = resp.body.autoget.map((post: Post) => {
                return client.handleBridgedPost(post);
            });
            setPosts(normiliazedPosts);
        })();
    }, []);

    useEffect(() => {

        const packetHandler = (packet: Packet) => {
            packet = JSON.parse(packet as unknown as string);
            if (!Object.hasOwn(packet.val, "type")) return;
            const post = client.handleBridgedPost(packet.val);

            if (post.post_origin.toLowerCase() !== chat.toLocaleLowerCase()) return;
            if (posts === null) {
                setPosts([post]);
                return
            }
            setPosts([post, ...posts])
            forceUpdate();

        };
        client.ws.on('message', packetHandler);

        return () => {
            client.ws.off('message', packetHandler);
        }
    }, [posts]);

    useEffect(() => {
        if (posts === null) return;
        if (posts.length < 50) return;
        posts.length = 50;
        forceUpdate();
    }, [posts]);

    return (
        <View style={styles.container}>
            {posts ? <_PostList posts={posts} /> : <View style={{ flex: 1, alignContent: "center", justifyContent: "center" }}>
                <ActivityIndicator size={90} color={colors.orange} />
            </View>}

        </View>
    );
}