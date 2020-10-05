paper.install(window);

const tokenSize = 80;

$(window).ready(() => {

    let canvas = document.getElementById('canvas');

    let image = document.getElementById('source');

    let imageZoom = 1;// how much to scale the image by to make it fit nicely

    let globalZoom = 1; // how much to scale *everything* by (excluding ui)

    if (window.localStorage.getItem("zoom") != null) {
        globalZoom = parseFloat(window.localStorage.getItem("zoom"));
    }

    canvas.width = image.naturalWidth * imageZoom * globalZoom;
    canvas.height = image.naturalHeight * imageZoom * globalZoom;

    // Create an empty project and a view for the canvas:
    paper.setup(canvas);

    var raster = new Raster('source');
    raster.position = view.center;
    raster.scale(imageZoom * globalZoom);

    let rect = new Path.Rectangle(new Rectangle(10, 20, tokenSize * globalZoom, tokenSize * globalZoom));
    rect.fillColor = '#e9e9ff';

    initTools();

    // Draw the view now:
    view.draw();

    $('#dropdownZoom~ul>li>a').click((e) => {
        window.localStorage.setItem('zoom', $(e.target).attr('data-value'));
        location.reload();
    });

    $('#addToken').click((e) => {
        let rect = new Path.Rectangle(new Rectangle(
            (canvas.width - tokenSize) / 2,
            (canvas.height - tokenSize) / 2,
            tokenSize * globalZoom,
            tokenSize * globalZoom
        ));
        rect.fillColor = randomColor(50);
        view.draw();
    });

});

function initTools() {
    let pan = new Tool();

    var path;
    pan.onMouseDown = function (event) {
        path = null;
        var hitResult = project.hitTest(event.point, {
            fill: true,
            tolerance: 5
        });
        if (hitResult && hitResult.type == "fill") {
            path = hitResult.item;
        }
    }

    pan.onMouseDrag = function (event) {
        if (path) {
            // don't allow more than half off the screen
            path.position = Point.min(Point.max(path.position.add(event.delta), new Point(0, 0)), new Point(canvas.width, canvas.height));
        }
    }
}

//https://stackoverflow.com/a/17373688
function randomColor(brightness) {
    function randomChannel(brightness) {
        var r = 255 - brightness;
        var n = 0 | ((Math.random() * r) + brightness);
        var s = n.toString(16);
        return (s.length == 1) ? '0' + s : s;
    }
    return '#' + randomChannel(brightness) + randomChannel(brightness) + randomChannel(brightness);
}
