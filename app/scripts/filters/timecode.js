(function() {
    function timecode() {
        return function(seconds) {
            var seconds = Number.parseFloat(seconds);

            if (Number.isNaN(seconds)) {
                return '00:00';
            }

            return buzz.toTimer(seconds);
        };
    }

    angular
        .module('blocJams')
        .filter('timecode', timecode);
})();
