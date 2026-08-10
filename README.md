# Student Management System

A full-stack web application for managing Students and Departments, built as an internship project. The system follows Clean Architecture, CQRS, and Event-Driven Architecture principles.

---

## Tech Stack

### Backend
- **ASP.NET Core Web API** (.NET 10)
- **Entity Framework Core** (ORM)
- **SQL Server** (Write Database)
- **PostgreSQL** (Read Database)
- **System.Threading.Channels** (In-Memory Queue)

### Frontend
- **React** (JavaScript)
- **Mantine UI** (Component Library)
- **React Hook Form** (Form Management)
- **Zod** (Schema Validation)

---

## Architecture

The backend follows **Clean Architecture** with four layers:

API (Controllers)
│
▼
Application (Commands / Queries / Handlers)
│
▼
Domain (Entities)
│
▼
Infrastructure (Repositories / DbContexts / Messaging)

### CQRS (Command Query Responsibility Segregation)

Operations are split into Commands (write) and Queries (read):

Application
├── Students
│ ├── Commands
│ │ ├── AddStudent
│ │ ├── UpdateStudent
│ │ └── DeleteStudent
│ ├── Queries
│ │ ├── GetAllStudents
│ │ └── GetStudentById
│ └── Events
│ ├── StudentCreatedEvent
│ ├── StudentUpdatedEvent
│ └── StudentDeletedEvent
└── Departments
├── Commands
│ ├── AddDepartment
│ ├── UpdateDepartment
│ └── DeleteDepartment
├── Queries
│ ├── GetAllDepartments
│ └── GetDepartmentById
└── Events
├── DepartmentCreatedEvent
├── DepartmentUpdatedEvent
└── DepartmentDeletedEvent

### Event-Driven Dual Database Sync

The system uses an event-driven architecture to keep SQL Server and PostgreSQL in sync:

API Request
│
▼
Command Handler
│
├──► SQL Server (Write — synchronous)
│
└──► IEventQueue (Publish Integration Event)
│
▼
PostgresSyncWorker (IHostedService)
│
▼
PostgreSQL (Read — asynchronous)

- **SQL Server** is the write database — the single source of truth. All Create, Update, and Delete operations go here first.
- **PostgreSQL** is the read database — a replica of SQL Server, kept in sync asynchronously by a background worker.
- **IEventQueue** is an in-memory queue implemented using `System.Threading.Channels`.
- **PostgresSyncWorker** implements `IHostedService` directly (not `BackgroundService`) and processes events in a loop.

### Repository Split (Read vs Write)

| Interface | Implementation | Database | Used By |
|---|---|---|---|
| `IStudentRepository` | `StudentRepository` | SQL Server | Command Handlers |
| `IStudentReadRepository` | `StudentReadRepository` | PostgreSQL | Query Handlers |
| `IDepartmentRepository` | `DepartmentRepository` | SQL Server | Command Handlers |
| `IDepartmentReadRepository` | `DepartmentReadRepository` | PostgreSQL | Query Handlers |

---

## Project Structure

StudentManagementSystem
├── StudentManagement.API # Controllers, Program.cs
├── StudentManagement.Application # Commands, Queries, Handlers, Events, Interfaces
├── StudentManagement.Domain # Entities
├── StudentManagement.Infrastructure # Repositories, DbContexts, Messaging
├── StudentManagement.Migrations.SqlServer # EF Core migrations for SQL Server
└── StudentManagement.Migrations.PostgreSql# EF Core migrations for PostgreSQL

---

## Getting Started

### Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/)
- [SQL Server Express](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
- [PostgreSQL](https://www.postgresql.org/)
- [Node.js](https://nodejs.org/) (for the frontend)

### Backend Setup

1. **Clone the repository:**
```bash
   git clone <https://github.com/hmzaabasi/std-mgmt-learning/branches>
   cd StudentManagementSystem
```

2. **Configure connection strings** in `StudentManagement.API/appsettings.json`:
```json
   {
     "ConnectionStrings": {
       "SqlServer": "Server=.;Database=StudentManagementDB;Trusted_Connection=True;",
       "PostgreSql": "Host=localhost;Database=StudentManagementDB;Username=postgres;Password=yourpassword"
     }
   }
```

3. **Apply SQL Server migrations:**
```bash
   dotnet ef database update --context SqlServerDbContext --project StudentManagement.Migrations.SqlServer --startup-project StudentManagement.API
```

4. **Apply PostgreSQL migrations:**
```bash
   dotnet ef database update --context PostgreSqlDbContext --project StudentManagement.Migrations.PostgreSql --startup-project StudentManagement.API
```

5. **Run the API:**
```bash
   cd StudentManagement.API
   dotnet run
```

   The API will be available at `https://localhost:<port>/swagger`

### Frontend Setup

1. **Navigate to the frontend directory:**
```bash
   cd student-management-ui
```

2. **Install dependencies:**
```bash
   npm install
```

3. **Start the development server:**
```bash
   npm run dev
```

---

## API Endpoints

### Students

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/student` | Get all students (paginated, searchable, sortable) |
| GET | `/api/student/{id}` | Get student by ID |
| POST | `/api/student` | Create a new student |
| PUT | `/api/student/{id}` | Update a student |
| DELETE | `/api/student/{id}` | Delete a student |

### Departments

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/department` | Get all departments (paginated, searchable, sortable) |
| GET | `/api/department/{id}` | Get department by ID |
| POST | `/api/department` | Create a new department |
| PUT | `/api/department/{id}` | Update a department |
| DELETE | `/api/department/{id}` | Delete a department |

### Query Parameters (GetAll)

| Parameter | Type | Description |
|---|---|---|
| `page` | int | Page number (default: 1) |
| `pageSize` | int | Records per page (default: 10) |
| `search` | string | Search term |
| `sortBy` | string | Field to sort by (id, name, email, age, department) |
| `sortOrder` | string | `asc` or `desc` |

---

## Key Concepts Applied

- **Clean Architecture** — separation of concerns across API, Application, Domain, and Infrastructure layers
- **CQRS** — Commands and Queries separated into dedicated handler classes, no shared service layer
- **Event-Driven Architecture** — SQL Server writes trigger integration events, consumed asynchronously by a background worker to sync PostgreSQL
- **Repository Pattern** — data access abstracted behind interfaces, split into read and write repositories
- **IHostedService** — background worker implemented directly (without `BackgroundService`) to understand the underlying mechanism
- **Dependency Injection** — all dependencies registered and resolved via .NET's built-in DI container
- **Eventually Consistent** — PostgreSQL is a read replica, kept in sync asynchronously with a small acceptable delay

