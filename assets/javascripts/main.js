(function($, window, document, undefined){

  if (app.route) {
    app.route.init($('base').attr('href'), ['language', 'controller', 'action', 'id'], {language: 'de'});
  }

  if (app.address && app.helper.supportsHistory()) {
    app.address.init($('[data-state]').attr('data-state') || '/', app.template);
    app.template.render();
  }

  if (app.helper) {
    $('html').addClass(app.helper.isTouchDevice() ? 'touch' : 'no-touch');
    $('html').addClass(app.helper.supportsHistory() ? 'history' : 'no-history');
    $('html').addClass(app.helper.supportsTransitions() ? 'transitions' : 'no-transitions');
    $('html').addClass(app.helper.isRetina() ? 'retina' : 'no-retina');
  }

  if ($.client) {
    $('html').addClass('browser-'+$.client.browser.toLowerCase());
    $('html').addClass('browser-version-'+$.client.version);
    $('html').addClass('os-'+$.client.os.toLowerCase());
    if (BrowserDetect.webkit) jQuery('html').addClass('webkit');
  }

  $(document).ajaxComplete(app.layout.ajaxComplete);

})(jQuery, window, window.document);