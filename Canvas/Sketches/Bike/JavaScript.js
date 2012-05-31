(function() {
    
    var canvas = document.getElementById('bike'), 
    context = canvas.getContext('2d');

    /*≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡*/
    
    canvas.setAttribute('width', innerWidth);
    if (typeof isOtherPage === 'undefined' || typeof isOtherPage === null)
        canvas.setAttribute('height', innerHeight - canvas.offsetTop - 80);
    
    context.lineWidth = 2;
    context.strokeStyle = '#6c96c8';

    /*≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡*/
    
    function addEvent(element, eventType, callback) {
        if (element.addEventListener) {
            element.addEventListener(eventType, callback, !1);
            return true;
        } 
        else if (element.attachEvent)
            return element.attachEvent('on' + eventType, callback);
        else
            element['on' + eventType] = callback;
        return this;
    }

    /*≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡*/
    
    function getPoint(point, prev, otherPoint) {
        if (point > prev)
            point = otherPoint + (point - prev);
        else
            point = otherPoint - (prev - point);
        
        return point;
    }

    /*≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡*/
    
    var ismousedown = false, prevX, prevY, defaultX = 200, defaultY = 145;
    
    var isTouch = 'createTouch' in document;

    /*≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡*/
    
    addEvent(canvas, isTouch ? 'touchstart' : 'mousedown', function(e) {
        if (isTouch)
            e = e.pageX ? e : e.touches.length ? e.touches[0] : {pageX: 0,pageY: 0};
        
        var pageX = e.pageX - canvas.offsetLeft, 
        pageY = e.pageY - canvas.offsetTop;
        
        prevX = pageX;
        prevY = pageY;
        
        ismousedown = true;
    });


    /*≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡*/
    
    addEvent(document, isTouch ? 'touchend' : 'mouseup', function() {
        ismousedown = false;
    
    });


    /*≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡*/
    
    addEvent(canvas, isTouch ? 'touchmove' : 'mousemove', function(e) {
        if (isTouch)
            e = e.pageX ? e : e.touches.length ? e.touches[0] : {pageX: 0,pageY: 0};
        
        var pageX = e.pageX - canvas.offsetLeft, 
        pageY = e.pageY - canvas.offsetTop;
        
        if (ismousedown) {
            defaultX = getPoint(pageX, prevX, defaultX);
            defaultY = getPoint(pageY, prevY, defaultY);
            
            drawBird(defaultX, defaultY);
            
            prevX = pageX;
            prevY = pageY;
        }
    });

    /*≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡*/
    
    function drawBird(x, y) {
        context.clearRect(0, 0, innerWidth, innerHeight);
        
        var x1 = x, y1 = y + 1, x2 = x, y2 = y, x3 = x, y3 = y, points = [["line", [x, y, x, y + 1], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["arc", [x + 59.69999999999999, y + 175.7, 63.7, 6.3, 0], ["3", "black", "gray", "1", "source-over", "butt", "miter"]], ["arc", [x + 61, y + 176, 49.0, 6.3, 0], ["3", "black", "#FBFBFB", "1", "source-over", "butt", "miter"]], ["line", [x + 458, y, x + 458, y + 1], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["arc", [x + 517.7, y + 175.7, 63.7, 6.3, 0], ["3", "black", "gray", "1", "source-over", "butt", "miter"]], ["arc", [x + 519, y + 176, 49.0, 6.3, 0], ["3", "black", "#FBFBFB", "1", "source-over", "butt", "miter"]], ["arc", [x + 518.7, y + 178.7, 22.7, 6.3, 0], ["3", "black", "Gray", "1", "source-over", "butt", "miter"]], ["arc", [x + 520.3, y + 179.3, 14.3, 6.3, 0], ["3", "black", "#FBFBFB", "1", "source-over", "butt", "miter"]], ["arc", [x + 520.3, y + 180.3, 6.3, 6.3, 0], ["3", "black", "Gray", "1", "source-over", "butt", "miter"]], ["line", [x + 532, y + 158, x + 549, y + 138], ["5", "black", "Gray", "1.0", "source-over", "round", "bevel"]], ["line", [x + 541, y + 168, x + 566, y + 165]], ["line", [x + 542, y + 186, x + 560, y + 201]], ["line", [x + 529, y + 222, x + 528, y + 203]], ["line", [x + 497, y + 219, x + 510, y + 202]], ["line", [x + 476, y + 200, x + 496, y + 191]], ["line", [x + 473, y + 165, x + 495, y + 174]], ["line", [x + 488, y + 139, x + 503, y + 159]], ["line", [x + 516, y + 128, x + 516, y + 154]], ["line", [x + 469, y + 105, x + 510, y + 164], ["10", "black", "Gray", "1.0", "source-over", "round", "bevel"]], ["quadratic", [x + 529, y + 66, x + 465, y + 87, x + 425, y + 150], ["3", "black", "transparent", "1.0", "source-over", "round", "bevel"]], ["quadratic", [x + 207, y + 35, x + 284, y + 108, x + 425, y + 150]], ["quadratic", [x + 207, y + 35, x + 259, y - 55, x + 379, y - 29]], ["quadratic", [x + 416, y + 20, x + 422, y - 11, x + 379, y - 29]], ["quadratic", [x + 416, y + 20, x + 407, y + 59, x + 529, y + 65]], ["quadratic", [x + 405, y + 144, x + 400, y + 161, x + 380, y + 163]], ["quadratic", [x + 352, y + 188, x + 387, y + 216, x + 380, y + 163]], ["quadratic", [x + 352, y + 188, x + 343, y + 219, x + 304, y + 215]], ["quadratic", [x + 232, y + 251, x + 302, y + 254, x + 304, y + 215]], ["quadratic", [x + 232, y + 251, x + 215, y + 140, x + 270, y + 84]], ["quadratic", [x + 379, y + 162, x + 349, y + 132, x + 343, y + 143]], ["quadratic", [x + 352, y + 188, x + 309, y + 162, x + 344, y + 143]], ["quadratic", [x + 529, y + 66, x + 583, y + 50, x + 574, y + 17]], ["quadratic", [x + 520, y - 63, x + 559, y - 54, x + 574, y + 17]], ["quadratic", [x + 520, y - 63, x + 567, y - 3, x + 537, y + 21]], ["quadratic", [x + 427, y + 43, x + 476, y + 11, x + 537, y + 21]], ["quadratic", [x + 557, y + 4, x + 553, y + 27, x + 564, y + 33]], ["quadratic", [x + 558, y + 4, x + 567, y + 20, x + 566, y + 32]], ["quadratic", [x + 502, y + 17, x + 492, y - 9, x + 486, y - 10]], ["quadratic", [x + 510, y + 17, x + 500, y - 9, x + 494, y - 12]], ["quadratic", [x + 493, y - 14, x + 501, y - 16, x + 498, y - 27]], ["quadratic", [x + 471, y - 4, x + 467, y - 32, x + 498, y - 27]], ["quadratic", [x + 471, y - 4, x + 479, y - 5, x + 487, y - 9]], ["quadratic", [x + 234, y + 141, x + 99, y + 76, x + 79, y + 43]], ["quadratic", [x + 89, y - 27, x + 48, y - 26, x + 79, y + 43]], ["quadratic", [x + 89, y - 27, x + 134, y - 34, x + 206, y + 35]], ["quadratic", [x + 89, y - 27, x + 82, y - 67, x - 25, y - 61]], ["quadratic", [x + 72, y + 25, x - 59, y + 8, x - 25, y - 61]], ["quadratic", [x - 21, y - 9, x - 64, y - 4, x - 69, y - 8]], ["quadratic", [x - 15, y - 1, x - 58, y + 4, x - 70, y + 3]], ["quadratic", [x - 85, y - 32, x - 54, y - 8, x - 86, y + 22]], ["quadratic", [x - 85, y - 32, x - 84, y - 7, x - 86, y + 22]], ["quadratic", [x - 87, y - 19, x - 106, y - 8, x - 85, y + 6]], ["arc", [x + 59.69999999999999, y + 179.7, 26.7, 6.3, 0], ["3", "black", "Gray", "1.0", "source-over", "round", "bevel"]], ["quadratic", [x - 85, y - 32, x - 84, y - 7, x - 86, y + 22], ["3", "black", "transparent", "1.0", "source-over", "round", "bevel"]], ["quadratic", [x + 231, y + 251, x + 87, y + 245, x + 56, y + 183]], ["quadratic", [x + 73, y + 165, x + 48, y + 159, x + 56, y + 183]], ["quadratic", [x + 73, y + 165, x + 177, y + 174, x + 235, y + 146]], ["quadratic", [x + 170, y + 111, x + 156, y + 149, x + 164, y + 163]], ["quadratic", [x + 156, y + 103, x + 142, y + 141, x + 146, y + 165]], ["line", [x + 62, y + 209, x + 63, y + 223], ["5", "black", "transparent", "1.0", "source-over", "round", "bevel"]], ["line", [x + 43, y + 203, x + 32, y + 212]], ["line", [x + 31, y + 186, x + 15, y + 187]], ["line", [x + 35, y + 161, x + 19, y + 151]], ["line", [x + 43, y + 130, x + 53, y + 150]], ["line", [x + 81, y + 131, x + 71, y + 152]], ["line", [x + 99, y + 148, x + 80, y + 160]], ["quadratic", [x + 170, y + 111, x + 156, y + 149, x + 164, y + 163], ["3", "black", "transparent", "1.0", "source-over", "round", "bevel"]], ["quadratic", [x + 170, y + 111, x + 156, y + 149, x + 164, y + 163]], ["bezier", [x + 234, y + 250, x1 + 94, y1 + 250, x2 + 43, y2 + 186, x3 + 61, y3 + 171], ["0", "transparent", "black", "1.0", "source-over", "round", "bevel"]], ["bezier", [x + 234, y + 250, x1 + 227, y1 + 120, x2 + 43, y2 + 186, x3 + 52, y3 + 170]], ["bezier", [x + 228, y + 224, x1 + 130, y1 + 190, x2 + 182, y2 + 158, x3 + 236, y3 + 148]], ["bezier", [x + 119, y + 168, x1 + 307, y1 + 138, x2 + 198, y2 + 218, x3 + 232, y3 + 191]], ["bezier", [x + 76, y + 206, x1 + 15, y1 + 142, x2 + 83, y2 + 153, x3 + 181, y3 + 189]], ["bezier", [x + 88, y - 20, x1 + 12, y1 + 46, x2 + 201, y2 + 133, x3 + 237, y3 + 142]], ["bezier", [x + 88, y - 20, x1 + 276, y1 + 5, x2 + 212, y2 + 120, x3 + 241, y3 + 147]], ["bezier", [x + 268, y + 93, x1 + 215, y1 + 50, x2 + 152, y2 + 94, x3 + 235, y3 + 140]], ["bezier", [x + 276, y + 87, x1 + 153, y1 - 25, x2 + 153, y2 + 86, x3 + 236, y3 + 132]], ["bezier", [x + 188, y + 17, x1 + 65, y1 - 95, x2 - 1, y2 + 25, x3 + 148, y3 + 62]], ["quadratic", [x - 86, y - 18, x - 107, y - 8, x - 87, y + 2], ["0", "transparent", "red", "1.0", "source-over", "round", "bevel"]], ["bezier", [x + 276, y + 87, x1 + 153, y1 - 25, x2 + 153, y2 + 86, x3 + 236, y3 + 132], ["0", "transparent", "black", "1.0", "source-over", "round", "bevel"]], ["quadratic", [x + 557, y + 6, x + 554, y + 31, x + 566, y + 33], ["0", "transparent", "#72DBDF", "1.0", "source-over", "round", "bevel"]], ["quadratic", [x + 557, y + 6, x + 568, y + 18, x + 566, y + 33]], ["bezier", [x + 569, y + 39, x1 + 565, y1 + 72, x2 + 475, y2 + 77, x3 + 426, y3 + 42], ["0", "transparent", "black", "1.0", "source-over", "round", "bevel"]], ["bezier", [x + 569, y + 39, x1 + 565, y1 + 72, x2 + 560, y2 - 24, x3 + 426, y3 + 42]], ["bezier", [x + 523, y - 62, x1 + 564, y1 - 45, x2 + 575, y2 - 14, x3 + 576, y3 + 30]], ["quadratic", [x + 562, y + 2, x + 584, y + 24, x + 569, y + 43]], ["quadratic", [x + 546, y - 20, x + 547, y + 7, x + 572, y + 14]], ["quadratic", [x + 543, y - 30, x + 544, y - 3, x + 569, y + 4]], ["quadratic", [x + 544, y + 15, x + 512, y + 28, x + 570, y + 49]], ["quadratic", [x + 550, y + 8, x + 512, y + 28, x + 562, y + 42]], ["quadratic", [x + 556, y - 13, x + 536, y + 15, x + 556, y + 34]], ["quadratic", [x + 528, y + 30, x + 570, y + 72, x + 573, y + 35]], ["quadratic", [x + 532, y + 18, x + 570, y + 72, x + 573, y + 35]], ["bezier", [x + 529, y + 28, x1 + 439, y1 + 15, x2 + 422, y2 + 40, x3 + 449, y3 + 54]], ["bezier", [x + 562, y + 34, x1 + 472, y1 + 21, x2 + 455, y2 + 46, x3 + 482, y3 + 60]], ["bezier", [x + 276, y + 89, x1 + 218, y1 + 105, x2 + 211, y2 + 279, x3 + 249, y3 + 247], ["0", "transparent", "rgb(255, 191, 255)", "1.0", "source-over", "round", "bevel"]], ["bezier", [x + 274, y + 89, x1 + 375, y1 + 129, x2 + 317, y2 + 189, x3 + 249, y3 + 181]], ["bezier", [x + 243, y + 250, x1 + 318, y1 + 257, x2 + 317, y2 + 189, x3 + 249, y3 + 181]], ["bezier", [x + 318, y + 163, x1 + 397, y1 + 209, x2 + 283, y2 + 242, x3 + 272, y3 + 182]], ["bezier", [x + 279, y + 163, x1 + 358, y1 + 209, x2 + 244, y2 + 242, x3 + 233, y3 + 182]], ["bezier", [x + 282, y + 202, x1 + 319, y1 + 198, x2 + 305, y2 + 254, x3 + 263, y3 + 232]], ["bezier", [x + 329, y + 176, x1 + 373, y1 + 184, x2 + 345, y2 + 213, x3 + 310, y3 + 206]], ["bezier", [x + 353, y + 129, x1 + 437, y1 + 145, x2 + 409, y2 + 156, x3 + 380, y3 + 162]], ["bezier", [x + 353, y + 129, x1 + 284, y1 + 119, x2 + 378, y2 + 145, x3 + 380, y3 + 162]], ["bezier", [x + 305, y + 105, x1 + 245, y1 + 104, x2 + 322, y2 + 190, x3 + 355, y3 + 127]], ["bezier", [x + 327, y + 185, x1 + 291, y1 + 154, x2 + 290, y2 + 177, x3 + 329, y3 + 142]], ["bezier", [x + 319, y + 167, x1 + 283, y1 + 136, x2 + 282, y2 + 159, x3 + 340, y3 + 141]], ["bezier", [x + 313, y + 126, x1 + 335, y1 + 135, x2 + 349, y2 + 104, x3 + 378, y3 + 150]], ["quadratic", [x + 378, y + 162, x + 392, y + 226, x + 333, y + 173], ["0", "transparent", "rgb(0, 102, 255)", "1.0", "source-over", "round", "bevel"]], ["quadratic", [x + 379, y + 165, x + 342, y + 114, x + 333, y + 173]], ["quadratic", [x + 334, y + 174, x + 317, y + 143, x + 355, y + 147]], ["quadratic", [x + 64, y + 161, x + 4, y + 174, x + 71, y + 207], ["0", "transparent", "black", "1.0", "source-over", "round", "bevel"]], ["quadratic", [x - 86, y - 32, x - 51, y - 5, x - 87, y + 24]], ["quadratic", [x - 14, y - 5, x - 61, y + 12, x - 75, y - 3]], ["quadratic", [x - 15, y - 2, x - 48, y - 14, x - 75, y - 3]], ["quadratic", [x - 18, y + 1, x - 16, y - 19, x - 33, y - 5]], ["quadratic", [x + 500, y - 27, x + 471, y - 34, x + 470, y - 4]], ["quadratic", [x + 500, y - 27, x + 500, y - 5, x + 470, y - 4]]], length = points.length, point, p, i = 0;
        
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
    }


    /*≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡*/
    
    drawBird(defaultX, defaultY);

/*≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡*/
})();