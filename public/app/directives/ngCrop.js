/**
 * Created by vishu on 07/09/15.
 */
evezownApp.directive('ngCrop', function() {
    return {
        restrict: 'EA',
        replace: true,
        scope: { src:'=', selected:'&', ratio:'@', boxWidth: '@'},
        link: function(scope,element, attr) {
            var myImg;
            var clear = function() {
                if (myImg) {
                    myImg.next().remove();
                    myImg.remove();
                    myImg = undefined;
                }
            };
            scope.$watch('src', function(nv) {
                clear();
                if (nv) {
                    element.after('<img />');
                    myImg = element.next();
                    myImg.attr('src',nv);
                    $(myImg).Jcrop({
                        trackDocument: true,
                        onSelect: function(c) {
                            scope.$apply(function() {
                                scope.selected({cords: c});
                            });
                        },
                        bgFade: true,
                        aspectRatio : scope.ratio,
                        boxWidth: scope.boxWidth,
                        setSelect: [0,0,1500,1500],
                        bgColor : 'black'
                    });
                }
            });

            scope.$on('$destroy', clear);
        }
    };
});

