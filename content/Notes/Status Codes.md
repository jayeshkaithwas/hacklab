---
title: Status Codes
aliases:
  - Status Codes
---
Each **HTTP response message** must contain a status code in its ﬁrst line, indicating the result of the request. The **status codes fall into ﬁve groups**, according to the code’s ﬁrst digit:
- **==1xx== — Informational.**
- **==2xx== — The request was successful.**
- **==3xx== — The client is redirected to a different resource.**
- **==4xx== — The request contains an error of some kind.**
- **==5xx== — The server encountered an error fulﬁlling the request.**

There are numerous speciﬁc status codes, many of which are used only in specialized circumstances. Here are the status codes you are most likely to encounter when attacking a web application, along with the usual reason phrase associated with them:

- **==100 Continue==** is sent in some circumstances when a client submits a request containing a body. The response indicates that the request headers were received and that the client should continue sending the body. The server returns a second response when the request has been completed.
<br>
- **==200 OK==** indicates that the request was successful and that the response body contains the result of the request.
<br>
- **==201 Created==** is returned in response to a PUT request to indicate that the request was successful.
<br>
- **==301 Moved Permanently==** redirects the browser permanently to a different URL, which is speciﬁed in the Location header. The client should use the new URL in the future rather than the original.
<br>
- **==302 Found==** redirects the browser temporarily to a different URL, which is speciﬁed in the Location header. The client should revert to the original URL in subsequent requests.
<br>
- **==304 Not Modified==** instructs the browser to use its cached copy of the requested resource. The server uses the If-Modified-Since and If-None- Match request headers to determine whether the client has the latest version of the resource.
<br>
- **==400 Bad Request==** indicates that the client submitted an invalid HTTP request. You will probably encounter this when you have modiﬁed a request in certain invalid ways, such as by placing a space character into the URL.
<br>
- **==401 Unauthorized==** indicates that the server requires HTTP authentication before the request will be granted. The WWW-Authenticate header contains details on the type(s) of authentication supported.
<br>
- **==403 Forbidden==** indicates that no one is allowed to access the requested resource, regardless of authentication.
<br>
- **==404 Not Found==** indicates that the requested resource does not exist. 
<br>
- **==405 Method Not Allowed==** indicates that the method used in the request is not supported for the speciﬁed URL. For example, you may receive this status code if you attempt to use the PUT method where it is not supported.
<br>
- **==413 Request Entity Too Large==** — If you are probing for buffer overﬂow vulnerabilities in native code, and therefore are submitting long strings of data, this indicates that the body of your request is too large for the server to handle.
<br>
- **==414 Request URI Too Long==** is similar to the 413 response. It indicates that the URL used in the request is too large for the server to handle.
<br>
- **==500 Internal Server Error==** indicates that the server encountered an error fulﬁlling the request. This normally occurs when you have submit- ted unexpected input that caused an unhandled error somewhere within the application’s processing. You should closely review the full contents of the server’s response for any details indicating the nature of the error.
<br>
- **==503 Service Unavailable==** normally indicates that, although the web server itself is functioning and can respond to requests, the application accessed via the server is not responding. You should verify whether this is the result of any action you have performed.