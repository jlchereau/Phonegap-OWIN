using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;
using System.Web.Http.Cors;
using System.Web.Cors;
using System.Threading.Tasks;
using System.Threading;

namespace Phonegap.OWIN
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            //BEGIN ADDED BY JLC
            //PM> Install-Package Microsoft.AspNet.WebApi.Cors -pre
            //Enable cross origin requests
            //See: http://www.asp.net/web-api/overview/security/enabling-cross-origin-requests-in-web-api
            //See also: http://blogs.msdn.com/b/webdev/archive/2013/07/02/manage-cors-policy-dynamically.aspx
            //And  http://blogs.msdn.com/b/yaohuang1/archive/2013/04/05/try-out-asp.net-web-api-cors-support-using-the-nightly-builds.aspx
            //var cors = new EnableCorsAttribute("*", "*", "*"); //new MyCorsPolicyAttribute());
            //cors.SupportsCredentials = true;
            //config.EnableCors(cors);
            config.SetCorsPolicyProviderFactory(new MyCorsPolicyFactory());
            config.EnableCors();
            //END ADDED BY JLC

            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }

    //BEGIN ADDED BY JLC
    //See Above
    public class MyCorsPolicyFactory : ICorsPolicyProviderFactory
    {
        ICorsPolicyProvider _provider = new MyCorsPolicyAttribute();

        public ICorsPolicyProvider GetCorsPolicyProvider(HttpRequestMessage request)
        {
            return _provider;
        }
    }

    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, AllowMultiple = false)]
    public class MyCorsPolicyAttribute : Attribute, ICorsPolicyProvider
    {
        private CorsPolicy _policy;

        public MyCorsPolicyAttribute()
        {
            // Create a CORS policy.
            _policy = new CorsPolicy
            {
                AllowAnyMethod = true,
                AllowAnyHeader = true
            };

            // Add allowed origins.
            //_policy.Origins.Add("http://myclient.azurewebsites.net");
            //_policy.Origins.Add("http://www.contoso.com");
#if DEBUG
            _policy.Origins.Add("http://phonegap-owin-ui.azurewebsites.net");
#else
            //This might not work because the CORS spec states that
            //you cannot have Access-Control-Allow-Credentials: true
            //With Access-Control-Allow-Origin: *
            //See: https://developer.mozilla.org/en/docs/HTTP/Access_control_CORS#Requests_with_credentials
            //So we are only allowing * in debug mode
            _policy.Origins.Add("*");
#endif
            _policy.SupportsCredentials = true; //
        }

        //public Task<CorsPolicy> GetCorsPolicyAsync(HttpRequestMessage request)
        //{
        //    return Task.FromResult(_policy);
        //}

        public Task<CorsPolicy> GetCorsPolicyAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            //TODO: Requires some revisions
            return Task.FromResult(_policy);
        }
    }
    //END ADDED BY JLC
}
