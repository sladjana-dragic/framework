/*  
    Validate jQuery Plugin
    Tirien.com
    $Rev$
    
    Use class 'required' on inputs that is mandatory and class 'email' to validate email.
    
    This is optional:
    options = {
        activeColor: 'white',
        inactiveColor: 'white'
    };
    
    To initiate use:
    $("#contact-form").tValidate(options);
*/

(function($) {
    $.tValidate = function(element, options) {
        var settings = {
            inactiveColor: 'gray',
            errorInputFontColor: 'red',
            errorInputBorderColor: 'red',
            validInputFontColor: 'green',
            validInputBorderColor: 'green',
            enableValidColors: false,
            errorMessage: 'Required fields can not be empty',
            placeholders: true
        }

        var settings = $.extend({}, settings, options);
        var form = $(element);
        var inputs = form.find("input,textarea").not("[type='submit']");


        // placeholders
        inputs.each(function(){

            settings.activeColor = $(this).css('color');
            
            if( !settings.enableValidColors ){
                settings.validInputFontColor = $(this).css('color');
                settings.validInputBorderColor = $(this).css('border-color');
            }


            if( $(this).val() == '' && settings.placeholders ){
                $(this).val( $(this).data('placeholder') ).css('color', settings.inactiveColor);
            }

        });

        inputs.focus(function(){
            $(this).css('color', settings.activeColor);
            if( $(this).val() == $(this).data('placeholder') && settings.placeholders ){
                $(this).val('');
            }
        }).blur(function(){
            if( $(this).val()=='' && settings.placeholders ){
                $(this).css('color', settings.inactiveColor);
                $(this).val( $(this).data('placeholder') );
            }
        });

        // validation
        form.submit(function(){
            var valid = true;

            inputs.filter(".required").css({borderColor:settings.validInputBorderColor, color:settings.validInputFontColor});

            inputs.filter(".required").each(function(){

                var emailPattern = /^[-\w\.]+@([-\w\.]+\.)[-\w]{2,4}$/;
                
                if( $(this).val()=='' || ( $(this).val()==$(this).data("placeholder") && settings.placeholders ) ){
                    $(this).css({borderColor:settings.errorInputBorderColor, color:settings.errorInputFontColor});
                    valid = false;
                }
                else if( $(this).val()!='' && $(this).hasClass("email") && !emailPattern.test($(this).val()) ){
                    $(this).css({borderColor:settings.errorInputBorderColor, color:settings.errorInputFontColor});
                    settings.errorMessage = "Email is not valid";
                    valid = false;
                }

            });
            
            if( valid ){

                inputs.each(function(){
                    if( $(this).val() == $(this).data('placeholder') && settings.placeholders ){
                        $(this).val("");
                    }
                });
               
                return true;
                
            }
            else{
                alert(settings.errorMessage);
                return false;
            }
        });
    }

    $.fn.tValidate = function(options) {
        return this.each(function() {
            if ($(this).data('tValidate') == undefined) {
                var tValidateObject = new $.tValidate(this, options);
                $(this).data('tValidate', tValidateObject);
            }
        });
    }

})(jQuery);