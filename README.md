# SecureSight Incident Dashboard

This project is a full-stack web application designed to monitor and manage security incidents from a network of cameras. It features a real-time dashboard that displays unresolved incidents, allowing a user to view incident details and resolve them. This project was built as a technical assessment.

## Live Demo

A live version of this project is deployed on Vercel.

**URL:** [https://your-project-url.vercel.app](https://your-project-url.vercel.app) 

---

## Tech Decisions

This section outlines the key technology choices made during the development of this project and the rationale behind them.

-   **Framework: Next.js**
    -   **Reasoning:** Next.js was chosen for its powerful full-stack capabilities. The integrated API routes (`/app/api`) allowed for the rapid development of a backend without needing a separate server framework. Its file-based routing and server-side rendering capabilities provide a robust foundation for a fast and scalable application.

-   **Language: TypeScript**
    -   **Reasoning:** TypeScript was used for the entire project to ensure type safety. This is crucial for building reliable applications, as it helps catch potential errors during development, improves code readability, and makes the codebase easier to maintain and refactor. The defined interfaces for `Camera` and `Incident` create a clear data contract between the frontend and backend.

-   **Database: MongoDB with Mongoose**
    -   **Reasoning:** A NoSQL database like MongoDB was selected for its flexibility in handling the semi-structured data of security incidents. Mongoose was used as the Object Data Modeling (ODM) library to define clear schemas for `Camera` and `Incident` models, enforce data validation, and simplify interactions with the database, especially for population queries.

-   **Styling: Tailwind CSS**
    -   **Reasoning:** Tailwind CSS was chosen for its utility-first approach, which allows for rapid and consistent UI development directly within the markup. This avoids the need for separate CSS files and makes components more self-contained. The use of arbitrary values and theme customization was essential for achieving the specific dark-mode aesthetic required.

-   **UI/UX: Optimistic UI**
    -   **Reasoning:** For the "Resolve" functionality, an optimistic UI pattern was implemented. When a user clicks "Resolve," the incident is immediately removed from the frontend state before the API call completes. This makes the application feel incredibly responsive and fast from the user's perspective. The state is designed to revert back gracefully if the background API call were to fail, ensuring data integrity.

---

## If I had more time…

Given more time, here are several improvements I would prioritize to enhance the application's functionality and robustness:

-   **Real-Time Updates:** Implement WebSockets (using a library like `Socket.io`) to push new incidents to the frontend in real-time without requiring a page refresh.
-   **User Authentication & Authorization:** Add a proper authentication system (e.g., NextAuth.js) to secure the dashboard and potentially introduce user roles (e.g., Admin, Operator).
-   **Comprehensive Testing:** Write unit tests for API routes and frontend components using Jest and React Testing Library. Add end-to-end tests with a framework like Cypress or Playwright to simulate user flows.
-   **Advanced Filtering & Sorting:** Add UI controls to allow users to filter the incident list by camera, date range, or incident type, and to sort the results.
-   **Pagination:** For the incident list, implement pagination on the backend and frontend to efficiently handle a large number of incidents without performance degradation.
-   **CI/CD Pipeline:** Set up a Continuous Integration/Continuous Deployment pipeline (e.g., using GitHub Actions) to automate testing and deployment.
-   **Interactive Timeline & Player:** Replace the static images with a functional video player and an interactive timeline. This would include features like scrubbing the playhead, zooming in/out of the time scale, and dynamically displaying incident markers on the timeline that a user could click to jump to that point in the video.
-   **Enhanced Responsiveness:** While the current layout is responsive, I would further refine the UI for smaller mobile screens, potentially creating a tabbed or stacked layout to ensure all information is easily accessible without horizontal scrolling.

---

### Vercel Deployment

This project is deployed on [Vercel](https://vercel.com/). To deploy your own instance from this repository, Vercel will handle the process automatically. The only requirement is to set the `MONGODB_URI` environment variable in the Vercel project settings. Note that the database must be seeded first using the local development instructions.

---

## Deployment Instructions

Follow these steps to set up and run the project locally.

### Local Development

#### 1. Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later)
-   `npm` or `yarn`
-   A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account

#### 2. Clone the Repository

```bash
git clone <your-repository-url>
cd <project-directory>
```

#### 3. Install Dependencies

Install the necessary packages for both the frontend and backend.

```bash
npm install
```

You will also need `ts-node` as a development dependency to run the database seed script.

```bash
npm install -D ts-node @types/node
```

#### 4. Environment Setup

The application requires a connection to a MongoDB database.

1.  Create a `.env.local` file in the root of the project by copying the example file:
    ```bash
    cp .env.local.example .env.local
    ```
2.  Open the `.env.local` file and replace the placeholder with your MongoDB Atlas connection string. **Ensure you specify the database name** (e.g., `security`) in the URI.
    ```
    MONGODB_URI="mongodb+srv://<user>:<password>@<cluster-url>/security?retryWrites=true&w=majority"
    ```
3.  In your MongoDB Atlas dashboard, ensure you have configured the **Network Access** rules to allow connections from your IP address. For development, you can allow access from anywhere (`0.0.0.0/0`).

#### 5. Seed the Database

Run the seed script to populate your database with initial sample data for cameras and incidents.

```bash
npx ts-node --project tsconfig.scripts.json scripts/seed.ts
```

You should see console messages confirming that the cameras and incidents have been seeded successfully.

#### 6. Run the Application

Start the Next.js development server.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.


---
