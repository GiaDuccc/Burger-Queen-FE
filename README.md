# <span style="color: #f39c12">NICE STORE - Online Shoe Store</span>

# Table of Contents

* [**Introduction**](#introduction)
* [**Technologies**](#Technologies)
* [**Features**](#features)
  * [**1. User Features**](#1-user-features)
    * [1.1. User Registration and Login](#11-user-registration-and-login)
    * [1.2. Product Listing and Filtering](#12-product-listing-and-filtering)
    * [1.3. Product Search](#13-product-search)
    * [1.4. Add Products to Shopping Cart](#14-add-products-to-shopping-cart)
    * [1.5. Order Checkout and Payment](#15-order-checkout-and-payment)
    * [1.6. Profile and Order History](#16-profile-and-order-history)
    * [1.7. Integrated Customer Support Chatbot](#17-integrated-customer-support-chatbot)
  * [**2. Admin Features**](#2-admin-features)
      * [2.1. Dashboard](#21-dashboard)
      * [2.2. Customer Management](#22-customer-management)
      * [2.3. Product Management](#23-product-management)
      * [2.4. Order Management](#24-order-management)

* [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)

# Introduction

### This online shoe store website is designed to provide a modern and convenient shopping experience for users. Customers can easily register an account, log in, browse the product catalog, add items to the shopping cart, and proceed to checkout.
### The admin panel is tailored for efficient management of products, orders, and users. The platform features a clean, user-friendly interface and integrates a chatbot to enhance customer support.
![home-page](./public/introduce/home.png)

# Technologies

### Front-end: 
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Yarn](https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white)


### Back-end:
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Multer](https://img.shields.io/badge/Multer-ff4444?style=for-the-badge&logo=npm&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Yarn](https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white)

### Database and Cloud
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)


# Features

## 1. User Features

  ### 1.1. User Registration and Login
  #### The registration form includes multiple input fields such as full name, email, and password, with real-time validation. Users receive immediate feedback if the input is invalid (e.g., incorrect email format).
  ![Registration](./public/introduce/sign-up.png)

  #### The login page features an intuitive design with built-in validation. Users can only enter their password after providing a valid email address or phone number. The system checks whether the email exists and whether the entered password matches the associated account.
  ![Login](./public/introduce/sign-in.png)

  ### 1.2. Product Listing and Filtering
  #### The product listing page features a minimalist design with integrated filtering and sorting options. The user-friendly interface allows customers to preview product images in different colours by simply hovering over the colour options, without needing to open the product detail page.
  ![list-product](./public/introduce/list-product.png)
  #### Multiple filters for refined product search.
  ![Filter](./public/introduce/filter.png)
  #### After finding a desired product, users can click on it to view detailed information.
  ![product-detail](./public/introduce/product-detail.png)

  ### 1.3. Product Search
  #### Instead of manually browsing the product page, users can use the search bar to quickly find items:

  - Previous search queries are saved for convenience

  - A preview of matching products is displayed instantly, allowing users to view details and add items to the cart directly

  ![search-recent](./public/introduce/search-recent.png)
  ![search-detail](./public/introduce/search-detail.png)

  - Alternatively, users can navigate to the product listing page showing all search results based on the entered keywor

  ![search-result](./public/introduce/search-result.png)

  ### 1.4. Add Products to Shopping Cart
  - Products can be added to the cart directly from the product detail page
  - Users can adjust product quantity (increase or decrease)
  - Remove items from the cart
  - Product colour is displayed based on the selected option

  ![cart](./public/introduce/product-cart.png)

  ### 1.5. Order Checkout and Payment
  - Displays a detailed summary of the order
  - Allows users to edit recipient information: name, phone number, and delivery address
  - Offers multiple simulated payment method options

  ![checkout-payment](./public/introduce/check-out.png)
  ![checkout-payment](./public/introduce/check-out-2.png)

  ### 1.6. Profile and Order History
  - Displays user profile information

  ![profile](./public/introduce/profile.png)
  - Shows a list of previously placed orders with details

  ![order-history](./public/introduce/order-detail.png)

  ### 1.7. Integrated Customer Support Chatbot
  - A built-in chatbot is available to assist users
  - Although currently in the testing phase, it works reliably
  - Allows users to search for products and check availability in real time

  <img src="./public/introduce/chatbot.png" width="300px" alt="chatbot">

## 2. Admin Features
  ### 2.1. Dashboard
  - Visual dashboard with interactive charts and analytics
  - Tracks total active products, registered users, and completed orders
  - Displays revenue and top-selling products for business insights

  ![dashboard](./public/introduce/dashboard.png)

  ### 2.2. Customer Management
  - User-friendly interface for managing customer accounts

  ![customer-management](./public/introduce/admin-customer.png)
  - View detailed customer information and their order history

  ![customer-detail](./public/introduce/customer-detail.png)
  - Only managers are allowed to delete customer accounts
  - Administrators can assign specific roles to members (Admin, Manager, Client)
  - Includes sorting and searching features for easier customer management


  ### 2.3. Product Management
  - User-friendly interface for managing products

  ![product](./public/introduce/admin-product.png)
  - Add new products and edit existing ones

  ![add-product](./public/introduce/add-product.png)
  ![edit-product](./public/introduce/edit-product-info.png)
  ![edit-product](./public/introduce/edit-product-colors.png)
  - Delete products with confirmation alert to prevent accidental removal
  - Includes sorting and searching features for easier product management

  ### 2.4. Order Management
  - User-friendly interface for managing customer orders
  - View full order details including items, total price, and customer info
  - Order deletion is restricted to managers for safety
  - Supports sorting and searching to quickly find specific orders
  - Allow update order status

  ![order-management](./public/introduce/admin-order.png)

# Installation

Make sure you have the following installed on your machine:

- Node.js (version 18 or above)

- Yarn

- MongoDB (local or cloud, e.g. MongoDB Atlas)

- VS Code

### # 1. Clone the repository
```
git clone https://github.com/GiaDuccc/shop-web.git
git clone https://github.com/GiaDuccc/shop-api.git
```

### # 2. Navigate to the project folder
```cd shop-web```

### # 3. Install dependencies
```yarn install```

### # 4. Open file constants.js
```
cd \src\utils\
code constants.js


let apiRoot = ''
if (process.env.BUILD_MODE === 'dev') {
  apiRoot = 'your localhost'
}
if (process.env.BUILD_MODE === 'production') {
  apiRoot = 'production link'
}

export const API_ROOT = apiRoot
```

### # 5. Open file constants.js















