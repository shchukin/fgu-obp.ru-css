(function($) {

    /* Inputs */

    /* Select placeholder */
    function selectPlaceholder($element) {
        if ($element.val() === 'placeholder') {
            $element.parent('.input').addClass('input--placeholder-is-chosen');
        } else {
            $element.parent('.input').removeClass('input--placeholder-is-chosen');
        }
    }

    $('select.input__widget').each(function () {
        selectPlaceholder($(this));
    }).on('change', function () {
        selectPlaceholder($(this));
    });

    /* Expanding textarea */
    function expandTextarea($element) {
        $element.css('height', 'auto');
        $element.css('height', ($element[0].scrollHeight + 2 * parseInt($element.css('border-width'), 10)) + 'px');
    }

    $('.input--expandable .input__widget').each(function () {
        expandTextarea($(this));
    }).on('input', function () {
        expandTextarea($(this));
    });

    /* Error field */
    $('.input__widget').on('focus', function () {
        $(this).parents('.input').removeClass('input--error');
        $(this).parents('.input').nextUntil(':not(.helper--error)').remove();
    });



    /* Init magnific popup */

    $('.mfp-handler').magnificPopup({
        type: 'inline',
        removalDelay: 200,
        showCloseBtn: false,
        callbacks: {
            open: function() {
                const $popup = $.magnificPopup.instance.content;

                /* If there is .input--expandable inside, re-run height calculations (meaning height was zero on document ready because modal window contains was hidden) */
                const $expandableInputs = $popup.find('.input--expandable .input__widget');
                if($expandableInputs.length) {
                    $expandableInputs.each(function() {
                        expandTextarea($(this));
                    });
                }

                /* Focus on the first input, if any  */
                setTimeout(function () {
                    const $firstInput = $popup.find('input').first();
                    if ($firstInput.length) {
                        $firstInput.focus();
                    }
                }, 100);
            }
        }
    });



    /* Picker */

    $('.picker__handler').on('click', function () {
        if( ! $(this).parents('.picker').hasClass('picker--readonly') ) {
            $(this).closest('.picker').toggleClass('picker--expanded');
        }
    });

    $('.picker__suggest').on('click', function (){
        const value = $(this).html();
        $(this).closest('.picker').find('.picker__value').html(value);
        $(this).closest('.picker').removeClass('picker--placeholder-is-chosen');
        $(this).closest('.picker').removeClass('picker--expanded');
    });


    /* hide popup by overlay click ( goo.gl/SJG2Hw ) */

    $(document).on('click', function(event) {
        if (!$(event.target).closest('.picker').length) {
            $('.picker').removeClass('picker--expanded');
        }
    });


    /* hide popup by Esc press */

    $(document).on('keyup', function(event) {
        if (event.keyCode === 27) {
            $('.picker').removeClass('picker--expanded');
        }
    });


    /* Все слайдеры в одной функции, чтобы их можно было переинициализировать при ресайзе */
    function initCarousels() {

        /* Swiper для Intro */

        document.querySelectorAll('.carousel--js-init-date').forEach(($carousel) => {

            new Swiper($carousel.querySelector('.swiper'), {
                slidesPerView: 'auto',
                slidesPerGroup: 3,
                spaceBetween: 10,
                navigation: {
                    prevEl: $carousel.querySelector('.carousel__button--prev'),
                    nextEl: $carousel.querySelector('.carousel__button--next'),
                    disabledClass: 'carousel__button--disabled'
                }
            });
        });
    }



    $(document).ready(initCarousels);

    $(window).on('resize', function () {
        setTimeout(initCarousels, 1000)
    });


})(jQuery);
