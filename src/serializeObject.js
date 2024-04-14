(function($) {
  $.fn.serializeObject = function() {
    return Object.fromEntries(this.serializeArray()
      .map(e => [e.name, e.value]));
  }
})(window.jQuery);