# Shopping Website

Welcome to our Shopping Website! This README will guide you through the features, setup, and usage of our comprehensive e-commerce platform.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Contributing](#contributing)

## Features

### User Features

- **Product Browsing**: Users can browse through a variety of product categories including pillows, bolsters, mattresses, and cushions.
- **Product Details**: View detailed information about each product.
- **Add to Cart**: Users can add products to their cart.
- **Cart Management**: View, update, and remove products from the cart.
- **Rating and Reviews**: Rate and review purchased products.
- **Order Tracking**: Track the status of orders.
- **Online Payment**: Secure online payment options.
- **User Authentication**: Secure user authentication and authorization.
- **Profile Management**: Manage user profile and order history.

### Admin Features

- **Product Management**: Add, update, and delete products.
- **User Management**: Search for users and manage user accounts.
- **Order Tracking**: Track and update the status of orders.
- **Ads Management**: Display and manage advertisements.
- **Dashboard**: View website statistics and analytics.

## Technologies Used

- **Frontend**: Next.js, React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: NextAuth.js
- **State Management**: Redux
- **Payment Gateway**: Razorpay
- **Deployment**: Vercel

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/shopping-website.git
   cd shopping-website
   ```

## Install dependencies

bash
Copy code
npm install

## Setup environment variables

Create a .env.local file in the root directory and add your environment variables. Here is an example:

Copy code
MONGODB_URI=
JWT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
DOMAIN=http://localhost:3000
EMAIL_HOST=lsmtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=
EMAIL_PASSWORD=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

## Run the development server

npm run dev
Open your browser

Go to http://localhost:3000

## Usage

### User Actions

1. **Register and Login**

- Navigate to the registration or login page to create an account or log in to an existing account.

2. **Browse Products**

- Browse through different product categories and view product details.

3. **Add to Cart**

- Add desired products to the cart and manage the cart contents.

4. **Place Order**

- Proceed to checkout, provide shipping details, and complete the payment process.

5. **Track Order**

- Track the status of placed orders through the user dashboard.

6. **Rate and Review**

- Rate and review products that have been purchased.

## Admin Actions

1. **Manage Products**

- Access the admin dashboard to add, update, or delete products.

2. **Manage Users**

- Search for users and manage user orders.

3. **Track Orders**

- View and update the status of all orders.

4. **Manage Ads**

- Add, update, or remove advertisements on the website.

## Contributing

We welcome contributions to improve our shopping website! To contribute, follow these steps:

- Fork the repository
- Create a new branch (git checkout -b feature-branch)
- Make your changes
- Commit your changes (git commit -m 'Add new feature')
- Push to the branch (git push origin feature-branch)
- Open a pull request

Thank you for using our shopping website! We hope you have a great experience. If you have any questions or feedback, feel free to reach out to us.
