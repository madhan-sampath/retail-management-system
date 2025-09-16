# Retail Management System

A comprehensive retail management system built with Angular frontend and Node.js backend.

## 🏗️ Project Structure

```
retail-management-system/
├── backend/                 # Node.js/Express API
│   ├── src/
│   │   ├── controllers/     # API controllers
│   │   ├── models/          # Data models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Custom middleware
│   │   └── utils/           # Utility functions
│   ├── data/               # JSON data storage
│   └── package.json
├── frontend-new/           # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/  # Angular components
│   │   │   ├── services/    # Angular services
│   │   │   └── shared/      # Shared components
│   │   └── environments/    # Environment configs
│   └── package.json
├── database/               # Database schemas and migrations
└── package.json           # Root package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm (v8 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd retail-management-system
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Start both frontend and backend**
   ```bash
   npm run start:all
   ```

### Individual Services

**Backend only:**
```bash
cd backend
npm install
npm run dev
```

**Frontend only:**
```bash
cd frontend-new
npm install
npm start
```

## 📋 Features

### Backend API
- ✅ RESTful API with Express.js
- ✅ JWT Authentication
- ✅ Role-based access control
- ✅ Data validation and sanitization
- ✅ Error handling middleware
- ✅ CORS configuration
- ✅ Health check endpoint

### Frontend
- ✅ Angular 20+ with standalone components
- ✅ Bootstrap 5 for styling
- ✅ FontAwesome icons
- ✅ Responsive design
- ✅ Modern UI/UX
- ✅ Service layer architecture

### Core Modules
- 📦 **Products Management** - Add, edit, delete products
- 🛒 **Orders Management** - Process and track orders
- 👥 **Customers Management** - Customer database
- 📊 **Reports & Analytics** - Business insights
- 📦 **Inventory Management** - Stock tracking
- 🏪 **Suppliers Management** - Supplier relationships
- 💰 **Payments** - Payment processing
- 🔐 **User Management** - User accounts and roles

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev          # Start with nodemon
npm test            # Run tests
npm run lint        # Lint code
```

### Frontend Development
```bash
cd frontend-new
npm start           # Start dev server
npm run build       # Build for production
npm test            # Run tests
npm run lint        # Lint code
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order

### Customers
- `GET /api/customers` - Get all customers
- `POST /api/customers` - Create customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

## 🔒 Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key
CORS_ORIGIN=http://localhost:4200
API_PREFIX=/api
```

## 📱 Frontend URLs

- **Dashboard**: http://localhost:4200/dashboard
- **Products**: http://localhost:4200/products
- **Orders**: http://localhost:4200/orders
- **Customers**: http://localhost:4200/customers
- **Reports**: http://localhost:4200/reports

## 🛠️ Technologies Used

### Backend
- Node.js
- Express.js
- JWT for authentication
- CORS for cross-origin requests
- bcrypt for password hashing
- Sequelize ORM (for future database integration)

### Frontend
- Angular 20+
- TypeScript
- Bootstrap 5
- FontAwesome
- RxJS for reactive programming

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support, email support@retailmanagement.com or create an issue in the repository.
