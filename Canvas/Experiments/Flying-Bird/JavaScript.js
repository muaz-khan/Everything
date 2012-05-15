(function () { var lastTime = 0, vendors = ['ms', 'moz', 'webkit', 'o']; for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) { window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame']; window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'RequestCancelAnimationFrame']; } if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) { var currTime = new Date().getTime(); var timeToCall = Math.max(0, 16 - (currTime - lastTime)); var id = window.setTimeout(function () { callback(currTime + timeToCall); }, timeToCall); lastTime = currTime + timeToCall; return id; }; if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) { clearTimeout(id); }; }());                
(function() {
    
    var canvas = document.getElementById('flying-bird'), 
    context = canvas.getContext('2d');

    /*≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡*/
    
    canvas.setAttribute('width', innerWidth);
    
    if (typeof isOtherPage === 'undefined' || typeof isOtherPage === null) {
        canvas.setAttribute('height', innerHeight - canvas.offsetTop - 80);
    }



    /*≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡*/
    
    function first() {
        var x = 896, y = 86, x1 = x + 39, y1 = y - 15;
        
        function drawBird() {
            context.clearRect(0, 0, innerWidth, innerHeight);
            
            
            var points = [["quadratic", [x, y, x + 39, y - 15, x + 45, y - 23], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 189, y + 3, x + 73, y - 81, x + 45, y - 23]], ["quadratic", [x + 189, y + 3, x + 237, y + 29, x + 396, y + 18]], ["quadratic", [x + 544, y + 76, x + 524, y + 23, x + 396, y + 18]], ["quadratic", [x + 544, y + 76, x + 568, y + 116, x + 399, y + 133]], ["quadratic", [x + 143, y + 56, x + 251, y + 153, x + 399, y + 133]], ["quadratic", [x + 143, y + 56, x + 71, y - 7, x, y - 1]], ["quadratic", [x + 85, y - 28, x + 70, y - 29, x + 77, y - 20]], ["quadratic", [x + 77, y - 20, x + 84, y - 21, x + 85, y - 29]], ["quadratic", [x + 125, y - 35, x + 162, y + 1, x + 135, y + 48]], ["quadratic", [x + 120, y - 37, x + 159, y + 18, x + 127, y + 43]], ["bezier", [x + 158, y - 16, x1 + 117, y1 + 116, x1 + 130, y1 + 127, x1 + 145, y1 + 109]], ["bezier", [x + 178, y - 2, x1 + 139, y1 + 123, x1 + 152, y1 + 134, x1 + 167, y1 + 116]], ["bezier", [x + 200, y + 7, x1 + 161, y1 + 132, x1 + 174, y1 + 143, x1 + 189, y1 + 125]], ["bezier", [x + 220, y + 15, x1 + 181, y1 + 140, x1 + 194, y1 + 151, x1 + 209, y1 + 133]], ["bezier", [x + 240, y + 16, x1 + 201, y1 + 141, x1 + 214, y1 + 152, x1 + 229, y1 + 134]], ["bezier", [x + 260, y + 20, x1 + 221, y1 + 145, x1 + 234, y1 + 156, x1 + 249, y1 + 138]], ["bezier", [x + 278, y + 22, x1 + 239, y1 + 147, x1 + 252, y1 + 158, x1 + 267, y1 + 140]], ["bezier", [x + 297, y + 22, x1 + 258, y1 + 147, x1 + 271, y1 + 158, x1 + 286, y1 + 140]], ["bezier", [x + 315, y + 22, x1 + 276, y1 + 147, x1 + 289, y1 + 158, x1 + 304, y1 + 140]], ["bezier", [x + 333, y + 21, x1 + 294, y1 + 146, x1 + 307, y1 + 157, x1 + 322, y1 + 139]], ["bezier", [x + 350, y + 20, x1 + 311, y1 + 145, x1 + 324, y1 + 156, x1 + 339, y1 + 138]], ["bezier", [x + 367, y + 20, x1 + 328, y1 + 145, x1 + 341, y1 + 156, x1 + 356, y1 + 138]], ["bezier", [x + 385, y + 20, x1 + 346, y1 + 145, x1 + 359, y1 + 156, x1 + 374, y1 + 138]], ["bezier", [x + 402, y + 20, x1 + 363, y1 + 145, x1 + 376, y1 + 156, x1 + 391, y1 + 138]], ["bezier", [x + 421, y + 20, x1 + 382, y1 + 145, x1 + 395, y1 + 156, x1 + 410, y1 + 138]], ["bezier", [x + 421, y + 20, x1 + 398, y1 + 102, x1 + 424, y1 + 108, x1 + 410, y1 + 138]]], length = points.length, point, p, i = 0;
            
            for (i; i < length; i++) {
                p = points[i];
                point = p[1];
                context.beginPath();
                
                if (p[2]) {
                    context.lineWidth = p[2][0];
                    context.strokeStyle = p[2][1];
                    context.fillStyle = p[2][2];
                    context.globalAlpha = p[2][3];
                    context.globalCompositeOperation = p[2][4];
                    context.lineCap = p[2][5];
                    context.lineJoin = p[2][6];
                }
                
                if (p[0] === "line") {
                    context.moveTo(point[0], point[1]);
                    context.lineTo(point[2], point[3]);
                }
                
                if (p[0] === "arc")
                    context.arc(point[0], point[1], point[2], point[3], 0, point[4]);
                
                if (p[0] === "rect") {
                    context.strokeRect(point[0], point[1], point[2], point[3]);
                    context.fillRect(point[0], point[1], point[2], point[3]);
                }
                
                if (p[0] === "quadratic") {
                    context.moveTo(point[0], point[1]);
                    context.quadraticCurveTo(point[2], point[3], point[4], point[5]);
                }
                
                if (p[0] === "bezier") {
                    context.moveTo(point[0], point[1]);
                    context.bezierCurveTo(point[2], point[3], point[4], point[5], point[6], point[7]);
                }
                
                context.stroke();
                context.fill();
            }
            
            
            
            x -= 5;
            x1 -= 5;
            
            if (y1 < 100 && !reverse) {
                y1 += 2;
            } 
            else
                reverse = true;
            
            if (reverse) {
                y1 -= 2;
                if (y1 < 50)
                    reverse = false;
            }
            
            if (x > 0)
                requestAnimationFrame(drawBird);
        
        }

        /*≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡*/
        
        var reverse = false;
        
        drawBird();
    }
    
    first();

})();