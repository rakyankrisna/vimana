// Set object
var modalmain = new bootstrap.Modal(document.getElementById("modalmain"), {});
var modalinspiring = new bootstrap.Modal(document.getElementById("modalinspiring"), {});
var modalmerch = new bootstrap.Modal(document.getElementById("modalmerch"), {});
var modalplayground = new bootstrap.Modal(document.getElementById("modalplayground"), {});

// $('#modalmain').modal({ show: false})
// $(document).ready(function(e) {
//     // $('img[usemap]').rwdImageMaps();
//     $('img[usemap]').imageMap(200);
// });

// URL YTB  + livechat
$('#video').ready(function () {
    // var videolink = 'https://www.youtube.com/embed/' + $('#mediagroup').data('link');
    $('#video').attr('videoid', $('#mediagroup').data('link'));
});
$('#livechat').ready(function () {
    var livechatlink = 'https://www.youtube.com/live_chat?v=' + $('#mediagroup').data('link') + '&embed_domain=' + window.location.hostname;
    $('#livechat').attr('src', livechatlink);
});

// function joinzoom() {
var clicked = 0;
$(".btn.btn-primary#joinzoom").on('click', function () {
    var meeting = $(this).data("meeting");
    var password = $(this).data("password");
    var name = $(this).data("username");
    var origin = $(this).data("instansi");


    var attr = meeting + `&pwd=` + password
    if (password == "") {
        var el = `<p>Meeting ID : ` + meeting
            + `<br>Meeting Pass : - </p>`
    } else {
        var el = `<p>Meeting ID : ` + meeting
            + `<br>Meeting Pass : ` + password
            + `</p>`

    }
    window.location.href = `zoommtg://zoom.us/join?confno=` + attr + `&zc=0&browser=chrome&uname=` + name + '_' + origin;
    window.location.href = `zoomus://zoom.us/join?confno=` + attr + `&zc=0&browser=chrome&uname=` + name + '_' + origin;
    if (!clicked) {
        $(el).insertAfter(this);
        clicked = 1;
    }
});

$(function () {
    // Map hover effect
    $('.map').maphilight();

    // const popper = tip.getPopperElement($('#mapmain'))
    $('.sidenav .box').click(function (e) {
        $('#city, #misc').removeAttr('class').addClass('content_hide');
    });
    $('.sidenav .box.music').click(function (e) {
        $('#city, #misc').removeAttr('class').addClass('content_activity');
    });
    $('#mapmain').click(function (e) {
        e.preventDefault(
            $('#city, #misc').removeAttr('class').addClass('content_hide'),
            modalmain.show(),
            pauseTemporary(),
        );
        // ytblink();
    });
    $('#mapinspiring').click(function (e) {
        e.preventDefault(
            $('#city, #misc').removeAttr('class').addClass('content_hide'),
            modalinspiring.show(),
        );
    });
    $('#mapmerch').click(function (e) {
        e.preventDefault(
            $('#city, #misc').removeAttr('class').addClass('content_hide'),
            modalmerch.show(),
        );
    });
    $('#mapplayground').click(function (e) {
        e.preventDefault(
            $('#city, #misc').removeAttr('class').addClass('content_hide'),
            modalplayground.show(),
        );
    });
    $('#exit-btn').click(function (e) {
        $('.panel.panel-default').hide()
        $('#twibbon').show()
    });
});

// Modal hidden event fired
$('#modalmain, #modalinspiring, #modalmerch, #modalplayground, #modaldonasi, #modalbook, #modalexit').on(
    'hidden.bs.modal',
    function () {
        $('#city,#misc').removeAttr('class').addClass('content_active')
    });
$('#modalmain').on(
    'hidden.bs.modal',
    function () {
        pauseTemporary();
        var ytb_player = document.getElementById('video');
        let videoid = ytb_player.getAttribute('videoid');
        ytb_player.setAttribute('videoid', null); //causes a reload so it stops playing, music, video, etc.
        setTimeout(function () {
            ytb_player.setAttribute('videoid', videoid);
        }, 500);
    });

// TOOTIP
tippy.setDefaultProps({
    placement: 'top-start',
    duration: 0,
    theme: 'translucent',
    animation: 'shift-away',
    followCursor: true,
    // plugins: [followCursor],
    delay: [250, 0],
    touch: false
});

tippy('#mapmain', {
    content: 'Main Stage adalah tempat untuk menampilkan stream event musik virtual di Vimana',
});

tippy('#mapinspiring', {
    content: 'Schedule Board adalah tempat untuk mengakses jadwal dan informasi event virtual yang ada di Vimana.',
});

