$(document).ready(function () {
    /*Move content from header main menu*/
    function aligncontentwithmenu() {
        var mainmenuheight = $("#main-header").height();
        mainmenuheight += "px";
        var styles = {
            marginTop: mainmenuheight,
            position: "fixed"
        };
        $(".menu-spacer").css(styles);
        $(".menu-spacer-home").css("height", mainmenuheight);
    }
    aligncontentwithmenu();
    $(window).resize(function () {
        aligncontentwithmenu();
    });
    /*============================================
 Noty functions
 ==============================================*/
    function generate(type, theme, text) {
        var n = noty({
            text: text,
            type: type,
            dismissQueue: true,
            layout: theme == 'defaultTheme' ? 'center' : 'center',
            theme: theme,
            closeWith: ['button', 'click'],
            maxVisible: 20,
            modal: true
        });
    }

    function generateKiller(type, theme, text) {
        var n = noty({
            text: text,
            type: type,
            dismissQueue: true,
            killer: true,
            layout: theme == 'defaultTheme' ? 'center' : 'center',
            theme: theme,
            closeWith: ['button', 'click'],
            maxVisible: 20,
            modal: true
        });
    }

    /*Contact form*/
    $('#btncontactemail').click(function () {
        var messageName = $("#contactname").val();
        var messageFromEmail = $('#contactemail').val();
        var messageBody = $('#contactmessage').val();

        if (!messageName || !messageFromEmail || !messageBody) {
            generate('error', 'defaultTheme', 'Please fill all fields.');
        }
        else {
            var request = $.ajax({
                url: '/HandleContactForm',
                type: 'POST',
                data: {
                    'messageName': messageName,
                    'messageFromEmail': messageFromEmail,
                    'messageBody': messageBody
                },
                beforeSend: function () {
                    generate('information', 'defaultTheme', 'Email sending is in process. Please wait.');
                },
                success: function (data) {
                    if (data == "True") {
                        generateKiller('success', 'defaultTheme', 'Email has been successfully sent.');
                        //field reseting
                        $("#contactname").val('');
                        $("#contactemail").val('');
                        $("#contactmessage").val('');
                    }
                    else {
                        generateKiller('error', 'defaultTheme', 'Email has not been successfully sent. Please try again or contact us on: info@oceanhills.es');
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    generateKiller('error', 'defaultTheme', 'Email has not been successfully sent. Please try again or contact us on: info@oceanhills.es');
                }
            });
        }
    });
    /*google map click*/
    function redirectOnMap() {
        if (window.innerHeight <= 768) {
            window.open("https://www.google.com/maps/@40.432825,-3.690455,13z?hl=en", "_blank");
        }
    }
    $("#map-canvas").click(function () {
        redirectOnMap();
    });
    //code for setting map height
    function setMapDimensions() {
        var height = document.body.clientHeight * 0.8 + "px";

        if (document.body.clientWidth < 768) {
            height = document.body.clientHeight * 0.7 + "px";
        }
        var styles = {
            height: height,
            width: document.body.clientWidth + "px"
        };
        $("#map-canvas").css(styles);
        initialize();
    }
    setMapDimensions();
    $(window).resize(function () {
        setMapDimensions();
    });
    //code for setting entorno map height
    function setEntornoMapDimensions() {
        var height = $("#carousel-entorno").height();
        var width = $("#carousel-entorno").width();
        $("#entorno-map").attr("height", height);
        $("#entorno-map").attr("width", width);
    }
    $(window).load(function () {
        setEntornoMapDimensions();
    });
    $(window).resize(function () {
        setEntornoMapDimensions();
    });
});
//google maps
function initialize() {
    var location1 = new google.maps.LatLng('36.4759829', '-5.0770475');
    var mapCanvas = document.getElementById('map-canvas');
    var mapOptions = {
        draggable: false,
        disableDefaultUI: false,
        center: new google.maps.LatLng('36.4759829', '-5.0770475'),
        zoom: 14,
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }]
    }
    var map = new google.maps.Map(mapCanvas, mapOptions);
    var marker = new google.maps.Marker({
        position: location1,
        map: map,
        icon: { url: 'images/iconmarker.png' }
    });
}
$(window).load(function () {
    /*
    * Alvaro scroll Plugin intialization
    */
    $('#pagepiling').pagepiling({
        menu: '#menu',
        anchors: ['home', 'entorno', 'viviendas', 'contacto'],
        sectionsColor: ['white', '#ffffff', '#ffffff', '#ffffff'],
        navigation: {
            'position': 'right',
            'tooltips': ['Home', 'Entorno', 'Viviendas', 'Contacto']
        },
        afterRender: function () {
            $('#pp-nav').addClass('custom');
            /*home-link activate*/
            $("#home-link").addClass("active");
        },
        afterLoad: function (anchorLink, index) {
            if (index > 1) {
                $('#pp-nav').removeClass('custom');
            } else {
                $('#pp-nav').addClass('custom');
            }
        }
    });
    /*jQuery loader*/
    $('.loading-overlay').fadeOut();
});