# NYC Yelp Restaurants and Food Inspection Data Application

This application using both the [Yelp API](https://www.yelp.com/developers) and [SODA API](http://dev.socrata.com/) for NYC Open Data Restaurant Inspection Dataset. 
There are two pages of interest: 
- The main search page which returns Yelp restaurant results with the last most recent food inspection results if we can match the restaurant.
- The list page which returns a list of the cleanest and dirtiest restaurants

## Library Requirements

- [Git](http://git-scm.com/)
- [NodeJS](http://nodejs.org/download/)
    - OS X developers are recommended to use Brew to install Node (`brew install node`).
    - Windows developers should download an appropriate binary from [nodejs.org](http://nodejs.org/download/).
    - Linux (Debian-based): `apt-get install nodejs` and `ln -s /usr/bin/nodejs /usr/bin/node`.
- [npm](https://www.npmjs.org/) (Should come with NodeJS; confirm that it is installed).
    - Not included in Debian-based Linux, so `apt-get install npm`.
- [Bower](http://bower.io/)
    - You can install bower globally by doing: `npm install -g bower`
    - Bower requires Node, npm, Git.

### Optional
- [Gulp](http://gulpjs.com/)
    - There are a variety of Gulp tasks available. See the client/gulp directory for information about all of the tasks.
    - You can install gulp globally by doing: `npm install -g gulp` 
 
## Other Requirements (if want to run locally)
- Yelp API Keys (using the API requires Oauth authentication. This application uses the Yelp node module to handle authentication)
  - Go to: http://www.yelp.com/developers/getting_started/api_access
  - Register for your API keys:
    -- You'll need to create an account if you don't have one
    -- If you create a new account, confirm the account (you should receive an email).
    -- Go to: http://www.yelp.com/developers/getting_started/api_access
    -- Fill out the form; don't worry the website URL doesn't have to live.
  - `cd server`
  - Create a new file named 'yelpConfig.js', and add your Yelp API token/keys so that it looks like this: https://gist.github.com/mirie/30d35b88906f8b9c96b8
 
### Setup
There's both the client and the server applications. They have different requirements.

#### Download the server application dependencies
1. `cd server`
2. `npm install`

#### Download the client application dependencies
1. `cd client`
2. `npm install`
3. `bower install`


## Running the Application Locally
You will need start the nodeJS server in order to run the application.
1. `cd server`
2. `npm test` to start the Test/Local instance of the server
3. The application is accessible locally at: http://localhost:5000/

## About the Data
- Yelp: https://www.yelp.com/developers/
- NYC Open Data Restaurant Inspection Dataset uses: https://data.cityofnewyork.us/resource/xx67-kt59.json

## Search Page (Home)

The search form allows the user to do a restaurant search according to the parameters available via the Yelp API.
Search is limited to restaurants. Because of the current lack of validation/error handling, it currently "asks"
that users limit the location to New York City. 

Not every restaurant in Yelp has a matching inspection. The best way to match restaurants was using the business
phone number. Same goes vice versa -- not every inspected restaurant returned by Socrata, has a matching entry in
Yelp.

Clicking on a result will expand the available information for the restaurant and inspection details.

## List Page

The search form allows the user to see the list of the cleanest and dirtest restaurants by zip code. This
page is....well, lacking in some logic. It's not exactly ideal and is a work in progress that sort of was 
left to the wayside. See the What's next on Deck? section for more details.

This page only returns results from Socrata.


## About Pages

Pages that explain what this application is all about and explains the whole food inspection process/grading.


# What's next on Deck?
1. Tests, tests and more tests (unit and e2e) since I left the best for last...Definitely don't repeat this mistake.
2. Error handling because it's not a perfect world.
3. Deal with empty rows from Socrata.
4. Search: Filter out restaurants that are closed (is_closed = true) and definitely don't 
4. Deploy to Heroku
5. Ask for frequent code reviews by anyone who's willing to spend the time :) Repeat.
6. Search: Add buttons that allow the user to sort by: Best Match (default already), Highest Rated, Distance
7. Search: Limit inspection to last inspection visit
8. Search: Calculate the grade for the last inspection visit
9. List: Fix Logic error for List pages. These should be an average of scores for the most recent
   inspection visit.
10. List: Connect results with Yelp information
11. List: Add option to search by borough
12. Make it preeeeetty.
13. Fix the extension of Yelp client node module
14. Implement Authentication for Socrata API.
13. Integrate Google Maps?



### Author: Mai Irie ###