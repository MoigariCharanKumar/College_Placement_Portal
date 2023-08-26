$(document).ready(function() {
  $('.read-more').on('click', function() {
    const companyId = $(this).data('id');
    $('#company-summary-' + companyId).hide();
    $('#company-details-' + companyId).slideDown();
    $(this).hide();
    $('.read-less[data-id="' + companyId + '"]').show();
  });

  $('.read-less').on('click', function() {
    const companyId = $(this).data('id');
    $('#company-details-' + companyId).slideUp(function() {
      $('#company-summary-' + companyId).show();
    });
    $(this).hide();
    $('.read-more[data-id="' + companyId + '"]').show();
  });
});
