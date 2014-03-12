/* ========================================================================
 * Bootstrap: affix.js v3.0.3
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */



+function ($) { "use strict";

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)
    this.$window = $(window)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element = $(element)
    this.affixed  =
    this.unpin    = null

    this.checkPosition()
  }

  Affix.RESET = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
    var scrollTop    = this.$window.scrollTop()
    var position     = this.$element.offset()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top()
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom()

    var affix = this.unpin   != null && (scrollTop + this.unpin <= position.top) ? false :
                offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ? 'bottom' :
                offsetTop    != null && (scrollTop <= offsetTop) ? 'top' : false

    if (this.affixed === affix) return
    if (this.unpin) this.$element.css('top', '')

    this.affixed = affix
    this.unpin   = affix == 'bottom' ? position.top - scrollTop : null

    this.$element.removeClass(Affix.RESET).addClass('affix' + (affix ? '-' + affix : ''))

    if (affix == 'bottom') {
      this.$element.offset({ top: document.body.offsetHeight - offsetBottom - this.$element.height() })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  var old = $.fn.affix

  $.fn.affix = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom) data.offset.bottom = data.offsetBottom
      if (data.offsetTop)    data.offset.top    = data.offsetTop

      $spy.affix(data)
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: alert.js v3.0.3
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */



+function ($) { "use strict";

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.hasClass('alert') ? $this : $this.parent()
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent.trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one($.support.transition.end, removeElement)
        .emulateTransitionEnd(150) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  var old = $.fn.alert

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);
/* ========================================================================
 * Bootstrap: button.js v3.0.3
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */



