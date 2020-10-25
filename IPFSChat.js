import 'babel-polyfill'
import Libp2p from 'libp2p'
import Websockets from 'libp2p-websockets'
import WebRTCStar from 'libp2p-webrtc-star'
import { NOISE } from 'libp2p-noise'
import Mplex from 'libp2p-mplex'
import Gossipsub from 'libp2p-gossipsub'

document.addEventListener('DOMContentLoaded', async () => {

    // Create our libp2p node
    const libp2p = await Libp2p.create({
        addresses: {
            // Add the signaling server address, along with our PeerId to our multiaddrs list
            // libp2p will automatically attempt to dial to the signaling server so that it can
            // receive inbound connections from other peers
            listen: [
                '/dns4/whispering-harbor-98265.herokuapp.com/tcp/443/wss/p2p-webrtc-star/'
            ]
        },
        modules: {
            transport: [Websockets, WebRTCStar],
            connEncryption: [NOISE],
            streamMuxer: [Mplex],
            pubsub: Gossipsub
        }
    })

    const gsub = new Gossipsub(libp2p);

    const topic = 'tabletop-explorer';

    // Listen for new peers
    libp2p.on('peer:discovery', async (peerId) => {
        console.log(`Found peer ${peerId.toB58String()}`);
    });

    // Listen for new connections to peers
    libp2p.connectionManager.on('peer:connect', (connection) => {
        console.log(`Connected to ${connection.remotePeer.toB58String()}`);
    });

    // Listen for peers disconnecting
    libp2p.connectionManager.on('peer:disconnect', (connection) => {
        console.log(`Disconnected from ${connection.remotePeer.toB58String()}`);
    });

    await libp2p.start();
    await gsub.start();

    gsub.on(topic, (data) => {
        console.log(data)
    })

    gsub.subscribe(topic);

    // Export libp2p to the window so you can play with the API
    //window.libp2p = libp2p;

    window.send = function () {
        gsub.publish(topic, new TextEncoder().encode('banana'))
    }

})
