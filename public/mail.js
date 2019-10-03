$(function() {

    $('.centred-text').click(function() {
        if ($('.form-container').hasClass('close')) {
            //alert('Message already sent!');
            if (confirm('Message already sent! Wanna send another one?')) {
                $('.form-container').fadeIn();
                $('.form-container').removeClass('close');
                $('.form-container').removeClass('close-all');
                $('.close-form').fadeIn();
                $('.message-sent').removeClass('active').fadeOut();
                $('.ink').remove();
                $('.label-line').removeClass('active');
                $('.input').val('');
            } else {
                // Do nothing!
            }
        } else {
            $('.form-container').fadeIn();
            $('.close-form').fadeIn();
        }
    });

    $('.input').blur(function() {
        if ($(this).val()) {
            $(this).parent('.label-line').addClass('active checked');
        } else {
            $(this).parent('.label-line').removeClass('active checked');
            //alert('no');
        }
    });

    $('.label-line').click(function() {
        $(this).addClass('active');
        if ($('.label-line').hasClass('checked')) {} else {
            $('.label-line').removeClass('checked');
        }
        /*$(this).children('.span').addClass('active');
        $(this).children('.label').addClass('active');*/
    });

    $('.form-right').click(function(e) {
        if ($('#name').val() && $('#mymail').val() && $('#text').val()) {
            // rimuovo la classe 'error'
            $('.form-right').removeClass('error');
            // genero l'effetto tocco material
            var parent, ink, d, x, y;
            parent = $(this);
            //creo elemento .ink se non esiste
            if (parent.find(".ink").length == 0)
                parent.prepend("<span class='ink'></span>");

            ink = parent.find(".ink");
            //incase of quick double clicks stop the previous animation
            //ink.removeClass("animate");

            //setto dimensioni di .ink
            if (!ink.height() && !ink.width()) {
                //use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
                d = Math.max(parent.outerWidth(), parent.outerHeight());
                ink.css({ height: d, width: d });
            }

            //get click coordinates
            //logic = click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center;
            x = e.pageX - parent.offset().left - ink.width() / 2;
            y = e.pageY - parent.offset().top - ink.height() / 2;

            //set the position and add class .animate
            ink.css({ top: y + 'px', left: x + 'px' }).addClass("animate");
            $('.message-sent').delay(500).fadeIn().addClass('active');
            $('.close-form').fadeOut();
            setTimeout(function() {
                $('.form-container').addClass('close');
            }, 2000);
            //$('.form-container').delay(3000).fadeOut();
            setTimeout(function() {
                $('.form-container').addClass('close-all');
                $('.message-sent').fadeOut();
                //Send information to form
                $('#frmSendEmail').submit();
            }, 3000);
        } else {
            $('.form-right').addClass('error');
            $('.form-container').prepend("<span class='alert'>Fill all the fields!</span>");
            $('.alert').fadeIn().delay(1500).fadeOut();
            setTimeout(function() {
                $('.form-right').removeClass('error');
            }, 3000);
        }
    });

    $('.close-form').click(function() {
        $('.form-container').fadeOut();
    });

});