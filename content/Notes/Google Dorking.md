---
title: Google Dorking
aliases:
  - Google Dorking
---

## site

- games site: www.certificatedhacker.com
- Query gives information on games from the certificatedhacker site.

## allinurl

- allinurl: google career
- Query returns only pages containing the words "google" and "career" in the URL.

## inurl

- inurl: copy site:www.google.com
- Query returns only Google pages in which the URL has the word "copy".

## allintitle

- allintitle: detect malware
- Query returns only pages containing the words "detect and "malware in the title".

## intitle

- malware detection intitle:help
- Query returns only pages that have the term "help" in the title, and the terms "malware" and "detection" anywhere within the page.

## allintext

- allintext:”username” “password”
- To find out some pages having information related to usernames and passwords.

## intext

- intext:usernames
- To find out some pages having information related to usernames.

## inanchor

- Anti-virus inanchor:Norton
- Query returns only pages with anchor text on links to the pages containing the word "Norton" and the page containing the word "Anti-virus."

## allinanchor

- allinanchor: best cloud service provider
- Query returns only pages for which the anchor text on links to the pages contains the works "best", "cloud", "service", and "provider".

## cache

- cache:www.eff.org
- Will show Google's cached version of the Electronic Frontier Foundation home page.

## link

- link:www.googlwguide.com
- Finds pages that point to Google Guide's home page.
- Note: According to Google's documentation, "you cannot combine a link: search with a regular keyword search."
- Also note that when you combine link: with another advanced operator, Google may not return all the pages that match.

## related

- related: www.microsoft.com
- Provides the Google search engine results page with websites similar to microsoft.com.

## info

- info: google.com
- Provides information about the national hotel directory GotHotel.com home page.

## location

- location: 4 season restaurant
- Will give you results based on the term "4 seasons restautants".

## filetype

- allintext:username filetype:log
- It will display those results that have usernames and passwords mentioned in log file.

## ext

- site:https://www.ford.com/ ext:pdf
- It will display those results that have pdf extention in https://www.ford.com/ site.