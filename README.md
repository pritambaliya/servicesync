# ServiceSync - Local Service Booking Platform

## Project Overview

ServiceSync is a full-stack service marketplace platform that connects customers with trusted local service providers such as electricians, plumbers, carpenters, and other professionals.

The platform allows customers to find nearby service providers, book services, manage appointments, and communicate efficiently. Service providers can create profiles, receive booking requests, and manage their services.

Live Website:
https://servicesync-enrn.onrender.com/

---

## Problem Statement

Finding reliable local service professionals is often difficult and time-consuming. Customers need a simple platform where they can discover, compare, and book verified service providers easily.

ServiceSync solves this problem by providing a digital bridge between customers and service providers.

---

## Key Features

### Customer Features
- User registration and authentication
- Search service providers based on category
- View provider profiles and services
- Book available services
- Manage bookings
- Give reviews and ratings
- Update profile information

### Service Provider Features
- Provider registration
- Create and manage service profiles
- Add service categories
- Receive customer booking requests
- Manage booking status
- Track customer interactions

### Security Features
- Secure authentication system
- Protected routes
- Password encryption
- Role-based access control (Customer / Provider)

---

## Tech Stack

### Frontend
- React.js
- JavaScript
- Axios
- React Router

### Backend
- Node.js
- Express.js
- REST APIs

### Database
- MongoDB
- Mongoose ODM

### Other Technologies
- JWT Authentication
- Email Verification
- Integrated Cloudinary for image storage
- Google map API
- Cloud Deployment (Render)

---

## Application Workflow

1. User creates an account
2. User selects role:
   - Customer
   - Service Provider
3. Customer searches required services
4. Customer books a provider
5. Provider receives booking request
6. Service is completed and customer can provide feedback
