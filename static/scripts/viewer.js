const main = document.getElementById(mainTagID);

const urlParams = new URLSearchParams(window.location.search);
const topic = urlParams.get('t') || '';
const key = urlParams.get('k') || '';

if (topic.trim() == '' || key.trim() == '') {
    alert("Invalid link");
}

document.addEventListener('DOMContentLoaded', async () => {

    // only bother updating when the revision changes
    let revision = '';
    let backgroundId = '';

    var es = new EventSource(`/share/${topic}`);

    es.onmessage = async function (event) {

        let cypherText = JSON.parse(event.data);
        let bytes = CryptoJS.Rabbit.decrypt(cypherText, key);
        let plainText = bytes.toString(CryptoJS.enc.Utf8);
        let scene = JSON.parse(plainText);

        if (scene._rev != revision) {

            $('title').text(`${scene.name} - Tabletop Explorer`);

            if (backgroundId != scene.background) {

                let backgroundEncrypted = await $.get(`/share/${topic}/resource/${scene.background}`);
                let bytes = CryptoJS.Rabbit.decrypt(backgroundEncrypted, key);
                let background = bytes.toString(CryptoJS.enc.Utf8);

                let imageDim = await getImageDisplayDimensions(background, scene.background_zoom);

                main.style.backgroundImage = `url('${background}')`;
                main.style.height = `${imageDim.height}em`;
                main.style.width = `${imageDim.width}em`;

                InitZoom(imageDim);

                backgroundId = scene.background;

            }

            // we'll get a list of the current token ID's so we know what we're
            // doing to each one. IE. add, modify, remove
            let currentTokens = new Set($(main).find('.token').get().map(t => $(t).attr('data-i')));
            let newTokens = new Set(scene.tokens.map(t => t.i));

            let add = difference(newTokens, currentTokens);
            let remove = difference(currentTokens, newTokens);
            let edit = intersection(currentTokens, newTokens);

            for (let id of remove) {
                $(main).find(`[data-i="${id}"]`).remove();
            }

            for (let id of edit) {
                let token = scene.tokens.find(t => t.i == id);
                $(main).find(`[data-i="${id}"]`)
                    .attr('data-x', token.x)
                    .attr('data-y', token.y)
                    .attr('data-r', token.r)
                    .attr('data-v', token.v)
                    .css('transform', `translate(${token.x}em, ${token.y}em)`);
            }

            await Promise.all(Array.from(add).map(id => addToken(scene.tokens.find(t => t.i == id))));

            revision = scene._rev;
        }

        $('#loading').hide();

    };

})

async function addToken(token) {
    let tokenImage = '';
    if (token.b) {
        let tokenImageEncrypted = await $.get(`/share/${topic}/resource/${token.b}`);
        let bytes = CryptoJS.Rabbit.decrypt(tokenImageEncrypted, key);
        tokenImage = bytes.toString(CryptoJS.enc.Utf8);
    }
    $(main).append(getTokenMarkup(token, tokenImage));
}

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