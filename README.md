# Setup Instructions:

### Versions of my current machine:

Java: v23.0.2
Maven: v3.9.1
Node: v22.14.0

### Running the Spring Boot Backend

Navigate to root: `./backend/position-book-system`

Ensure dependencies are installed: `mvn clean install`

Should pass tests: `mvn test`

Starting up the backend: `mvn spring-boot:run`

The backend should be running @ `http://localhost:8080`

With Swagger docs @ `https://localhost:8080/swagger-ui/`


### Running the React Frontend

Navigate to root: `./frontend/position-book-system`

Installing Deps: `npm install`

Starting up the React dev server: `npm run dev`


Now you should be able to navigate to the React page: `http://localhost:5173`

And both apps should be working together as expected!!

The database can be populated with test data using the menu in the bottom left named 'Admin Tools'.

## Completed Position Book System Implementation -

### Backend Implementation:

1. Developed a complete Position Book system that processes trade events efficiently
2. Implemented functionality for users to retrieve positions by trading account and/or security
3. Created in-memory data storage for all position and event information (leveraging ConcurrentHashMap)
4. Set up REST endpoints to receive trade events as JSON
5. Successfully implemented processing for all three event types (Buy/Sell/Cancel)
6. For each position, tracked and maintained:
   * Account information
   * Security details
   * Total quantity
   * Complete history of all related events
7. Tested and verified correct handling of all provided test cases

### Frontend Implementation:

1. Created a React-based Web UI that visualizes positions in a clean, tabular format
2. Implemented functionality for users to buy/sell securities through an intuitive interface
3. Added support for handling multi-security events
4. Added capability for users to cancel previously issued events
5. Implemented automatic UI updates that reflect changes without requiring manual refreshing
6. Implemented drill-down functionality allowing users to view underlying events for each position

### Technology Stack Used:

1. **Frontend** :

    Built with React, Vite, Shadcn, Tailwind

1. **Backend** :

    Built with Spring Boot, Swagger, and RESTful APIs

Hopefully it all works as it did on my machine :)

Frontend tested on Chromium & Firefox.

If you have any questions/issue, feel free to reach out to me!


Many thanks,

Alex
