(function() {
    
    var canvas = document.getElementById('tiger'), 
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
    var ismousedown = false, prevX, prevY, defaultX = 345, defaultY = 93;
    
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
        
        var points = [["bezier", [x, y, x + 306, y + 52, x + 499, y - 69, x + 480, y + 180]], ["bezier", [x + 480, y + 178, x + 484, y + 319, x + 572, y + 249, x + 597, y + 281]], ["bezier", [x + 499, y + 283, x + 561, y + 314, x + 618, y + 297, x + 597, y + 281]], ["bezier", [x + 499, y + 283, x + 441, y + 252, x + 471, y + 73, x + 415, y + 86]], ["quadratic", [x + 1, y, x + 2, y - 18, x - 22, y - 4]], ["quadratic", [x - 22, y - 4, x - 108, y - 23, x - 126, y - 1]], ["quadratic", [x - 126, y - 1, x - 153, y - 15, x - 137, y + 4]], ["quadratic", [x - 137, y + 4, x - 195, y + 68, x - 123, y + 161]], ["bezier", [x - 124, y + 161, x - 69, y + 199, x + 32, y + 127, x + 10, y + 1]], ["bezier", [x - 63, y + 165, x - 24, y + 209, x - 19, y + 380, x - 8, y + 391]], ["bezier", [x - 10, y + 389, x + 1, y + 403, x + 7, y + 370, x - 13, y + 266]], ["bezier", [x + 17, y + 383, x - 8, y + 303, x - 12, y + 217, x - 13, y + 266]], ["bezier", [x + 17, y + 383, x + 26, y + 401, x + 33, y + 370, x + 4, y + 256]], ["bezier", [x + 361, y + 261, x + 378, y + 218, x - 14, y + 221, x + 4, y + 256]], ["bezier", [x + 361, y + 261, x + 359, y + 303, x + 332, y + 413, x + 370, y + 348]], ["bezier", [x + 389, y + 256, x + 357, y + 295, x + 384, y + 292, x + 370, y + 348]], ["bezier", [x + 389, y + 256, x + 413, y + 291, x + 372, y + 344, x + 401, y + 368]], ["bezier", [x + 416, y + 86, x + 377, y + 86, x + 433, y + 397, x + 401, y + 368]], ["bezier", [x - 39, y + 46, x - 83, y + 45, x - 78, y + 57, x - 77, y + 67]], ["bezier", [x - 77, y + 67, x - 46, y + 67, x - 39, y + 50, x - 40, y + 46]], ["bezier", [x - 130, y + 42, x - 130, y + 57, x - 110, y + 75, x - 100, y + 71]], ["bezier", [x - 100, y + 71, x - 109, y + 49, x - 108, y + 44, x - 131, y + 42]], ["arc", [x - 111, y + 60.0111, 4.0, 6.3, 0]], ["arc", [x - 64, y + 57.0111, 4.0, 6.3, 0]], ["bezier", [x - 123, y + 120, x - 105, y + 146, x - 52, y + 131, x - 52, y + 131]], ["bezier", [x - 54, y + 130, x - 100, y + 123, x - 123, y + 118, x - 124, y + 121]], ["bezier", [x - 5, y + 392, x - 33, y + 407, x + 33, y + 395, x - 8, y + 392]], ["bezier", [x + 22, y + 389, x - 6, y + 404, x + 60, y + 392, x + 19, y + 389]], ["bezier", [x + 358, y + 368, x + 330, y + 383, x + 395, y + 375, x + 355, y + 368]], ["bezier", [x + 405, y + 369, x + 377, y + 384, x + 442, y + 376, x + 402, y + 369]], ["bezier", [x + 358, y + 16, x + 299, y + 127, x + 353, y + 216, x + 312, y + 237]], ["bezier", [x + 347, y + 15, x + 288, y + 126, x + 342, y + 215, x + 301, y + 236]], ["bezier", [x + 336, y + 14, x + 277, y + 125, x + 331, y + 214, x + 290, y + 235]], ["bezier", [x + 324, y + 14, x + 265, y + 125, x + 319, y + 214, x + 277, y + 233]], ["bezier", [x + 309, y + 14, x + 250, y + 125, x + 304, y + 214, x + 264, y + 231]], ["bezier", [x + 294, y + 15, x + 235, y + 126, x + 289, y + 215, x + 248, y + 231]], ["bezier", [x + 282, y + 15, x + 223, y + 126, x + 277, y + 215, x + 236, y + 231]], ["bezier", [x + 270, y + 15, x + 211, y + 126, x + 265, y + 215, x + 222, y + 229]], ["bezier", [x + 256, y + 15, x + 197, y + 126, x + 251, y + 215, x + 208, y + 229]], ["bezier", [x + 246, y + 16, x + 187, y + 127, x + 241, y + 216, x + 198, y + 230]], ["bezier", [x + 233, y + 16, x + 174, y + 127, x + 228, y + 216, x + 185, y + 230]], ["bezier", [x + 220, y + 16, x + 161, y + 127, x + 215, y + 216, x + 172, y + 230]], ["bezier", [x + 203, y + 16, x + 144, y + 127, x + 198, y + 216, x + 155, y + 230]], ["bezier", [x + 186, y + 16, x + 127, y + 127, x + 181, y + 216, x + 138, y + 230]], ["bezier", [x + 171, y + 16, x + 112, y + 127, x + 166, y + 216, x + 123, y + 230]], ["bezier", [x + 152, y + 16, x + 93, y + 127, x + 147, y + 216, x + 106, y + 231]], ["bezier", [x + 139, y + 15, x + 80, y + 126, x + 134, y + 215, x + 92, y + 231]], ["bezier", [x + 126, y + 15, x + 67, y + 126, x + 121, y + 215, x + 80, y + 233]], ["bezier", [x + 113, y + 12, x + 54, y + 128, x + 108, y + 217, x + 67, y + 235]], ["bezier", [x + 100, y + 11, x + 41, y + 127, x + 95, y + 216, x + 56, y + 235]], ["bezier", [x + 85, y + 11, x + 26, y + 127, x + 80, y + 216, x + 43, y + 237]], ["bezier", [x + 68, y + 11, x + 9, y + 127, x + 63, y + 216, x + 29, y + 240]], ["bezier", [x + 54, y + 8, x - 5, y + 124, x + 49, y + 213, x + 20, y + 243]], ["bezier", [x + 44, y + 8, x - 15, y + 124, x + 39, y + 213, x + 9, y + 247]], ["bezier", [x + 35, y + 7, x - 24, y + 123, x + 30, y + 212, x - 6, y + 267]], ["bezier", [x + 371, y + 16, x + 312, y + 132, x + 366, y + 221, x + 323, y + 239]], ["bezier", [x + 382, y + 17, x + 323, y + 133, x + 377, y + 222, x + 334, y + 240]], ["bezier", [x + 392, y + 21, x + 333, y + 137, x + 387, y + 226, x + 344, y + 244]], ["bezier", [x + 404, y + 22, x + 345, y + 138, x + 399, y + 227, x + 356, y + 250]], ["bezier", [x + 416, y + 26, x + 357, y + 142, x + 411, y + 231, x + 359, y + 256]], ["bezier", [x + 423, y + 32, x + 364, y + 148, x + 418, y + 237, x + 361, y + 267]], ["bezier", [x + 7, y + 98, x - 52, y + 214, x - 4, y + 181, x - 35, y + 236]], ["bezier", [x + 7, y + 115, x - 49, y + 224, x + 14, y + 175, x - 32, y + 246]], ["bezier", [x + 6, y + 136, x - 39, y + 227, x + 24, y + 178, x - 31, y + 262]], ["bezier", [x - 16, y + 128, x - 29, y + 159, x - 51, y + 147, x - 45, y + 203]], ["bezier", [x - 16, y + 128, x - 29, y + 159, x - 43, y + 154, x - 45, y + 203]], ["bezier", [x - 16, y + 128, x - 29, y + 159, x - 34, y + 163, x - 45, y + 203]], ["bezier", [x - 8, y + 118, x - 29, y + 159, x - 24, y + 177, x - 41, y + 210]], ["quadratic", [x - 25, y + 188, x - 35, y + 215, x - 39, y + 219]], ["quadratic", [x - 24, y + 203, x - 31, y + 214, x - 36, y + 227]], ["quadratic", [x - 49, y + 159, x - 54, y + 171, x - 55, y + 174]], ["quadratic", [x - 42, y + 162, x - 50, y + 178, x - 53, y + 177]], ["quadratic", [x + 4, y + 164, x - 7, y + 188, x - 7, y + 266]], ["quadratic", [x - 7, y + 233, x - 27, y + 263, x - 27, y + 272]], ["quadratic", [x - 13, y + 254, x - 12, y + 287, x - 22, y + 305]], ["quadratic", [x - 13, y + 269, x - 12, y + 302, x - 20, y + 321]], ["quadratic", [x - 10, y + 284, x - 9, y + 317, x - 19, y + 336]], ["quadratic", [x - 8, y + 295, x - 7, y + 328, x - 17, y + 347]], ["quadratic", [x - 6, y + 310, x - 5, y + 343, x - 15, y + 362]], ["quadratic", [x - 3, y + 321, x - 2, y + 354, x - 12, y + 373]], ["quadratic", [x - 2, y + 332, x - 1, y + 365, x - 11, y + 384]], ["quadratic", [x - 1, y + 342, x, y + 375, x - 10, y + 394]], ["bezier", [x + 3, y + 253, x + 3, y + 269, x - 3, y + 267, x - 5, y + 282]], ["bezier", [x + 5, y + 264, x + 5, y + 280, x - 1, y + 278, x - 3, y + 293]], ["bezier", [x + 10, y + 280, x + 10, y + 296, x + 4, y + 294, x - 1, y + 308]], ["bezier", [x + 12, y + 292, x + 12, y + 308, x + 6, y + 306, x + 1, y + 320]], ["bezier", [x + 14, y + 302, x + 14, y + 318, x + 8, y + 316, x + 3, y + 330]], ["bezier", [x + 17, y + 315, x + 17, y + 331, x + 11, y + 329, x + 6, y + 343]], ["bezier", [x + 19, y + 326, x + 19, y + 342, x + 13, y + 340, x + 8, y + 354]], ["bezier", [x + 21, y + 336, x + 21, y + 352, x + 15, y + 350, x + 10, y + 364]], ["bezier", [x + 23, y + 348, x + 25, y + 365, x + 19, y + 363, x + 14, y + 377]], ["bezier", [x + 25, y + 374, x + 16, y + 375, x + 25, y + 382, x + 17, y + 385]], ["bezier", [x - 8, y + 245, x - 22, y + 251, x - 21, y + 279, x - 26, y + 282]], ["bezier", [x + 27, y + 6, x + 17, y + 15, x + 18, y + 22, x + 13, y + 36]], ["bezier", [x + 437, y + 38, x + 417, y + 68, x + 414, y + 83, x + 400, y + 98]], ["bezier", [x + 446, y + 44, x + 449, y + 70, x + 432, y + 71, x + 411, y + 87]], ["bezier", [x + 452, y + 49, x + 453, y + 65, x + 453, y + 72, x + 422, y + 86]], ["bezier", [x + 458, y + 57, x + 457, y + 75, x + 456, y + 77, x + 429, y + 89]], ["bezier", [x + 464, y + 67, x + 464, y + 92, x + 459, y + 92, x + 435, y + 94]], ["bezier", [x + 470, y + 80, x + 464, y + 92, x + 463, y + 104, x + 441, y + 101]], ["bezier", [x + 474, y + 90, x + 467, y + 108, x + 466, y + 108, x + 443, y + 108]], ["bezier", [x + 477, y + 102, x + 470, y + 111, x + 469, y + 112, x + 447, y + 118]], ["bezier", [x + 478, y + 111, x + 478, y + 111, x + 474, y + 117, x + 449, y + 126]], ["bezier", [x + 478, y + 121, x + 466, y + 141, x + 460, y + 132, x + 451, y + 132]], ["bezier", [x + 481, y + 131, x + 470, y + 146, x + 468, y + 146, x + 453, y + 144]], ["bezier", [x + 479, y + 147, x + 469, y + 169, x + 466, y + 161, x + 455, y + 156]], ["bezier", [x + 479, y + 158, x + 475, y + 172, x + 473, y + 172, x + 456, y + 171]], ["bezier", [x + 478, y + 176, x + 474, y + 186, x + 473, y + 186, x + 459, y + 181]], ["bezier", [x + 480, y + 189, x + 478, y + 203, x + 473, y + 203, x + 460, y + 197]], ["bezier", [x + 481, y + 206, x + 481, y + 217, x + 479, y + 217, x + 463, y + 212]], ["bezier", [x + 483, y + 222, x + 483, y + 233, x + 482, y + 233, x + 466, y + 230]], ["bezier", [x + 489, y + 236, x + 481, y + 248, x + 479, y + 248, x + 472, y + 243]], ["bezier", [x + 494, y + 244, x + 490, y + 254, x + 489, y + 254, x + 474, y + 254]], ["bezier", [x + 499, y + 254, x + 495, y + 263, x + 489, y + 265, x + 481, y + 265]], ["bezier", [x + 507, y + 261, x + 501, y + 271, x + 499, y + 271, x + 487, y + 273]], ["bezier", [x + 517, y + 267, x + 517, y + 273, x + 514, y + 273, x + 497, y + 282]], ["bezier", [x + 529, y + 269, x + 536, y + 284, x + 533, y + 284, x + 510, y + 287]], ["bezier", [x + 549, y + 272, x + 556, y + 283, x + 555, y + 283, x + 531, y + 295]], ["bezier", [x + 564, y + 271, x + 578, y + 291, x + 574, y + 290, x + 556, y + 299]], ["bezier", [x + 578, y + 271, x + 587, y + 285, x + 587, y + 285, x + 579, y + 298]], ["bezier", [x + 440, y + 41, x + 419, y + 70, x + 419, y + 71, x + 423, y + 77]], ["bezier", [x + 444, y + 44, x + 430, y + 63, x + 431, y + 64, x + 423, y + 75]], ["bezier", [x + 404, y + 95, x + 392, y + 223, x + 397, y + 235, x + 389, y + 256]], ["bezier", [x + 403, y + 205, x + 398, y + 245, x + 399, y + 246, x + 408, y + 366]], ["bezier", [x + 395, y + 301, x + 404, y + 340, x + 395, y + 346, x + 399, y + 364]], ["bezier", [x + 372, y + 261, x + 371, y + 313, x + 361, y + 319, x + 353, y + 365]], ["bezier", [x + 364, y + 265, x + 363, y + 292, x + 356, y + 300, x + 351, y + 350]], ["bezier", [x + 374, y + 311, x + 369, y + 349, x + 366, y + 351, x + 352, y + 365]], ["bezier", [x - 29, y - 5, x - 37, y + 13, x - 55, y + 9, x - 54, y + 32]], ["bezier", [x - 38, y - 8, x - 46, y + 10, x - 64, y + 6, x - 63, y + 29]], ["bezier", [x - 51, y - 8, x - 59, y + 10, x - 77, y + 6, x - 76, y + 29]], ["bezier", [x - 62, y - 11, x - 70, y + 7, x - 88, y + 3, x - 87, y + 26]], ["bezier", [x - 74, y - 12, x - 82, y + 6, x - 100, y + 2, x - 99, y + 25]], ["bezier", [x - 88, y - 14, x - 96, y + 4, x - 114, y, x - 113, y + 23]], ["bezier", [x - 101, y - 13, x - 109, y + 5, x - 127, y + 1, x - 126, y + 24]], ["bezier", [x - 94, y + 77, x - 120, y + 110, x - 74, y + 145, x - 82, y + 76]], ["bezier", [x - 56, y + 119, x - 54, y + 126, x - 61, y + 126, x - 55, y + 129]], ["bezier", [x - 60, y + 119, x - 58, y + 126, x - 65, y + 126, x - 59, y + 129]], ["bezier", [x - 66, y + 119, x - 64, y + 126, x - 71, y + 126, x - 65, y + 129]], ["bezier", [x - 72, y + 118, x - 70, y + 125, x - 77, y + 125, x - 71, y + 128]], ["bezier", [x - 77, y + 117, x - 75, y + 124, x - 82, y + 124, x - 76, y + 127]], ["bezier", [x - 82, y + 117, x - 80, y + 124, x - 87, y + 124, x - 81, y + 127]], ["bezier", [x - 86, y + 116, x - 84, y + 123, x - 91, y + 123, x - 85, y + 126]], ["bezier", [x - 92, y + 116, x - 90, y + 123, x - 97, y + 123, x - 91, y + 126]], ["bezier", [x - 98, y + 115, x - 96, y + 122, x - 103, y + 122, x - 97, y + 125]], ["bezier", [x - 104, y + 114, x - 102, y + 121, x - 109, y + 121, x - 103, y + 124]], ["bezier", [x - 109, y + 114, x - 107, y + 121, x - 114, y + 121, x - 108, y + 124]], ["bezier", [x - 115, y + 112, x - 113, y + 119, x - 120, y + 119, x - 114, y + 122]], ["bezier", [x - 120, y + 110, x - 118, y + 117, x - 125, y + 117, x - 119, y + 120]], ["quadratic", [x - 132, y + 37, x - 102, y + 36, x - 95, y + 73]], ["quadratic", [x - 41, y + 41, x - 88, y + 40, x - 82, y + 66]], ["quadratic", [x + 594, y + 276, x + 594, y + 287, x + 587, y + 297]], ["quadratic", [x + 557, y + 272, x + 565, y + 280, x + 548, y + 297]], ["quadratic", [x + 540, y + 271, x + 541, y + 284, x + 526, y + 293]], ["quadratic", [x + 572, y + 273, x + 579, y + 285, x + 574, y + 299]], ["quadratic", [x + 523, y + 267, x + 522, y + 278, x + 504, y + 285]]], length = points.length, point, p, i = 0;
        
        for (i; i < length; i++) {
            p = points[i];
            point = p[1];
            context.beginPath();
            
            
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
        }    
    }


    /*≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡*/
    
    drawBird(defaultX, defaultY);

/*≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡*/
})();