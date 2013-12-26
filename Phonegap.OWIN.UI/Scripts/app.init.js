//Copyright ©2013-2014 Memba® Sarl. All rights reserved.
/*jslint browser:true */
/*jshint browser:true */

/*******************************************************************************************
 * Application loader
 *******************************************************************************************/
(function () {

    "use strict";

    var fn = Function,
        global = fn('return this')(),
        Modernizr = global.Modernizr,
        KENDO_VERSION = '2013.3.1119',
        DEBUG = true,
        MODULE = 'app.init.js: ';

    //SEE: https://github.com/SlexAxton/yepnope.js/issues/82
    function domReady() {
        jQuery(document).ready(function () {

            if (window.device !== undefined && window.device.cordova !== undefined) {
                //wait for the deviceready event in Phonegap
                // Common events are: `load`, `deviceready`, `offline`, and `online`.
                document.addEventListener('deviceready', global.app.onDeviceReady, false);
            } else {
                //no need to wait when debugging on a PC
                global.app.onDeviceReady();
            }
        });
    }

    Modernizr.load([
        //Cordova cannot be loaded with yepnope: it has to be in an HTML script tag
        /*
        {
            load: [
                './cordova.js'
                //'./cordova_plugins.js' is automatically loaded
            ],
            callback: function (url) { //called both in case of success and failure
                if (DEBUG && global.console) {
                    global.console.log(MODULE + url + ' loading attempt');
                }
            }
        },*/
        //jQuery
        {
            load: 'http://code.jquery.com/jquery-1.9.1.min.js',
            callback: function (url) { //called both in case of success and failure
                if (DEBUG && global.console) {
                    global.console.log(MODULE + url + ' loading attempt');
                }
            },
            complete: function () {
                if (!global.jQuery) {
                    Modernizr.load('./Scripts/kendo/' + KENDO_VERSION + '/jquery.min.js');
                }
            }
        },
        //Bootstrap and font awesome
        //    http://netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css
        //    http://netdna.bootstrapcdn.com/bootstrap/3.0.3/js/bootstrap.min.js
        //    http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css
        {
            load: [
                //'./Content/font-awesome.css',
                './Content/bootstrap.css',
                './Scripts/bootstrap.min.js'
            ],
            callback: function (url) {
                if (DEBUG && global.console) {
                    global.console.log(MODULE + url + ' loading attempt');
                }
            }
        },
        //Kendo UI
        {
            load: [
                'http://cdn.kendostatic.com/' + KENDO_VERSION + '/styles/kendo.common-bootstrap.min.css',
                'http://cdn.kendostatic.com/' + KENDO_VERSION + '/styles/kendo.bootstrap.min.css',
                'http://cdn.kendostatic.com/' + KENDO_VERSION + '/js/kendo.web.min.js'//,
                //'http://cdn.kendostatic.com/' + KENDO_VERSION + '/js/kendo.timezones.min.js'
            ],
            callback: function (url) {
                if (DEBUG && global.console) {
                    global.console.log(MODULE + url + ' loading attempt');
                }
            },
            complete: function () {
                if (!global.kendo) {
                    Modernizr.load([
                        {
                            load: [
                                './Content/kendo/' + KENDO_VERSION + '/kendo.common-bootstrap.min.css',
                                './Content/kendo/' + KENDO_VERSION + '/kendo.bootstrap.min.css',
                                './Scripts/kendo/' + KENDO_VERSION + '/kendo.web.min.js'//,
                                //'./Scripts/kendo/' + KENDO_VERSION + '/kendo.timezones.min.js'
                            ]
                        }
                    ]);
                }
            }
        },
        //App libraries
        {
            test: (window.device !== undefined && window.device.cordova !== undefined), //test whether we run in phonegap
            //yep: [ //load minified uglyfied runtime scripts
            //],
            //nope: [ //load debug (non minified) scripts
            //],
            load: [
                './Content/console.css',
                './Content/index.css',
                './Scripts/console.js',
                './Scripts/api.js',
                './Scripts/app.js'
            ],
            callback: function (url) {
                if (DEBUG && global.console) {
                    global.console.log(MODULE + url + ' loading attempt');
                }
            },
            complete: function () {
                domReady();
            }
        }
    ]);
}());