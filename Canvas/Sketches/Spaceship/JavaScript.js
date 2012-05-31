(function() {
    
    var canvas = document.getElementById('spaceship'), 
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
    
    var ismousedown = false, prevX, prevY, defaultX = 290, defaultY = 250;
    
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
        
        var x1 = x + 133, y1 = y - 160, x2 = x + 365, y2 = y - 121, x3 = x + 433, y3 = y - 17, points = [["bezier", [x, y, x1, y1, x2, y2, x3, y3], ["3", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x, y, x1 - 4, y1 + 250, x2 - 19, y2 + 211, x3, y3]], ["bezier", [x, y, x1 + 7, y1 + 318, x2 - 20, y2 + 248, x3, y3]], ["bezier", [x + 124, y + 88, x1 + 67, y1 + 328, x2 - 90, y2 + 269, x3 - 115, y3 + 102]], ["bezier", [x + 155, y - 8, x1 + 59, y1 + 123, x2 - 133, y2 + 84, x3 - 161, y3 + 5], ["3", "#6c96c8", "Gray", "1", "source-over", "butt", "miter"]], ["bezier", [x + 156, y - 9, x1 + 66, y1 + 175, x2 - 114, y2 + 123, x3 - 160, y3 + 4]], ["bezier", [x + 191, y + 3, x1 + 51, y1 + 88, x2 - 124, y2 + 34, x3 - 190, y3 + 19], ["3", "#6c96c8", "green", "1", "source-over", "butt", "miter"]], ["bezier", [x + 211, y - 139, x1 + 134, y1 + 24, x2 - 86, y2 + 38, x3 - 217, y3 - 42]], ["bezier", [x + 214, y - 139, x1 + 31, y1 + 26, x2 - 205, y2 + 49, x3 - 216, y3 - 43]], ["arc", [x + 197.3, y - 103.7, 10.3, 6.3, 0], ["3", "#6c96c8", "red", "1", "source-over", "butt", "miter"]], ["arc", [x + 235.29999999999995, y - 103.7, 10.3, 6.3, 0]], ["bezier", [x + 156, y - 9, x1 + 12, y1 - 105, x2 - 77, y2 - 114, x3 - 160, y3 + 5], ["3", "#6c96c8", "blue", "0.1", "source-over", "butt", "bevel"]], ["line", [x + 88, y + 53, x + 30, y + 120], ["6", "#6c96c8", "blue", "1.0", "source-over", "round", "bevel"]], ["line", [x + 35, y + 27, x - 3, y + 50]], ["line", [x + 352, y + 49, x + 398, y + 127]], ["line", [x + 400, y + 19, x + 440, y + 44]], ["bezier", [x + 29, y + 122, x1 - 55, y1 + 302, x2 - 298, y2 + 303, x3 - 401, y3 + 191], ["0", "#6c96c8", "red", "1.0", "xor", "round", "bevel"]], ["bezier", [x + 29, y + 122, x1 - 159, y1 + 302, x2 - 350, y2 + 290, x3 - 401, y3 + 191]], ["bezier", [x + 398, y + 128, x1 + 210, y1 + 308, x2 + 19, y2 + 296, x3 - 32, y3 + 197]], ["bezier", [x + 398, y + 128, x1 + 330, y1 + 331, x2 + 19, y2 + 296, x3 - 32, y3 + 197]], ["bezier", [x + 443, y + 46, x1 + 375, y1 + 249, x2 + 64, y2 + 214, x3 + 13, y3 + 115]], ["bezier", [x + 443, y + 46, x1 + 272, y1 + 247, x2 + 64, y2 + 214, x3 + 13, y3 + 115]], ["bezier", [x - 4, y + 50, x1 - 175, y1 + 251, x2 - 383, y2 + 218, x3 - 434, y3 + 119]], ["bezier", [x - 4, y + 50, x1 - 82, y1 + 251, x2 - 383, y2 + 218, x3 - 434, y3 + 119]], ["bezier", [x + 289, y + 106, x1 + 129, y1 + 318, x2 - 186, y2 + 261, x3 - 280, y3 + 126], ["0", "transparent", "red", "1.0", "source-over", "round", "bevel"]], ["bezier", [x + 220, y + 112, x1 + 111, y1 + 309, x2 - 204, y2 + 252, x3 - 306, y3 + 108]], ["bezier", [x + 314, y + 87, x1 + 158, y1 + 281, x2 - 123, y2 + 280, x3 - 204, y3 + 134]], ["bezier", [x + 317, y + 93, x1 + 35, y1 + 278, x2 - 123, y2 + 280, x3 - 223, y3 + 126]], ["bezier", [x + 267, y + 110, x1 - 15, y1 + 295, x2 - 149, y2 + 252, x3 - 252, y3 + 122]], ["bezier", [x + 371, y - 41, x1 + 196, y1 + 121, x2 + 2, y2 + 135, x3 - 65, y3 + 37], ["3", "red", "yellow", "0.8", "source-over", "round", "bevel"]], ["bezier", [x + 371, y - 41, x1 + 274, y1 + 143, x2 + 2, y2 + 135, x3 - 65, y3 + 37]], ["bezier", [x + 106, y - 35, x1 + 9, y1 + 149, x2 - 263, y2 + 141, x3 - 330, y3 + 43]], ["bezier", [x + 106, y - 35, x1 - 76, y1 + 147, x2 - 263, y2 + 141, x3 - 330, y3 + 43]], ["bezier", [x + 211, y + 25, x1 + 29, y1 + 207, x2 - 158, y2 + 201, x3 - 191, y3 + 56]], ["bezier", [x + 211, y + 25, x1 + 134, y1 + 159, x2 - 95, y2 + 130, x3 - 191, y3 + 56]]], length = points.length, point, p, i = 0;
        
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