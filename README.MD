# Arvus/Hexagon interview challenge
#### A simple patient and physician registry

This system is composed of a Java Backend powered by Spring Boot & PostgreSql, 
and an AngularJS single page web app.

It is deployed with Heroku at
[this site] (https://limitless-beach-88483.herokuapp.com/ "app")

## Java backend

This is a very simple program, leveraging Spring Boot to expose a REST 
interface to the database. The only notable features are: 

* It uses Hibernate validators to constraint CPF values on insert/update.
* The database uses a join table with lazy fetching for the relation between
  Physicians and Specialties.
** This means the web app must make additional requests to list a physician's 
   specialties, and a specialty associated physicians.

### Possible improvements

* Replace the Spring Boot generated REST interface with a service facade

## Angular web app

This app was designed following Google's Material Design using the 
angular-material lib.

It uses a tab panel to navigate between patients, physicians and specialties,
and list components to display each kind of entity. Creation and edition of 
entities is done in-page to avoid pop-ups.

The appropriated entity lists are refreshed every time a tab is changed.

The physician's specialties are selected through an auto-complete field with 
text search to avoid a large combo box. 

CPF validation is powered by [ng-cpf-cnpj](https://github.com/gil/ng-cpf-cnpj).

### Possible improvements

* Use a packaging system, such as Webpack
* Move the pagination controls to it's own directive, or use a ready made lib.
* Add icons to the listings (phone, etc).
* Maybe force the "create" FAB to the bottom of the page
* Create a "details" page for specialties, since it's physician list can become
  convoluted.
* More tests.
* Double check responsive layout.

## What I learned on this project

Spring Boot and Heroku (first time I used either tech). I was very pleased with
Heroku's simplicity, and with Spring Boot's code generation capabilities. 

