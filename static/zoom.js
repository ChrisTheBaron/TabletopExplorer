let _zoom = 1.0; // a sensible default
if (window.localStorage.getItem(lsZoom) != null) {
    try {
        _zoom = parseFloat(window.localStorage.getItem(lsZoom));
    } catch (e) {
        console.error(e);
        _zoom = 1.0;
    }
}

function SetZoom(zoom) {
    _zoom = zoom;
    $('main').css('font-size', _zoom + 'px');
    window.localStorage.setItem(lsZoom, _zoom);
}

function GetZoom() {
    return _zoom;
}

function InitZoom(imageDim) {

    $(window).ready(() => {

        $('#zoomInput').on('input', (e) => {
            SetZoom(parseFloat($(e.target).val()));
        });

        $('#zoomInput').val(_zoom).trigger('input');

        $('#fitWidth').click(e => {
            let mainWidth = imageDim.width;
            let visibleWidth = window.innerWidth;
            console.log(mainWidth, visibleWidth);
            $('#zoomInput').val(Math.max(0.25, Math.min(visibleWidth / mainWidth, 3))).trigger('input');
        });

        $('#fitHeight').click(e => {
            let mainHeight = imageDim.height;
            let visibleHeight = window.innerHeight - navBarHeight;//nav
            console.log(mainHeight, visibleHeight);
            $('#zoomInput').val(Math.max(0.25, Math.min(visibleHeight / mainHeight, 3))).trigger('input');
        });

        $('#fitScreen').click(e => {
            let mainHeight = imageDim.height;
            let visibleHeight = window.innerHeight - navBarHeight;//nav
            let mainWidth = imageDim.width;
            let visibleWidth = window.innerWidth;
            $('#zoomInput').val(Math.max(0.25, Math.min(Math.min(visibleWidth / mainWidth, visibleHeight / mainHeight), 3))).trigger('input');
        });

    });

}
