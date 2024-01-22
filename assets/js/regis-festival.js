// UPLOAD
$( document ).ready(function() {
    // INPUT GAMBAR MUSIC
    $('#music_photo')[0].addEventListener('change', () => {
        $('label[for="music_photo"] span')[0].innerHTML = $('input#music_photo')[0].files[0].name;
    }, true)

    $('#music_identity_card')[0].addEventListener('change', () => {
        $('label[for="music_identity_card"] span')[0].innerHTML = $('input#music_identity_card')[0].files[0].name;
    }, true)

    $('#music_follow_ig')[0].addEventListener('change', () => {
        $('label[for="music_follow_ig"] span')[0].innerHTML = $('input#music_follow_ig')[0].files[0].name;
    }, true)

    $('#music_follow_ig2')[0].addEventListener('change', () => {
        $('label[for="music_follow_ig2"] span')[0].innerHTML = $('input#music_follow_ig2')[0].files[0].name;
    }, true)

    $('#music_repost_poster')[0].addEventListener('change', () => {
        $('label[for="music_repost_poster"] span')[0].innerHTML = $('input#music_repost_poster')[0].files[0].name;
    }, true)

    // INPUT GAMBAR ART
    $('#art_photo')[0].addEventListener('change', () => {
        $('label[for="art_photo"] span')[0].innerHTML = $('input#art_photo')[0].files[0].name;
    }, true)

    $('#art_identity_card')[0].addEventListener('change', () => {
        $('label[for="art_identity_card"] span')[0].innerHTML = $('input#art_identity_card')[0].files[0].name;
    }, true)

    $('#art_follow_ig')[0].addEventListener('change', () => {
        $('label[for="art_follow_ig"] span')[0].innerHTML = $('input#art_follow_ig')[0].files[0].name;
    }, true)

    $('#art_follow_ig2')[0].addEventListener('change', () => {
        $('label[for="art_follow_ig2"] span')[0].innerHTML = $('input#art_follow_ig2')[0].files[0].name;
    }, true)

    $('#art_repost_poster')[0].addEventListener('change', () => {
        $('label[for="art_repost_poster"] span')[0].innerHTML = $('input#art_repost_poster')[0].files[0].name;
    }, true)
});

// AUTO SUMMON TOMBOL
var validateInputs = function validateInputs(inputs) {
    var validForm = true;
    inputs.each(function(index) {
    var input = $(this);
    if (!input.val() || (input.type === "radio" && !input.is(':checked')) || input[0].length === 0) {
        $(this).closest('fieldset').find('h5').parent().prop("disabled", true);
        validForm = false;
    }
    });
    return validForm;
}
function check_next() {
    var fieldset = $('form fieldset')
    fieldset.each(function() {
        var inputAkeh = $(this).find('.top input, .top .custom-select');
        inputAkeh.each(function() {
            var input = $(this)
            if (input.type === "radio" || input.is('select') || input.attr('type') == 'file') {
                input.change(function() {
                    if (validateInputs(inputAkeh)) {
                        $(this).closest('fieldset').find('h5').parent().removeAttr('disabled');
                    }
                });
            } else {
            input.keyup(function() {
                if (validateInputs(inputAkeh)) {
                    $(this).closest('fieldset').find('h5').parent().removeAttr('disabled');
                    // console.log($(this).closest('fieldset').find('h5').parent()[0]);
                }
            });
            }
        });
    });
}
check_next();

// GENERATE PESERTA MUSIC COMPETITION
const member_input = `<div class="input" id="member` + 1 + `" style="display: none">
<input type="text" name="member` + 1 + `" class="input__element" placeholder=" " />
<label class="input__label" for="member` + 1 + `">Anggota ` + 1 + `</label>
</div>`

let member = 0;
let music_prev_fs_2;
let music_next_fs_2;
$('#inputGroupSelect01').change(() => {
    member = $('#inputGroupSelect01')[0].value;
    // console.log(member)
    if ($('#inputGroupSelect01')[0].value == '1') {
        $('#form-name')[0].innerHTML = "Nama Lengkap *";
        $('#nama').removeAttr('disabled');
    }
    else {
        $('#form-name')[0].innerHTML = "Nama Tim *";
        $('#nama').removeAttr('disabled');
    }
    for(let j = 1 ; j <= 10 ; j++) {
        $('#member' + j).remove();
        // console.log(j)
    }
    // console.log("Awal")
    for(let i = 1 ; i <= member ; i++) {
        $('#member-form').append(`<div class="input" id="member` + i + `">
        <input type="text" name="member` + i + `" class="input__element" placeholder=" " />
        <label class="input__label" for="member` + i + `">Anggota ` + i + `</label>
        </div>`)

    }
    check_next();
});

