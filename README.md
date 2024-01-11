# E-commerce-Back-End

A back-end application for an e-commerce website.  This appplication provides API endpoints to manage categories, products, and tags.

## Installation

To run this project locally, follow these steps.

* Clone the repository
* Navigate to the project directory
* Install dependencies
* Create a `.env` file in project root and add you MySQL database credentials.
* Run `mysql -u root -p`, login to MySQL.
* Run `source db/schema.sql` in MySQL, then logout of shell.
* Run `npm seed` in terminal.

## Usage

* To start the server, run `npm start`.
* Open Insomnia, and execute GET, POST, PUT, or DELETE to test endpoints.

## API Enpoints

### Categories
* GET/api/categories
* GET/api/categories/:id
* POST/api/categories
* PUT/api/categories/:id
* DELETE/api/categories/:id

### Products
* GET/api/products
* GET/api/products/:id
* POST/api/products
* PUT/api/products/:id
* DELETE/api/products/:id

### Tags
* Get/api/tags
* GET/api/tags/:id
* POST/api/tags
* PUT/api/tags/:id
* DELETE/api/tags/:id

## Contributing

Contributions to this project are welcome.  

## Screenshot
<img width="1440" alt="Screenshot 2024-01-11 at 2 25 37 PM" src="https://github.com/MattThompson15/E-commerce-Back-End/assets/139708928/9b614883-b160-4b7e-a431-a16cd0ab9269">

## Walkthrough Video
https://drive.google.com/file/d/18QbRuCO0faJ2ZtCOYPdDXDnqUgzNVQzO/view

## License


