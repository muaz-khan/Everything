(function() {
    
    var canvas = document.getElementById('bird-1'), 
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
    
    var ismousedown = false, prevX, prevY, defaultX = 183, defaultY = 103;
    
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
        
        var points = [["quadratic", [x, y, x + 38, y - 15, x + 49, y - 14], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x, y, x + 32, y - 9, x + 49, y], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 49, y - 14, x + 55, y - 60, x + 106, y - 38], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x + 104, y - 39, x + 166, y + 34, x + 405, y + 9, x + 430, y + 68], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 431, y + 67, x + 602, y + 71, x + 616, y + 57], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 616, y + 57, x + 657, y + 62, x + 629, y + 87], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 619, y + 86, x + 660, y + 91, x + 584, y + 126], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x + 47, y - 1, x + 78, y + 16, x + 64, y + 150, x + 249, y + 218], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 247, y + 217, x + 319, y + 238, x + 400, y + 202], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x + 145, y + 82, x + 212, y + 240, x + 409, y + 165, x + 471, y + 233], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x + 145, y + 82, x + 257, y + 33, x + 521, y + 143, x + 582, y + 195], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x + 471, y + 233, x + 539, y + 253, x + 425, y + 182, x + 502, y + 178], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 581, y + 194, x + 590, y + 220, x + 501, y + 178], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 587, y + 125, x + 526, y + 154, x + 508, y + 150], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x + 229, y + 169, x + 170, y + 133, x + 289, y + 173, x + 220, y + 138], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x + 224, y + 140, x + 165, y + 104, x + 284, y + 144, x + 215, y + 109], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x + 219, y + 112, x + 160, y + 76, x + 279, y + 116, x + 210, y + 81], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x + 211, y + 82, x + 192, y + 66, x + 311, y + 106, x + 242, y + 71], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x + 481, y + 210, x + 279, y + 133, x + 288, y + 157, x + 353, y + 196], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x + 403, y + 68, x + 336, y + 41, x + 422, y + 62, x + 395, y + 42], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x + 410, y + 94, x + 343, y + 67, x + 429, y + 88, x + 402, y + 68], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x + 403, y + 106, x + 350, y + 93, x + 484, y + 122, x + 409, y + 94], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 625, y + 86, x + 518, y + 132, x + 406, y + 76], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x + 81, y - 25, x + 53, y - 27, x + 71, y + 4, x + 81, y - 26], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x + 582, y + 196, x + 329, y + 96, x + 300, y + 90, x + 230, y + 93], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x + 483, y + 182, x + 348, y + 152, x + 388, y + 113, x + 237, y + 123], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x + 313, y + 162, x + 260, y + 166, x + 260, y + 141, x + 241, y + 150], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x + 320, y + 225, x + 334, y + 240, x + 342, y + 223, x + 325, y + 296], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x + 326, y + 223, x + 340, y + 238, x + 348, y + 221, x + 331, y + 294], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x + 348, y + 220, x + 362, y + 235, x + 370, y + 218, x + 353, y + 291], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x + 354, y + 217, x + 368, y + 232, x + 376, y + 215, x + 359, y + 288], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x + 331, y + 294, x + 346, y + 296, x + 351, y + 311, x + 332, y + 304], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x + 358, y + 287, x + 373, y + 289, x + 378, y + 304, x + 359, y + 297], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x + 332, y + 304, x + 335, y + 322, x + 319, y + 312, x + 321, y + 303], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x + 362, y + 298, x + 361, y + 316, x + 349, y + 306, x + 351, y + 297], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x + 321, y + 304, x + 308, y + 313, x + 304, y + 290, x + 326, y + 294], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x + 352, y + 297, x + 346, y + 306, x + 335, y + 283, x + 353, y + 289], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x + 429, y + 66, x + 430, y + 70, x + 439, y + 78, x + 421, y + 83], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x + 146, y + 83, x + 140, y + 47, x + 165, y + 92, x + 171, y + 59], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x + 171, y + 60, x + 165, y + 24, x + 190, y + 69, x + 196, y + 36], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x + 196, y + 36, x + 190, y, x + 215, y + 45, x + 221, y + 9], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x + 220, y + 41, x + 214, y + 5, x + 239, y + 50, x + 245, y + 14], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x + 195, y + 71, x + 189, y + 32, x + 214, y + 77, x + 220, y + 41], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x + 249, y + 71, x + 241, y + 15, x + 272, y + 56, x + 263, y + 16], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x + 276, y + 76, x + 268, y + 20, x + 299, y + 61, x + 290, y + 21], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x + 297, y + 79, x + 289, y + 23, x + 320, y + 64, x + 311, y + 24], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x + 318, y + 83, x + 310, y + 27, x + 341, y + 68, x + 332, y + 28], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x + 342, y + 88, x + 333, y + 31, x + 364, y + 72, x + 355, y + 32], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x + 358, y + 92, x + 349, y + 34, x + 380, y + 75, x + 371, y + 35], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x + 358, y + 92, x + 375, y + 36, x + 380, y + 75, x + 400, y + 78], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["arc", [x + 70.69999999999999, y - 18.288899999999998, 1.7, 6.3, 0], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x + 106, y - 38, x + 128, y + 6, x + 86, y + 23, x + 62, y + 19], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x + 117, y - 28, x + 132, y + 11, x + 93, y + 29, x + 65, y + 29], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["line", [x + 68, y + 28, x + 65, y + 19], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["line", [x + 73, y + 29, x + 70, y + 20], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["line", [x + 79, y + 29, x + 76, y + 20], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["line", [x + 85, y + 27, x + 82, y + 18], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["line", [x + 90, y + 25, x + 87, y + 16], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["line", [x + 95, y + 22, x + 93, y + 15], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["line", [x + 101, y + 19, x + 99, y + 11], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["line", [x + 105, y + 16, x + 103, y + 8], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["line", [x + 109, y + 14, x + 106, y + 3], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["line", [x + 113, y + 10, x + 109, y - 1], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["line", [x + 116, y + 5, x + 111, y - 6], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["line", [x + 119, y - 1, x + 112, y - 12], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["line", [x + 120, y - 9, x + 111, y - 22], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["line", [x + 120, y - 16, x + 110, y - 29], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]]], length = points.length, point, p, i = 0;
        
        for (i; i < length; i++) {
            p = points[i];
            point = p[1];
            context.beginPath();
            
            context.lineWidth = p[2][0];
            context.strokeStyle = p[2][1];
            context.fillStyle = p[2][2];
            context.globalAlpha = p[2][3];
            context.globalCompositeOperation = p[2][4];
            context.lineCap = p[2][5];
            context.lineJoin = p[2][6];
            
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