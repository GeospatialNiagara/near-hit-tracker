(function($) {
  $(document).ready(function() {
    $('[data-toggle]').on('click', function(e) {
      var klass = $(this).data('toggle');
      $('body').toggleClass(klass);
      
      e.preventDefault();
    });
    
    $('[data-category]').on('click', function(e) {
      var $self = $(this);
      $self.toggleClass('active');
      
      e.preventDefault();
    });
  });
})(jQuery);