# Phonegap-OWIN

> Phonegap-OWIN is a prototype built on SQL Server, ASP.NET Web API 2 and Kendo UI to demonstrate accessing a RESTful JSON api secured with oAuth 2.0 from browsers and Phonegap applications.

## Running the prototype

The prototype has been hosted on Windows Azure:

- The API server can be reached at http://phonegap-owin.azurewebsites.net/
- The html 5 app (UI) can be reached at http://phonegap-owin-ui.azurewebsites.net/

**Important: some functions are now failing after dropping the billable SQL Sevrer database.**

## Important Note

For various reasons essentially pertaining to the overall complexity and obscurity (black box) of the Microsoft .NET stack (OWIN, ASP.NET, MVC 5, Web API 2, etc.), this architecture has been dropped in favor of [Phonegap.Express](https://github.com/jlchereau/Phonegap.Express).

In particular, we could not easily figure out why the oAuth authentication flow implemented in OWIN would require SignalR and how to configure bearer token authentication without SignalR. 

## Copyright

Copyright (c) 2013-2014 Memba Sarl.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
