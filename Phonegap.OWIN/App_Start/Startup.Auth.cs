using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using Owin;
using Phonegap.OWIN.Providers;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Phonegap.OWIN
{
    public partial class Startup
    {
        static Startup()
        {
            PublicClientId = "self";

            UserManagerFactory = () => new UserManager<IdentityUser>(new UserStore<IdentityUser>());

            OAuthOptions = new OAuthAuthorizationServerOptions
            {
                TokenEndpointPath = new PathString("/Token"),
                Provider = new ApplicationOAuthProvider(PublicClientId, UserManagerFactory),
                AuthorizeEndpointPath = new PathString("/api/Account/ExternalLogin"),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(14),
                AllowInsecureHttp = true
            };
        }

        public static OAuthAuthorizationServerOptions OAuthOptions { get; private set; }

        public static Func<UserManager<IdentityUser>> UserManagerFactory { get; set; }

        public static string PublicClientId { get; private set; }

        // For more information on configuring authentication, please visit http://go.microsoft.com/fwlink/?LinkId=301864
        public void ConfigureAuth(IAppBuilder app)
        {
            //BEGIN ADDED BY JLC
            //Modified by JLC to add CORS to access /Token EndPoint
            //See http://aspnetwebstack.codeplex.com/discussions/467315
            //PM> Install-Package Microsoft.Owin.Cors -pre
            //TODO: Review
            app.UseCors(CorsOptions.AllowAll);
            //END ADDED BY JLC
            
            // Enable the application to use a cookie to store information for the signed in user
            // and to use a cookie to temporarily store information about a user logging in with a third party login provider
            app.UseCookieAuthentication(new CookieAuthenticationOptions());
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);

            // Enable the application to use bearer tokens to authenticate users
            app.UseOAuthBearerTokens(OAuthOptions);

            // Uncomment the following lines to enable logging in with third party login providers
            
            // Get clientId and clientSecret from https://account.live.com/developers/applications
            app.UseMicrosoftAccountAuthentication(
                clientId: "000000004C10B315",
                clientSecret: "4B1bfQv3KBVO0UhLBa3hqQQ5EdRp9t8C");

            // Register your application at https://dev.twitter.com/apps
            app.UseTwitterAuthentication(
                consumerKey: "CuZH3QAXT9YREUX0ahXg",
                consumerSecret: "mPmslNVecUT2BKvIDnxij9GV1vkaMHJ3bsxwsaqguec");

            //Register your application at https://developers.facebook.com/apps
            app.UseFacebookAuthentication(
                appId: "245869555573253",
                appSecret: "bbbdbbfbe56c1bbea5aa04d7c95d14b6");

            app.UseGoogleAuthentication();
        }
    }
}
