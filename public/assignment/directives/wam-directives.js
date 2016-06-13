/**
 * Created by Navya on 6/9/2016.
 */

(function(){
    angular
        .module("wamDirectives",[])
        .directive("wamSortable", wamSortable);

    function wamSortable(){

        function linker(scope, element, attributes) {

            var start = -1, end = -1;
            $(element)
                .find(".container")
                .sortable({
                axis :'y',
                handle : ".handle",
                start : function(event, ui){
                    start = ui.item.index(); 
                },
                stop : function(event, ui){
                    end = ui.item.index();  
                    scope.callback({start :start, end : end});
                    
                }
            });
        }
        return {
            templateUrl : "/assignment/views/widget/sortable-widgets.view.html",
            scope : {
                data : "=",
                callback : "&"
            },
            link: linker

        }
    }
})();
