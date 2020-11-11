document.addEventListener('DOMContentLoaded', async () => {

    const main = document.getElementById(mainTagID);

    const urlParams = new URLSearchParams(window.location.search);
    const topic = urlParams.get('t') || '';
    const key = urlParams.get('k') || '';

    if (topic.trim() == '' || key.trim() == '') {
        alert("Invalid link");
        return;
    }

    // only bother updating when the revision changes
    let revision = '';

    var es = new EventSource(`/share/${topic}`);

    es.onmessage = async function (event) {

        $('#loading').hide();

        let cypherText = JSON.parse(event.data);
        let bytes = CryptoJS.TripleDES.decrypt(cypherText, key);
        let plainText = bytes.toString(CryptoJS.enc.Utf8);
        let scene = JSON.parse(plainText);

        if (scene._rev != revision) {

            console.log("scene", scene);

            let backgroundEncrypted = await $.get(`/share/${topic}/resource/${scene.background}`);
            let bytes = CryptoJS.TripleDES.decrypt(backgroundEncrypted, key);
            let background = bytes.toString(CryptoJS.enc.Utf8);

            let imageDim = await getImageDisplayDimensions(background, scene.background_zoom);

            main.style.backgroundImage = `url('${background}')`;
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

                let tokenImage = '';
                if (token.b) {
                    let tokenImageEncrypted = await $.get(`/share/${topic}/resource/${token.b}`);
                    let bytes = CryptoJS.TripleDES.decrypt(tokenImageEncrypted, key);
                    tokenImage = bytes.toString(CryptoJS.enc.Utf8);
                }

                $(main).append(getTokenMarkup(token, tokenImage));
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

    };

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