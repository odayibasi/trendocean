(function($) {
    $.fn.extend({
        counter: function(options) {
            var defaults = {
                goal: 140,        // max char
                dispID:'dispDiv',  // counter label
                dispIDColor: '#ffffff'
            };
            var options = $.extend({}, defaults, options);

            return this.each(function() {
                var $obj = $(this);

                function getCounterCharLeft(objLength) {
                    return (options.goal - objLength);
                } 

                $('#'+options.dispID).html(getCounterCharLeft($($obj).val().length ));
                var $currentCount = $('#'+options.dispID);

                // Bind events to a function that returns the length of the characters
                $obj.bind('keyup click blur focus change paste', function(new_length) {
                    new_length =common_contentCounterProcess($($obj).val()).length;
                    if (getCounterCharLeft(new_length) < 0) {
                         $('#'+options.dispID).css("color","#d81919");
                    }else{
                         $('#'+options.dispID).css("color",options.dispIDColor);
                    }
                    $currentCount.text(getCounterCharLeft(new_length));
                }); 
            }); 
        } 
    }); 
}) 
(jQuery); 