# Frontend - CRM Xeno

## Overview
The frontend of CRM Xeno is built using React and Vite. It provides a user-friendly interface for managing campaigns, communication logs, customers, orders, and segments. The frontend communicates with the backend via RESTful APIs.

## Features
- Campaign management
- Communication log tracking
- Customer creation and management
- Order creation and tracking
- Segment creation and management
- Analytics dashboard

## Explanation of Logic

### Pages
The `pages` directory contains React components that represent different views of the application, such as `HomePage`, `LoginPage`, and `AnalyticsPage`.

### Components
The `components` directory contains reusable UI components like `Navbar`, `Footer`, and `LoadingBar`. These components are used across multiple pages.

### Hooks
The `hooks` directory contains custom React hooks, such as `useChatbase`, which encapsulate reusable logic.

### Utils
The `utils` directory contains helper functions, such as `axios.js`, which is used for making API calls.

### Assets/Public
The `assets` directory contains static files like images and icons, while the `public` directory contains files like `vite.svg` that are directly served by the Vite server.


## Architecture
Below is the architecture diagram for the frontend:

```
+-------------------+
|                   |
|   Pages           |
|                   |
+-------------------+
         |
         v
+-------------------+
|                   |
|   Components      |
|                   |
+-------------------+
         |
         v
+-------------------+
|                   |
|   Hooks           |
|                   |
+-------------------+
         |
         v
+-------------------+
|                   |
|   Utils           |
|                   |
+-------------------+
         |
         v
+-------------------+
|                   |
|   Assets/Public   |
|                   |
+-------------------+
```
## Theoretical Explanation of Architecture

The frontend architecture is designed to ensure modularity, scalability, and maintainability. It consists of the following layers:

1. **Pages**: These represent the different views of the application, such as the homepage, login page, and analytics page. Each page is a React component that serves as the entry point for specific functionalities.

2. **Components**: Reusable UI elements like `Navbar`, `Footer`, and `LoadingBar` are defined here. These components are used across multiple pages to maintain consistency and reduce code duplication.

3. **Hooks**: Custom React hooks encapsulate reusable logic, such as API calls or state management. For example, `useChatbase` is a hook for integrating Chatbase analytics.

4. **Utils**: Helper functions like `axios.js` are used for common tasks such as making API calls. This layer ensures that utility functions are centralized and reusable.

5. **Assets/Public**: Static files like images and icons are stored in the `assets` directory, while the `public` directory contains files directly served by the Vite server.


## Workflow Diagram

Below is the workflow diagram for the frontend:

```plaintext
User Interaction
       |
       v
+-------------------+
|                   |
|   Pages           |
|                   |
+-------------------+
       |
       v
+-------------------+
|                   |
|   Components      |
|                   |
+-------------------+
       |
       v
+-------------------+
|                   |
|   Hooks           |
|                   |
+-------------------+
       |
       v
+-------------------+
|                   |
|   API Calls       |
|                   |
+-------------------+
       |
       v
+-------------------+
|                   |
|   Backend         |
|                   |
+-------------------+
```
## Theoretical Explanation of Workflow

The workflow begins with user interaction on the frontend interface. For example, when a user submits a form:

1. **Pages**: The user interacts with a page, such as the `CampaignsPage`.
2. **Components**: The page uses components like `CampaignForm` to display the form.
3. **Hooks**: Custom hooks like `useChatbase` may be triggered to log analytics data.
4. **API Calls**: The form submission triggers an API call using `axios.js`.
5. **Backend**: The API call is sent to the backend, which processes the request and returns a response.

This workflow ensures a seamless user experience and efficient communication between the frontend and backend.


## Steps to Run the Frontend

1. Navigate to the `frontend` directory:
   ```powershell
   cd frontend
   ```

2. Install dependencies:
   ```powershell
   npm install
   ```

3. Start the development server:
   ```powershell
   npm run dev
   ```

4. Open the application in your browser at `http://localhost:5173`.

