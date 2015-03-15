# CHAOTIC README

1. Search Form to allow the user to do a restaurant search according to the parameters available via the Yelp API
Add a category_filter

-- Display:
1. name
2. rating (# out of 5) and there's also the rating_img_url
3. review_count
4. url
5. categories (array)
6. location.display_address (array)
 
 Logic -- not show restaurants that have is_closed == true

2. List of Results for the restaurants with the inspection grade for each result

3. Clicking on a result will expand the available information for the restaurant (provided by yelp search api) and additional information about the specific health code violations

3. A page describing the meaning of the food inspection grades and what they mean.

4. Possible: a page with the top 25 best and 25 worst offenders when filtering by zip code (just involves the nyc gov data api, not yelp).

Scope is limited to NY state.

https://data.cityofnewyork.us/resource/xx67-kt59.json

Obtaining an Application Token
You can obtain an application token by registering your application in your Socrata profile. After creating the application, click on App Tokens in the left-hand navigation bar. The application token will be visible.

boro: flag
https://data.cityofnewyork.us/resource/xx67-kt59.json?boro=MANHATTAN&grade=A&critical_flag=Not Applicable&score=0&$limit=25&$order=inspection_date DESC

https://data.cityofnewyork.us/resource/xx67-kt59.json?$select=dba,zipcode,inspection_date,phone&boro=MANHATTAN&grade=A&critical_flag=Not Applicable&score=0&$limit=25&$order=inspection_date DESC
{
"inspection_date": "2015-02-24T00:00:00",
"phone": "2129086353",
"zipcode": "10004",
"dba": "KENYON & KENYON CAFETERIA"
},

http://api.yelp.com/v2/phone_search?phone=+15555555555

phone number may not match in yelp