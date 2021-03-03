# ToeBeans Coffee Class
ToeBeans is full-stack application where users can sign up, login, and sign
up for coffee classes and learn the business of starting up your own coffee business,


## Techologies:
React, Spring Boot, Spring Security, Java, PostgreSQL, and Docker


### Features
* A user can register for an account.
* A user can login to the view current Coffee classess.
* A user view all of their registered classes.
* A user can register for a particular class.
* A user can delete registered classes.
* A user can contact ToeBeans through the contact page for any questions.

## Running the application
To run the ToeBeans React application, navigate to the root of the coffeeclass-front
folder and run this command:
```
npm start
```

To run the ToeBeans Spring Boot application, first create and run PostgreSQL database first.
The application uses Docker to create the database.

To create and run the PostgreSQL, navigate to the db folder in coffeeclass-spring, you
should see the docker-compose.yml file. Run this command:
```
docker-compose up
```
Note: You might have to use sudo if you are using Linux-based OS if you did not add
permission for the docker-compose command.

Once the above command ran successfully, you are now able to run Spring Boot back-end.
Run Spring Boot in Eclipse of your preferred editor.