tippy('#mapmerch', {
    content: 'Shopping Area adalah tempat untuk mengakses marketplace untuk pembelian merchandise atau instrumen musik berkualitas dari produsen-produsen terpercaya di Vimana.',
});

tippy('#mapplayground', {
    content: 'Registration Area adalah tempat untuk melakukan pendaftaran sebagai artist atau vendor market di Vimana. Pilih kategori pendaftaran Anda dan isi data di form yang telah disedikan. Setelah itu, tim Vimana akan melakukan verifikasi dan akan memberikan info lanjutan melalui email yang Anda isikan di form.',
});

// AUDIO
let songplay = 1;

$(document).ready(function () {
    var media = document.getElementById('backsound');
    media.muted = true;
    media.play();
    media.muted = false;
});

setTimeout(function () {
    if (document.getElementById('backsound').paused) {
        songplay = 0;
    }
}, 500);

$('#backsound').prop("volume", 0.7);
$('#backsound').ready(function () {
    if (document.getElementById('backsound').paused && $('#music-icon').hasClass('playing')) {
        $('#text-lagu').css('opacity', '0');
    } else {
        $('#text-lagu').css('opacity', '1');
        setTimeout_(function () {
            $('#text-lagu').css('opacity', '0');
        }, 5000);
    }
})

function playPause() {
    var mediaPlayer = document.getElementById('backsound');
    if (mediaPlayer.paused) {
        $('#music-icon').removeAttr('class').addClass('circular-loader')
        $('#music-icon').html(`<circle class="loader-path" cx="12" cy="12" r="6" fill="none" stroke="#70c542" stroke-width="1" />`)
        mediaPlayer.play().then(() => {
            songplay = 1;
            $('#music-icon').removeAttr('class')
            // $('#music-icon').addClass('playing')
            $('#music-icon').html(
                `<path d="M13 5L8 9H4V15H8L13 19V5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M17.54 8.46C18.4774 9.39764 19.004 10.6692 19.004 11.995C19.004 13.3208 18.4774 14.5924 17.54 15.53" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`
            )
            $('#text-lagu').css('opacity', '1');
            setTimeout_(function () {
                $('#text-lagu').css('opacity', '0');
            }, 5000);
        });
        // mediaPlayer.play();
    } else {
        mediaPlayer.pause();
        songplay = 0;
        $('#music-icon').html(`<path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M23 9L17 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17 9L23 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`)
        $('#text-lagu').css('opacity', '0');
    }
}

function pauseTemporary() {
    var mediaPlayer = document.getElementById('backsound');
    if (!mediaPlayer.paused) {
        // console.log('ngepause')
        mediaPlayer.pause();
    }
    else if (songplay && mediaPlayer.paused) {
        // console.log('ngeplay')
        mediaPlayer.play();
    }
}


// Countdown
let countdownTimer = 293000;
// Update the count down every 1 second
var x = setInterval(function StartCount() {
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(countdownTimer / (3600 * 24) % (3600 * 24));
    var hours = Math.floor(countdownTimer / 3600 % 24);
    var minutes = Math.floor(countdownTimer / 60 % 60);
    var seconds = Math.floor(countdownTimer % 60);

    // Display the result in the element with id="demo"
    $('#days').html(days)
    $('#hours').html(hours)
    $('#minutes').html(minutes)
    $('#seconds').html(seconds)

    countdownTimer -= 1;
    return StartCount;
}(), 1000);


// Exit Modal Slider
$(document).ready(function () {
    $(".multi-page-form .panel:first-child").fadeIn(0);

    $(".multi-page-form input").focus(function () {
        $(this).closest(".form-group").removeClass("has-error");
    });

    $(".multi-page-form .btn-next").click(function () {
        var panel = $(this).closest(".panel"),
            next = true;

        panel.find("input[required]").each(function () {
            if ($(this).val() == "") {
                $(this).closest(".form-group").addClass("has-error");
                next = false;
            } else {
                $(this).closest(".form-group").removeClass("has-error");
            }
        });

        if (next) {
            panel.fadeOut(256, function () {
                $(this).next().fadeIn(256);
            });
        }
    });

    $(".multi-page-form .btn-next2").click(function () {
        var panel = $(this).closest(".panel").closest(".panel"),
            next = true;

        panel.find("input[required]").each(function () {
            if ($(this).val() == "") {
                $(this).closest(".form-group").addClass("has-error");
                next = false;
            } else {
                $(this).closest(".form-group").removeClass("has-error");
            }
        });

        if (next) {
            panel.fadeOut(256, function () {
                $(this).next().next().fadeIn(256);
            });
        }
    });

    $(".multi-page-form .btn-previous").click(function () {
        $(this).closest(".panel").fadeOut(256, function () {
            $(this).prev().fadeIn(256);
        });
    });
});

