# Phonegap-OWIN

> Phonegap-OWIN is a prototype built on SQL Server, ASP.NET Web API 2 and Kendo UI to demonstrate accessing a RESTful JSON api secured with oAuth 2.0 from browsers and Phonegap applications.

## Design

The design is compliant with [Microsoft tutorials](http://www.asp.net/web-api/overview/security/external-authentication-services).

## Running the prototype

The prototype has been hosted on Windows Azure:

- The API server can be reached at http://phonegap-owin.azurewebsites.net/
- The html 5 app (UI) can be reached at http://phonegap-owin-ui.azurewebsites.net/

**Important: some functions are now failing after dropping the billable SQL Server database.**

## Important Note

For various reasons essentially pertaining to the overall complexity and obscurity (black box) of the Microsoft .NET stack (OWIN, ASP.NET, MVC 5, Web API 2, ASP.NET identity, etc.), this architecture has been dropped in favor of [Phonegap.Express](https://github.com/jlchereau/Phonegap.Express).

In particular, Microsoft has been changing the Membership system too often and ASP.NET identity still locks a project into its Entity Framework model and database design. Also [Fiddler](http://www.telerik.com/fiddler) was revealing requests (SignalR, OpenId endpoints) that did not pertain to the standard oAuth 2.0 authentication flow. Besides, there are many benefits to the Phonegap.Express architecture: Javascript only, OS agnostic, PaaS agnostic (AWS, Azure, Heroku),  Open Source, etc.

## Copyright

Copyright (c) 2013-2014 Memba Sarl.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
