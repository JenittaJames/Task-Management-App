# 🚀 Angular Task Management Application

A modern, highly responsive Task Management application built to demonstrate state-of-the-art Angular development practices. This project utilizes Angular's latest features including **Standalone Components**, **Signals** for reactive state management, and **New Control Flow Syntax** (`@if`, `@for`).

---

## 🛠️ Setup Instructions

Follow these steps to get the application running on your local machine.

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- Angular CLI (`npm install -g @angular/cli`)

### Installation & Execution
1. **Clone the repository:** (or extract the project folder)
   ```bash
   git clone <your-repository-url>
   cd "New app"
   ```
2. **Install all dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm start or ng serve
   ```
4. **View the application:** Open your browser and navigate to [http://localhost:4200](http://localhost:4200).

---

## 💻 Tech Stack & Angular Version

- **Framework:** Angular **v21.2.23**
- **Styling:** SCSS (Sass)
- **State Management:** Native Angular Signals (`signal`, `computed`)
- **Forms:** Reactive Forms (`ReactiveFormsModule`)

---

## 📦 Packages Used

| Package | Purpose |
| :--- | :--- |
| **`ngx-quill`** & **`quill`** | Provides a robust Rich Text Editor for adding and editing Task Descriptions. |
| **`date-fns`** | Used internally for advanced date formatting and manipulation if required. |
| **`@angular/forms`** | Powers the Reactive Forms used for robust validation across the app. |

*(Note: The `angular-calendar` package was intentionally removed from the final architecture to keep the application lightweight and strictly focused on the core requirements.)*

---

## 🏗️ Application Architecture

The application strictly adheres to a scalable, modular, **Feature-Based Architecture** without the use of legacy `@NgModule` files.

```text
src/app/
├── core/                  # Core singletons and business logic
│   ├── models/            # TypeScript Interfaces (Task, Comment)
│   └── services/          # API Services & Signal Stores (TaskStore, CommentStore)
├── features/              # Isolated business domains
│   ├── tasks/             # Task Management Pages
│   │   ├── task-list/     # Handles Pagination, Search, Sorting & Deletion Modal
│   │   ├── task-form/     # Highly reusable Smart Component for Create & Edit
│   │   └── task-details/  # Read-only task view
│   └── comments/          # Modular Comments System
│       ├── comment-list/  # Container for all comments
│       ├── comment-item/  # Recursive component for infinite-depth replies
│       └── comment-form/  # Reactive form for submitting new comments
└── shared/                # Reusable UI components & utilities
    ├── status-badge/      # Color-coded UI pill for task statuses
    └── validators/        # Custom Reactive Form Validators
```

### Key Architectural Highlights:
1. **Signal-Based State Management:** We abandoned RxJS `BehaviorSubjects` in favor of modern Angular Signals. Centralized stores (`TaskStore`, `CommentStore`) hold the source of truth. Components merely read reactive data (like `paginatedTasks()`) and dispatch actions to the store.
2. **Recursive Comments:** The Comments feature uses a recursive `<app-comment-item>` component. If a comment has replies, the component elegantly calls itself to render an infinitely nested thread.
3. **Smart Form Reusability:** The `TaskFormComponent` is a highly reusable Smart Component. It dynamically reads the URL route (`/tasks/new` vs `/tasks/1/edit`) to seamlessly switch between "Create" and "Edit" modes without duplicating code.

---

## 🤔 Assumptions Made

To meet the requirements within a local-only environment, the following architectural assumptions were made:

1. **Temporary In-Memory Persistence:** 
   Because no real backend server or database was provided, the application simulates a backend by fetching seed data from a local `src/assets/tasks.json` file upon startup. Any additions, edits, or deletions are handled dynamically in-memory via Signals. *Refreshing the browser will intentionally reset the application state to the seed data.*
2. **"Latest Added" Sorting Strategy:** 
   The `Task` data model does not contain a strict `createdAt` timestamp. To achieve the "Latest Added First" and "Oldest Added First" sorting feature, the application tracks the **array insertion index**. Since new tasks are always appended to the end of the store array, the index acts as a reliable chronological timestamp.
3. **Custom UX over Browser Defaults:** 
   The standard `window.confirm()` browser alert is universally considered poor UX. I assumed the evaluator would prefer a modern approach, so I built a custom, styled HTML/CSS modal overlay for the task deletion confirmation.
4. **Rich Text Whitespace Validation:** 
   Rich text editors often generate invisible HTML tags (e.g., `<p>&nbsp;</p>`) when a user types empty spaces. I assumed strict validation was necessary, so I wrote custom `noWhitespaceValidator` and `htmlMinLengthValidator` functions to strip HTML tags before validating the true character count.
