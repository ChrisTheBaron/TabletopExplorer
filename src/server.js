'use strict';

import 'babel-polyfill'
import Libp2p from 'libp2p'
import Websockets from 'libp2p-websockets'
import WebRTCStar from 'libp2p-webrtc-star'
import { NOISE } from 'libp2p-noise'
import Mplex from 'libp2p-mplex'
import Gossipsub from 'libp2p-gossipsub'
import CryptoJS from "crypto-js"

document.addEventListener('DOMContentLoaded', async () => {

    if (window.localStorage.getItem(lsShownHelp) != lsShownHelp) {
        let helpModal = new bootstrap.Modal(document.getElementById('helpModal'));
        await helpModal.show();
        window.localStorage.setItem(lsShownHelp, lsShownHelp);
    }

    const db = new DB();
    await db.Init();

    let sceneName = DefaultSceneName;
    if (window.localStorage.getItem(lsSceneName) != null) {
        sceneName = window.localStorage.getItem(lsSceneName);
    }
    console.log(`Loading scene '${sceneName}'`);

    const scene = await db.ReadScene(sceneName);
    console.log("Got scene from DB", scene._rev);

    let imageAtt = await db.ReadMap(scene.background);
    let imageUrl = URL.createObjectURL(imageAtt);
    let imageDim = await getImageDisplayDimensions(imageUrl, scene.background_zoom);
    console.log("Got map attachment", imageDim);

    let main = document.getElementById(mainTagID);

    main.style.backgroundImage = `url('${imageUrl}')`;
    main.style.height = `${imageDim.height}em`;
    main.style.width = `${imageDim.width}em`;

    $('title').text(`${scene.name} - Tabletop Explorer`);

    InitZoom(imageDim);

    await InitIconSelect(db);

    InitImportExport(db);

    //------------------------------------------------------------------------
    // Tokens

    for (let token of scene.tokens) {
        // check for ones that are out of bounds, 
        // could be caused by the image being updated.
        token.x = Math.min(imageDim.width - token.s, Math.max(0, token.x));
        token.y = Math.min(imageDim.height - token.s, Math.max(0, token.y));

        if (!token.i) {
            token.i = uuidv4();
        }

        let tokenUrl = "";

        if (token.b && token.b.trim().length > 0) {
            let tokenAtt = await db.ReadToken(token.b);
            tokenUrl = URL.createObjectURL(tokenAtt);
        }

        $(main).append(getTokenMarkup(token, tokenUrl));
    }

    //------------------------------------------------------------------------
    // Favourites Tokens

    async function listFavourites() {

        let favouriteTokens = await db.ReadAllFavouriteTokens();

        $('#favouriteTokens').html('');

        if (favouriteTokens.tokens.length == 0) {
            $('#favouriteTokens').append(`<p class="form-text">
                You can mark tokens as favourites when adding them from scratch.
            </p>`);
            return;
        }

        for (let i in favouriteTokens.tokens) {

            let imageUrl = "";
            if (favouriteTokens.tokens[i].b && favouriteTokens.tokens[i].b.trim().length > 0) {
                let tokenAtt = await db.ReadToken(favouriteTokens.tokens[i].b);
                imageUrl = URL.createObjectURL(tokenAtt);
            }

            let token = `<div class="token ${(imageUrl.length > 0 ? "" : "no-image")}" 
                style="
                    display: inline-block;
                    background-color: ${favouriteTokens.tokens[i].f || '#00000000'};
                    width: ${favouriteTokens.tokens[i].s || 1}px;
                    height: ${favouriteTokens.tokens[i].s || 1}px;
                ">
                ${(imageUrl.length > 0 ? `<div class="image" style="
                    background-image: url('${imageUrl}');
                "></div>` : "")}</div>`

            $('#favouriteTokens').append(`${token}<div class="form-check mb-3">
                  <input class="form-check-input" type="checkbox" value="" id="fav-${i}">
                  <label class="form-check-label" for="fav-${i}">
                    ${favouriteTokens.tokens[i].l}
                  </label>
                  <a class="btn btn-danger btn-sm float-right removeFavourite" id="fav-${i}"><i class="far fa-trash-alt"></i></a>
                </div><hr/>`);

        }

    }

    await listFavourites();

    $('#favouriteTokens').click('.removeFavourite', async e => {

        if (!$(e.target).is('.removeFavourite')) return;

        e.preventDefault();

        let ind = parseInt($(e.target).attr('id').split('-').pop());

        if (!confirm(`Are you sure you want to unfavourite '${favouriteTokens.tokens[ind].l}'?`)) return;

        await db.DeleteFavouriteToken(ind);
        await listFavourites();

    });

    //------------------------------------------------------------------------
    // Scenes

    let scenes = await db.ReadAllScenes();

    let availableScenes = [];
    for (let s of scenes.rows) {
        if (s.doc.name) availableScenes.push(s);
    }

    let scenesGrouped = groupBy(availableScenes, (s) => {
        return s.doc.folder || "";
    });

    let folders = Object.keys(scenesGrouped).sort();

    for (let folder of folders) {
        let options = "";
        for (let option of scenesGrouped[folder].sort((a, b) => a.doc.name.localeCompare(b.doc.name))) {
            if (option.id == MapImageDocumentName ||
                option.id == TokenImageDocumentName ||
                option.id == FavouriteTokensDocumentName ||
                option.id == sceneName) {
                continue;
            }
            options += `<option id="${option.id}">${option.doc.name}</option>`;
        }
        if (options != "") {
            if (folder != "") {
                $('#sceneSelectInput').append(`<optgroup label="${folder}">${options}</optgroup>`);
                $('#removeSceneInput').append(`<optgroup label="${folder}">${options}</optgroup>`);
            } else {
                $('#sceneSelectInput').append(`${options}`);
                $('#removeSceneInput').append(`${options}`);
            }
        }
    }

    // now just the proper folders
    folders = folders.filter(x => x != "");

    if (folders.length > 0) {
        $('#newSceneFolderInput').typeahead({
            hint: true,
            highlight: true,
            minLength: 0
        },
            {
                name: 'folders',
                source: substringMatcher(folders)
            });
        $('#editSceneFolderInput').typeahead({
            hint: true,
            highlight: true,
            minLength: 0
        },
            {
                name: 'folders',
                source: substringMatcher(folders)
            });
    }

    //------------------------------------------------------------------------

    // used for the distance moved thang
    let startPosition;

    // target elements with the "draggable" class
    interact('.draggable')
        .draggable({

            // keep the element within the area of it's parent
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: 'parent',
                    endOnly: false
                })
            ],

            // enable autoScroll
            autoScroll: true,

            listeners: {

                start(event) {
                    $(event.target).addClass("dragging");
                    var target = event.target;
                    var x = (parseFloat(target.getAttribute('data-x')) || 0);
                    var y = (parseFloat(target.getAttribute('data-y')) || 0);
                    startPosition = { x, y };
                    $('#distanceMoved').text(`0 ${scene.unit}`).show();
                },

                end: async function (event) {
                    $(event.target).removeClass("dragging");
                    await saveTokensToDB();
                    setTimeout(() => {
                        $('#distanceMoved').hide();
                        $('#dragMarker').hide();
                    }, 750);
                },

                // call this function on every dragmove event
                move(event) {
                    var target = event.target
                    // keep the dragged position in the data-x/data-y attributes
                    var x = (parseFloat(target.getAttribute('data-x')) || 0) + (event.dx / GetZoom())
                    var y = (parseFloat(target.getAttribute('data-y')) || 0) + (event.dy / GetZoom())

                    // translate the element
                    target.style.transform =
                        'translate(' + x + 'em, ' + y + 'em)'

                    // update the position attributes
                    target.setAttribute('data-x', x)
                    target.setAttribute('data-y', y)

                    let pxDist = Math.sqrt(Math.pow(x - startPosition.x, 2) + Math.pow(y - startPosition.y, 2));
                    let unitDist = (pxDist * scene.distance) / (gridSize);

                    let size = parseFloat(target.getAttribute('data-s')) / 2;

                    let midX = startPosition.x + ((x - startPosition.x) / 2);
                    let midY = startPosition.y + ((y - startPosition.y) / 2);

                    $('#distanceMoved').css('transform', 'translate(' + (midX + size) + 'em, ' + (midY + size) + 'em)');
                    $('#distanceMoved').attr('data-l', `${Math.round(unitDist)} ${scene.unit}`).show();

                    let angle = Math.atan((y - startPosition.y) / (x - startPosition.x));
                    if ((x - startPosition.x) < 0) {
                        angle += Math.PI;
                    }

                    $('#dragMarker').css('transform', `rotate(${angle}rad)`);
                    $('#dragMarker').css('width', `${pxDist}em`);
                    $('#dragMarker').css('margin-top', `${startPosition.y + size}em`);
                    $('#dragMarker').css('margin-left', `${startPosition.x + size}em`);
                    $('#dragMarker').show();

                }

            }

        }).on('doubletap', async function (event) {
            event.preventDefault()
            $(event.currentTarget).attr('data-r', (parseInt($(event.currentTarget).attr('data-r')) + 1) % 4);
            await saveTokensToDB();
        });

    $('main').on('click', '.draggable', async (e) => {
        if ($('#removeTokens').prop('checked')) {
            if ($(e.target).is('.draggable')) {
                $(e.target).remove();
            } else {
                $(e.target).parent('.draggable').remove();
            }
            if ($('main').find('.draggable').length == 0) {
                $('#removeTokens').click();
            }
            await saveTokensToDB();
        };
    });

    let addFavouritesTokenModal = document.getElementById('addFavouritesTokenModal');

    addFavouritesTokenModal.addEventListener('show.bs.modal', () => {
        $('#addFavouritesTokenForm')[0].reset();
    })

    let addingFavouritesToken = false;
    $('#addFavouritesTokenForm').submit(async (e) => {

        e.preventDefault();

        if (addingFavouritesToken) return;

        let ticked = $('#addFavouritesTokenModal #favouriteTokens input[type="checkbox"]:checked');

        if (ticked.length == 0) return;

        addingFavouritesToken = true;
        $('#addFavouritesTokenForm .spinner-border').show();

        let [x, y] = getCentreOfMapOnDisplay(imageDim, GetZoom());

        let squareLength = Math.ceil(Math.pow(ticked.length, 0.5));

        let biggestSize = Math.max(...favouriteTokens.tokens.map(t => t.s));

        let originX = x - (biggestSize * squareLength * 0.5 / tokenBufferZoom);
        let originY = y - (biggestSize * squareLength * 0.5 / tokenBufferZoom);

        let i = 0;

        for (let t of $('#addFavouritesTokenModal #favouriteTokens input[type="checkbox"]:checked')) {

            let ind = parseInt($(t).attr('id').split('-').pop());

            let size = favouriteTokens.tokens[ind].s;
            let label = favouriteTokens.tokens[ind].l;
            let colour = favouriteTokens.tokens[ind].f;
            let imageAttachmentName = favouriteTokens.tokens[ind].b;

            let image = "";
            if (imageAttachmentName && imageAttachmentName.trim().length > 0) {
                let tokenAtt = await db.ReadToken(imageAttachmentName);
                image = URL.createObjectURL(tokenAtt);
            }

            let x = originX + ((i % squareLength) * size / tokenBufferZoom);
            let y = originY + (Math.floor(i / squareLength) * size / tokenBufferZoom);

            $(main).append(getTokenMarkup({
                i: uuidv4(),
                s: size,
                x: x,
                y: y,
                b: imageAttachmentName,
                f: colour,
                l: label,
                r: 0
            }, image));

            i++;

        }

        let modal = bootstrap.Modal.getInstance(addFavouritesTokenModal);
        await modal.hide();
        await saveTokensToDB();

        addingFavouritesToken = false;
        $('#addingFavouritesTokenSpinner').hide();

    });

    let addTokenModal = document.getElementById('addTokenModal');

    addTokenModal.addEventListener('show.bs.modal', () => {
        $('#addTokenModal form')[0].reset();
        $('#addTokenModal form #tokenColourInput').val(randomColor(50));
        $('label[for="tokenImageFile"]>.form-file-text').text('Choose file...');
        $('#my-icon-select .icon img[icon-value=""]').parent('.icon').click();
    })

    let addingToken = false;
    $('#addTokenForm').submit(async (e) => {

        e.preventDefault();

        if (addingToken) return;

        let label = $('#addTokenModal #tokenLabelInput').val();
        let colour = $('#addTokenModal #tokenColourInput').val();
        let number = parseInt($('#addTokenModal #tokenNumberInput').val());
        let numbering = $('#tokenNumberingInput option:selected').val();
        let size = parseInt($('#addTokenModal #tokenSizeInput').val()) * gridSize * tokenBufferZoom;
        let save = $('#addTokenModal #addToFavourites').is(':checked');

        if (label.trim() == '' || number < 1 || size < 1) {
            return false;
        }

        let imageAttachmentName = "";
        let image = "";

        addingToken = true;
        $('#addTokenForm .spinner-border').show();

        if ($('#my-icon-select .icon.selected img').attr('icon-value').length > 0) {
            colour = "#00000000";
            imageAttachmentName = $('#my-icon-select .icon.selected img').attr('icon-value');
            image = $('#my-icon-select .icon.selected img')[0].src;
        } else if ($('#addTokenModal form #tokenImageFile').val().trim().length > 0) {
            image = await getUploadedFileContentsAsURL($('#addTokenModal form #tokenImageFile'));
            if (!isFileImage(image)) {
                alert("Filetype not supported.");
                addingToken = false;
                $('#addingTokenSpinner').hide();
                return false;
            }
            let imageType = image.split(';')[0].split(':')[1];
            let imageData = image.split(';')[1].split(',')[1];

            imageAttachmentName = uuidv4();
            await db.CreateToken(imageAttachmentName, imageData, imageType);
            colour = "#00000000";
        }

        let [x, y] = getCentreOfMapOnDisplay(imageDim, GetZoom());

        if (number > 1) {

            let squareLength = Math.ceil(Math.pow(number, 0.5));

            let originX = x - (size * squareLength * 0.5 / tokenBufferZoom);
            let originY = y - (size * squareLength * 0.5 / tokenBufferZoom);

            for (let i = 0; i < number; i++) {

                let x = originX + ((i % squareLength) * size / tokenBufferZoom);
                let y = originY + (Math.floor(i / squareLength) * size / tokenBufferZoom);

                $(main).append(getTokenMarkup({
                    i: uuidv4(),
                    s: size,
                    x: x - (size / 2),
                    y: y - (size / 2),
                    b: imageAttachmentName,
                    f: colour,
                    l: `${label} ${numberToLabel(i + 1, numbering)}`,
                    r: 0
                }, image));

            }

        } else {

            $(main).append(getTokenMarkup({
                i: uuidv4(),
                s: size,
                x: x - (size / 2),
                y: y - (size / 2),
                b: imageAttachmentName,
                f: colour,
                l: label,
                r: 0
            }, image));

        }

        let modal = bootstrap.Modal.getInstance(addTokenModal);
        await modal.hide();
        await saveTokensToDB();

        if (save) {
            await db.CreateFavouriteToken({
                s: size,
                b: imageAttachmentName,
                f: colour,
                l: label
            });
            await listFavourites();
        }

        addingToken = false;
        $('#addingTokenSpinner').hide();

    });

    $('#addTokenModal form #tokenImageFile').change((e) => {
        let file = $('#addTokenModal form #tokenImageFile').val();
        if (file.includes('\\')) {
            $('label[for="tokenImageFile"]>.form-file-text').text(file.split('\\').pop());
        } else {
            $('label[for="tokenImageFile"]>.form-file-text').text('Choose file...');
        }
    });

    let editSceneModal = document.getElementById('editSceneModal');
    editSceneModal.addEventListener('show.bs.modal', () => {
        $('#editSceneModal form')[0].reset();
        $('label[for="changeImageFile"]>.form-file-text').text('Choose file...');
    })

    $('#editSceneModal #changeImageFile').change((e) => {
        let file = $('#editSceneModal #changeImageFile').val();
        if (file.includes('\\')) {
            $('label[for="changeImageFile"]>.form-file-text').text(file.split('\\').pop());
        } else {
            $('label[for="changeImageFile"]>.form-file-text').text('Choose file...');
        }
    });

    let changingImage = false;
    $('#changeImageForm').submit(async (e) => {

        e.preventDefault();

        if (changingImage) return;

        let file = $('#editSceneModal #changeImageFile').val();
        if (file.trim() == '') {
            return false;
        }

        changingImage = true;
        $('#changeImageForm .spinner-border').show();

        let image = await getUploadedFileContentsAsURL($('#editSceneModal #changeImageFile'));
        if (!isFileImage(image)) {
            alert("Filetype not supported.");
            changingImage = false;
            $('#changingImageSpinner').hide();
            return false;
        }

        let imageName = uuidv4();
        let imageType = image.split(';')[0].split(':')[1];
        let imageData = image.split(';')[1].split(',')[1];
        await db.CreateMap(imageName, imageData, imageType);

        await db.UpdateScene(sceneName, {
            background_zoom: 1,
            background: imageName
        });

        await saveTokensToDB();
        location.reload();

    });

    let changeSceneModal = document.getElementById('changeSceneModal');

    changeSceneModal.addEventListener('show.bs.modal', () => {
        $('#changeSceneModal form')[0].reset();
        $('label[for="newImageFile"]>.form-file-text').text('Choose file...');
    })

    $('#changeSceneModal form #newImageFile').change((e) => {
        let file = $('#changeSceneModal form #newImageFile').val();
        if (file.includes('\\')) {
            $('label[for="newImageFile"]>.form-file-text').text(file.split('\\').pop());
        } else {
            $('label[for="newImageFile"]>.form-file-text').text('Choose file...');
        }
    });

    let newingScening = false;
    $('#newSceneForm').submit(async (e) => {

        e.preventDefault();

        if (newingScening) return;

        let name = $('#changeSceneModal #newSceneNameInput').val().trim();
        let folder = $('#changeSceneModal #newSceneFolderInput').val().trim();
        let file = $('#changeSceneModal #newImageFile').val();

        let unit = $('#changeSceneModal #mapUnitInput').val() ||
            $('#changeSceneModal #mapUnitInput').attr('placeholder');
        let distance = $('#changeSceneModal #mapDistanceInput').val() ||
            $('#changeSceneModal #mapDistanceInput').attr('placeholder');

        if (file.trim() == '' || name.trim() == '' || unit.trim() == '' || distance.trim() == '') {
            return false;
        }

        let newSceneName = `scene_` + folder.toLowerCase() + '_' + name.toLowerCase();
        if (scenes.rows.some(s => s.id == newSceneName)) {
            alert(`'${name}' already exists`);
            return false;
        }

        newingScening = true;
        $('#newSceneForm .spinner-border').show();

        let image = await getUploadedFileContentsAsURL($('#changeSceneModal #newImageFile'));
        if (!isFileImage(image)) {
            alert("Filetype not supported.");
            newingScening = false;
            $('#addingSceneSpinner').hide();
            return false;
        }

        let imageName = uuidv4();
        let imageType = image.split(';')[0].split(':')[1];
        let imageData = image.split(';')[1].split(',')[1];

        await saveTokensToDB();

        await db.CreateMap(imageName, imageData, imageType);

        await db.CreateScene({
            _id: newSceneName,
            name: name,
            folder: folder,
            background_zoom: 1,
            background: imageName,
            tokens: [],
            unit: unit,
            distance: parseFloat(distance)
        });

        window.localStorage.setItem(lsSceneName, newSceneName);
        location.reload();

    });

    $('#changeSceneForm').submit(async (e) => {
        e.preventDefault();
        let id = $('#changeSceneModal form #sceneSelectInput option:selected').attr('id');
        if (id == null || id.trim().length == 0) {
            return;
        }
        await saveTokensToDB();
        window.localStorage.setItem(lsSceneName, id);
        location.reload();
    });

    $('#removeSceneForm').submit(async (e) => {
        e.preventDefault();
        let id = $('#changeSceneModal form #removeSceneInput option:selected').attr('id');
        if (id == null || id.trim().length == 0) {
            return;
        }
        let sceneToRemove = scenes.rows.find(s => s.id == id);
        if (sceneToRemove == null) {
            return;
        }
        if (!confirm(`Are you sure you want to remove '${sceneToRemove.doc.name}'?`)) {
            return;
        }
        await saveTokensToDB();
        await db.DeleteScene(id);
        location.reload();
    });

    $('#acceptBackgroundSize').click(async () => {
        // set the size and refresh
        let size = parseInt($('.resize-drag').attr('data-s'));
        let width = parseFloat($('.resize-drag').attr('data-w'));
        let height = parseFloat($('.resize-drag').attr('data-h'));
        let pixelPerGrid = Math.sqrt(width * height) / size;
        let new_zoom = gridSize / pixelPerGrid;
        let background_zoom = new_zoom * scene.background_zoom;
        await db.UpdateScene(sceneName, { background_zoom });
        console.log("New Zoom", background_zoom);
        await saveTokensToDB();
        location.reload();
    });

    $('#cancelBackgroundSize').click(async () => {
        await saveTokensToDB();
        location.reload();
    });

    $('#setBackgroundSize').click(async (e) => {

        let returned = window.prompt("Select size of reference grid. " +
            "Please adjust the size of the square until it covers " +
            "the same area.", "3");

        if (returned == null) {
            return;
        }

        let size;

        try {
            size = parseInt(returned);
        } catch (e) {
            console.error(e);
            return false;
        }

        if (size == null || !Number.isInteger(size)) {
            console.log(size, "not an int");
            return false;
        }

        // reset the zoom to 1.0 and disable all other functionality
        $('#zoomInput').val(1.0).trigger('input');
        $('nav .control').hide();

        let editSceneModal = bootstrap.Modal.getInstance(document.getElementById('editSceneModal'))
        await editSceneModal.hide();

        $('#acceptBackgroundSize').show();
        $('#cancelBackgroundSize').show();

        // hide the tokens
        $('.draggable').hide();

        let [x, y] = getCentreOfMapOnDisplay(imageDim, GetZoom());

        x -= (gridSize * size) / 2;
        y -= (gridSize * size) / 2;

        // show the reference square
        $('main').append(`<div class="resize-drag" 
                data-x="${x}"
                data-y="${y}"
                data-s="${size}" 
                data-w="${gridSize * size}"
                data-h="${gridSize * size}"
                data-l="${size}x${size}"
                style="
                    transform: translate(${x}em, ${y}em);
                    width: ${gridSize * size}em;
                    height: ${gridSize * size}em;
                "></div>`);

        interact('.resize-drag')
            .resizable({
                // resize from all edges and corners
                edges: { left: true, right: true, bottom: true, top: true },

                listeners: {
                    move(event) {
                        let target = event.target
                        let x = (parseFloat(target.getAttribute('data-x')) || 0)
                        let y = (parseFloat(target.getAttribute('data-y')) || 0)

                        // update the element's style
                        target.style.width = event.rect.width + 'em'
                        target.style.height = event.rect.height + 'em'

                        // translate when resizing from top or left edges
                        x += event.deltaRect.left
                        y += event.deltaRect.top

                        target.style.webkitTransform = target.style.transform =
                            'translate(' + x + 'em,' + y + 'em)'

                        target.setAttribute('data-x', x)
                        target.setAttribute('data-y', y)

                        target.setAttribute('data-w', event.rect.width)
                        target.setAttribute('data-h', event.rect.height)
                    }
                },
                modifiers: [
                    // keep the edges inside the parent
                    interact.modifiers.restrictEdges({
                        outer: 'parent'
                    }),

                    // minimum size
                    interact.modifiers.restrictSize({
                        min: { width: 50, height: 50 }
                    })
                ],
            })
            .draggable({
                listeners: {
                    // call this function on every dragmove event
                    move(event) {
                        var target = event.target
                        // keep the dragged position in the data-x/data-y attributes
                        var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
                        var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

                        // translate the element
                        target.style.transform =
                            'translate(' + x + 'em, ' + y + 'em)'

                        // update the position attributes
                        target.setAttribute('data-x', x)
                        target.setAttribute('data-y', y)
                    }
                },
                modifiers: [
                    interact.modifiers.restrictRect({
                        restriction: 'parent',
                        endOnly: false
                    })
                ]
            })

    });

    //------------------------------------------------------------------------
    // Renaming Scene

    $('#editSceneFolderInput')
        .attr('value', scene.folder || "")
        .attr('placeholder', scene.folder || "");
    $('#editSceneNameInput')
        .attr('value', scene.name || "")
        .attr('placeholder', scene.name || "");

    $('#editMapDistanceInput')
        .attr('value', scene.distance || "")
        .attr('placeholder', scene.distance || "");
    $('#editMapUnitInput')
        .attr('value', scene.unit || "")
        .attr('placeholder', scene.unit || "");

    let editingScene = false;
    $('#editSceneForm').submit(async e => {

        e.preventDefault();

        if (editingScene) return;

        let name = $('#editSceneModal #editSceneNameInput').val();
        let folder = $('#editSceneModal #editSceneFolderInput').val();
        let distance = $('#editSceneModal #editMapDistanceInput').val();
        let unit = $('#editSceneModal #editMapUnitInput').val();

        if (name.trim() == '' || distance.trim() == '' || unit.trim() == '') {
            return;
        }

        editingScene = true;
        $('#editingScene').show();

        await saveTokensToDB();

        await db.UpdateScene(sceneName, {
            name: name,
            folder: folder,
            distance: parseFloat(distance),
            unit: unit
        })

        location.reload();

    });

    //------------------------------------------------------------------------
    // Sharing

    let ipfs;

    let sharing = false;

    let startStopSharing = false;
    let regenerating = false;

    $('#startStopSharing').click(async (e) => {

        e.preventDefault();

        if (regenerating || startStopSharing) return;

        startStopSharing = true;
        $('#startStopSharing .spinner-border').show();

        if (!sharing) {
            console.log("Starting setting up sharing.");
            await startSharing();
            $('#startStopSharing')
                .removeClass('btn-success')
                .addClass('btn-danger')
                .find('.message')
                .text('Stop Sharing');
        } else {
            console.log("Stopping sharing.");
            await stopSharing();
            $('#startStopSharing')
                .removeClass('btn-danger')
                .addClass('btn-success')
                .find('.message')
                .text('Start Sharing');
        }

        startStopSharing = false;
        $('#startStopSharing .spinner-border').hide();

    });

    async function startSharing() {

        let topic;
        if (window.localStorage.getItem(lsSharingTopic) != null) {
            topic = window.localStorage.getItem(lsSharingTopic);
        } else {
            topic = generateKey(5);
            window.localStorage.setItem(lsSharingTopic, topic);
        }

        let key;
        if (window.localStorage.getItem(lsSharingKey) != null) {
            key = window.localStorage.getItem(lsSharingKey);
        } else {
            key = generateKey(5);
            window.localStorage.setItem(lsSharingKey, key);
        }

        ipfs = {
            peers: [],
            topic: topic,
            key: key
        };

        // Create our libp2p node
        ipfs.libp2p = await Libp2p.create({
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

        ipfs.gsub = new Gossipsub(ipfs.libp2p);

        // Listen for new peers
        ipfs.libp2p.on('peer:discovery', async (peerId) => {
            console.log(`Found peer ${peerId.toB58String()}`);
        });

        // Listen for new connections to peers
        ipfs.libp2p.connectionManager.on('peer:connect', (connection) => {
            console.log(`Connected to ${connection.remotePeer.toB58String()}`);
            if (!ipfs.peers.includes(connection.remotePeer.toB58String())) {
                ipfs.peers.push(connection.remotePeer.toB58String());
            }
            $('#shareCount').text(ipfs.peers.length);
        });

        // Listen for peers disconnecting
        ipfs.libp2p.connectionManager.on('peer:disconnect', (connection) => {
            console.log(`Disconnected from ${connection.remotePeer.toB58String()}`);
            ipfs.peers = ipfs.peers.filter(p => p != connection.remotePeer.toB58String());
            $('#shareCount').text(ipfs.peers.length);
        });

        await ipfs.libp2p.start();
        await ipfs.gsub.start();
        console.log(`libp2p and gsub started`);

        await ipfs.gsub.subscribe(ipfs.topic);
        console.log(`subscribed to topic: '${ipfs.topic}'`);

        ipfs.gsub.on(ipfs.topic, (data) => {
            console.log(new TextDecoder().decode(data.data));
        });

        ipfs.interval = setInterval(async () => {
            let scene = await db.ReadScene(sceneName);
            let background = await db.ReadMap(scene.background);
            scene.background = await blobToBase64(background);
            for (let i = 0; i < scene.tokens.length; i++) {
                if (scene.tokens[i].b) {
                    let token = await db.ReadToken(scene.tokens[i].b);
                    scene.tokens[i].b = await blobToBase64(token);
                }
            }
            console.log(scene);
            ipfs.gsub.publish(ipfs.topic, new TextEncoder().encode(CryptoJS.AES.encrypt(JSON.stringify(scene), ipfs.key).toString()));
        }, 1000);

        $('#sharingLink').val(location.protocol + '//' + location.host + '/viewer/?t=' + ipfs.topic + '&k=' + ipfs.key);

        window.localStorage.setItem(lsSharingStarted, lsSharingStarted);

        sharing = true;

    }

    async function stopSharing() {
        // broadcast stop message
        // clear ls seed value
        clearInterval(ipfs.interval);
        ipfs.gsub.unsubscribe(ipfs.topic);
        await ipfs.gsub.stop();
        await ipfs.libp2p.stop();
        ipfs = null;
        window.localStorage.removeItem(lsSharingStarted);
        $('#shareCount').text("");
        sharing = false;
    }

    $('#regenerateKey').click(async (e) => {

        e.preventDefault();

        if (regenerating || startStopSharing) return;

        regenerating = true;
        $('#regenerateKey .spinner-border').show();

        let wasSharing = sharing;

        if (sharing) {
            await stopSharing();
        }

        window.localStorage.removeItem(lsSharingTopic);
        window.localStorage.removeItem(lsSharingKey);

        if (wasSharing) {
            await startSharing();
        } else {
            $('#sharingLink').val('');
        }

        regenerating = false;
        $('#regenerateKey .spinner-border').hide();

    });

    if (window.localStorage.getItem(lsSharingStarted) == lsSharingStarted) {
        $('#startStopSharing').click();
    }

    //------------------------------------------------------------------------

    async function saveTokensToDB() {
        let tokens = [];
        for (let r of $(main).find('.draggable')) {
            let rect = $(r);
            tokens.push({
                i: rect.attr('data-i'),
                x: rect.attr('data-x'),
                y: rect.attr('data-y'),
                s: rect.attr('data-s'),
                f: r.style.backgroundColor,
                l: rect.attr('data-l'),
                b: rect.attr('data-b'),
                r: rect.attr('data-r')
            });
        }
        await db.UpdateScene(sceneName, { tokens });
        console.log("DB updated");
    }

});
