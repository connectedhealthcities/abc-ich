'use strict';

angular.module('app').directive(disableSideMenuDrag);

disableSideMenuDrag.$inject = ['$ionicSideMenuDelegate', '$rootScope'];

/*
  This directive is used to disable the "drag to open" functionality of the Side-Menu
  when you are dragging a Slider component.
*/
function disableSideMenuDrag($ionicSideMenuDelegate, $rootScope) {

    return {
        restrict: "A",  
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

            function stopDrag(){
              $ionicSideMenuDelegate.canDragContent(false);
            }

            function allowDrag(){
              $ionicSideMenuDelegate.canDragContent(true);
            }

            $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
            $element.on('touchstart', stopDrag);
            $element.on('touchend', allowDrag);
            $element.on('mousedown', stopDrag);
            $element.on('mouseup', allowDrag);

        }]
    };
}



angular.module('app').directive(hrefInappbrowser);

hrefInappbrowser.$inject = [];

/*
  This directive is used to open regular and dynamic href links inside of inappbrowser.
*/
function hrefInappbrowser($ionicSideMenuDelegate, $rootScope) {

  return {
    restrict: 'A',
    replace: false,
    transclude: false,
    link: function(scope, element, attrs) {
      var href = attrs['hrefInappbrowser'];

      attrs.$observe('hrefInappbrowser', function(val){
        href = val;
      });
      
      element.bind('click', function (event) {

        window.open(href, '_system', 'location=yes');

        event.preventDefault();
        event.stopPropagation();

      });
    }
  };
}
