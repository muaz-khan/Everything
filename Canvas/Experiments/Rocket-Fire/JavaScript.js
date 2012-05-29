/*≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡*/
(function () {

    var context = document.getElementById('rocket').getContext('2d'),
        backwardContext = document.getElementById('backward').getContext('2d');

    /*≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡*/

    function draw() {        
        var x = 404, y = 44;
        
        var gradient = context.createRadialGradient(x, y, 0, x, 360, 200);
        gradient.addColorStop(0, 'red');

        gradient.addColorStop(.2, 'white');
        gradient.addColorStop(.3, 'red');

        gradient.addColorStop(.4, 'white');
        gradient.addColorStop(.5, 'red');

        gradient.addColorStop(.6, 'white');        

        context.fillStyle = gradient;

        /*≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡*/
        context.clearRect(0, 0, innerWidth, innerHeight);

        /*≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡  #6c96c8 */
        var points = [["quadratic", [x, y, x - 75, y + 44, x - 16, y + 207]], ["quadratic", [x, y, x + 74, y + 41, x + 18, y + 208]], ["quadratic", [x - 16, y + 207, x, y + 172, x + 18, y + 208]], ["quadratic", [x - 16, y + 207, x + 1, y + 227, x + 18, y + 208]], ["quadratic", [x + 25, y + 187, x + 53, y + 175, x + 51, y + 232]], ["quadratic", [x + 33, y + 155, x + 89, y + 164, x + 51, y + 232]], ["quadratic", [x - 22, y + 189, x - 61, y + 168, x - 55, y + 230]], ["quadratic", [x - 32, y + 152, x - 87, y + 152, x - 55, y + 230]], ["quadratic", [x + 33, y + 39, x + 2, y + 54, x - 36, y + 43]], ["quadratic", [x + 33, y + 154, x + 1, y + 166, x - 33, y + 153]], ["quadratic", [x, y + 218, x - 16, y + 261, x - 1, y + 295]], ["quadratic", [x, y + 218, x + 16, y + 251, x - 1, y + 295]], ["arc", [x - 0.7000000000000455, y + 82.30000000000001, 14.3, 6.3, 0]], ["arc", [x - 0.6888887878899368, y + 81.30000000000001, 23.3, 6.3, 0]]], length = points.length, point, p, i = 0;

        for (i; i < length; i++) {
            p = points[i];
            point = p[1];

            context.beginPath();

            if (p[0] === "arc") context.arc(point[0], point[1], point[2], point[3], 0, point[4]);


            if (p[0] === "quadratic") {
                context.moveTo(point[0], point[1]);
                context.quadraticCurveTo(point[2], point[3], point[4], point[5]);
            }

            context.fill();
        }

        /*≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡*/
    }

    /*≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡*/

    function second() {
        var x = 0, y = -400, x1 = 0, y1 = 0;
        function renderImage() {

            backwardContext.drawImage(image, x, y, 800, 400);
            backwardContext.drawImage(image, x1, y1, 800, 400);

            y += 20;
            y1 += 20;

            if (y1 > 300)
                y1 = -400;

            if (y > 300)
                y = -400;

            requestAnimationFrame(renderImage);
        }

        /*≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡*/

        var image = new Image();
        image.src = 'city.jpg';
        /*≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡*/

        context.fillStyle = 'white';
        context.font = '30px Verdana';
        context.fillText('Please wait...', 300, 200);

        /*≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡*/
        image.onload = function () {
            draw();
            renderImage();
        };
    }

    second();
})();