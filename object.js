$(function () {
    "use strict";
    window.Tab = function (selector,dom) {
        let $ele,showTab;
        function find_ele() {

            if (selector instanceof $) {
                $ele = selector;
            }
            else {
                $ele = $(selector);
            }
        }

        function init() {
            find_ele();
        }

        function find_showTab(obj) {
            showTab=$("#"+$(obj).data("id") +"-show");
            console.log(showTab);
        }

        function show_items(item) {
            $(dom).css("display","none");
            $(item).css("display","block");
        }


        function load_style() {
            $ele.each(function (index,node) {
                $(node).on("mouseover",function () {
                    $ele.each(function () {
                        $(this).removeClass("selected");
                    });
                    $(this).addClass("selected");
                    find_showTab(this);
                    show_items(showTab);
                })
            })
        }


        init();
        load_style();
    };


});