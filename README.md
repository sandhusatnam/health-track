# health-track

In order to run the project, please run both the `api` and `client` projects concurrently.

## API Setup Instructions

- **Run the API project**:
   - Navigate to the `api` directory.
   - Run the following command to start the API:
     ```bash
     dotnet run
     ```

## Client Setup Instructions

- **Ensure  dependencies are installed before running the client project**:
   - Navigate to the `client` directory.
   - Run the following commands to install dependencies and start the client:
     ```bash
     npm install
     npm run dev
     ```

## Access the application

Once both the `api` and `client` projects are running:
   - Open your browser and navigate to the URL where the client project is running (`http://localhost:5173`).
   - Since both the projects are locally hosted, you might face CORS error, if so please disable CORS in your browser to try it out, or reach out to me at sandhs68@mcmaster.ca.
