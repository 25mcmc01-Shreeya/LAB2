(function ($) {

  $.fn.smartTabs = function (userOptions) {

    const config = $.extend({
      activeClass: "active-tab",
      animationSpeed: 300,
      startTab: null
    }, userOptions);

    return this.each(function () {

      const $root = $(this);
      const $buttons = $root.find(".tab-btn");
      const $sections = $root.find(".tab-section");

      // ---------- core switch function ----------
      function activateTab(targetId) {

        if (!$(targetId).length) return;

        // update active button
        $buttons.removeClass(config.activeClass);
        $buttons.filter(`[data-target="${targetId}"]`)
                .addClass(config.activeClass);

        // hide others smoothly
        $sections.stop(true, true).fadeOut(0);

        // show selected
        $(targetId).stop(true, true).fadeIn(config.animationSpeed);

        // update URL hash (bookmark feature)
        if (location.hash !== targetId) {
          history.replaceState(null, "", targetId);
        }
      }

      // ---------- click handling ----------
      $buttons.on("click", function () {
        const id = $(this).data("target");
        activateTab(id);
      });

      // ---------- keyboard accessibility ----------
      $buttons.on("keydown", function (e) {

        const index = $buttons.index(this);

        if (e.key === "ArrowRight") {
          const next = (index + 1) % $buttons.length;
          $buttons.eq(next).focus().trigger("click");
        }

        if (e.key === "ArrowLeft") {
          const prev = (index - 1 + $buttons.length) % $buttons.length;
          $buttons.eq(prev).focus().trigger("click");
        }
      });

      // ---------- hash navigation ----------
      $(window).on("hashchange", function () {
        const hash = window.location.hash;
        if (hash) activateTab(hash);
      });

      // ---------- initial tab ----------
      let initial = config.startTab;

      if (window.location.hash) {
        initial = window.location.hash;
      }

      if (!initial) {
        initial = $buttons.first().data("target");
      }

      activateTab(initial);
    });
  };

})(jQuery);