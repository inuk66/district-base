(function ($, Drupal) {

  /**
   * District Base slideout toggle.
   */
  Drupal.behaviors.slideoutToggle = {
    attach: function (context, settings) {
      var $btn = $('.js-slideout-toggle', context);
      var $slideout = $('.slideout', context);

      $btn.once('slideout-toggle').each(function(){
        $(this).click(function() {
          $slideout.toggleClass('duk-sidebar-slideout--open');
        })
      });
    }
  };


  /**
   * Accordion toggle.
   */
  Drupal.behaviors.accordionToggle = {
    attach: function (context, settings) {
      var $ctx = $('.accordion', context);

      $('.accordion__item', $ctx).once('accordion').each(function(){
        var $item = $(this);

        // Toggle open class on the parent when clicked.
        $('.title-text__title', $item).click(function(e) {
          e.preventDefault();
          $item.toggleClass('open');
        })
      });
    }
  };

  /**
   * Site switcher.
   */
  Drupal.behaviors.siteSwitcher = {
    attach: function (context, settings) {
      var $ctx = $('.menu--sites', context);

      $('ul.menu a', $ctx).once('accordion').each(function(){
        var $link = $(this);
        var link = new URL($link.attr('href'));
        var current = new URL(window.location.href);

        if (link.hostname === current.hostname) {
          $link.addClass('is-active')
        }
      });
    }
  };

  /**
   * Page feedback webform.
   */
  Drupal.behaviors.feedbackForm = {
    attach: function (context, settings) {
      var $ctx = $('.js-page-feedback-actions', context);

      // change reset button to cancel
      $('.webform-button--reset', $ctx).once('reset-to-cancel').each(function () {
        $(this).attr('value', 'Cancel');
      });
    }
  };

  /**
   * Limit items shown in a list.
   *
   * Eg.
   *  <ul class="js-limit-items" data-count="2" data-selector="li">
   *    <li>item</li>
   *    <li>item</li>
   *    <li>item</li>
   *    <li>item</li>
   *  </ul>
   *  Will only show 2 items with a "more" button to show all.
   */
  Drupal.behaviors.limitListItems = {
    attach: function (context, settings) {
      var $ctx = $('.js-limit-items', context),
        defaults = {count: 5, selector: 'li', label: 'More'};

      // For each list.
      $ctx.once('limit-list-items').each(function () {
        var $self = $(this), config = {};

        // Populate defaults from data properties.
        for (var prop in defaults) {
          let val = $self.data(prop);
          config[prop] = val ? val : defaults[prop];
        }

        var $items = $self.find(config.selector);

        // Exit if under count.
        config.count = parseInt(config.count);
        if ($items.length < config.count) {
          return;
        }

        // Hide items over the count.
        $items.each(function (i, d) {
          if (config.count <= i) {
            $(d).hide();
          }
        });

        // More button.
        $('<a href="#">' + config.label + '</a>')
          .click(function (e) {
            e.preventDefault();
            $items.show();
            $(this).hide();
          }).appendTo($self);
      });
    }
  };


  /**
   * Filtered map
   *
   * Handles UI for filtered map, filters are a separate view and trigger change
   * on the raw views filters.
   *
   * TODO: Move this and associated view to its own module and selectively inc.
   */
  Drupal.behaviors.filteredMap = {
    attach: function (context, settings) {
      var self = Drupal.behaviors.filteredMap,
        $ctx = $('.js-filtered-map-type-filter', context);

      // Bind to filters that get rebuilt each ajax request (button click).
      $ctx.once('filtered-map').each(function () {
        $('ul', this).prepend($('<li><span class="button button--tertiary js-map-filter" data-id="All">All</span></li>'));

        var $wrapper = $(this).closest('.js-filtered-map'),
          $rawTypeFilters = $('.js-form-item-type', $wrapper),
          $uiTypeFilters = $('.js-map-filter', this),
          type = $('select', $rawTypeFilters).val();

        // On click of ui filter, trigger click of raw filter.
        $uiTypeFilters.click(function (e) {
          $uiTypeFilters.removeClass('active');
          $(this).addClass('active');
          type = $(this).data('id');
          $('select', $rawTypeFilters).val(type).trigger('change');
        });

        // Set the current ui filter as active.
        $(this).find('span[data-id="' + type + '"]').trigger('click');
      });
    }
  };


  /**
   * Add an additional search button to the search box.
   */
  Drupal.behaviors.searchButton = {
    attach: function (context, settings) {
      var $ctx = $('.block-views-exposed-filter-blocksearch-sitewide-search', context);

      $ctx.once('search-button').each(function () {
        $('<button aria-label="submit" title="submit search">')
          .addClass('search-button')
          .on('click', function(i, d) {
            $(this).closest('form').submit();
          })
          .appendTo($('.form-item-keys', this));
      });
    }
  };


  /**
   * Share buttons popup.
   *
   * TODO: Backport to doghouse_social_media_block module
   */
  Drupal.behaviors.sharePopup = {
    attach: function (context, settings) {
      var $ctx = $('.social-media-share', context);

      // Open share links in a popup.
      $ctx.once('social-media-share').each(function () {
        $('a', this).each(function(i, d) {
          $(this).click(function(e) {
            e.preventDefault();
            window.open($(this).attr('href'), "shareWindow", "width=800,height=500,left=100,top=100");
          })
        });
      });
    }
  };


  /**
   * Iframe aspect ratio
   *
   * TODO: merge with district_core iframe formatter into new module.
   */
  Drupal.behaviors.iframeAspectRatio = {
    attach: function (context, settings) {
      var $ctx = $('.district-iframe', context);

      // Open share links in a popup.
      $ctx.once('district-iframe').each(function () {
        var $iframe = $('iframe', this);
        if ($iframe.length === 0) {
          return;
        }

        var w = $iframe.attr('width'), h = $iframe.attr('height');
        // If empty or a percent is used we can auto aspect ratio.
        if (!w || !h || w.indexOf('%') !== -1 || h.indexOf('%') !== -1) {
          return;
        }

        // Use padding top to set aspect ratio.
        // https://jameshfisher.com/2017/08/30/how-do-i-make-a-full-width-iframe/
        var paddingTop = ((parseInt(h) / parseInt(w)) * 100);
        $iframe.wrap('<div class="district-iframe__aspect-ratio" style="padding-top: ' + paddingTop + '%"></div>');
      });
    }
  };

}(jQuery, Drupal));
