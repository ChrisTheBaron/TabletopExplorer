function InitImportExport(db) {

    $(window).ready(() => {

        let clearingAllData = false;
        $('#clearAllData').click(async () => {
            if (clearingAllData) return;
            if (confirm("Are you sure?")) {
                clearingAllData = true;
                $('#clearAllData .spinner-border').show();
                await db.Destroy();
                localStorage.clear();
                $('#clearAllData .spinner-border').hide();
                alert("The page will now reload.");
                window.location.reload(true);
            }
        });

        $('#importData').click(async () => {
            if (confirm('This will remove all existing data. Are you sure you want to continue?')) {
                $('#importDataPicker').click();
            }
        });

        let importingData = false;
        $('#importDataPicker').change(async () => {

            if ($('#importDataPicker').val().trim() == '') return;

            if (importingData) return;
            importingData = true;
            $('#importData .spinner-border').show();

            let newScenes;
            let zip;

            try {
                let fileContents = await getUploadedFileContentsAsBinaryString($('#importDataPicker'));
                var zipFile = new JSZip();
                zip = await zipFile.loadAsync(fileContents);
                let dbFile = await zip.file("scenes.json");
                if (dbFile == null) {
                    alert("Invalid archive.");
                    return false;
                }
                newScenes = JSON.parse(await dbFile.async("string"));
            } catch (e) {
                console.error(e);
                alert("Import failed.")
                importingData = false;
                $('#importData .spinner-border').hide();
                return;
            }

            // well no going back now

            await db.Destroy();
            db = new DB();

            for (let i in newScenes.rows) {
                let newScene = newScenes.rows[i].doc;
                delete newScene._attachments;
                delete newScene._rev;
                await db.CreateScene(newScene);
                console.log("inserted scene", newScene._id);
            }

            let tokens = zip.folder(TokenImageDocumentName);

            let tokenFiles = [];

            tokens.forEach(function (relativePath, file) {
                tokenFiles.push(relativePath);
            });

            for (let relativePath of tokenFiles) {
                let ext = relativePath.split('.')[1];
                let name = relativePath.split('.')[0];
                let content = await tokens.file(relativePath).async('base64');
                await db.CreateToken(name, content, 'image/' + ext);
                console.log("inserted token", name);
            }

            let maps = zip.folder(MapImageDocumentName);

            let mapFiles = [];

            maps.forEach(function (relativePath, file) {
                mapFiles.push(relativePath);
            });

            for (let relativePath of mapFiles) {
                let ext = relativePath.split('.')[1];
                let name = relativePath.split('.')[0];
                let content = await maps.file(relativePath).async('base64');
                await db.CreateMap(name, content, 'image/' + ext);
                console.log("inserted map", name);
            }

            for (let i in newScenes.rows) {
                if (newScenes.rows[i].doc._id == MapImageDocumentName ||
                    newScenes.rows[i].doc._id == TokenImageDocumentName ||
                    newScenes.rows[i].doc._id == FavouriteTokensDocumentName) {
                    continue;
                }
                window.localStorage.setItem(lsSceneName, newScenes.rows[i].doc._id);
                console.log("Set new scene", newScenes.rows[i].doc._id);
                break;
            }

            $('#importData .spinner-border').hide();
            alert("Import complete. Page will now reload.");
            location.reload(true);

        });

        let exportingData = false;
        $('#exportData').click(async () => {

            if (exportingData) return;
            exportingData = true;
            $('#exportData .spinner-border').show();

            var zip = new JSZip();

            let scenes = await db.ReadAllScenes();
            // Add an top-level, arbitrary text file with contents
            zip.file("scenes.json", JSON.stringify(scenes));

            let tokenImageDoc = await db.ReadAllTokens();
            let tokens = zip.folder(TokenImageDocumentName);

            for (let i in tokenImageDoc._attachments) {
                tokens.file(i + '.' + tokenImageDoc._attachments[i].content_type.split('/')[1], tokenImageDoc._attachments[i].data, { base64: true });
            }

            let mapImageDoc = await db.ReadAllMaps();
            let maps = zip.folder(MapImageDocumentName);

            for (let i in mapImageDoc._attachments) {
                maps.file(i + '.' + mapImageDoc._attachments[i].content_type.split('/')[1], mapImageDoc._attachments[i].data, { base64: true });
            }

            // Generate the zip file asynchronously
            let z = await zip.generateAsync({ type: "blob" })
            download(z, "tabletop-explorer.zip");

            exportingData = false;
            $('#exportData .spinner-border').hide();

        });

    });

}