+function ($) { "use strict";

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element = $(element)
    this.options  = $.extend({}, Button.DEFAULTS, options)
  }

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (!data.resetText) $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout(function () {
      state == 'loadingText' ?
        $el.addClass(d).attr(d, d) :
        $el.removeClass(d).removeAttr(d);
    }, 0)
  }

  Button.prototype.toggle = function () {
    var $parent = this.$element.closest('[data-toggle="buttons"]')
    var changed = true

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') === 'radio') {
        // see if clicking on current one
        if ($input.prop('checked') && this.$element.hasClass('active'))
          changed = false
        else
          $parent.find('.active').removeClass('active')
      }
      if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change')
    }

    if (changed) this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  var old = $.fn.button

  $.fn.button = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document).on('click.bs.button.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    $btn.button('toggle')
    e.preventDefault()
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: carousel.js v3.0.3
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */



+function ($) { "use strict";

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      =
    this.sliding     =
    this.interval    =
    this.$active     =
    this.$items      = null

    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.DEFAULTS = {
    interval: 5000
  , pause: 'hover'
  , wrap: true
  }

  Carousel.prototype.cycle =  function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getActiveIndex = function () {
    this.$active = this.$element.find('.item.active')
    this.$items  = this.$active.parent().children()

    return this.$items.index(this.$active)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getActiveIndex()

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) })
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition.end) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || $active[type]()
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var fallback  = type == 'next' ? 'first' : 'last'
    var that      = this

    if (!$next.length) {
      if (!this.options.wrap) return
      $next = this.$element.find('.item')[fallback]()
    }

    this.sliding = true

    isCycling && this.pause()

    var e = $.Event('slide.bs.carousel', { relatedTarget: $next[0], direction: direction })

    if ($next.hasClass('active')) return

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      this.$element.one('slid.bs.carousel', function () {
        var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
        $nextIndicator && $nextIndicator.addClass('active')
      })
    }

    if ($.support.transition && this.$element.hasClass('slide')) {
      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid.bs.carousel') }, 0)
        })
        .emulateTransitionEnd(600)
    } else {
      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger('slid.bs.carousel')
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  var old = $.fn.carousel

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var $this   = $(this), href
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    $target.carousel(options)

    if (slideIndex = $this.attr('data-slide-to')) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  })

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      $carousel.carousel($carousel.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: collapse.js v3.0.3
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */



+function ($) { "use strict";

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var actives = this.$parent && this.$parent.find('> .panel > .in')

    if (actives && actives.length) {
      var hasData = actives.data('bs.collapse')
      if (hasData && hasData.transitioning) return
      actives.collapse('hide')
      hasData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')
      [dimension](0)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('in')
        [dimension]('auto')
      this.transitioning = 0
      this.$element.trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
      [dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element
      [dimension](this.$element[dimension]())
      [0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in')

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .trigger('hidden.bs.collapse')
        .removeClass('collapsing')
        .addClass('collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this   = $(this), href
    var target  = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
    var $target = $(target)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()
    var parent  = $this.attr('data-parent')
    var $parent = parent && $(parent)

    if (!data || !data.transitioning) {
      if ($parent) $parent.find('[data-toggle=collapse][data-parent="' + parent + '"]').not($this).addClass('collapsed')
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    }

    $target.collapse(option)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: dropdown.js v3.0.3
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */



+function ($) { "use strict";

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle=dropdown]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      $parent.trigger(e = $.Event('show.bs.dropdown'))

      if (e.isDefaultPrevented()) return

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown')

      $this.focus()
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27)/.test(e.keyCode)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive || (isActive && e.keyCode == 27)) {
      if (e.which == 27) $parent.find(toggle).focus()
      return $this.click()
    }

    var $items = $('[role=menu] li:not(.divider):visible a', $parent)

    if (!$items.length) return

    var index = $items.index($items.filter(':focus'))

    if (e.keyCode == 38 && index > 0)                 index--                        // up
    if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index=0

    $items.eq(index).focus()
  }

  function clearMenus() {
    $(backdrop).remove()
    $(toggle).each(function (e) {
      var $parent = getParent($(this))
      if (!$parent.hasClass('open')) return
      $parent.trigger(e = $.Event('hide.bs.dropdown'))
      if (e.isDefaultPrevented()) return
      $parent.removeClass('open').trigger('hidden.bs.dropdown')
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)

}(jQuery);
/* ========================================================================
 * Bootstrap: tab.js v3.0.3
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */



+function ($) { "use strict";

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var previous = $ul.find('.active:last a')[0]
    var e        = $.Event('show.bs.tab', {
      relatedTarget: previous
    })

    $this.trigger(e)

    if (e.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.parent('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $this.trigger({
        type: 'shown.bs.tab'
      , relatedTarget: previous
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && $active.hasClass('fade')

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
        .removeClass('active')

      element.addClass('active')

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu')) {
        element.closest('li.dropdown').addClass('active')
      }

      callback && callback()
    }

    transition ?
      $active
        .one($.support.transition.end, next)
        .emulateTransitionEnd(150) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  var old = $.fn.tab

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: transition.js v3.0.3
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */



+function ($) { "use strict";

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      'WebkitTransition' : 'webkitTransitionEnd'
    , 'MozTransition'    : 'transitionend'
    , 'OTransition'      : 'oTransitionEnd otransitionend'
    , 'transition'       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false, $el = this
    $(this).one($.support.transition.end, function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: scrollspy.js v3.0.3
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */



+function ($) { "use strict";

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    var href
    var process  = $.proxy(this.process, this)

    this.$element       = $(element).is('body') ? $(window) : $(element)
    this.$body          = $('body')
    this.$scrollElement = this.$element.on('scroll.bs.scroll-spy.data-api', process)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.offsets        = $([])
    this.targets        = $([])
    this.activeTarget   = null

    this.refresh()
    this.process()
  }

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.refresh = function () {
    var offsetMethod = this.$element[0] == window ? 'offset' : 'position'

    this.offsets = $([])
    this.targets = $([])

    var self     = this
    var $targets = this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#\w/.test(href) && $(href)

        return ($href
          && $href.length
          && [[ $href[offsetMethod]().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href ]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        self.offsets.push(this[0])
        self.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
    var maxScroll    = scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets.last()[0]) && this.activate(i)
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
        && this.activate( targets[i] )
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    $(this.selector)
      .parents('.active')
      .removeClass('active')

    var selector = this.selector
      + '[data-target="' + target + '"],'
      + this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length)  {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  var old = $.fn.scrollspy

  $.fn.scrollspy = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: modal.js v3.0.3
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */



+function ($) { "use strict";

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options   = options
    this.$element  = $(element)
    this.$backdrop =
    this.isShown   = null

    if (this.options.remote) this.$element.load(this.options.remote)
  }

  Modal.DEFAULTS = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this[!this.isShown ? 'show' : 'hide'](_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.escape()

    this.$element.on('click.dismiss.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(document.body) // don't move modals dom position
      }

      that.$element.show()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one($.support.transition.end, function () {
            that.$element.focus().trigger(e)
          })
          .emulateTransitionEnd(300) :
        that.$element.focus().trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one($.support.transition.end, $.proxy(this.hideModal, this))
        .emulateTransitionEnd(300) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.focus()
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keyup.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.removeBackdrop()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that    = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(document.body)

      this.$element.on('click.dismiss.modal', $.proxy(function (e) {
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus.call(this.$element[0])
          : this.hide.call(this)
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      $.support.transition && this.$element.hasClass('fade')?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (callback) {
      callback()
    }
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  var old = $.fn.modal

  $.fn.modal = function (option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
    var option  = $target.data('modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    e.preventDefault()

    $target
      .modal(option, this)
      .one('hide', function () {
        $this.is(':visible') && $this.focus()
      })
  })

  $(document)
    .on('show.bs.modal',  '.modal', function () { $(document.body).addClass('modal-open') })
    .on('hidden.bs.modal', '.modal', function () { $(document.body).removeClass('modal-open') })

}(jQuery);
/* ========================================================================
 * Bootstrap: tooltip.js v3.0.3
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */



+function ($) { "use strict";

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.DEFAULTS = {
    animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover focus'
  , title: ''
  , delay: 0
  , html: false
  , container: false
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled  = true
    this.type     = type
    this.$element = $(element)
    this.options  = this.getOptions(options)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focus'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'blur'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay
      , hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.'+ this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      var $tip = this.tip()

      this.setContent()

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var $parent = this.$element.parent()

        var orgPlacement = placement
        var docScroll    = document.documentElement.scrollTop || document.body.scrollTop
        var parentWidth  = this.options.container == 'body' ? window.innerWidth  : $parent.outerWidth()
        var parentHeight = this.options.container == 'body' ? window.innerHeight : $parent.outerHeight()
        var parentLeft   = this.options.container == 'body' ? 0 : $parent.offset().left

        placement = placement == 'bottom' && pos.top   + pos.height  + actualHeight - docScroll > parentHeight  ? 'top'    :
                    placement == 'top'    && pos.top   - docScroll   - actualHeight < 0                         ? 'bottom' :
                    placement == 'right'  && pos.right + actualWidth > parentWidth                              ? 'left'   :
                    placement == 'left'   && pos.left  - actualWidth < parentLeft                               ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)
      this.$element.trigger('shown.bs.' + this.type)
    }
  }

  Tooltip.prototype.applyPlacement = function(offset, placement) {
    var replace
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    $tip
      .offset(offset)
      .addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      replace = true
      offset.top = offset.top + height - actualHeight
    }

    if (/bottom|top/.test(placement)) {
      var delta = 0

      if (offset.left < 0) {
        delta       = offset.left * -2
        offset.left = 0

        $tip.offset(offset)

        actualWidth  = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight
      }

      this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
    } else {
      this.replaceArrow(actualHeight - height, actualHeight, 'top')
    }

    if (replace) $tip.offset(offset)
  }

  Tooltip.prototype.replaceArrow = function(delta, dimension, position) {
    this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + "%") : '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function () {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one($.support.transition.end, complete)
        .emulateTransitionEnd(150) :
      complete()

    this.$element.trigger('hidden.bs.' + this.type)

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function () {
    var el = this.$element[0]
    return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
      width: el.offsetWidth
    , height: el.offsetHeight
    }, this.$element.offset())
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.tip = function () {
    return this.$tip = this.$tip || $(this.options.template)
  }

  Tooltip.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow')
  }

  Tooltip.prototype.validate = function () {
    if (!this.$element[0].parentNode) {
      this.hide()
      this.$element = null
      this.options  = null
    }
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = e ? $(e.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type) : this
    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  var old = $.fn.tooltip

  $.fn.tooltip = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);
/* ========================================================================
 * Bootstrap: popover.js v3.0.3
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */



+function ($) { "use strict";

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.DEFAULTS = $.extend({} , $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right'
  , trigger: 'click'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.arrow')
  }

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  var old = $.fn.popover

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);












$(document).ready(function() {
	var containerHeight = $(window).height() - 80;
	$(window).resize(function(){
		$("#routeListContainer").height($(window).height() - 80)
	});
	setTimeout(function() {
			$("#routeListContainer").animate({"width": "100%", "padding": "10px"}, 500, "easeOutExpo");
			
			$("#routeListContainer").animate({"height": containerHeight}, 1000, "easeOutBounce", function() {
				$("#routeListContainer").css("overflow", "auto");
			});
			/*setTimeout(function() {
				var containerHeight = $(window).height() - 55
				$("#routeListContainer").animate({"height": containerHeight}, 800, "easeOutBounce");
			},
				100
			);*/
		}, 300
	);	
});

function editUserPageLoad() {
    if ($("#currentPasswordEdit").val() == "") {
      document.getElementById("updateProfBtn").disabled = true;
    }
    $("#currentPasswordEdit").bind("propertychange keyup input paste", function() {
      if ($("#currentPasswordEdit").val() == "") {
        document.getElementById("updateProfBtn").disabled = true;
      } else {
        document.getElementById("updateProfBtn").disabled = false;
      }
    });

  }
  $(document).on("page:load", editUserPageLoad);
  $(document).ready(editUserPageLoad);

function friendListLoad() {
	var containerHeight = $(window).height() - 80;
	$(window).resize(function(){
		$("#userListContainer").height($(window).height() - 80)
	});
	setTimeout(function() {
			$("#userListContainer").animate({"width": "100%"}, 500, "easeOutExpo");
			
			$("#userListContainer").animate({"height": containerHeight}, 1000, "easeOutBounce", function() {
				$("#userListContainer").css("overflow", "auto");
			});
			/*setTimeout(function() {
				var containerHeight = $(window).height() - 55
				$("#userListContainer").animate({"height": containerHeight}, 800, "easeOutBounce");
			},
				100
			);*/
		}, 300
	);

	$(".userDelFriendLink").append('<button id = "userDelFriendBtn" class = "btn btn-warning" style = "float: right; margin-top: 36px; margin-right: 10px; ">Delete Friend</button>')
	$(".userAddFriendLink").append('<button id = "userAddFriendBtn" class = "btn btn-warning" style = "float: right; margin-top: 36px; margin-right: 10px; ">Add Friend</button>')

	var col1html = $("#userCol1").val();
	var col2html = $("#userCol2").val();

	if (col1html == "" && col2html == "") {
		console.log("yes");
		$("#userListContainer").append($("<div style = 'position: absolute; height: 100%; width: 100%; text-align: center; '><h2 style = 'margin-top: 30%; '>You have no friends :( <br> ...yet. Click the search bar above to look for people you know</h2></div>"));
	}
}

$(document).on("page:load", friendListLoad);
$(document).ready(friendListLoad);

if ($('#landingPage').length) {
	function landingPageLoad() {
		// Styling javascript

	var mainHeight = $(window).height() - 60;
	$(".jumbotron").css("height", mainHeight - 100);
	$("#infoSection1").height(mainHeight);
	$("#infoSection2").height(mainHeight);
	$("#infoSection3").height(mainHeight);
	$("#navigator").css("margin-top", (mainHeight/2) - $("#navigator").height()/2 + 60 - 20);
	$("#infoSection1 p").css("font-size", Math.ceil(mainHeight * $(window).width() / 40000));
	$("#infoSection2 p").css("font-size", Math.ceil(mainHeight * $(window).width() / 40000));
	$(".landingSection3Icon").css("height", (mainHeight - 365)/3);
	$("#landingSection3Icon2").css("font-size", (mainHeight - 365)/3);
	$("#landingSection3Icon3").css("font-size", (mainHeight - 365)/3);


	$(window).resize(function() {
		var mainHeight = $(window).height() - 60;
		$(".jumbotron").css("height", mainHeight - 100);
		$("#infoSection1").height(mainHeight);
		$("#infoSection2").height(mainHeight);
		$("#infoSection3").height(mainHeight);
		$("#navigator").css("margin-top", (mainHeight/2) - $("#navigator").height()/2 + 60 - 20);
		$("#infoSection1 p").css("font-size", Math.ceil(mainHeight * $(window).width() / 40000));
		$("#infoSection2 p").css("font-size", Math.ceil(mainHeight * $(window).width() / 40000));
		if ( $(window).width() < 1440 ){
			$('.jumbotron').css("min-height", '793px');
		} else {
			$('.jumbotron').css('min-height', '500px');
		}
	});

		$(window).resize(function() {
			var mainHeight = $(window).height() - 60;
			$(".jumbotron").css("height", $(window).height() - 60 - 100);
			$("#infoSection1").height($(window).height() - 60);
			$("#infoSection2").height($(window).height() - 60);
			$("#infoSection3").height($(window).height() - 60);
			$("#navigator").css("margin-top", (($(window).height() - 60)/2) - $("#navigator").height()/2 + 60 - 20);
			$("#infoSection1 p").css("font-size", Math.ceil(mainHeight * $(window).width() / 40000));
			if ( $(window).width() < 1440 ){
				$('.jumbotron').css("min-height", '793px');
			} else {
				$('.jumbotron').css('min-height', '500px');
			}
		});

		// Chevron animation
		function animateChevron() {
			console.log("called");
			$("#learnMoreChevron").animate({"margin-top": "10px"}, 750, 'linear', function() {
				$("#learnMoreChevron").animate({"margin-top": "0px"}, 750, 'linear');
			});
		}
		animateChevron();
		var chevronInterval = setInterval(animateChevron, 1500);

		// Bullet Hover
		$("#homeBullet").tooltip({placement: 'left'});
		$("#navBullet1").tooltip({placement: 'left'});
		$("#navBullet2").tooltip({placement: 'left'});
		$("#navBullet3").tooltip({placement: 'left'});

		$(".navBullet").on("mouseenter", function() {
			$(this).animate({"opacity": 1}, 200);
		});
		$(".navBullet").on("mouseleave", function() {
			$(this).animate({"opacity": 0.5}, 200);
			// $(this).tooltip('hide');
		});

		// Bullet Click
		$("#homeBullet").on("click", function() {
			var container = $("body"), scrollTo = 60;
			container.animate({scrollTop: scrollTo - 60}, 1500, "easeInOutQuint");
			$("#homeBullet").css("opacity", 1);
			$("#navBullet1").css("opacity", 0.5);
			$("#navBullet2").css("opacity", 0.5);
			$("#navBullet3").css("opacity", 0.5);
		})
		$("#navBullet1").on("click", function() {
			var container = $("body"), scrollTo = $("#infoSection1");
			container.animate({scrollTop: scrollTo.offset().top - 60}, 1500, "easeInOutQuint");
			$("#homeBullet").css("opacity", 0.5);
			$("#navBullet1").css("opacity", 1);
			$("#navBullet2").css("opacity", 0.5);
			$("#navBullet3").css("opacity", 0.5);
		})
		$("#navBullet2").on("click", function() {
			var container = $("body"), scrollTo = $("#infoSection2");
			container.animate({scrollTop: scrollTo.offset().top - 60}, 1500, "easeInOutQuint");
			$("#homeBullet").css("opacity", 0.5);
			$("#navBullet1").css("opacity", 0.5);
			$("#navBullet2").css("opacity", 1);
			$("#navBullet3").css("opacity", 0.5);
		})
		$("#navBullet3").on("click", function() {
			var container = $("body"), scrollTo = $("#infoSection3");
			container.animate({scrollTop: scrollTo.offset().top - 60}, 1500, "easeInOutQuint");
			$("#homeBullet").css("opacity", 0.5);
			$("#navBullet1").css("opacity", 0.5);
			$("#navBullet2").css("opacity", 0.5);
			$("#navBullet3").css("opacity", 1);
		})
		
		
		// User Login Modal
		$("#getStarted").on("click", function() {
			$("#myModal").modal();
		});

		// Chevron Scroll click
		$("#learnMoreChevron").on("click", function() {
			var container = $("body"),
			scrollTo = $("#infoSection1");
			container.animate({scrollTop: scrollTo.offset().top - 60}, 1500, "easeInOutQuint")    
		});
		$("#toHomeChevron").on("click", function() {
			var container = $("body");
			container.animate({scrollTop: 0}, 1500, "easeInOutQuint") 
		})
		$("#toSection2DownChevron").on("click", function() {
			var container = $("body"),
			scrollTo = $("#infoSection2");
			container.animate({scrollTop: scrollTo.offset().top - 60}, 1500, "easeInOutQuint")
		})
		$("#toSection1UpChevron").on("click", function() {
			var container = $("body"),
			scrollTo = $("#infoSection1");
			container.animate({scrollTop: scrollTo.offset().top - 60}, 1500, "easeInOutQuint")
		})
		$("#toSection3DownChevron").on("click", function() {
			var container = $("body"),
			scrollTo = $("#infoSection3");
			container.animate({scrollTop: scrollTo.offset().top - 60}, 1500, "easeInOutQuint")
		})
		$("#toSection2UpChevron").on("click", function() {
			var container = $("body"),
			scrollTo = $("#infoSection2");
			container.animate({scrollTop: scrollTo.offset().top - 60}, 1500, "easeInOutQuint")
		})
	}
	landingPageLoad()
}

$(document).ready(landingPageLoad);

function toolbarLoad() {
	var extraInfohtml = '<ul class="dropdown-menu" role="menu" style = "display: block; position: relative; border: none; box-shadow: none; margin-top: -8px;">'
	+ '<li role="presentation"><a role="menuitem" tabindex="-1" style = "cursor: pointer;" data-toggle="modal" data-target=".helpModal">Help</a></li>'
	+ '<li role="presentation" class="divider"></li>'
	+ '<li role="presentation"><a role="menuitem" tabindex="-1" style = "cursor: pointer;" >My Profile</a></li>'
	+ '<li role="presentation"><a role="menuitem" tabindex="-1" style = "cursor: pointer;" >Account Settings</a></li>'
	+ '<li role="presentation"><a role="menuitem" tabindex="-1" style = "cursor: pointer;" >Log Out</a></li>'
	+ '<li role="presentation" class="divider"></li>'
	+ '<li role="presentation"><a id = "creditsBtn" role="menuitem" tabindex="-1" style = "cursor: pointer;"  data-toggle="modal" data-target="#creditsModal">Credits</a></li>'
	+ '</ul>';
	/*$("#extraInfo").popover({'placement': 'bottom', 'html': true, 'content': extraInfohtml});
	$("#extraInfo").on("click", function() {
		console.log("swag");
		var popoverRight = $(".popover").offset().left + $(".popover").width();
		if ( popoverRight > $(window).width() ) {
			var difference = popoverRight - $(window).width();
			$(".popover").css("left",  parseInt($(".popover").css("left")) - difference - 10 );
			$(".arrow").css("left", parseInt($(".arrow").css("left")) + difference + 10);
		}
	});*/
$("#searchContainer").width($(window).width() 
	- parseInt($(".navbar-brand").css("width"))
	- parseInt($(".navbar .navbar-right").css("width")));

$("#inputContainer").width($("#searchContainer").width()
	- parseInt($(".navbar .navbar-right").css("width")) - 3);
$(window).resize(function() {
	$("#searchContainer").width($(window).width() 
		- parseInt($(".navbar-brand").css("width"))
		- parseInt($(".navbar .navbar-right").css("width")));

	$("#inputContainer").width($("#searchContainer").width()
		- parseInt($(".navbar .navbar-right").css("width")) - 3);
});





findPeople = false;
findRoutes = true;
var input = document.getElementById('routeAndFriendFinder');
autocomplete = new google.maps.places.Autocomplete(input);

$("#findPeopleBtn").on("click", function() {
	var input = document.getElementById('routeAndFriendFinder');
	findPeople = true;
	findRoutes = false;
	$("#routePeopleDropdown").html('People <span class="caret"></span>');
	$("#routeAndFriendFinder").attr("placeholder", "Find People");
	input.parentNode.replaceChild(input.cloneNode(true),input);
});

$("#findRoutesBtn").on("click", function() {
	var input = document.getElementById('routeAndFriendFinder');
	findPeople = false;
	findRoutes = true;
	$("#routePeopleDropdown").html('Routes <span class="caret"></span>');
	$("#routeAndFriendFinder").attr("placeholder", "Find Routes");
	autocomplete = new google.maps.places.Autocomplete(input);
});

function createUrlAddress(location) {
	var address = location.toString();
		// Address ex: 1600 Amphitheatre Parkway, Mountain View, CA
		var addressArray = address.split(" ");
		var urlAddress = "";
		for (var i = 0; i < addressArray.length; i++){
			if (i != addressArray.length - 1) {
				urlAddress += addressArray[i] + "+";
			} else {
				urlAddress += addressArray[i];
			}
		}
		return urlAddress;
	}

	lat = 0;
	lng = 0;
	$("#navSearchBtn").on("click", function() {
		

		if (findRoutes) {
			var location = $("#routeAndFriendFinder").val();
			var urlAddress = createUrlAddress(location);
			$.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address=' + urlAddress + '&sensor=false', function(json_data){

				var address = json_data.results[0].formatted_address;

				var latLong = json_data.results[0].geometry.location;
				lat = latLong.lat;
				lng = latLong.lng;
				console.log("lat: " + lat);
				console.log("lng: " + lng);

				window.location.href = "/route_search" + "?latitude=" + lat + "&longitude=" + lng;
			});
		} else {
			search = $('#routeAndFriendFinder').val()
			window.location.href = "/user_search" + "?search=" + search
		}
	});
}

$(document).ready(toolbarLoad);

function pageLoad1() {
	if (document.getElementById('profileContainer') != null) {
		// Backend Stuff
		// $("#name").html("Myname Mcgee");

		// Styling Javascript
		/*$("html").height($(window).height());*/

		/*$(window).resize(function() {
			$("html").height($(window).height());
		});*/

		// Functional JavaScript


	//confirmRouteLink
	$(".confirmRouteLink").append($('<span id = "profSuccessRoute" style = "color: #2eba3e; font-size: 20px; opacity: 0.5" class = "glyphicon glyphicon-ok profConfirmRoute"></span>'));
	$(".deleteRouteLink").append($('<span id = "profDeleteRoute" style = "color: #e6463d; font-size: 20px; opacity: 0.5" class = "glyphicon glyphicon-remove profDeleteRoute"></span>'));
	$(".removeRouteLink").append($('<span id = "profRemoveRoute" style = "color: #e6463d; font-size: 20px; opacity: 0.5" class = "glyphicon glyphicon-arrow-up profRemoveRoute"></span>'));
	
	$(".profDeleteRoute").on("mouseenter", function() {
		$(this).css("opacity", 1);
	});

	$(".profDeleteRoute").on("mouseleave", function() {
		$(this).css("opacity", 0.5);
	});

	function parseDateShort(rubyDate) {
		// 2014-01-28 08:25:48 UTC
		var yearMonthDay = rubyDate.substring(0, 10);
		var year = yearMonthDay.substring(0, 4);
		var month = yearMonthDay.substring(5, 7);
		var day = yearMonthDay.substring(8, 10);
		return month + "/" + day + "/" + year;
	}

	$("#toggleRouteVisualization").on("click", function() {
		var routeVisualizationContainer = $("#routeVisualizationContainer");
		if (routeVisualizationContainer.height() == 0) {
			routeVisualizationContainer.animate({"height": "500px"}, 500);
		} else {
			routeVisualizationContainer.animate({"height": "0px"}, 500);
		}

		$("#totalDistIcon").tooltip({"placement": "right"});
		$("#totalCalIcon").tooltip({"placement": "right"});
		$("#longestRunIcon").tooltip({"placement": "right"});

		$("#goalsPlus").on("click", function() {
			var buttonHeight = parseInt($("#newGoalBtn").css("height")) + parseInt($("#newGoalContainer").css("padding")) + parseInt($("#newGoalContainer").css("padding"));
			$("#newGoalContainer").css("border-top", "1px solid grey");
			$("#newGoalContainer").animate({"height": buttonHeight, "padding-bottom": "5px"}, 300);
		});


		var totalDistanceTraveled = 0;
		$("#routesToRunContainer .profRouteEntry .profRouteDistanceVal").each(function(i) {
			if ($(this).html() != "") {
				console.log($(this).html());
				totalDistanceTraveled += parseFloat($(this).html());
			}
			console.log(totalDistanceTraveled);
			
		});
		totalDistanceTraveled = Math.round(totalDistanceTraveled * 100) / 100;
		$("#totalDistanceStat").html(totalDistanceTraveled.toString() + " mi");
		visualizationData = [[]];
		longestRun = 0;
		$("#routesToRunContainer .profRouteEntry .profRouteDistanceVal").each(function(i) {
			var date = $(this).parent().parent().parent().children(".profWaypointsContainer").children(".profRouteDate").children(".profRouteDateVal").html();
			var shortDate = parseDateShort(date);
			if ($(this).html() != "") {
				console.log($(this).html());
				thisDistance = parseFloat($(this).html());
				if (thisDistance > longestRun) {
					longestRun = thisDistance;
				}
				visualizationData[0].push({"y": thisDistance, "x": shortDate});
			}
			
		});
		longestRun = Math.round(longestRun * 100) / 100;
		$("#longestRunStat").html(longestRun.toString() + " mi");

		// Route entry template


		$(".profRouteEntry").on("click", function() {
			if ( $(this).css("height") == "40px" ) {
				$(this).css("height", "auto");
			} else {
				$(this).css("height", "40px");
			}
		});


		


		$("#profPicCont").on("mouseenter", function() {
			$("#profPicCover").css("opacity", 1);
		});
		$("#profPicCont").on("mouseleave", function() {
			$("#profPicCover").css("opacity", 0);
		});

		if ($("#routesRunContainer").html() == "") {
			$("#routesRunContainer").append($("<div style = 'height: 100%; text-align: center; '>You have no routes yet.  Click the button above to get started!</div>"));
		}

		//deleteRouteLink
		$(".deleteRouteLink").append($('<span id = "profDeleteRoute" style = "color: #e6463d; font-size: 20px; opacity: 0.5" class = "glyphicon glyphicon-remove profDeleteRoute"></span>'))
		
		$(".profDeleteRoute").on("mouseenter", function() {
			$(this).css("opacity", 1);
		});


		$(".profDeleteRoute").on("mouseleave", function() {
			$(this).css("opacity", 0.5);
		});

		$("#toggleRouteVisualization").on("click", function() {
			var routeVisualizationContainer = $("#routeVisualizationContainer");
			if (routeVisualizationContainer.height() == 0) {
				routeVisualizationContainer.animate({"height": "500px"}, 500);
			} else {
				routeVisualizationContainer.animate({"height": "0px"}, 500);
			}
		});




		var outerWidth = $("#routeVisualizationContainer").width();
		var outerHeight = 500;
		
		var margin = {top: 40, right: 20, bottom: 80, left: 80};
		
		var chartWidth = outerWidth - margin.left - margin.right;
		var chartHeight = outerHeight - margin.top - margin.bottom;
		
		var stack = d3.layout.stack();
		//var stack = d3.layout.partition(); //left it as stack for simplicity
		var stackedData = stack(visualizationData);
		
		var yStackMax = d3.max(stackedData, function(layer){return d3.max(layer, function(d){return d.y + d.y0;});});
		
		var yGroupMax = d3.max(stackedData, function(layer){return d3.max(layer, function(d){return d.y;});});
		
		var xScale = d3.scale.ordinal().domain(d3.range(visualizationData[0].length)).rangeBands([0, chartWidth]);
		var yScale = d3.scale.linear().domain([0, yStackMax]).range([chartHeight, 0]);
		
		
		var grouped = false;

		var topIndex = 3;


		var chart = d3
		.select("#routeVisualizationContainer") // equivalent to jQuery $("") selector
		.append("svg") // Here we are appending divs to what we selected
		.attr("class", "chart").attr("height", outerHeight).attr("width",outerWidth)
		.append("g") // group element
		.attr("transform", "translate(" + margin.left + "," + margin.top +")")
		//.on("click", function(){ grouped ? shrinkWindow() : expandWindow();});
		 // Same as jQuery

		// adds lines
		chart.selectAll("line").data(yScale.ticks(10)).enter().append("line")
		.attr("x1", 0).attr("x2", chartWidth).attr("y1", yScale).attr("y2", yScale);

		// adds labels to y axis
		console.log(yScale.ticks(10));
		console.log([visualizationData[0][0]["x"], visualizationData[0][1]["x"]]);
		console.log("yScale: ", yScale);

		chart.selectAll("text").data([visualizationData[0][0]["x"], visualizationData[0][visualizationData[0].length - 1]["x"]]).enter().append("text")
		.attr("class", "xScaleLabel")
		.attr("x", function(d, i){console.log("i: " + i); if (i == 0) {return 101; } else {return 675; }})
		.attr("y", 460)
		.attr("dx", "0.3em")
		.attr("dy", -margin.bottom/visualizationData[0].length)
		.attr("text-anchor", "end")
		.text(String);

		chart.selectAll("text").data(yScale.ticks(10)).enter().append("text")
		.attr("class", "yScaleLabel")
		.attr("x", 0)
		.attr("y", yScale)
		.attr("dx", -margin.left/8)
		.attr("dy", "0.3em")
		.attr("text-anchor", "end")
		.text(String);



		var layerGroups = chart.selectAll(".layer").data(stackedData).enter()
		.append("g")
		.attr("class", "layer");

		chart.append("g")
		  .attr("class", "y axis")
		  .call(yScale)
		.append("text")
		  .attr("transform", "rotate(-90)")
		  .attr("y", 6)
		  .attr("dy", "-55px")
		  .attr("dx", "-150px")
		  .style("text-anchor", "end")
		  .text("Miles Run");

		for (var i; i<=3; i++){
			chart.selectAll(".layer").attr("class", "layer" + i);
		}

		var rects = layerGroups.selectAll("rect").data(function(d){ return d;}).enter().append("rect")
		.attr("x", function(d, i) {return xScale(i);})
		.attr("y", function(d) {return yScale(d.y0+d.y);})
		.attr("width", xScale.rangeBand)
		.attr("height", function(d){return yScale(d.y0) - yScale(d.y0 + d.y);})
		.attr("class", "rect");




		// Backend Stuff
		// New Stat template
			// $(".statContainer").append('<div class = "stat"><p class = "statVal">Stat goes here</p><span class = "glyphicon glyphicon-search"></span></div>');
		// New Route Template
			/*$(".routesRunContainer").append(
				'<div class = "profRouteEntry well well-sm">
							<div style = "display: inline-block; width: 49%; ">
								<p>Date: </p>
								<p>Distance Traveled: </p>
								<p>Start: </p>
								<p>End: </p>
							</div>
							<div style = "display: inline-block; width: 49%; height: 100%; position: absolute; top: 0; ">
								<legend><h4 style = "text-align: center; font-family: Sanchez Regular">Waypoints Visited:</h4></legend>
								<div class = "wptsList">
									<ol>
										<li>Place</li>
										<li>Place</li>
										<li>Place</li>
										<li>Place</li>
										<li>Place</li>
										<li>Place</li>
										<li>Place</li>
										<li>Place</li>
									</ol>
								</div>
							</div>
						</div>'
			)*/

	/*	function successClick(current) {
			var startAddress = current.parent().parent().children(".profRunRouteInfo").children(".profRouteStart").children("span").html();
			var endAddress = current.parent().parent().children(".profRunRouteInfo").children(".profRouteEnd").children("span").html();
			var wptAddresses = [];
			current.parent().parent().children(".profWaypointsContainer").children(".wptsList").children("ol").children("li").each(function() {
				wptAddresses.push(current.html());
			});
			console.log(startAddress, endAddress, wptAddresses);

			
	// 		var currentRoute = current.parent().parent();
	// 		current.remove();
	// 		currentRoute.children(".profConfirmOrDeny").children(".profDeleteRoute").attr("id", "profRemoveRoute");
			
	// 		currentRoute.remove();
	// 		$("#routesRunContainer").append(currentRoute);

	// 		$(".profRouteEntry").on("click", function() {
	// 			if ( $(this).css("height") == "40px" ) {
	// 				$(this).css("height", "auto");
	// 			} else {
	// 				$(this).css("height", "40px");
	// 			}
	// 		});

	// 		$("#profRemoveRoute").on("click", function() {
	// 			removeClick($(this));
	// 		});

	// 		// backend stuff goes here, use startAddress, endAddress, and wptAddresses //
	// 	}*/

		
	// 	/*function deleteClick(current) {
	// 		var startAddress = current.parent().parent().children(".profRunRouteInfo").children(".profRouteStart").children("span").html();
	// 		var endAddress = current.parent().parent().children(".profRunRouteInfo").children(".profRouteEnd").children("span").html();
	// 		var wptAddresses = [];
	// 		current.parent().parent().children(".profWaypointsContainer").children(".wptsList").children("ol").children("li").each(function() {
	// 			wptAddresses.push($(this).html());
	// 		});
	// 		console.log(wptAddresses);
	// 		var currentRoute = current.parent().parent();

	// 		currentRoute.remove();

	// 		$("#profDeleteRoute").on("click", function() {
	// 			deleteClick($(this));
	// 		}); */

	// 		/*$(".profRouteEntry").on("click", function(route) {
	// 			if ( route.css("height") == "40px" ) {
	// 				route.css("height", "auto");
	// 			} else {
	// 				route.css("height", "40px");
	// 			}
	// 		});*/

	// 		// backend stuff goes here, use startAddress, endAddress, and wptAddresses
	// 		/*$.ajax({
	// 			beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
	// 			url: '/homepage_post',
	// 			type: 'POST',
	// 			data: {
	// 				"start": startAddress,
	// 				"end": endAddress,
	// 				"wptAddress": wptAddresses
	// 			},
	// 			dataType: "json",
	// 			success: function(data, textStatus){
	// 				console.log("deletion twerked")
	// 			},
	// 			error: function(){
	// 				console.log("did not delete...");
	// 			}
	// 		}); 

	// 	} */

	// /*	function removeClick(current) {
	// 		var startAddress = current.parent().parent().children(".profRunRouteInfo").children(".profRouteStart").children("span").html();
	// 		var endAddress = current.parent().parent().children(".profRunRouteInfo").children(".profRouteEnd").children("span").html();
	// 		var wptAddresses = [];
	// 		current.parent().parent().children(".profWaypointsContainer").children(".wptsList").children("ol").children("li").each(function() {
	// 			wptAddresses.push(current.html());
	// 		});
	// 		console.log(startAddress, endAddress, wptAddresses);
	// 		var currentRoute = current.parent().parent();
	// 		currentRoute.children(".profConfirmOrDeny").html('<span id = "profSuccessRoute" style = "color: #2eba3e; font-size: 20px; opacity: 0.5" class = "glyphicon glyphicon-ok profConfirmRoute"></span><span id = "profDeleteRoute" style = "color: #e6463d; font-size: 20px; opacity: 0.5" class = "glyphicon glyphicon-remove profDeleteRoute"></span>');
	// 		currentRoute.remove();
	// 		$("#routesToRunContainer").append(currentRoute);

	// 		$(".profRouteEntry").on("click", function() {
	// 			if ( $(this).css("height") == "40px" ) {
	// 				$(this).css("height", "auto");
	// 			} else {
	// 				$(this).css("height", "40px");
	// 			}
	// 		});

	// 		$("#profSuccessRoute").on("click", function() {
	// 			successClick($(this));
	// 		});

	// 		$("#profDeleteRoute").on("click", function() {
	// 			deleteClick($(this));
	// 		});

	// 		// backend stuff goes here, use startAddress, endAddress, and wptAddresses
	// 	}*/
	// /*	$("#profSuccessRoute").on("click", function() {
	// 		successClick($(this));
	// 	});*/

	// 	/*$("#profDeleteRoute").on("click", function() {
	// 		deleteClick($(this));
	// 	});*/

	// /*	$("#profRemoveRoute").on("click", function() {
	// 		removeClick($(this));
	// 	});*/
	}
}

$(document).on("page:load", pageLoad1);
$(document).ready(pageLoad1);
	

function pageLoad2() {
	if (document.getElementById('map') != null) {
		/**** Styling JavaScript ***/
		$("#map").css("height", ($(window).height() - $(".navbar").height));
		console.log("mapHeight: " + $("#map").height());
		$("#locList").css("height", ($(window).height() - $(".navbar").height));

		$("#map").height($(window).height() - $(".navbar").height);
		$("#locList").height($(window).height() - $(".navbar").height);

		var map = null;
		var rendererOptions = {map: map, draggable: true};

		directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);

		function initialize() {
			var mapOptions = {
				center: new google.maps.LatLng(51.505, -0.09),
				zoom: 15
			};
			map = new google.maps.Map(document.getElementById("map"), mapOptions);
			if (navigator.geolocation) {
			     navigator.geolocation.getCurrentPosition(function (position) {
			         initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			         map.setCenter(initialLocation);
			     });
			 }

		}


		function createUrlAddress(location) {
			var address = location.toString();
			// Address ex: 1600 Amphitheatre Parkway, Mountain View, CA
			var addressArray = address.split(" ");
			var urlAddress = "";
			for (var i = 0; i < addressArray.length; i++){
				if (i != addressArray.length - 1) {
					urlAddress += addressArray[i] + "+";
				} else {
					urlAddress += addressArray[i];
				}
			}
			return urlAddress;
		}

		initialize();

		// Order buttons
		// $("#orderBtnDropdown").css("width", $("#orderBtnDropdown").width() + 28);
		customOrder = true;
		autoOrder = false;
		shortestPathOrder = false;


		$("#customOrderBtn").on("click", function() {
			customOrder = true;
			autoOrder = false;
			shortestPathOrder = false;
			$("#orderBtnDropdown").html('Order: Custom <span class="caret" style = "border-top: 4px solid white"></span>');
			$("#desiredDistanceCont").remove();
			$("#routeList").css("height", "-moz-calc(100% - 70px - 50px - 20px - 36px - 47px - 32px)");
			$("#routeList").css("height", "-webkit-calc(100% - 70px - 50px - 20px - 36px - 47px - 32px)");
			$("#routeList").css("height", "-o-calc(100% - 70px - 50px - 20px - 36px - 47px - 32px)");
			$("#routeList").css("height", "calc(100% - 70px - 50px - 20px - 36px - 47px - 32px)");
		});
		
		$("#autoOrderBtn").on("click", function() {
			customOrder = false;
			autoOrder = true;
			shortestPathOrder = false;
			$("#orderBtnDropdown").html('Order: Auto <span class="caret" style = "border-top: 4px solid white"></span>');
			var desiredDistanceCont = $("<div id = 'desiredDistanceCont' style = 'font-size: 14pt; padding: 10px;'>Desired Distance: <input placeholder = 'Distance in miles' id = 'desiredLength' class = '' style = 'font-size: 15px; float: right; width: 50%;'></input></div>")
			$("#routeList").after(desiredDistanceCont);
			$("#routeList").css("height", "-moz-calc(100% - 70px - 50px - 20px - 36px - 47px - 32px - 47px)");
			$("#routeList").css("height", "-webkit-calc(100% - 70px - 50px - 20px - 36px - 47px - 32px - 47px)");
			$("#routeList").css("height", "-o-calc(100% - 70px - 50px - 20px - 36px - 47px - 32px - 47px)");
			$("#routeList").css("height", "calc(100% - 70px - 50px - 20px - 36px - 47px - 32px - 47px)");
		});
		
		$("#shortestPathOrderBtn").on("click", function() {
			customOrder = false;
			autoOrder = false;
			shortestPathOrder = true;
			$("#orderBtnDropdown").html('Order: Shortest Path <span class="caret" style = "border-top: 4px solid white"></span>');
			$("#desiredDistanceCont").remove();
			$("#routeList").css("height", "-moz-calc(100% - 70px - 50px - 20px - 36px - 47px - 32px)");
			$("#routeList").css("height", "-webkit-calc(100% - 70px - 50px - 20px - 36px - 47px - 32px)");
			$("#routeList").css("height", "-o-calc(100% - 70px - 50px - 20px - 36px - 47px - 32px)");
			$("#routeList").css("height", "calc(100% - 70px - 50px - 20px - 36px - 47px - 32px)");
		});


		// Add autocomplete
		var input = document.getElementById('input'); 
		var buttons = document.getElementById('buttonContainer');
		map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
		map.controls[google.maps.ControlPosition.TOP_LEFT].push(buttons);
		var autocomplete = new google.maps.places.Autocomplete(input);
		autocomplete.bindTo('bounds', map);
		var infowindow = new google.maps.InfoWindow();
		
		marker = new google.maps.Marker({
			map:map
		});

		google.maps.event.addListener(autocomplete, 'place_changed', function() {
		    infowindow.close();
		    if (marker != null) {
		    	marker.setVisible(false);
		    }
		    marker = new google.maps.Marker({
				map:map
			});
		    
		    var place = autocomplete.getPlace();
		    if (!place.geometry) {
		      return;
		    }

		    // If the place has a geometry, then present it on a map.
		    if (place.geometry.viewport) {
		      map.fitBounds(place.geometry.viewport);
		    } else {
		      map.setCenter(place.geometry.location);
		      map.setZoom(17);  // Why 17? Because it looks good.
		    }
		    var pinColor = "e6463d";  // red
			if (Object.keys(markerDict).length == 0) {
				pinColor = "2eba3e"; // green
			}
		    marker.setIcon(/** @type {google.maps.Icon} */({
		      url: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
		      size: new google.maps.Size(21, 34),
		      origin: new google.maps.Point(0, 0),
		      anchor: new google.maps.Point(10, 34)
		    }));
		    marker.setPosition(place.geometry.location);
		    marker.setVisible(true);

		    var address = '';
		    if (place.address_components) {
		      address = [
		        (place.address_components[0] && place.address_components[0].short_name || ''),
		        (place.address_components[1] && place.address_components[1].short_name || ''),
		        (place.address_components[2] && place.address_components[2].short_name || '')
		      ].join(' ');
		    }

		    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
		    infowindow.open(map, marker);
	  	});

		var existingMarker = null;
		// Map click listener
		google.maps.event.addListener(map, 'click', function(e) {
			addLocation(e.latLng);
		});

		markerDict = {};
		randomLocationsArray = {};
		function addLocation(location) {
			var urlAddress = createUrlAddress(location);
			$.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address=' + urlAddress + '&sensor=false', function(json_data){

				var address = json_data.results[0].formatted_address;

				var latLong = json_data.results[0].geometry.location;
				var lat = latLong.lat;
				var lng = latLong.lng;


				$("#input").val(address.toString());
				if (marker != null) {
					marker.setMap(null);
					marker = null;
				}			

				var pinColor = "e6463d";  // red
				if (Object.keys(markerDict).length == 0) {
					pinColor = "2eba3e"; // green
				}

				var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
			        new google.maps.Size(21, 34),
			        new google.maps.Point(0,0),
			        new google.maps.Point(10, 34));

				marker = new google.maps.Marker({
					position: new google.maps.LatLng(lat, lng),
					map: map,
					icon: pinImage,
				});
				$("#addPointBtn").click();
			});	
		}

		$("#createLoopBtn").on("click", function() {
			$("#input").val($("#routeEntry-A .routeInput").val());
			addLocation($("#routeEntry-A .routeInput").val());
		});

		pathArray = [];
		var letterArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
		letterIndex = 0;
		$("#addPointBtn").on("click", function() {
			if ($("#input").val() !== "") {
				var address = $("#input").val();
				var urlAddress = createUrlAddress(address);
			} else {
				console.log("No address given");
			}

			console.log("addpoint clicked");
			
			if (marker != null) {
				for (var i = 0; i < Object.keys(markerDict).length; i++) {
					var keysArray = Object.keys(markerDict);
					// var pinColor = "5B84EF"; // blue marker;
					var pinColor = "2eba3e"; // green marker;
					var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
				        new google.maps.Size(21, 34),
				        new google.maps.Point(0,0),
				        new google.maps.Point(10, 34));
				    if (keysArray[i] != "A") {
				    	markerDict[keysArray[i]].setIcon(pinImage);
				    }
				}
				
				markerDict[letterArray[letterIndex]] = marker;
				for (var i = 0; i < Object.keys(markerDict).length; i++) {
					var keysArray = Object.keys(markerDict);
					var thisMarker = markerDict[keysArray[i]];
					// thisMarker.setMap(map);
				}

				$.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address=' + urlAddress + '&sensor=false', function(json_data){
					if (json_data.results[0] === undefined) {
						alert("Could not find location; try again");
						markerDict[letterArray[letterIndex]].setMap(null);
						markerDict[letterArray[letterIndex]] = null;
						delete markerDict[letterArray[letterIndex]];
						console.log("Could not find location; try again");
					} else{
						var latLong = json_data.results[0].geometry.location;
						var lat = latLong.lat;
						var lng = latLong.lng;
						var entryClass = "";
						var letterClass = "";
						if (letterArray[letterIndex] == "A") {
							letterClass = "orgEntryLetter";
							entryClass = "orgEntry"
						} else {
							letterClass = "destEntryLetter";
							entryClass = "destEntry"
						}

						var center = new google.maps.LatLng(lat, lng);
					    map.panTo(center);

						pathArray.push([lat, lng]);
						if (pathArray.length >= 2) {
							document.getElementById("clearRoute").disabled = false;
							document.getElementById("pathCreator").disabled = false;
							document.getElementById("createLoopBtn").disabled = false;
						}

						$(".destEntryLetter").each(function() {
							$(this).attr("class", "entryLetter wptsEntryLetter")
						});
						$(".destEntry").each(function() {
							$(this).attr("class", "routeEntry wptsEntry")
						})

						var marginTop = letterIndex * 45;
						var marginTopString = marginTop.toString() + "px";

						$("#routeList").append("<div style = 'margin-top: " + marginTopString + "' class = 'routeEntry " + entryClass + "' id = 'routeEntry-" + letterArray[letterIndex] + "'></div>");
						$("#routeEntry-" + letterArray[letterIndex]).append("<div class = 'entryLetter " + letterClass + "'>" + "<span class = 'entrySpan' id = 'entrySpan-" + letterArray[letterIndex] + "' style = 'margin-top: 3px; display: block'>" + "&bull;" /*letterArray[letterIndex] */ + "</span></div>");
						entryClass = "orgEntry"
						$("#routeEntry-" + letterArray[letterIndex]).append("<input class = 'controls routeInput'>");
						$("#routeEntry-" + letterArray[letterIndex]).append("<button type = 'button' class = 'close deleteRouteEntry' style = 'margin-top: 5px; padding-left; 5px'>&times;</button>")
						
						// Delete Button
						$("#routeEntry-" + letterArray[letterIndex] + " .close").on("click", function() {
							var thisLetter = $(this).parent().attr("id").toString()[11];
							console.log(thisLetter);
							markerDict[thisLetter].setMap(null);
							markerDict[thisLetter] = null;
							delete markerDict[thisLetter];
							var index = letterArray.indexOf(thisLetter);
							pathArray.pop(index);

							// replace old info with info from new letters
							var thisLetterIndex = letterArray.indexOf(thisLetter);
							var markerKeys = Object.keys(markerDict);
							for (var i = 0; i < markerKeys.length; i++) {
								var currentLetterIndex = letterArray.indexOf(markerKeys[i]);
								var currentLetter = letterArray[currentLetterIndex];
								var prevLetter = letterArray[currentLetterIndex - 1];
								if (currentLetterIndex > thisLetterIndex) {
									markerDict[prevLetter] = markerDict[currentLetter];
									delete markerDict[currentLetter];
								}
							}
							// console.log(JSON.stringify(markerDict));

							// remove animation
							$("#routeEntry-" + thisLetter).animate({"opacity": 0}, 300, function() {
								$("#routeEntry-" + thisLetter).first().remove();
							});
							

							function animateEntriesUp() {
								var index = letterArray.indexOf(thisLetter) + 1;
								var i = index;                     //  set your counter to 1

								function myLoop () {           //  create a loop function
								   setTimeout(function () {    //  call a 3s setTimeout when the loop is called
								      	var currentLetter = letterArray[i];
										$("#routeEntry-" + currentLetter).animate(
											{"margin-top": parseInt($("#routeEntry-" + currentLetter).css("margin-top")) - 45},
											300
										);

										console.log(i);        //  your code here
										i++;                     //  increment the counter
										if (i < letterIndex) {            //  if the counter < 10, call the loop function
										 myLoop();             //  ..  again which will trigger another 
										} else {
											var newIndex = letterArray.indexOf(thisLetter) + 1;
											for (var j = newIndex; j < letterIndex; j++) {
												var currentLetter = letterArray[j];
												$("#routeEntry-" + currentLetter).attr("id", "routeEntry-" + letterArray[j-1]);
											}
											letterIndex--;
										}                     //  ..  setTimeout()
								   }, 150)
								}

								myLoop();  
							}

							setTimeout(animateEntriesUp(), 150);


						});
						
						$("#routeEntry-" + letterArray[letterIndex] + " .routeInput").val(address.toString());
						letterIndex++;

						// Remember that when deleting an element, you should also change the id of all the elements in front of it
					}
					
					
				});		
				marker = null;
			} else {
				alert("Invalid Point");
				console.log("marker is null");
			}
		});

		routeInfoArray = [];
		distance = 0;
		distanceString = "";

		function computeTotalDistance(result) {
		  var total = 0;
		  var myroute = result.routes[0];
		  for (var i = 0; i < myroute.legs.length; i++) {
		    total += myroute.legs[i].distance.value;
		  }
		  distance = Math.round(total * 0.000621371 * 100) / 100;
		  document.getElementById('routeLength').innerHTML = distance + ' mi';
		}

		$("#pathCreator").on("click", function() {
			// get rid of markers on map (replaced by )


			var org = null;
			var dest = null;
			var wpts = [];
			var newPathArray = [];
			var rendererOptions = { 
				map: map, draggable: true
			};
			directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
			directionsDisplay.setPanel(document.getElementById('directionsList'));
			google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
				console.log("changed route");
				computeTotalDistance(directionsDisplay.getDirections());
			});
			

			$(".orgEntryLetter .entrySpan").html("A");
			$(".destEntryLetter .entrySpan").html(letterArray[letterIndex - 1]);

			$(".routeInput").each(function(j) {
				(function(j) {
					var address = $("#routeEntry-" + letterArray[j] + " .routeInput").val();
					console.log("address: " + address);
					var urlAddress = createUrlAddress(address);
					$.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address=' + urlAddress + '&sensor=false', function(json_data){
						console.log("j: " + j);
						var latLong = json_data.results[0].geometry.location;
						var lat = latLong.lat;
						var lng = latLong.lng;

						if (j == 0) {
							org = new google.maps.LatLng(lat, lng);
						} else if (j == pathArray.length - 1) {
							dest = new google.maps.LatLng(lat, lng);
							console.log("dest: " + dest);
						} else {
							wpts.push({
								location: new google.maps.LatLng(lat, lng),
								stopover: true
							});
						}

						
						if (shortestPathOrder == true) {
							if (dest != null) {

								for (var i = 0; i < Object.keys(markerDict).length; i++) {
									var keysArray = Object.keys(markerDict);
								    markerDict[keysArray[i]].setMap(null);
								}

								$(".entrySpan").each(function() {
									$(this).html("");
								});

								var request = {
									origin: org,
									destination: dest,
									waypoints: wpts,
									optimizeWaypoints: true,
									travelMode: google.maps.DirectionsTravelMode.WALKING
								};
								directionsService = new google.maps.DirectionsService();
								directionsService.route(request, function(response, status) {
									if (status == google.maps.DirectionsStatus.OK) {
										console.log("success");
										directionsDisplay.setDirections(response);
										var wptsOrder = response["routes"][0]["waypoint_order"];
										var legsArray = response["routes"][0]["legs"];
										var distanceInMeters = 0;
										for (var i in legsArray){
											var legDistance = parseFloat(legsArray[i]["distance"]["value"]);
											distanceInMeters += legDistance;
										}
										distance = Math.round(distanceInMeters * 0.000621371 * 100) / 100;
										$("#routeLength").html(distance.toString() + " mi");
										distanceString = distance.toString() + " mi";
										
										// create routeInfoArray
										if (routeInfoArray.length == 0) {
											for (var i in pathArray) {
												var currentLetter = letterArray[i];
												var address = $("#routeEntry-" + currentLetter + " input").val();
												var thisLat = pathArray[i][0]
												var thisLng = pathArray[i][1];
												var routeInfoEntry = [address, thisLat, thisLng];
												routeInfoArray.push(routeInfoEntry);
												console.log("routeInfoArray being created: ", routeInfoArray);
											}	
										}
										var lastLetter = letterArray[letterIndex - 1];
										console.log(routeInfoArray);
										// insert animation here
										for (var j = 0; j < wptsOrder.length; j++) {
											// [1, 2, 0]
											var thisLetterIndex = j + 1;
											var wptIndex = wptsOrder[j];
											var letterToChangeIndex = wptsOrder[j] + 1;
											var thisLetter = letterArray[thisLetterIndex];

											var letterToChange = letterArray[letterToChangeIndex];

											var newMarginTop = thisLetterIndex * 45;
											var newMarginTopString = newMarginTop.toString();
											var newMarginTopPxString = newMarginTopString + "px";

											console.log(newMarginTopPxString);
											$("#routeEntry-" + letterToChange).animate({"margin-top": newMarginTopPxString}, 500);
											$("#routeEntry-" + letterToChange + " .entrySpan").html(thisLetter);
											$("#routeEntry-" + letterToChange).attr("id", "#routeEntry-" + thisLetter);

										}

										for (var i = 0; i < letterIndex; i++) {
											$("#routeEntry-" + letterArray[i] + " .entrySpan").html(letterArray[i]);
										}
										document.getElementById("createRouteBtn").disabled = false;
										$(".deleteRouteEntry").css("display", "none");
										marker.setMap(null);
										marker = null;
									} else {
										alert('failed to get directions');
									}
								});
							}
						} else if (customOrder == true) {
							if (dest != null) {

								for (var i = 0; i < Object.keys(markerDict).length; i++) {
									var keysArray = Object.keys(markerDict);
								    markerDict[keysArray[i]].setMap(null);
								}

								$(".entrySpan").each(function() {
									$(this).html("");
								});

								var request = {
									origin: org,
									destination: dest,
									waypoints: wpts,
									optimizeWaypoints: false,
									travelMode: google.maps.DirectionsTravelMode.WALKING
								};
								directionsService = new google.maps.DirectionsService();
								directionsService.route(request, function(response, status) {
									if (status == google.maps.DirectionsStatus.OK) {
										console.log("success");
										directionsDisplay.setDirections(response);

										var legsArray = response["routes"][0]["legs"];
										var distanceInMeters = 0;
										for (var i in legsArray){
											var legDistance = parseFloat(legsArray[i]["distance"]["value"]);
											distanceInMeters += legDistance;
										}
										distance = Math.round(distanceInMeters * 0.000621371 * 100) / 100;
										distanceString = distance.toString() + " mi";
										$("#routeLength").html(distance.toString() + " mi");

										// create routeInfoArray
										if (routeInfoArray.length == 0) {
											for (var i in pathArray) {
												var currentLetter = letterArray[i];
												var address = $("#routeEntry-" + currentLetter + " input").val();
												var thisLat = pathArray[i][0]
												var thisLng = pathArray[i][1];
												var routeInfoEntry = [address, thisLat, thisLng];
												routeInfoArray.push(routeInfoEntry);
												console.log("routeInfoArray being created: ", routeInfoArray);
											}	
										}
										var lastLetter = letterArray[letterIndex - 1];
										console.log("routeInfoArray: ", routeInfoArray);

										for (var i = 0; i < letterIndex; i++) {
											$("#routeEntry-" + letterArray[i] + " .entrySpan").html(letterArray[i]);
										}
									document.getElementById("createRouteBtn").disabled = false;
									$(".deleteRouteEntry").css("display", "none");
									} else {
										alert('failed to get directions');
									}
								});
							}
						}/* else if (autoOrder) {
							if (isNaN(parseFloat($("#desiredLength").val()))) {
								alert("Invalid desired distance");
								console.log("Invalid desired distance");
							} else {
								for (var i = 0; i < Object.keys(markerDict).length; i++) {
									var keysArray = Object.keys(markerDict);
								    markerDict[keysArray[i]].setMap(null);
								}

								$(".entrySpan").each(function() {
									$(this).html("");
								});
							}
						}*/
					});
				})(j);
			});
		});

		$("#clearRoute").on("click", function() {
			$("#routeList").html("");
			// Set markers to null and remove them
			pathArray = [];

			var markerKeys = Object.keys(markerDict);
			for (var i in markerKeys) {
				var key = markerKeys[i];
				markerDict[key].setMap(null);
				markerDict[key] = null;
			}
			markerDict = {};
			
			document.getElementById("clearRoute").disabled = true;
			document.getElementById("pathCreator").disabled = true;
			document.getElementById("createRouteBtn").disabled = true;
			document.getElementById("createLoopBtn").disabled = true;
			$("#routeLength").html("0 mi");
			$("#directionsList").html("");

			$(".deleteRouteEntry").css("display", "block");

			directionsDisplay.setMap(null);
			letterIndex = 0;

			marker = new google.maps.Marker({
				map:map
			});
			routeInfoArray = [];
		});

		$("#confirmRouteBtn").on("click", function() {
			// insert backend stuff here
			// send route data to server
			// go to profile page and highlight their new route

			//DO CHECKING FOR REPEATED SENDS AND PREVENT BAD BAD INFO SENDING
			var routeName = $("#routeNameInput").val();
			$.ajax({
				beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
				url: '/routeplanner_post',
				type: 'POST',
				data: {
					"name": routeName,
					"locations": routeInfoArray,
					"distance": distanceString
				},
				dataType: "json",
				success: function(data, textStatus){
					if (data.redirect) {
						window.location.href = data.redirect;
					} else {
						console.log("redirect failed");
					}
				},
				error: function(){
					console.log("it no twerked...");
				}
			});
		});

		// Informative Tooltips
		
		$("#addPointBtn").tooltip({"placement": "bottom", "title": "Adds location in input box to route"});
		$("#createLoopBtn").tooltip({"placement": "bottom", "title": "Makes a new point, which is the same as your first point"});
		$("#orderBtnDropdown").tooltip({"placement": "top", "title": "Choose how you'd like the waypoints ordered"});
		$("#clearRoute").tooltip({"placement": "top", "title": "Clears all entries in your current route"});
		$("#pathCreator").tooltip({"placement": "left", "title": "Shows you what your route looks like"});
		$("#createRouteBtn").tooltip({"placement": "left", "title": "Confirm that you want to submit this route to your profile"});

	}	
}


$(document).on("page:load", pageLoad2);
$(document).ready(pageLoad2);

// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//


;
