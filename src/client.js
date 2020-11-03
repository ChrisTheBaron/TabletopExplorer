import 'babel-polyfill'
import Libp2p from 'libp2p'
import Websockets from 'libp2p-websockets'
import WebRTCStar from 'libp2p-webrtc-star'
import { NOISE } from 'libp2p-noise'
import Mplex from 'libp2p-mplex'
import Gossipsub from 'libp2p-gossipsub'
import CryptoJS from "crypto-js"

document.addEventListener('DOMContentLoaded', async () => {

    const main = document.getElementById(mainTagID);

    const urlParams = new URLSearchParams(window.location.search);
    const topic = urlParams.get('t');
    const key = urlParams.get('k');

    if (topic.trim() == '' || key.trim() == '') {
        alert("Invalid link");
        return;
    }

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
    });

    const gsub = new Gossipsub(libp2p);

    let peers = [];

    // Listen for new peers
    libp2p.on('peer:discovery', async (peerId) => {
        console.log(`Found peer ${peerId.toB58String()}`);
    });

    // Listen for new connections to peers
    libp2p.connectionManager.on('peer:connect', (connection) => {
        console.log(`Connected to ${connection.remotePeer.toB58String()}`);
        peers.push(connection.remotePeer.toB58String());
    });

    // Listen for peers disconnecting
    libp2p.connectionManager.on('peer:disconnect', (connection) => {
        console.log(`Disconnected from ${connection.remotePeer.toB58String()}`);
        peers = peers.filter(p => p != connection.remotePeer.toB58String());
    });

    await libp2p.start();
    await gsub.start();

    gsub.subscribe(topic);

    // only bother updating when the revision changes
    let revision = '';

    gsub.on(topic, async (data) => {

        $('#loading').hide();

        let str = new TextDecoder().decode(data.data);
        var bytes = CryptoJS.AES.decrypt(str, key);
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        let scene = JSON.parse(originalText);

        if (scene._rev != revision) {

            console.log("scene", scene);

            let imageDim = await getImageDisplayDimensions(scene.background, scene.background_zoom);

            main.style.backgroundImage = `url('${scene.background}')`;
            main.style.height = `${imageDim.height}em`;
            main.style.width = `${imageDim.width}em`;

            $('title').text(`${scene.name} - Tabletop Explorer`);

            InitZoom(imageDim);

            // we'll get a list of the current token ID's so we know what we're
            // doing to each one. IE. add, modify, remove

            let currentTokens = new Set($(main).find('.token').get().map(t => $(t).attr('data-i')));
            let newTokens = new Set(scene.tokens.map(t => t.i));

            let add = difference(newTokens, currentTokens);
            let remove = difference(currentTokens, newTokens);
            let edit = intersection(currentTokens, newTokens);

            for (let id of add) {
                let token = scene.tokens.find(t => t.i == id);
                $(main).append(getTokenMarkup(token, token.b));
            }

            for (let id of remove) {
                console.log("removing", id);
                $(main).find(`[data-i="${id}"]`).remove();
            }

            for (let id of edit) {
                let token = scene.tokens.find(t => t.i == id);
                $(main).find(`[data-i="${id}"]`)
                    .attr('data-x', token.x)
                    .attr('data-y', token.y)
                    .attr('data-r', token.r)
                    .css('transform', `translate(${token.x}em, ${token.y}em)`);
            }

            revision = scene._rev;
        }

    });

})

function intersection(setA, setB) {
    let _intersection = new Set()
    for (let elem of setB) {
        if (setA.has(elem)) {
            _intersection.add(elem)
        }
    }
    return _intersection
}

function difference(setA, setB) {
    let _difference = new Set(setA)
    for (let elem of setB) {
        _difference.delete(elem)
    }
    return _difference
}