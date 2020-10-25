async function InitIconSelect(db) {

    //------------------------------------------------------------------------
    // Icon select

    let tokenImages = await db.ReadAllTokens();

    console.log("Got token images", Object.keys(tokenImages._attachments).length);

    IconSelect.COMPONENT_ICON_FILE_PATH = './lib/iconselect.js-1.0/images/control/icon-select/arrow.png';

    let iconSelect = new IconSelect("my-icon-select",
        {
            'selectedIconWidth': 30,
            'selectedIconHeight': 30,
            'selectedBoxPadding': 1,
            'iconsWidth': 48,
            'iconsHeight': 48,
            'boxIconSpace': 1,
            'vectoralIconNumber': 2,
            'horizontalIconNumber': 6
        });

    var icons = [];

    icons.push({ 'iconFilePath': 'lib/fontawesome-free-5.15.1-web/svgs/solid/ban.svg', 'iconValue': '' });
    for (let token in tokenImages._attachments) {
        let imageUrl = `data:${tokenImages._attachments[token].content_type};base64,${tokenImages._attachments[token].data}`;
        icons.push({ 'iconFilePath': imageUrl, 'iconValue': token });
    }

    iconSelect.refresh(icons);

}