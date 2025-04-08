# Food Delivery System 

## Project Overview
The **Food Delivery System** is a web-based application that allows users to book and manage hotel rooms. It provides an **Admin Panel** for managing users and room bookings and a **User Dashboard** for viewing and booking available rooms.

## Prerequisites
Before running this project, ensure you have the following installed on your system:

- **Node.js** (>= 18.x.x) - [Download Node.js](https://nodejs.org/)
- **npm** (>= 9.x.x) - Comes with Node.js
- **Java (JDK 17 or later)** - [Download JDK](https://adoptopenjdk.net/)
- **Spring Boot** (Backend)
- **MySQL** (Database)

## Backend Setup (Spring Boot)

**Write in Terminal or cmd after opening cmd inside a folder**
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo/food-delivery-system.git
   cd backend
   ```
Create a Wrokspace in Eclipse for this project folder
Import just the project in the backend folder 
2. **Configure application.properties**
   Ensure the MySQL connection details are correctly set in `src/main/resources/application.properties`:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/dbFood
   spring.datasource.password=yourpassword
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
   ```

3. **Run the Spring Boot backend**
open HotelManagementApiApplication.java file and run it as java application

   or 
   
      ```bash
   mvn spring-boot:run
   ```
   The backend should now be running at `http://localhost:8080`

## Frontend Setup (React + Tailwind CSS)
**Open VS code** open the frontend folder in it from VS code
 or 
open the frontend folder in from This PC , type in the address bar 'cmd' after opeing cmd type 'code .' VS code will be opened in that folder

1. **Navigate to the frontend folder:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the frontend:**
   ```bash
   npm start
   ```
   The frontend should now be running at `http://localhost:3000`

## API Testing with Postman
To test the API, use **Postman**:
1. **Install Postman** if not already installed: [Download Postman](https://www.postman.com/downloads/)
2. **Import API collection** (if provided)
3. **Test endpoints:**
   - **Login API:** `POST http://localhost:8080/api/auth/login`
   - **Register API:** `POST http://localhost:8080/api/auth/register`
   - **Get Available Rooms:** `GET http://localhost:8080/api/rooms/available`
   - **Book a Room:** `POST http://localhost:8080/api/bookings`
   - **Cancel Booking:** `DELETE http://localhost:8080/api/bookings/{bookingId}`

## Features
- **User Login & Registration** (Admin & User roles)
- **Admin Panel:** View and manage booked & allotted rooms
- **User Dashboard:** View available rooms, book, and cancel bookings
- **Secure Authentication & Authorization**
- **MySQL Database Integration**

## Technologies Used
### Backend:
- **Spring Boot** (Java)
- **MySQL**
- **Spring Security** (JWT Authentication)

### Frontend:
- **React.js**
- **Tailwind CSS**
- **React Router**

## Contributing
Feel free to contribute! Fork the repo, make your changes, and submit a pull request.

## License
This project is licensed under the MIT License.


[Developed By](https://github.com/SkAfzal-04)
