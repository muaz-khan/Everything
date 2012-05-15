(function() {
    
    var canvas = document.getElementById('bird-2'), 
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
        
        var points = [["quadratic", [x, y, x + 99, y - 74, x + 141, y - 26], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 1, y, x + 133, y - 19, x + 135, y + 34], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 135, y + 33, x + 93, y + 173, x + 234, y + 175], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 233, y + 175, x + 414, y + 176, x + 470, y + 137], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 470, y + 137, x + 640, y - 10, x + 744, y - 15], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 744, y - 16, x + 696, y - 68, x + 703, y - 96], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 703, y - 96, x + 513, y + 27, x + 394, y - 13], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 394, y - 13, x + 293, y - 61, x + 141, y - 27], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 140, y - 27, x + 221, y + 72, x + 252, y + 175], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 271, y + 174, x + 279, y + 239, x + 258, y + 263], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 297, y + 174, x + 305, y + 239, x + 284, y + 263], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 246, y + 268, x + 263, y + 256, x + 271, y + 272], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 273, y + 267, x + 290, y + 255, x + 298, y + 271], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 144, y - 22, x + 376, y - 61, x + 541, y + 78], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 150, y - 14, x + 379, y - 50, x + 538, y + 83], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 158, y - 6, x + 377, y - 41, x + 530, y + 89], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 164, y + 6, x + 380, y - 30, x + 522, y + 94], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 173, y + 15, x + 382, y - 18, x + 515, y + 99], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 181, y + 27, x + 384, y - 6, x + 508, y + 104], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 187, y + 37, x + 386, y + 6, x + 500, y + 110], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 192, y + 47, x + 386, y + 18, x + 494, y + 117], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 200, y + 59, x + 386, y + 30, x + 486, y + 124], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 209, y + 73, x + 386, y + 44, x + 478, y + 132], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 215, y + 88, x + 388, y + 59, x + 470, y + 137], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 221, y + 99, x + 391, y + 73, x + 463, y + 142], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 229, y + 112, x + 392, y + 86, x + 452, y + 146], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 234, y + 126, x + 395, y + 100, x + 442, y + 152], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 241, y + 140, x + 398, y + 116, x + 432, y + 156], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 244, y + 152, x + 401, y + 128, x + 420, y + 158], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 247, y + 161, x + 404, y + 137, x + 411, y + 160], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 251, y + 171, x + 408, y + 147, x + 396, y + 163], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 140, y - 28, x + 144, y - 2, x + 126, y + 12], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["arc", [x + 77.71199999999999, y - 25.30000000000001, 6.7, 6.3, 0], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 535, y + 74, x + 646, y - 8, x + 737, y - 22], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 529, y + 67, x + 642, y - 15, x + 733, y - 29], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 523, y + 62, x + 636, y - 20, x + 727, y - 34], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 513, y + 56, x + 632, y - 27, x + 723, y - 41], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 506, y + 53, x + 627, y - 36, x + 718, y - 50], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 502, y + 47, x + 623, y - 42, x + 714, y - 56], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 703, y - 86, x + 532, y + 19, x + 415, y + 1], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 705, y - 78, x + 537, y + 21, x + 432, y + 8], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 449, y + 18, x + 576, y - 8, x + 499, y + 45], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 464, y + 24, x + 545, y + 4, x + 491, y + 42], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 472, y + 30, x + 517, y + 20, x + 483, y + 37], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 140, y - 18, x + 211, y + 87, x + 245, y + 175], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 139, y - 5, x + 202, y + 90, x + 236, y + 174], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 136, y + 3, x + 193, y + 95, x + 227, y + 174], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 129, y + 8, x + 186, y + 100, x + 220, y + 174], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 135, y + 32, x + 112, y + 159, x + 218, y + 172], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 143, y + 30, x + 121, y + 156, x + 216, y + 165], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 151, y + 45, x + 134, y + 145, x + 211, y + 154], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 151, y + 45, x + 151, y + 139, x + 211, y + 154], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 151, y + 45, x + 169, y + 134, x + 211, y + 154], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 151, y + 45, x + 184, y + 130, x + 211, y + 154], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["bezier", [x + 862, y + 81, x + 187, y + 306, x + 324, y + 315, x - 104, y + 154], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 5, y + 195, x - 109, y + 171, x - 114, y + 227], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 5, y + 195, x - 108, y + 155, x - 21, y + 90], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 217, y + 262, x + 94, y + 234, x - 11, y + 371], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 46, y + 310, x - 13, y + 386, x + 29, y + 383], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 46, y + 310, x - 20, y + 367, x - 40, y + 324], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]], ["quadratic", [x + 52, y - 32, x + 39, y - 18, x + 51, y - 6], ["2", "#6c96c8", "transparent", "1", "source-over", "butt", "miter"]]], length = points.length, point, p, i = 0;
        
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
