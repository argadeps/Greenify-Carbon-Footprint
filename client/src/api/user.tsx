/*User enters credentials (username & password) on the login page.
When the user submits the form, the frontend sends a POST request to the backend (/api/login).
The backend validates the credentials by checking the PostgreSQL database.
If valid, the backend creates a JWT token and sends it back.
The frontend stores the JWT in localStorage or sessionStorage and redirects the user to the dashboard*/
