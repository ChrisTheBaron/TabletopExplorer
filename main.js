// get canvas related references
let canvas = document.getElementById("canvas");

let image = document.getElementById('source');

let imageZoom = 0.3; // how much to scale the image by to make it fit nicely

let globalZoom = 2; // how much to scale *everything* by (excluding ui)

canvas.width = image.naturalWidth * imageZoom * globalZoom;
canvas.height = image.naturalHeight * imageZoom * globalZoom;

//canvas.width = $(window).width();
//canvas.height = $(window).height();

let ctx = canvas.getContext("2d");
let BB = canvas.getBoundingClientRect();
let offsetX = BB.left;
let offsetY = BB.top;

let isDragging = false;
let startX;
let startY;

// an array of objects that define different rectangles
let rects = [];

for (let i = 0; i < parseInt(window.localStorage.getItem("rects")); i++) {
    rects.push({
        x: parseFloat(window.localStorage.getItem(`rect${i}x`)) * globalZoom,
        y: parseFloat(window.localStorage.getItem(`rect${i}y`)) * globalZoom,
        width: 30 * globalZoom,
        height: 30 * globalZoom,
        fill: window.localStorage.getItem(`rect${i}f`),
        isDragging: false
    });
}

canvas.onmousedown = inputStart;
canvas.onmouseup = inputEnd;
canvas.onmousemove = inputMove;
canvas.onmouseleave = inputEnd;

canvas.ontouchstart = inputStart;
canvas.ontouchend = inputEnd;
canvas.ontouchmove = inputMove;

// call to draw the scene
draw();

// draw a single rect
function rect(x, y, w, h) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.closePath();
    ctx.fill();
}

// redraw the scene
function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "pink";
    rect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);

    // redraw each rect in the rects[] array
    for (let i = 0; i < rects.length; i++) {
        let r = rects[i];
        ctx.fillStyle = r.fill;
        rect(r.x, r.y, r.width, r.height);
    }

}

function inputStart(e) {

    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    let [x, y] = getInputPositionOnCanvas(e);

    isDragging = false;
    for (let i = rects.length - 1; i >= 0; i--) {
        let r = rects[i];
        if (x > r.x && x < r.x + r.width && y > r.y && y < r.y + r.height) {
            // if yes, set that rects isDragging=true
            isDragging = true;
            r.isDragging = true;
            break;
        }
    }
    // save the current mouse position
    startX = x;
    startY = y;

}

function inputEnd(e) {

    e.preventDefault();
    e.stopPropagation();

    // clear all the dragging flags
    isDragging = false;
    for (let i = 0; i < rects.length; i++) {
        rects[i].isDragging = false;

        // make sure nothing has slipped off the canvas
        rects[i].x = Math.max(0, rects[i].x);
        rects[i].x = Math.min(rects[i].x, canvas.width - rects[i].width);

        rects[i].y = Math.max(0, rects[i].y);
        rects[i].y = Math.min(rects[i].y, canvas.height - rects[i].height);

        // save location to LS
        window.localStorage.setItem(`rect${i}x`, rects[i].x / globalZoom);
        window.localStorage.setItem(`rect${i}y`, rects[i].y / globalZoom);
        window.localStorage.setItem(`rect${i}f`, rects[i].fill);
    }

    window.localStorage.setItem(`rects`, rects.length);

    // redraw the scene with the new rect positions
    draw();
}

function inputMove(e) {
    if (isDragging) {

        e.preventDefault();
        e.stopPropagation();

        let [x, y] = getInputPositionOnCanvas(e);

        // calculate the distance the mouse has moved
        // since the last mousemove
        let dx = x - startX;
        let dy = y - startY;

        // move each rect that isDragging
        // by the distance the mouse has moved
        // since the last mousemove
        for (let i = 0; i < rects.length; i++) {
            let r = rects[i];
            if (r.isDragging) {
                r.x += dx;
                r.y += dy;
            }
        }

        // redraw the scene with the new rect positions
        draw();

        // reset the starting mouse position for the next mousemove
        startX = x;
        startY = y;

    }
}

function getInputPositionOnCanvas(e) {

    let x = e.clientX ?? e.targetTouches[0].clientX;
    let y = e.clientY ?? e.targetTouches[0].clientY;

    let top = window.pageYOffset || document.documentElement.scrollTop;
    let left = window.pageXOffset || document.documentElement.scrollLeft;

    // get the current mouse position on the canvas
    let mx = parseInt(x - offsetX + left);
    let my = parseInt(y - offsetY + top);

    return [mx, my];

}