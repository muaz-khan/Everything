(function() {
    
    var canvas = document.getElementById('bird-3'), 
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
    
    var ismousedown = false, prevX, prevY, defaultX = 783, defaultY = 103;
    
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
    
    var line = "line", arc = "arc", quadratic = "quadratic", points = [], length, point, i;

    /*≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡*/
    
    function drawBird(x, y) {
        context.clearRect(0, 0, innerWidth, innerHeight);
        
        points = [[quadratic, x, y, x - 39, y - 29, x - 72, y - 23], [quadratic, x - 1, y - 2, x - 81, y - 81, x - 137, y - 69], [quadratic, x - 136, y - 69, x - 195, y - 41, x - 209, y - 40], [quadratic, x - 206, y - 40, x - 439, y - 98, x - 563, y + 31], [quadratic, x - 563, y + 31, x - 634, y + 115, x - 692, y + 131], [quadratic, x - 71, y - 24, x - 158, y + 2, x - 184, y - 4], [quadratic, x - 185, y - 4, x - 269, y + 241, x - 614, y + 148], [quadratic, x - 614, y + 148, x - 682, y + 170, x - 682, y + 170], [line, x - 683, y + 171, x - 693, y + 130], [arc, x - 117.68826999999999, y - 46.7, 6.3, 6.3, 0], [quadratic, x - 204, y - 40, x - 353, y + 200, x - 685, y + 88], [quadratic, x - 214, y - 43, x - 375, y + 191, x - 679, y + 76], [quadratic, x - 224, y - 44, x - 401, y + 179, x - 670, y + 65], [quadratic, x - 680, y + 247, x + 44, y + 151, x + 194, y + 344], [quadratic, x - 235, y + 216, x + 64, y + 215, x + 157, y + 368], [quadratic, x - 234, y + 215, x + 12, y + 236, x + 157, y + 28], [quadratic, x - 232, y + 216, x - 419, y + 208, x - 500, y + 318], [quadratic, x + 167, y + 316, x + 212, y + 309, x + 216, y + 322], [quadratic, x + 167, y + 317, x + 174, y + 355, x + 185, y + 367], [line, x - 424, y + 173, x - 423, y + 219], [line, x - 391, y + 170, x - 390, y + 218], [quadratic, x - 435, y + 211, x - 418, y + 230, x - 417, y + 207], [quadratic, x - 401, y + 211, x - 387, y + 223, x - 381, y + 211], [quadratic, x - 185, y - 4, x - 204, y - 12, x - 203, y - 40], [quadratic, x - 59, y - 50, x - 73, y - 43, x - 69, y - 23], [quadratic, x - 202, y - 24, x - 316, y + 192, x - 648, y + 112], [quadratic, x - 196, y - 13, x - 329, y + 212, x - 657, y + 118], [line, x - 690, y + 137, x - 655, y + 117], [line, x - 690, y + 143, x - 652, y + 120], [line, x - 689, y + 150, x - 646, y + 123], [line, x - 687, y + 157, x - 638, y + 124], [line, x - 686, y + 161, x - 630, y + 124], [line, x - 684, y + 165, x - 624, y + 127], [line, x - 683, y + 166, x - 611, y + 129], [line, x - 668, y + 166, x - 599, y + 132], [quadratic, x - 228, y - 39, x - 429, y - 64, x - 603, y + 88], [quadratic, x - 233, y - 32, x - 402, y - 33, x - 589, y + 92], [quadratic, x - 245, y - 19, x - 394, y + 7, x - 565, y + 96], [quadratic, x - 96, y - 49, x - 127, y - 77, x - 133, y - 40], [quadratic, x - 97, y - 49, x - 114, y - 18, x - 132, y - 41]];
        length = points.length;
        
        for (i = 0; i < length; i++) {
            point = points[i];
            
            if (point[0] === "arc") {
                context.beginPath();
                context.arc(point[1], point[2], point[3], point[4], 0, point[5]);
                context.stroke();
            }
            
            if (point[0] === "line") {
                context.beginPath();
                context.moveTo(point[1], point[2]);
                context.lineTo(point[3], point[4]);
                context.closePath();
                context.stroke();
            }
            if (point[0] === "quadratic") {
                context.beginPath();
                context.moveTo(point[1], point[2]);
                context.quadraticCurveTo(point[3], point[4], point[5], point[6]);
                context.stroke();
            }
        }    
    
    }


    /*≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡*/
    
    drawBird(defaultX, defaultY);

/*≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡*/
})();