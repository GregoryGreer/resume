'use strict';

/**
 * @ngdoc service
 * @name resumeApp.canvas
 * @description
 * # canvas
 * Service in the resumeApp.
 */
angular.module('resumeApp')
    .service('canvas', ['$document', function ($document) {
        // AngularJS will instantiate a singleton by calling "new" on this function

        var isGood = function (item) {return (item != null && item != 0)};
        var isBad = function (item) {return (item == null || item == 0)};

        var canvas = {
            'version': '0.0.1',
            'const': {
                'width': 640, 'height': 480
            },
            'ctxt': {'canvasID': '', 'elementid': 0, 'context': 0},
            'sprites': []
        };

        var say = function(saythis, color, font, x, y) {
            canvas.ctxt.context.strokeStyle = color;
            canvas.ctxt.context.fillStyle = color;
            canvas.ctxt.context.font = font;
            canvas.ctxt.context.fillText(saythis, x, y);
        };

        if (isBad(canvas.ctxt.elementid)) {canvas.ctxt.elementid = $document[0].getElementById('starfield');}

        if (isGood(canvas.ctxt.elementid) &&
            isBad(canvas.ctxt.context)) {canvas.ctxt.context = canvas.ctxt.elementid.getContext('2d');}

        // Public API here
        canvas.init = function (canvasID, canvasWidth, canvasHeight) {
            if (!(canvasID === undefined)) {canvas.ctxt.canvasID = canvasID;}

            if (canvasWidth === undefined) {
                canvas.ctxt.width = 800;
            } else {
                canvas.ctxt.width = canvasWidth;
            }

            if (canvasHeight === undefined) {
                canvas.ctxt.height = 640;
            } else {
                canvas.ctxt.height = canvasHeight;
            }

            canvas.ctxt.elementid = $document[0].getElementById(canvasID);
            if (isGood(canvas.ctxt.elementid)) {canvas.ctxt.context = canvas.ctxt.elementid.getContext("2d");}
        };


        canvas.addSprites = function(id, simage, xcount, ycount, xpixels, ypixels) {
            canvas.sprites.push({
                'id': id,
                'img': simage,
                'xcount': xcount,
                'ycount': ycount,
                'xpixels': xpixels,
                'ypixels': ypixels
            });
        };

        canvas.clear = function () {
            canvas.ctxt.context.strokeStyle = 'black';
            canvas.ctxt.context.fillStyle = 'black';
            canvas.ctxt.context.fillRect(0, 0, canvas.const.width, canvas.const.height);
        };

        canvas.set = function () {
            canvas.ctxt.context.strokeStyle = 'white';
            canvas.ctxt.context.fillStyle = 'white';
            canvas.ctxt.context.fillRect(0, 0, canvas.const.width, canvas.const.height);
        };

        canvas.ultext = function (saythis) {say(saythis, 'white', '12px Arial', 0, 10);};
        canvas.umtext = function (saythis) {say(saythis, 'white', '12px Arial', canvas.const.width * .45, 10);};
        canvas.urtext = function (saythis) {say(saythis, 'white', '12px Arial', canvas.const.width * .833, 10, 10);};
        canvas.mltext = function (saythis) {say(saythis, 'white', '12px Arial', 0, canvas.const.height / 2);};
        canvas.mrtext = function (saythis) {say(saythis, 'white', '12px Arial', canvas.const.width * .833, canvas.const.height/2);};
        canvas.lltext = function (saythis) {say(saythis, 'white', '12px Arial', canvas.const.width, canvas.const.height - 10);};
        canvas.lmtext = function (saythis) {say(saythis, 'white', '12px Arial', canvas.const.width * .45, canvas.const.height - 10);};
        canvas.lrtext = function (saythis) {say(saythis, 'white', '12px Arial', canvas.const.width * .833, canvas.const.height - 10);};

        canvas.sayxy = function (saythis, x, y) {say(saythis, 'white', '12px Arial', x, y);};

        canvas.arc = function (x, y, size, color, beginangle, angle) {
            if (isBad(canvas.ctxt.context)) {canvas.init();}
            if (size > 0) {
                canvas.ctxt.context.beginPath();
                canvas.ctxt.context.arc(x, y, size, beginangle, angle);
                canvas.ctxt.context.strokeStyle = color;
                canvas.ctxt.context.fillStyle = color;
                canvas.ctxt.context.fill();
                canvas.ctxt.context.stroke();
            }
        };

        canvas.circle = function (x, y, size, color) {canvas.arc(x, y, size, color, 0, 2 * Math.PI);};
        canvas.drawImage = function (x, y, image) {canvas.ctxt.context.drawImage(image, x, y);};

        canvas.drawSprite = function (id, i, j, x, y) {
            // first 3 (id, i and j) refer to the sprite panel
            // last 2 (x and y) tell us where to draw that sprite
            for (var scnt =0; scnt < canvas.sprites.length; i++) {
                if (canvas.sprites[scnt].id === id) {
                    canvas.ctxt.context.drawImage(canvas.sprites[scnt].img,
                        i * canvas.sprites[scnt].xpixels, j * canvas.sprites[scnt].ypixels,
                        canvas.sprites[scnt].xpixels, canvas.sprites[scnt].ypixels,
                        x * canvas.sprites[scnt].xpixels, y * canvas.sprites[scnt].xpixels,
                        canvas.sprites[scnt].xpixels, canvas.sprites[scnt].ypixels);
                    break;
                }
            }
        };

        return canvas;
    }]);
