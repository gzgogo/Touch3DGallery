/**
 * jquery.gallery.js
 * http://www.codrops.com
 *
 * Copyright 2011, Pedro Botelho / Codrops
 * Free to use under the MIT license.
 *
 * Date: Mon Jan 30 2012
 */

(function() {
  /*
   * Gallery object.
   */
  var Gallery = function( element, options ) {

    if (!options) {
      options = {
        currentIndex : 0,	// index of current item
        autoPlay : false, // slideshow on / off
        interval : 2000   // time between transitions
      };
    }

    this.el	= element;
    this.options = options;

    this._init();
  };

  Gallery.prototype 	= {
    _init: function( options ) {
      // this.support3d		= true;
      // this.support2d		= Modernizr.csstransforms;
      this.supportTrans	= true;

      this.wrapperElement		= this.el.getElementsByClassName('item-wrapper')[0];
      this.itemElements			= this.wrapperElement.getElementsByClassName('item');
      this.itemsCount		= this.itemElements.length;
      this.itemWidth  = this.itemElements[0].offsetWidth;

      // console.log(this.$el.find('.item'));
      // console.log(this.$wrapper.children());

      this.currentIndex		= this.options.current || 0;

      this.isAnim			= false;

      styleElements(this.itemElements, {
        'opacity'	: 0,
        'visibility': 'hidden'
      });

      this._validate();

      this._layout();

      // load the events
      this._loadEvents();

      // slideshow
      if( this.options.autoplay ) {
        this._startSlideshow();
      }
    },

    _validate: function() {
      if( this.options.current < 0 || this.options.current > this.itemsCount - 1 ) {
        this.current = 0;
      }
    },

    _layout: function() {

      // current, left and right items
      this._setItems();

      // current item is not changed
      // left and right one are rotated and translated
      var leftCSS, rightCSS, currentCSS, transform, leftTransformValue, rightTransformValue;

      transform = {
        'translateX' : -this.itemWidth + 'px',
        'translateZ' : '-200px',
        'rotateY'    : '45deg'
      };

      leftTransformValue = this._getTransformValue(transform);

      transform['translateX'] = this.itemWidth + 'px';
      transform['rotateY'] = '-45deg';
      rightTransformValue = this._getTransformValue(transform);

      leftCSS = {
        opacity: 1,
        visibility: 'visible',
        webkitTransform: leftTransformValue
      };
      rightCSS = {
        opacity: 1,
        visibility: 'visible',
        webkitTransform: rightTransformValue
      };
      currentCSS = {
        opacity: 1,
        visibility: 'visible'
      };

      // console.log('leftCSS: ' + leftCSS);
      // console.log(leftCSS);
      // console.log('rightCSS: ' + rightCSS);
      // console.log(rightCSS);

      styleElements(this.leftElement, leftCSS);
      styleElements(this.rightElement, rightCSS);
      styleElements(this.currentElement, currentCSS);

      this.currentElement.classList.add('dg-center');
    },

    _setItems: function() {
      // this.$items.removeClass('dg-center');
      for (var i = 0; i < this.itemElements.length; i++) {
        var itemElement = this.itemElements[i];
        itemElement.classList.remove('dg-center');
      }

      this.leftIndex = ( this.currentIndex === 0 ) ? this.itemsCount - 1 : this.currentIndex - 1;
      this.rightIndex = ( this.currentIndex === this.itemsCount - 1 ) ? 0 : this.currentIndex + 1;

      this.currentElement	= this.itemElements[this.currentIndex];
      this.leftElement		= this.itemElements[this.leftIndex];
      this.rightElement		= this.itemElements[this.rightIndex];

      // next & previous items
      if( this.itemsCount > 3 ) {

        // next item
        this.nextElement		= ( this.rightIndex === this.itemsCount - 1 ) ? this.itemElements[0] : this.itemElements[this.rightIndex + 1];
        styleElements(this.nextElement, this._getCoordinates('outright'));

        // previous item
        this.prevElement		= ( this.leftIndex === 0 ) ? this.itemElements[this.itemsCount - 1] : this.itemElements[this.leftIndex - 1];
        styleElements(this.prevElement, this._getCoordinates('outleft'));
      }
    },

    _loadEvents: function() {
      var _self	= this;

      var onTransitionEnd = function (event) {
        _self.currentElement.classList.add('dg-center');
        for (var i = 0; i < _self.itemElements.length; i++) {
          var el = _self.itemElements[i];
          el.classList.remove('dg-transition');
        }
        _self.isAnim	= false;
      };

      this.wrapperElement.addEventListener( 'webkitTransitionEnd', onTransitionEnd);
      this.wrapperElement.addEventListener( 'transitionend', onTransitionEnd);

      // this.$wrapper.on("swipeleft",function(){
      //   alert("You swiped left!");
      // });
      //
      // this.$wrapper.on("swiperight",function(){
      //   alert("You swiped left!");
      // });
    },

    _getTransformValue: function (transform) {
      var transformArray = [];
      for (var property in transform) {
        transformArray.push(property + '(' + transform[property] + ')');
      }
      return transformArray.join(' ');
    },

    _getTransformObj: function (transform) {
      var transformValue = this._getTransformValue(transform);

      // item.style.webkitTransform = transformValue;
      return {
        'webkitTransform'	: transformValue
      }
    },

    _getCoordinates: function( position ) {
      var transform = null;
      var transformObj = null;

      switch( position ) {
        case 'outleft':
          transform = {
            'translateX' : -this.itemWidth-100 + 'px',
            'translateZ' : '-200px',
            'rotateY'    : '45deg'
          };

          transformObj 	= this._getTransformObj(transform);
          transformObj['opacity'] = 0;
          transformObj['visibility'] = 'hidden';
          return transformObj;
          break;
        case 'outright':
          transform = {
            'translateX' : this.itemWidth+100 + 'px',
            'translateZ' : '-200px',
            'rotateY'    : '-45deg'
          };

          transformObj 	= this._getTransformObj(transform);
          transformObj['opacity'] = 0;
          transformObj['visibility'] = 'hidden';
          return transformObj;
          break;
        case 'left':
          transform = {
            'translateX' : -this.itemWidth + 'px',
            'translateZ' : '-200px',
            'rotateY'    : '45deg'
          };

          transformObj 	= this._getTransformObj(transform);
          transformObj['opacity'] = 1;
          transformObj['visibility'] = 'visible';
          return transformObj;
          break;
        case 'right':
          transform = {
            'translateX' : this.itemWidth + 'px',
            'translateZ' : '-200px',
            'rotateY'    : '-45deg'
          };

          transformObj 	= this._getTransformObj(transform);
          transformObj['opacity'] = 1;
          transformObj['visibility'] = 'visible';
          return transformObj;
          break;
        case 'center':
          transform = {
            'translateX' : '0px',
            'translateZ' : '0px',
            'rotateY'    : '0deg'
          };

          transformObj 	= this._getTransformObj(transform);
          transformObj['opacity'] = 1;
          transformObj['visibility'] = 'visible';
          return transformObj;
          break;
      };
    },

    _navigate: function( dir ) {

      if( this.supportTrans && this.isAnim )
        return false;

      this.isAnim	= true;

      switch( dir ) {

        case 'next' :

          this.currentIndex	= this.rightIndex;

          // current item moves left
          this.currentElement.classList.add('dg-transition');
          styleElements(this.currentElement, this._getCoordinates('left'));

          // right item moves to the center
          this.rightElement.classList.add('dg-transition');
          styleElements(this.rightElement, this._getCoordinates('center'));

          // next item moves to the right
          if( this.nextElement ) {
            // left item moves out
            this.leftElement.classList.add('dg-transition');
            styleElements(this.leftElement, this._getCoordinates('outleft'));

            this.nextElement.classList.add('dg-transition');
            styleElements(this.nextElement, this._getCoordinates('right'));
          }
          else {
            // left item moves right
            this.leftElement.classList.add('dg-transition');
            styleElements(this.leftElement, this._getCoordinates('right'));
          }
          break;

        case 'prev' :

          this.currentIndex	= this.leftIndex;

          // current item moves right
          this.currentElement.classList.add('dg-transition');
          styleElements(this.currentElement, this._getCoordinates('right'));

          // left item moves to the center
          this.leftElement.classList.add('dg-transition');
          styleElements(this.leftElement, this._getCoordinates('center'));

          // prev item moves to the left
          if( this.prevElement ) {

            // right item moves out
            this.rightElement.classList.add('dg-transition');
            styleElements(this.rightElement, this._getCoordinates('outright'));

            this.prevElement.classList.add('dg-transition');
            styleElements( this.prevElement, this._getCoordinates('left') );

          }
          else {

            // right item moves left
            this.rightElement.classList.add('dg-transition');
            styleElements(this.require(), this._getCoordinates('left'));

          }
          break;

      };

      this._setItems();

      if( !this.supportTrans )
        this.currentElement.classList.add('dg-center');

    },

    _startSlideshow: function() {
      var _self	= this;

      this.slideshow	= setTimeout( function() {

        _self._navigate( 'next' );

        if( _self.options.autoplay ) {
          _self._startSlideshow();
        }

      }, this.options.interval );

    },

    prev: function () {
      if( this.options.autoplay ) {

        clearTimeout( this.slideshow );
        this.options.autoplay	= false;

      }

      this._navigate('prev');
    },

    next: function () {
      if( this.options.autoplay ) {

        clearTimeout( this.slideshow );
        this.options.autoplay	= false;

      }

      this._navigate('next');
    },

    bindTouchEvent: function () {
      var startX,startY;
      var startT = 0;         //记录手指按下去的时间
      var translate = 0;

      /*手指按下时*/
      this.wrapperElement.addEventListener("touchstart", function(e) {
        console.log('touchstart');

        // e.preventDefault();//取消注释此行会在该元素内阻止页面纵向滚动
        var touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        startT = new Date().getTime();          //记录手指按下的开始时间
        translate = 0;
      }.bind(this), false);

      /*手指在屏幕上滑动，页面跟随手指移动*/
      this.wrapperElement.addEventListener("touchmove", function(e) {
        console.log('touchmove');

        // e.preventDefault();//取消注释此行会在该元素内阻止页面纵向滚动
        var touch = e.touches[0];
        var deltaX = touch.clientX - startX;
        var deltaY = touch.clientY - startY;
        //如果X方向上的位移大于Y方向，则认为是左右滑动
        if (Math.abs(deltaX) > Math.abs(deltaY)){
          translate = deltaX;
        }
      }.bind(this), false);

      /*手指离开屏幕时，计算最终需要停留在哪一页*/
      this.wrapperElement.addEventListener("touchend",function(e) {
        console.log('touchend');

        // e.preventDefault();//取消此行代码的注释会在该元素内阻止页面纵向滚动

        //计算手指在屏幕上停留的时间
        var deltaT = new Date().getTime() - startT;

        if (translate != 0) { //发生了左右滑动
          //以下两种情况会进行翻页
          //1. 停留时间小于300ms,则认为是快速滑动，无论滑动距离是多少，都停留到下一页
          //2. 滑动距离大于屏幕的30%
          if (deltaT < 300 || Math.abs(translate) / this.itemWidth > 0.3) {
            if (translate > 0) {
              this.prev();
            }
            else {
              this.next();
            }
          }
        }
      }.bind(this), false);
    }
  };

  function styleElements(elements, style) {
    if (elements.length && elements.length > 0) {
      for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        for (var prop in style) {
          element.style[prop] = style[prop]
        }
      }
    }
    else if (elements) {
      for (var prop in style) {
        elements.style[prop] = style[prop]
      }
    }
  };

  function transitionElements(elements, isTransition) {
    var transition = isTransition ? "all 0.5s ease-in-out" : "";

    if (elements.length && elements.length > 0) {
      for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        element.style.webkitTransition = transition;
      }
    }
    else if (elements.style) {
      elements.style.webkitTransition = transition;
    }
  }

  function logError( message ) {
    if ( this.console ) {
      console.error( message );
    }
  };

  var createGallery = (function () {
    var createGallery = function (element, options) {
      var gallery = new Gallery(element, options);
      return {
        bindTouchEvent: function () {
          gallery.bindTouchEvent();
        },
        prev: function () {
          gallery.prev();
        },
        next: function () {
          gallery.next();
        }
      }
    };

    return createGallery;
  })();

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = createGallery;
  else
    window.createGallery = createGallery;
})();