
let rectRobot = $('.robot-box')[0].getBoundingClientRect();
let rectOpening = $('.opening-box')[0].getBoundingClientRect();
let rectTalkshow = $('.talkshow-box')[0].getBoundingClientRect();
let rectWebinar = $('.webinar-box')[0].getBoundingClientRect();
let rectClosing = $('.closing-box')[0].getBoundingClientRect();
let mouse = { x: 0, y: 0, moved: false };

$("body").mousemove(function (e) {
    mouse.moved = true;
    mouse.x = e.clientX - rectRobot.left;
    mouse.y = e.clientY - rectRobot.top;
});

// Ticker event will be called on every frame
TweenLite.ticker.addEventListener('tick', function () {
    if (mouse.moved) {
        myFunction(x)
    }
    mouse.moved = false;
});

function myFunction(x) {
    if (x.matches) { // If media query matches
      //
    } else {
        parallaxIt(".robot-box img", -10, rectRobot);
        parallaxIt(".opening", -18, rectOpening);
        parallaxIt(".talkshow", -28, rectTalkshow);
        parallaxIt(".webinar", -14, rectWebinar);
        parallaxIt(".closing", -26, rectClosing);
    }
}

function parallaxIt(target, movement, rect) {
    TweenMax.to(target, 0.5, {
        x: (mouse.x - rect.width / 2) / rectRobot.width * movement,
        y: (mouse.y - rect.height / 2) / rectRobot.height * movement
    });
}
var x = window.matchMedia("(max-width: 760px)")
myFunction(x) // Call listener function at run time

$(window).on('resize scroll', function () {
    rectRobot = $('.robot-box')[0].getBoundingClientRect();
})
