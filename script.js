let video;
let canvas;
let context;
let tracker;

window.onload = function() {
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        video.srcObject = stream;
        video.play();
    });

    tracker = new clm.tracker();
    tracker.init();
    tracker.start(video);

    requestAnimationFrame(draw);
};

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    let positions = tracker.getCurrentPosition();
    if (positions) {
        for (let i = 0; i < positions.length; i++) {
            context.fillStyle = "#ff0000";
            context.fillRect(positions[i][0], positions[i][1], 4, 4);
        }

        let leftEyeX = positions[27][0];
        let leftEyeY = positions[27][1];
        let rightEyeX = positions[32][0];
        let rightEyeY = positions[32][1];

        let eyeCenterX = (leftEyeX + rightEyeX) / 2;
        let eyeCenterY = (leftEyeY + rightEyeY) / 2;

        window.scrollTo(eyeCenterX - window.innerWidth / 2, eyeCenterY - window.innerHeight / 2);
    }

    requestAnimationFrame(draw);
}
