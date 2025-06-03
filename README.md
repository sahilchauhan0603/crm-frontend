# 🚀 Frontend - CRM Xeno

## 🌟 Overview

The frontend of CRM Xeno is built using **React** and **Vite**. It provides a user-friendly interface for managing campaigns, communication logs, customers, orders, and segments. The frontend communicates with the backend via RESTful APIs.

[🔗 Back to Top](#-frontend---crm-xeno)

---

## ✨ Features

- 📢 Campaign management
- 📝 Communication log tracking
- 👤 Customer creation and management
- 📦 Order creation and tracking
- 📊 Segment creation and management
- 📈 Analytics dashboard

[🔗 Back to Top](#-frontend---crm-xeno)

---

## 🏗️ Architecture

Below is the architecture diagram for the frontend:

```plaintext
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

[🔗 Back to Top](#-frontend---crm-xeno)

---

## 🧠 Theoretical Explanation of Architecture

The frontend architecture is designed to ensure **modularity**, **scalability**, and **maintainability**. It consists of the following layers:

1. **Pages**: Represent different views of the application, such as the homepage, login page, and analytics page.
2. **Components**: Reusable UI elements like `Navbar`, `Footer`, and `LoadingBar`.
3. **Hooks**: Custom React hooks encapsulate reusable logic, such as API calls or state management.
4. **Utils**: Helper functions like `axios.js` for common tasks.
5. **Assets/Public**: Static files like images and icons.

[🔗 Back to Top](#-frontend---crm-xeno)

---

## 🔄 Workflow Diagram

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

### Explanation

The workflow diagram illustrates the flow of data and user interactions in the frontend. It starts with **User Interaction** on the interface, which triggers actions on **Pages**. These pages use **Components** to display content and functionality. **Hooks** manage reusable logic, such as state or API calls, which then communicate with the **Backend** to fetch or update data. This ensures a seamless and efficient user experience.

[🔗 Back to Top](#-frontend---crm-xeno)

---

## 🛠️ Steps to Run the Frontend

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

[🔗 Back to Top](#-frontend---crm-xeno)

---

## 🔒 Authentication

The frontend uses **Kinde-auth** for token-based authentication to ensure secure access to the application. Users must log in via Kinde-auth, which provides a token stored in local storage and used for subsequent API requests.

## 💬 Chatbase Integration

The application integrates with [Chatbase.co](https://chatbase.co) to provide advanced chatbot capabilities. The `useChatbase` custom hook is used to interact with Chatbase APIs, enabling features like automated responses and user interaction tracking.

---

## ⚠️ Limitations

- The application currently lacks real-time updates for data changes.
- Limited support for internationalization (i18n).
- Chatbase integration is basic and does not support advanced analytics.
- Authentication is limited to token-based login without multi-factor authentication (MFA).
- The frontend does not have offline support or caching mechanisms for better performance.

---

## 🧩 Explanation of Logic

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

[🔗 Back to Top](#-frontend---crm-xeno)

