# FreeCodeCamp: URL Shortener Microservice

try it [here](https://titiny.herokuapp.com/)

**User stories:**
I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
When I visit that shortened URL, it will redirect me to my original link.

**Example creation usage:**
```
https://titiny.herokuapp.com/shorten/https://www.google.com
https://titiny.herokuapp.com/shorten/http://foo.com:80
```

**Example creation output:**
```
{ "original_url":"http://foo.com:80", "short_url":"https://titiny.herokuapp.com/foha82" }
```