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



    /* Init inputmask */

    $('[type="tel"]').inputmask({
        alias: 'phoneru',
    });


    $('.simplified-datepicker__handler').on('click', function () {
        if( ! $(this).parents('.simplified-datepicker').hasClass('simplified-datepicker--readonly') ) {
            $(this).closest('.simplified-datepicker').toggleClass('simplified-datepicker--expanded');
        }
    });

    $('.simplified-datepicker__suggest').on('click', function (){
        const value = $(this).html();
        $(this).closest('.simplified-datepicker').find('.simplified-datepicker__value').html(value);
        $(this).closest('.simplified-datepicker').removeClass('simplified-datepicker--expanded');
    });


    /* hide popup by overlay click ( goo.gl/SJG2Hw ) */

    $(document).on('click', function(event) {
        if (!$(event.target).closest('.simplified-datepicker').length) {
            $('.simplified-datepicker').removeClass('simplified-datepicker--expanded');
        }
    });


    /* hide popup by Esc press */

    $(document).on('keyup', function(event) {
        if (event.keyCode === 27) {
            $('.simplified-datepicker').removeClass('simplified-datepicker--expanded');
        }
    });


})(jQuery);
