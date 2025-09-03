# Tax Record Manager

A full-stack web application for managing personal tax records. Users can **create, view, edit, and delete** records of their income and deductions. The backend is built with **ASP.NET Core Web API**, and the frontend is developed using **Angular**.

#### Prerequisites

Ensure the following tools are installed:

- [.NET SDK](https://dotnet.microsoft.com/en-us/download) (v8 recommended)
- [Angular](https://angular.dev/) (latest recommended)
- [Bun](https://bun.sh/) (latest recommended)

#### Getting Started

1. Clone the repository:

```bash
git clone <repo-url>
cd tax-manager
```

2. Run the backend (.NET)

```bash
cd TaxApi
dotnet run
```

This will start the SpringBoot server on `http://localhost:5277`.

3. Run the frontend (Angular)

```bash
cd TaxClient
bun install
bun start
```

This will start the Angular server on `http://localhost:4200`.
