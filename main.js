// get canvas related references
let canvas = document.getElementById("canvas");

canvas.width = $(window).width();
canvas.height = $(window).height();

let ctx = canvas.getContext("2d");
let BB = canvas.getBoundingClientRect();
let offsetX = BB.left;
let offsetY = BB.top;
let WIDTH = canvas.width;
let HEIGHT = canvas.height;

let dragok = false;
let startX;
let startY;

// an array of objects that define different rectangles
let rects = [];
rects.push({
    x: 75 - 15,
    y: 50 - 15,
    width: 30,
    height: 30,
    fill: "#444444",
    isDragging: false
});
rects.push({
    x: 75 - 25,
    y: 50 - 25,
    width: 30,
    height: 30,
    fill: "#ff550d",
    isDragging: false
});
rects.push({
    x: 75 - 35,
    y: 50 - 35,
    width: 30,
    height: 30,
    fill: "#800080",
    isDragging: false
});
rects.push({
    x: 75 - 45,
    y: 50 - 45,
    width: 30,
    height: 30,
    fill: "#0c64e8",
    isDragging: false
});

canvas.onmousedown = myDown;
canvas.onmouseup = myUp;
canvas.onmousemove = myMove;

canvas.ontouchstart = myDown;
canvas.ontouchend = myUp;
canvas.ontouchmove = myMove;

// call to draw the scene
draw();

// draw a single rect
function rect(x, y, w, h) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.closePath();
    ctx.fill();
}

// clear the canvas
function clear() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

// redraw the scene
function draw() {
    clear();
    ctx.fillStyle = "#FAF7F8";
    rect(0, 0, WIDTH, HEIGHT);
    // redraw each rect in the rects[] array
    for (let i = 0; i < rects.length; i++) {
        let r = rects[i];
        ctx.fillStyle = r.fill;
        rect(r.x, r.y, r.width, r.height);
    }
}

function myDown(e) {

    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    let x = e.clientX ?? e.targetTouches[0].clientX;
    let y = e.clientY ?? e.targetTouches[0].clientY;

    // get the current mouse position
    let mx = parseInt(x - offsetX);
    let my = parseInt(y - offsetY);

    dragok = false;
    for (let i = rects.length - 1; i >= 0; i--) {
        let r = rects[i];
        if (mx > r.x && mx < r.x + r.width && my > r.y && my < r.y + r.height) {
            // if yes, set that rects isDragging=true
            dragok = true;
            r.isDragging = true;
            break;
        }
    }
    // save the current mouse position
    startX = mx;
    startY = my;
}

function myUp(e) {
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // clear all the dragging flags
    dragok = false;
    for (let i = 0; i < rects.length; i++) {
        rects[i].isDragging = false;
    }
}

function myMove(e) {
    // if we're dragging anything...
    if (dragok) {

        // tell the browser we're handling this mouse event
        e.preventDefault();
        e.stopPropagation();

        let x = e.clientX ?? e.targetTouches[0].clientX;
        let y = e.clientY ?? e.targetTouches[0].clientY;

        // get the current mouse position
        let mx = parseInt(x - offsetX);
        let my = parseInt(y - offsetY);

        // calculate the distance the mouse has moved
        // since the last mousemove
        let dx = mx - startX;
        let dy = my - startY;

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
        startX = mx;
        startY = my;

    }
}