// CEK UDH MILIH MUSIC / ART BELUM (page awal sendiri)
let radioValue;
$(document).ready(function(){
    $("input[type='radio']").click(function(){
        radioValue = $("input[name='festival']:checked").val();
        // console.log(radioValue);
        $('#radio-next').removeAttr('disabled');
    });
});

// ANIMATION
const animate = () => {
    ; (function ($) {
        "use strict";

        function verificationForm() {
            let current_fs, next_fs, previous_fs, store_fs, current_fs_child; //fieldsets
            let left, opacity, scale; //fieldset properties which we will animate
            let animating; //flag to prevent quick multi-click glitches

            $("#nextFest").parent().click(function (e) {
                e.preventDefault();

                if (animating) return false;
                animating = true;

                current_fs = $(this).parent().parent();
                current_fs_child = $(this).parent();
                if(radioValue == 'art'){
                    next_fs = $(this).parent().parent().next().next();
                    store_fs = $(this).parent().parent().next();
                } else {
                    next_fs = $(this).parent().parent().next();
                    store_fs = $(this).parent().parent().next().next();
                }

                next_fs.css('display', 'flex')
                store_fs.css('display', 'none')

                // console.log('> dadada masok sini bos');
                //hide the current fieldset with style
                current_fs.animate({
                    opacity: 0
                }, {
                    step: function (now) {
                        //as the opacity of current_fs reduces to 0 - stored in "now"
                        //1. scale current_fs down to 80%
                        scale = 1 - (1 - now) * 0.2;
                        //3. increase opacity of next_fs to 1 as it moves in
                        opacity = 1 - now;
                        current_fs.css({
                            'transform': 'scale(' + scale + ')',
                            // 'position': 'absolute',
                            'align-self': 'center',
                            'width': '100%'
                        });
                        current_fs_child.css({
                            'position': 'absolute',
                        });

                        next_fs.css({
                            'opacity': opacity,
                            'display': 'flex'
                        });
                    },
                    duration: 800,
                    complete: function () {
                        current_fs.hide();
                        animating = false;
                    },
                    //this comes from the custom easing plugin
                    easing: 'easeInOutBack'
                });
            });

            $("#music_next_fs_2").parent().click(function (e) {
                e.preventDefault();

                if (animating) return false;
                animating = true;

                current_fs = $(this).parent();
                next_fs = $(this).parent().next();
                if ($('#inputGroupSelect01')[0].value == '1') {
                    next_fs = $(this).parent().next().next();
                }

                // console.log('> dadada masok sini bos');
                //hide the current fieldset with style
                current_fs.animate({
                    opacity: 0
                }, {
                    step: function (now) {
                        //as the opacity of current_fs reduces to 0 - stored in "now"
                        //1. scale current_fs down to 80%
                        scale = 1 - (1 - now) * 0.2;
                        //3. increase opacity of next_fs to 1 as it moves in
                        opacity = 1 - now;
                        current_fs.css({
                            'transform': 'scale(' + scale + ')',
                            'position': 'absolute',
                            'align-self': 'center',
                            'width': '100%'
                        });

                        next_fs.css({
                            'opacity': opacity,
                            'display': 'flex'
                        });
                    },
                    duration: 800,
                    complete: function () {
                        current_fs.hide();
                        animating = false;
                    },
                    //this comes from the custom easing plugin
                    easing: 'easeInOutBack'
                });
            });


            $(".next").parent().click(function (e) {
                e.preventDefault();

                if (animating) return false;
                animating = true;

                current_fs = $(this).parent();
                next_fs = $(this).parent().next();

                if (current_fs[0] == $('fieldset')[0] && member > 1) {
                    // console.log('> 1 dah masok sini bos');
                    createField(member);
                }

                //hide the current fieldset with style
                current_fs.animate({
                    opacity: 0
                }, {
                    step: function (now) {
                        //as the opacity of current_fs reduces to 0 - stored in "now"
                        //1. scale current_fs down to 80%
                        scale = 1 - (1 - now) * 0.2;
                        //3. increase opacity of next_fs to 1 as it moves in
                        opacity = 1 - now;
                        current_fs.css({
                            'transform': 'scale(' + scale + ')',
                            'position': 'absolute',
                            'align-self': 'center',
                            'width': '100%'
                        });
                        next_fs.css({
                            'opacity': opacity,
                            'display': 'flex'
                        });
                    },
                    duration: 800,
                    complete: function () {
                        current_fs.hide();
                        animating = false;
                    },
                    //this comes from the custom easing plugin
                    easing: 'easeInOutBack'
                });
            });

            $(".previous").click(function (e) {
                e.preventDefault();
                if (animating) return false;
                animating = true;

                current_fs = $(this).parent().parent().parent().parent();
                previous_fs = $(this).parent().parent().parent().parent().prev();

                //de-activate current step on progressbar
                $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

                //show the previous fieldset
                previous_fs.show();
                //hide the current fieldset with style
                current_fs.animate({
                    opacity: 0
                }, {
                    step: function (now) {
                        //as the opacity of current_fs reduces to 0 - stored in "now"
                        //1. scale previous_fs from 80% to 100%
                        scale = 0.8 + (1 - now) * 0.2;
                        //3. increase opacity of previous_fs to 1 as it moves in
                        opacity = 1 - now;
                        previous_fs.css({
                            'transform': 'scale(' + scale + ')',
                            'opacity': opacity
                        });
                    },
                    duration: 800,
                    complete: function () {
                        current_fs.hide();
                        animating = false;
                    },
                    //this comes from the custom easing plugin
                    easing: 'easeInOutBack'
                });
            });

            $("#music_prev_fs_2").click(function (e) {
                e.preventDefault();
                if (animating) return false;
                animating = true;

                current_fs = $(this).parent().parent().parent();
                previous_fs = $(this).parent().parent().parent().prev();
                if ($('#inputGroupSelect01')[0].value == '1') {
                    previous_fs = $(this).parent().parent().parent().prev().prev();
                }
                // console.log(previous_fs)

                // //de-activate current step on progressbar
                // $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

                //show the previous fieldset
                previous_fs.show();
                //hide the current fieldset with style
                current_fs.animate({
                    opacity: 0
                }, {
                    step: function (now) {
                        //as the opacity of current_fs reduces to 0 - stored in "now"
                        //1. scale previous_fs from 80% to 100%
                        scale = 0.8 + (1 - now) * 0.2;
                        //3. increase opacity of previous_fs to 1 as it moves in
                        opacity = 1 - now;
                        previous_fs.css({
                            'transform': 'scale(' + scale + ')',
                            'opacity': opacity
                        });
                    },
                    duration: 800,
                    complete: function () {
                        current_fs.hide();
                        animating = false;
                    },
                    //this comes from the custom easing plugin
                    easing: 'easeInOutBack'
                });
            });

            $("#music_prev").click(function (e) {
                e.preventDefault();
                if (animating) return false;
                animating = true;

                current_fs = $(this).parent().parent().parent().parent().parent().parent();
                previous_fs = $(this).parent().parent().parent().parent().parent().parent().prev();

                //de-activate current step on progressbar
                $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

                //show the previous fieldset
                previous_fs.show();
                //hide the current fieldset with style
                current_fs.animate({
                    opacity: 0
                }, {
                    step: function (now) {
                        //as the opacity of current_fs reduces to 0 - stored in "now"
                        //1. scale previous_fs from 80% to 100%
                        scale = 0.8 + (1 - now) * 0.2;
                        //3. increase opacity of previous_fs to 1 as it moves in
                        opacity = 1 - now;
                        previous_fs.css({
                            'transform': 'scale(' + scale + ')',
                            'opacity': opacity
                        });
                    },
                    duration: 800,
                    complete: function () {
                        current_fs.hide();
                        animating = false;
                    },
                    //this comes from the custom easing plugin
                    easing: 'easeInOutBack'
                });
            });

            $("#art_prev").click(function (e) {
                e.preventDefault();
                if (animating) return false;
                animating = true;

                current_fs = $(this).parent().parent().parent().parent().parent().parent();
                previous_fs = $(this).parent().parent().parent().parent().parent().parent().prev().prev();

                //de-activate current step on progressbar
                $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

                //show the previous fieldset
                previous_fs.show();
                //hide the current fieldset with style
                current_fs.animate({
                    opacity: 0
                }, {
                    step: function (now) {
                        //as the opacity of current_fs reduces to 0 - stored in "now"
                        //1. scale previous_fs from 80% to 100%
                        scale = 0.8 + (1 - now) * 0.2;
                        //3. increase opacity of previous_fs to 1 as it moves in
                        opacity = 1 - now;
                        previous_fs.css({
                            'transform': 'scale(' + scale + ')',
                            'opacity': opacity
                        });
                    },
                    duration: 800,
                    complete: function () {
                        current_fs.hide();
                        animating = false;
                    },
                    //this comes from the custom easing plugin
                    easing: 'easeInOutBack'
                });
            });

            $(".submit").click(function () {
                return false;
            })
        };

        // //* Add Phone no select
        // function phoneNoselect() {
        //     if ($('#msform').length) {
        //         $("#phone").intlTelInput();
        //         $("#phone").intlTelInput("setNumber", "+880");
        //     };
        // };
        // //* Select js
        // function nice_Select() {
        //     if ($('.product_select').length) {
        //         $('select').niceSelect();
        //     };
        // };
        /*Function Calls*/
        verificationForm();
        // phoneNoselect();
        // nice_Select();
    })(jQuery);
}
animate();