var canvasWidth = 612;
var canvasHeight = 1088;

// click once
var clickOnce = false;

function newCanvas() {
    $('#reset-btn').hide()
    $('#custom-button').show()
    $('#c').remove()
    $('#canvas-container').html('<canvas id="c"></canvas>')
    $('#custom-text').html('Tidak ada file terpilih')
    var canvas = new fabric.Canvas('c');
    canvas.setWidth(canvasWidth);
    canvas.setHeight(canvasHeight);

    var canvasWrapper = document.getElementById('c');
    var canvasWrapperWidth = canvasWrapper.clientWidth;
    $(function () {
        $(":file").change(function () {
            if (this.files && this.files[0]) {
                var reader = new FileReader();
                reader.onload = imageIsLoaded;
                reader.readAsDataURL(this.files[0]);
            }
        });
    });
    let imgurl = $('#twibbon').data('twibbon')
    fabric.Image.fromURL(imgurl, function (img) {
        img.scaleToWidth(canvas.getWidth());
        canvas.setOverlayImage(img, canvas.renderAll.bind(canvas));
    });
    function imageIsLoaded(e) {
        $('#reset-btn').show()
        $('#custom-button').hide()
        fabric.Image.fromURL(e.target.result, function (img) {
            var aspectRatio = canvasWidth / canvasHeight;
            var factor = canvasWidth / img.width;
            img.set({
                scaleX: factor,
                scaleY: factor
            });
            canvas.add(img);
            canvas.item(0).set({
                borderColor: 'red',
                cornerColor: 'blue',
                cornerSize: 70,
                borderScaleFactor: 10,
                cornerStrokeColor: 'red',
                hasBorders: true,

                rotatingPointOffset: 200,
                padding: 12,
                transparentCorners: true
            });
            canvas.setActiveObject(canvas.item(0));
            this.__canvases.push(canvas);
            canvas.sendToBack(img);
        });
    };
    $("#download").click(function () {
        if (!clickOnce) {
            // Setup variables
            var href = $(this).data('href');
            var token = $(this).data('token');
            var username = $(this).data('username');
            var dataURL = $("#c").get(0).toDataURL('image/jpeg', 0.75);
            clickOnce = true;
            $('#download').html(`<svg class=" circular-loader" style="width: 25px; height:25px; position:unset">
                <circle class="loader-path" cx="12" cy="12" r="8" fill="none" stroke="#fff" stroke-width="2" />
            </svg>`)

            // Send data to server
            $("#c").get(0).toBlob(function (blob) {
                var req = new XMLHttpRequest();
                req.open('POST', href);
                req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                req.setRequestHeader('X-CSRF-Token', token);
                req.onload = function () {
                    console.log('upload complete, server response:', req.response);
                    $('#download').html(`Unduh`)
                    clickOnce = false;
                };
                console.log('uploading photobooth...');
                req.send("dataURL=" + dataURL);
                saveAs(blob, "photobooth-" + username + ".jpeg");
            });
        }
    });
}
newCanvas()

function reupload() {
    newCanvas();
    $('#custom-button').html('Ganti Foto')
    $('#custom-button').click()
}



// Button
const realFileBtn = document.getElementById("uploadBtn");
const customBtn = document.getElementById("custom-button");
const customTxt = document.getElementById("custom-text");

customBtn.addEventListener("click", function () {
    realFileBtn.click();
});

realFileBtn.addEventListener("change", function () {
    if (realFileBtn.value) {
        customTxt.innerHTML = realFileBtn.value.match(
            /[\/\\]([\w\d\s\.\-\(\)]+)$/
        )[1];
    } else {
        customTxt.innerHTML = "No file chosen, yet.";
    }
});

var lastSeen;
var loop = function () {
    lastSeen = Date.now();
    setTimeout(loop, 50);
};
loop();

// var music = document.getElementById('backsound');
// music.addEventListener('timeupdate', function (){
//     if(Date.now() - lastSeen > 100){
//         pauseTemporary()
//     }
// }, false);

// window.onbeforeunload = function (e) {
//     e = e || window.event;

//     // For IE and Firefox prior to version 4
//     if (e) {
//         e.returnValue = 'Sure?';
//         $('#exit-btn').click()
//     }

//     // For Safari
//     return 'Sure?';
// };
