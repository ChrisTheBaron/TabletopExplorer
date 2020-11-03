
function substringMatcher(strs) {
    return function findMatches(q, cb) {
        var matches, substrRegex;

        // an array that will be populated with substring matches
        matches = [];

        // regex used to determine if a string contains the substring `q`
        substrRegex = new RegExp(q, 'i');

        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(strs, function (i, str) {
            if (substrRegex.test(str)) {
                matches.push(str);
            }
        });

        cb(matches);
    };
};

https://stackoverflow.com/a/34890276
function groupBy(xs, key) {
    return xs.reduce(function (rv, x) {
        var v = key instanceof Function ? key(x) : x[key]; (rv[v] = rv[v] || []).push(x); return rv;
    }, {});
};

function isFileImage(data) {
    try {
        return data.split(';')[0].split(':')[1].split('/')[0] == 'image';
    } catch (e) {
        console.error(e);
        return false;
    }
}

async function blobToBase64(blob) {
    return new Promise((resolve) => {
        let reader = new FileReader();
        reader.onload = function () {
            resolve(reader.result);
        };
        reader.readAsDataURL(blob);
    });
};

function getUploadedFileContentsAsURL(target) {
    return new Promise(function (resolved, rejected) {
        var files = $(target)[0].files;
        f = files[0];
        var reader = new FileReader();
        reader.onload = (e) => {
            resolved(e.target.result);
        };
        reader.onerror = rejected;
        reader.readAsDataURL(f);
    });
}

function getUploadedFileContentsAsBinaryString(target) {
    return new Promise(function (resolved, rejected) {
        var files = $(target)[0].files;
        f = files[0];
        var reader = new FileReader();
        reader.onload = (e) => {
            resolved(e.target.result);
        };
        reader.onerror = rejected;
        reader.readAsBinaryString(f);
    });
}

function getImageDisplayDimensions(file, zoom) {
    return new Promise(function (resolved, rejected) {
        var i = new Image();
        i.onload = function () {
            resolved({ width: i.width * zoom, height: i.height * zoom });
        };
        i.onerror = rejected;
        i.src = file;
    })
}

function getTokenMarkup(token, imageUrl) {
    return `<div class="draggable token ${(imageUrl.length > 0 ? "" : "no-image")}" 
            data-i="${token.i}"
            data-l="${token.l}" 
            data-x="${token.x || 10}"    
            data-y="${token.y || 10}" 
            data-s="${token.s || 1}" 
            data-b="${token.b || ''}"
            data-r="${token.r || 0}"
            style="
                transform: translate(${token.x}em, ${token.y}em);
                background-color: ${token.f || '#00000000'};
                width: ${token.s || 1}em;
                height: ${token.s || 1}em;
            ">
            ${(imageUrl.length > 0 ? `<div class="image" style="background-image: url('${imageUrl}');"></div>` : "")}
        </div>`;
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

function numberToLabel(i, numbering) {
    switch (numbering) {
        case "alphabetic":
            return toColumnName(i);
        case "numeric":
            return i;
        case "roman":
            return arabicToRoman(i);
    }
}

//https://blog.usejournal.com/create-a-roman-numerals-converter-in-javascript-a82fda6b7a60
function arabicToRoman(number) {
    let roman = "";
    const romanNumList = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XV: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
    let a;
    if (number < 1 || number > 3999) {
        console.log("number out of bounds", number);
        return number;
    } else {
        for (let key in romanNumList) {
            a = Math.floor(number / romanNumList[key]);
            if (a >= 0) {
                for (let i = 0; i < a; i++) {
                    roman += key;
                }
            }
            number = number % romanNumList[key];
        }
    }
    return roman;
}

//https://cwestblog.com/2013/09/05/javascript-snippet-convert-number-to-column-name/
function toColumnName(num) {
    let ret = '';
    for (let a = 1, b = 26; (num -= a) >= 0; a = b, b *= 26) {
        ret = String.fromCharCode(parseInt((num % b) / a) + 65) + ret;
    }
    return ret;
}

function getCentreOfMapOnDisplay(imageDim, zoom) {

    let x = ((imageDim.width) / 2);
    if ((imageDim.width * zoom) > window.innerWidth) {
        let scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
        x = ((window.innerWidth / 2) + scrollLeft) / zoom;
    }

    let y = ((imageDim.height) / 2);
    if ((imageDim.height * zoom) > window.innerHeight) {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        y = ((window.innerHeight / 2) + scrollTop) / zoom;
    }

    return [x, y];

}

function generateKey(length) {
    const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ2346789';
    let array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    array = array.map(x => validChars.charCodeAt(x % validChars.length));
    return String.fromCharCode.apply(null, array);
}