(function ($) {
  var MdbAutocomplete =
  /*#__PURE__*/
  function () {
    function MdbAutocomplete(input, options) {
      this.defaults = {
        data: {},
        dataColor: '',
        closeColor: '#4285f4',
        closeBlurColor: '#ced4da',
        inputFocus: '1px solid #4285f4',
        inputBlur: '1px solid #ced4da',
        inputFocusShadow: '0 1px 0 0 #4285f4',
        inputBlurShadow: '',
        visibleOptions: 5
      };
      this.enterCharCode = 13;
      this.homeCharCode = 36;
      this.endCharCode = 35;
      this.arrowUpCharCode = 38;
      this.arrowDownCharCode = 40;
      this.count = -1;
      this.nextScrollHeight = -45;
      this.$input = input;
      this.options = this.assignOptions(options);
      this.$clearButton = this.$input.next('.mdb-autocomplete-clear');
      this.$autocompleteWrap = $('<ul class="mdb-autocomplete-wrap"></ul>');
    }

    var _proto = MdbAutocomplete.prototype;

    _proto.init = function init() {
      this.handleEvents();
    };

    _proto.handleEvents = function handleEvents() {
      this.setData();
      this.inputFocus();
      this.inputBlur();
      this.inputKeyupData();
      this.inputLiClick();
      this.clearAutocomplete();
      this.setAutocompleteWrapHeight();
    };

    _proto.assignOptions = function assignOptions(options) {
      return $.extend({}, this.defaults, options);
    };

    _proto.setAutocompleteWrapHeight = function setAutocompleteWrapHeight() {
      this.$autocompleteWrap.css('max-height', this.options.visibleOptions * 45 + "px");
    };

    _proto.setData = function setData() {
      if (Object.keys(this.options.data).length) {
        this.$autocompleteWrap.insertAfter(this.$input);
      }
    };

    _proto.inputFocus = function inputFocus() {
      var _this = this;

      this.$input.on('focus', function () {
        _this.changeSVGcolors();

        _this.$input.css('border-bottom', _this.options.inputFocus);

        _this.$input.css('box-shadow', _this.options.inputFocusShadow);
      });
    };

    _proto.inputBlur = function inputBlur() {
      var _this2 = this;

      this.$input.on('blur', function () {
        _this2.$input.css('border-bottom', _this2.options.inputBlur);

        _this2.$input.css('box-shadow', _this2.options.inputBlurShadow);
      });
    };

    _proto.inputKeyupData = function inputKeyupData() {
      var _this3 = this;

      this.$input.on('keyup', function (e) {
        if (e.which === _this3.enterCharCode) {
          if (!_this3.options.data.includes(_this3.$input.val())) {
            _this3.options.data.push(_this3.$input.val());
          }

          _this3.$autocompleteWrap.find('.selected').trigger('click');

          _this3.$autocompleteWrap.empty();

          _this3.inputBlur();

          _this3.count = -1;
          _this3.nextScrollHeight = -45;
          return _this3.count;
        }

        var $inputValue = _this3.$input.val();

        _this3.$autocompleteWrap.empty();

        if ($inputValue.length) {
          _this3.appendOptions(_this3.options.data, $inputValue);

          var $ulList = _this3.$autocompleteWrap;

          var $ulItems = _this3.$autocompleteWrap.find('li');

          var nextItemHeight = $ulItems.eq(_this3.count).outerHeight();
          var previousItemHeight = $ulItems.eq(_this3.count - 1).outerHeight();

          if (e.which === _this3.homeCharCode) {
            _this3.homeHandler($ulList, $ulItems);
          }

          if (e.which === _this3.endCharCode) {
            _this3.endHandler($ulList, $ulItems);
          }

          if (e.which === _this3.arrowDownCharCode) {
            _this3.arrowDownHandler($ulList, $ulItems, nextItemHeight);
          } else if (e.which === _this3.arrowUpCharCode) {
            _this3.arrowUpHandler($ulList, $ulItems, nextItemHeight, previousItemHeight);
          }

          if ($inputValue.length === 0) {
            _this3.$clearButton.css('visibility', 'hidden');
          } else {
            _this3.$clearButton.css('visibility', 'visible');
          }

          _this3.$autocompleteWrap.children().css('color', _this3.options.dataColor);
        } else {
          _this3.$clearButton.css('visibility', 'hidden');
        }
      });
    };

    _proto.endHandler = function endHandler($ulList, $ulItems) {
      this.count = $ulItems.length - 1;
      this.nextScrollHeight = $ulItems.length * 45 - 45;
      $ulList.scrollTop($ulItems.length * 45);
      $ulItems.eq(-1).addClass('selected');
    };

    _proto.homeHandler = function homeHandler($ulList, $ulItems) {
      this.count = 0;
      this.nextScrollHeight = -45;
      $ulList.scrollTop(0);
      $ulItems.eq(0).addClass('selected');
    };

    _proto.arrowDownHandler = function arrowDownHandler($ulList, $ulItems, nextItemHeight) {
      if (this.count > $ulItems.length - 2) {
        this.count = -1;
        $ulItems.scrollTop(0);
        this.nextScrollHeight = -45;
        return;
      } else {
        this.count++;
      }

      this.nextScrollHeight += nextItemHeight;
      $ulList.scrollTop(this.nextScrollHeight);
      $ulItems.eq(this.count).addClass('selected');
    };

    _proto.arrowUpHandler = function arrowUpHandler($ulList, $ulItems, nextItemHeight, previousItemHeight) {
      if (this.count < 1) {
        this.count = $ulItems.length;
        $ulList.scrollTop($ulList.prop('scrollHeight'));
        this.nextScrollHeight = $ulList.prop('scrollHeight') - nextItemHeight;
      } else {
        this.count--;
      }

      this.nextScrollHeight -= previousItemHeight;
      $ulList.scrollTop(this.nextScrollHeight);
      $ulItems.eq(this.count).addClass('selected');
    };

    _proto.appendOptions = function appendOptions(data, $inputValue) {
      for (var item in data) {
        if (data[item].toLowerCase().indexOf($inputValue.toLowerCase()) !== -1) {
          var option = $("<li>" + data[item] + "</li>");
          this.$autocompleteWrap.append(option);
        }
      }
    };

    _proto.inputLiClick = function inputLiClick() {
      var _this4 = this;

      this.$autocompleteWrap.on('click', 'li', function (e) {
        e.preventDefault();

        _this4.$input.val($(e.target).text());

        _this4.$autocompleteWrap.empty();
      });
    };

    _proto.clearAutocomplete = function clearAutocomplete() {
      var _this5 = this;

      this.$clearButton.on('click', function (e) {
        e.preventDefault();
        _this5.count = -1;
        _this5.nextScrollHeight = -45;
        var $this = $(e.currentTarget);
        $this.parent().find('.mdb-autocomplete').val('');
        $this.css('visibility', 'hidden');

        _this5.$autocompleteWrap.empty();

        $this.parent().find('label').removeClass('active');
      });
    };

    _proto.changeSVGcolors = function changeSVGcolors() {
      var _this6 = this;

      if (this.$input.hasClass('mdb-autocomplete')) {
        this.$input.on('keyup', function (e) {
          _this6.fillSVG(e, _this6.options.closeColor);
        });
        this.$input.on('blur', function (e) {
          _this6.fillSVG(e, _this6.options.closeBlurColor);
        });
      }
    };

    _proto.fillSVG = function fillSVG(e, color) {
      e.preventDefault();
      $(e.target).parent().find('.mdb-autocomplete-clear').find('svg').css('fill', color);
    };

    return MdbAutocomplete;
  }();

  $.fn.mdbAutocomplete = function (options) {
    return this.each(function () {
      var mdbAutocomplete = new MdbAutocomplete($(this), options);
      mdbAutocomplete.init();
    });
  };
})(jQuery);