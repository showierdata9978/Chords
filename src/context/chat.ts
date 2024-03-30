import { Chat } from "@meower-media/meower/dist/api/chats";
import { useState } from "react";

const HomeChat: Chat = {
    _id: "home",
    members: [],
    nickname: "Home",
    type: 0,
    owner: "",
    icon: "",
    icon_color: "",
    last_active: 0,
    created: 0,
    deleted: false,
    allow_pinning: false
}

const [chat, setChat] = useState<Chat>(HomeChat); //TODO: Type chats in Meower.js

export default chat;
export { setChat };
