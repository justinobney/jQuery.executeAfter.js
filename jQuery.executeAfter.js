/*
* jQuery executeAfter extention
* stole this from: [CHAD] http://stackoverflow.com/users/54746/chad
* SO URL: http://stackoverflow.com/questions/2768293/waiting-on-multiple-asynchronous-calls-to-complete-before-continuing
*/

;(function($) {
    $.fn.executeAfter = function(methods, callback) {

        var stack = [];

        var trackAjaxSend = function(event, XMLHttpRequest, ajaxOptions) {
            var url = ajaxOptions.url;
            stack.push(url);
        }

        var trackAjaxComplete = function(event, XMLHttpRequest, ajaxOptions) {
            var url = ajaxOptions.url;
            var index = jQuery.inArray(url, stack);

            if (index >= 0) {
                stack.splice(index, 1);
            }

            if (stack.length == 0) {
                callback();
                $this.unbind("ajaxComplete");
            }
        }

        var $this = $(document);

        $this.ajaxSend(trackAjaxSend)
        $this.ajaxComplete(trackAjaxComplete)

        methods();
        $this.unbind("ajaxSend");
    };
})(jQuery);