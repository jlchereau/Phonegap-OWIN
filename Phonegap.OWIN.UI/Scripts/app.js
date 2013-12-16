//Copyright ©2011-2012 Memba® Sarl. All rights reserved.
/*jslint browser:true*/
/*jshint browser:true*/

(function ($, undefined) {

    "use strict";

    var fn = Function,
        global = fn('return this')(),
        kendo = global.kendo,
        api = global.api,
        app = global.app = global.app || {};

    //See http://jqfundamentals.com/chapter/ajax-deferreds
    //Se also http://joseoncode.com/2011/09/26/a-walkthrough-jquery-deferred-and-promise/
    app.asyncLog = function (data) {
        var dfd = $.Deferred();
        debug.log('Result: ' + JSON.stringify(data));
        dfd.resolve(data);
        return dfd.promise();
    };

    app.asyncErr = function (data) {
        var dfd = $.Deferred();
        debug.error('Error: ' + JSON.stringify(data));
        dfd.resolve(data);
        return dfd.promise();
    };

    app.viewModel = kendo.observable({
        userName: 'Alice',
        password: 'password123',
        hasRegistered: false,
        loginProvider: null,
        session: null,
        externalLogins: null,
        isLogged: function () {
            return (this.get('session') !== null);
        },
        hasExternalLogins: function() {
            return (this.get('externalLogins') !== null)
        },
        register: function (e) {
            if (app.viewModel.get('loginProvider') === null) {
                debug.log('Register standard user ' + app.viewModel.get('userName'));
                $.when(api.register(app.viewModel.get('userName'), app.viewModel.get('password')))
                    .then(app.asyncLog, app.asyncErr);
            } else {
                debug.log('Register ' + app.viewModel.get('loginProvider') + ' user ' + app.viewModel.get('userName'));
                $.when(api.registerExternal(app.viewModel.get('userName')))
                    .then(app.asyncLog, app.asyncErr);
            }
        },
        signIn: function (e) {
            debug.log('Sign in');
            $.when(api.openSession(this.userName, this.password, true))
                .then(app.asyncLog, app.asyncErr)
                .then(function (data) {
                    if (data && data.access_token) {
                        app.viewModel.set('session', data);
                    }
                    if (app.viewModel.isLogged()) {
                        debug.log('New session started');
                    }
                    return data;
                });
        },
        signOut: function (e) {
            debug.log('Sign out');
            $.when(api.logOut())
               .then(app.asyncLog, app.asyncErr)
               .then(function (data) {
                   app.viewModel.set('session', null);
                   debug.log('Session ended');
                   return data;
               });
        },
        getUserInfo: function (e) {
            debug.log('Get user information');
            $.when(api.getUserInfo())
                .then(app.asyncLog, app.asyncErr)
                .then(function (data) {
                    app.viewModel.set('userName', data.UserName);
                    app.viewModel.set('hasRegistered', data.HasRegistered);
                    app.viewModel.set('loginProvider', data.LoginProvider);
                    if (data.LoginProvider !== null) {
                        app.viewModel.set('password', null)
                    }
                });
        },
        getValues: function (e) {
            debug.log('Get values');
            $.when(api.getValues())
                .then(app.asyncLog, app.asyncErr);
        },
        getExternalLogins: function (e) {
            debug.log('Get external logins');
            //$.when(api.getExternalLogins('/', true))
            //Get rid of hash and querystring in returnUrl
            $.when(api.getExternalLogins(window.location.protocol + '//' + window.location.host + window.location.pathname, true))
                .then(app.asyncLog, app.asyncErr)
                .then(function (data) {
                    app.viewModel.set('externalLogins', data);
                    var templateContent = $('#externalLoginTemplate').html();
                    var template = kendo.template(templateContent);
                    var result = kendo.render(template, data);
                    $("#externalLogins").html(result);
                    kendo.bind("#externalLogins", app.viewModel);
                });
        },
        gotoExternalLogin: function (e) {
            debug.log('External login');
            sessionStorage["state"] = $(e.target).data('state');
            sessionStorage["loginUrl"] = $(e.target).data('url');
            // IE doesn't reliably persist sessionStorage when navigating to another URL. Move sessionStorage temporarily
            // to localStorage to work around this problem.
            api._util.archiveSessionStorageToLocalStorage();
            //window.open($(e.target).data('url'), "login", "width=400, height=400"); //sessionStorage["loginUrl"] is undefined
            window.location.assign($(e.target).data('url'));
        }
    });

    $(document).ready(function () {
        debug.log('document ready');

        if (window.location.hash.indexOf('#access_token=') === 0) {
            //TODO: verify sessionStorage["state"]
            debug.log('Found an access_token in the url');
            var session = api.parseExternalToken(window.location.hash);
            app.viewModel.set('session', session);
            app.viewModel.set('userName', '?');
            app.viewModel.set('hasRegistered', true); //do not display teh register button
            app.viewModel.set('loginProvider', null); //do not display teh register button
        }


        kendo.bind($("form"), app.viewModel);
        debug.log('document bound to view model');

        //debugger;
        //following instructions at http://www.asp.net/web-api/overview/security/individual-accounts-in-web-api
        //and http://www.asp.net/web-api/overview/security/enabling-cross-origin-requests-in-web-api
        //$.when(api.getSession('Alice', 'password123'))
        //    .then(app.asyncLog, app.asyncErr)
        //    .then(api.getValues)
        //    .then(app.asyncLog, app.asyncErr);

    });

}(jQuery));


