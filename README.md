# Wave Product Catalog

Welcome to the Wave Product Catalog! This web application serves as a comprehensive platform for browsing products, managing orders, and facilitating user interactions. Below, you'll find an overview of the project's features, setup instructions, and technology stack.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technology Stack](#technology-stack)
- [Contributing](#contributing)
- [License](#license)

## Features

### Website Structure

- **Landing Page ["/"]**
  - Navigation Bar with:
    - Brand Icon
    - Section Navigation Links
    - Log In
    - Sign Up
    - Cart
    - Theme Switcher
  - **Hero Section ["/#home"]**
    - Brand Information
    - Carousel
- **About Section ["/#about"]**
- **Products Range ["/#range"]**
- **Contact Us Form ["/#contact"]**
  - Integrated with backend functionality

### Product Pages

- **Products Page ["/products"]**
  - Category Filter
  - Display of all products with descriptions
  - Links to individual product review pages and add to cart functionality ["/products/1"]

### User Management

- **Cart ["/cart"]**
  - Displays all products added to the cart
  - Implemented using Jotai state management
- **Order Summary ["/order-summary"]**

  - Displays order details after placing an order

- **My Orders ["/user-orders"]**

  - Shows all orders placed by the user

- **Sign Up ["/signup"]**

  - Collects necessary user sign-up data
  - Email authentication using Supabase
  - Checks for existing users with the same email

- **Login ["/login"]**
  - User authentication implemented with Supabase

### Admin Panel

- **Admin Panel ["/admin-panel"]**
  - Accessible for users with admin privileges
  - Admin Dashboard Features:
    - Displays total users in the database
    - Shows number of orders placed
    - Calculates total revenue generated
    - Displays number of products available
    - Calculates average order value
    - Order Trend graph for daily orders
    - Top Selling Products Bar Graph
- **Orders**
  - Displays all orders placed by customers
- **Products**
  - Pie chart visualizing products by category
- **Users**
  - Displays all user information from the database

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aawaiz-datalabs/product-catalog-frontend.git
   ```
2. **Navigate to the project directory:**

   ```bash
   cd product-catalog-frontend
   ```

3. **Setup .env file in your project folder**
   ```bash
   JSON_API_URL=http://localhost:5500
   NEXT_PUBLIC_APP_URL = http://localhost:3000
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```
5. **Start the development server:**
   ```bash
   npm run concurrently
   ```
6. **Open your browser and navigate to the website:**
   ```bash
   http://localhost:3000
   ```
7. **For database access, navigate to:**
   ```bash
   http://localhost:5500
   ```

## Usage

- Navigate through the landing page to explore products, sign up, log in, and access the cart.
- As an admin, access the admin panel to manage users and orders.

## Technology Stack

- **Frontend:**
  - Shadcn for building components and ensuring a clean UI
  - Tailwind CSS for styling
- **Backend:**
  - Supabase for email authentication and database management
  - Jotai for state management
