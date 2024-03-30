import Client from "@meower-media/meower";
import { createContext } from "react";
import log from 'loglevel'

let client = new Client();
const ClientContext = createContext<Client>(client);

log.setDefaultLevel(log.levels.DEBUG)

client.onLogin(() => {
    client.ws.on('message', (data) => {
        console.log('Received packet:', data);
    });
})

export default ClientContext;
