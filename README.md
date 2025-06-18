# Frontend - Role-Based Access Control (RBAC) Dashboard

A modern React-based frontend application for managing enterprises, users, roles, permissions, employees, and products with role-based access control and a beautiful, responsive UI.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with shadcn/ui components
- **Role-Based Access Control**: Dynamic navigation and permissions based on user roles
- **Multi-Module Management**: Complete CRUD operations for all modules
- **Real-time Validation**: Form validation with Zod schemas
- **State Management**: Redux Toolkit with RTK Query for API management
- **Responsive Design**: Mobile-first approach with responsive dialogs
- **Dark/Light Mode**: Theme support (ready for implementation)
- **Dashboard Analytics**: Role-based statistics and recent activities

## 🛠️ Tech Stack

- **Framework**: React 18 with Vite
- **UI Library**: shadcn/ui components
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit + RTK Query
- **Form Handling**: React Hook Form + Zod validation
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **HTTP Client**: RTK Query (built-in)

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Backend API running (see backend README)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd fe
npm install
```

### 2. Environment Configuration

Create a `.env` file in the frontend directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api

# App Configuration
VITE_APP_NAME=RBAC Dashboard
VITE_APP_VERSION=1.0.0
```

### 3. Start Development Server

```bash
npm run dev
```

The application will start on `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
fe/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── data-table.jsx # Data table component
│   │   ├── responsive-dialog.jsx # Responsive dialog
│   │   └── generated-avatar.jsx # Avatar component
│   ├── hooks/             # Custom React hooks
│   │   ├── use-mobile.js  # Mobile detection hook
│   │   └── useUserDetails.js # User details hook
│   ├── layouts/           # Layout components
│   │   └── module/        # Module layout with sidebar
│   ├── lib/               # Utility libraries
│   │   ├── utils.js       # Utility functions
│   │   └── transferResponse.js # Error response handling
│   ├── molecules/         # Form components
│   │   ├── form-error.jsx # Error display component
│   │   ├── password.jsx   # Password input component
│   │   └── select.jsx     # Select component
│   ├── navigation/        # Navigation components
│   │   ├── auth/          # Authentication routes
│   │   └── public/        # Public routes
│   ├── pages/             # Page components
│   │   ├── Login/         # Login page
│   │   ├── Loading/       # Loading states
│   │   └── Modules/       # Module pages
│   │       ├── Dashboard/ # Dashboard module
│   │       ├── UserManagement/ # User management
│   │       ├── RoleManagement/ # Role management
│   │       ├── EnterPriseManagement/ # Enterprise management
│   │       ├── EmployeeManagement/ # Employee management
│   │       └── ProductManagement/ # Product management
│   ├── redux/             # Redux store and slices
│   │   ├── api/           # RTK Query API
│   │   ├── slice/         # Redux slices
│   │   └── store/         # Store configuration
│   ├── App.jsx            # Main App component
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
└── tailwind.config.js     # Tailwind CSS configuration
```

## 🎨 UI Components

### Core Components

#### Data Table
- Sortable columns
- Pagination
- Search functionality
- Bulk actions
- Responsive design

#### Responsive Dialog
- Mobile drawer on small screens
- Desktop modal on large screens
- Consistent API across devices

#### Form Components
- Zod schema validation
- Error handling
- Loading states
- Custom select components

### Module Components

Each module includes:
- **List View**: Data table with CRUD operations
- **Form Component**: Create/Edit forms with validation
- **Delete Modal**: Confirmation dialogs
- **API Integration**: RTK Query hooks

## 🔐 Authentication & Authorization

### Login Flow
1. User enters username/password
2. JWT token received and stored
3. User data loaded into Redux store
4. Permissions fetched and cached
5. Navigation updated based on permissions

### Permission System
- **Dynamic Navigation**: Only shows modules user has access to
- **Action Permissions**: Buttons/actions hidden based on permissions
- **Route Protection**: Unauthorized routes redirect to login

### User Roles
- **Admin**: Full access to all modules
- **Manager**: Configurable permissions per module
- **User**: Limited access based on role

## 📊 Modules Overview

### Dashboard
- Role-based statistics
- Recent activities
- Quick access to common actions
- Visual charts and metrics

### User Management
- Create, read, update, delete users
- Role assignment
- Status management (active/inactive)
- Enterprise association

### Role Management
- Create and manage roles
- Granular permissions (read, create, update, delete)
- Permission presets (Full Access, Read Only)
- Module-specific permissions

### Enterprise Management
- Multi-enterprise support
- Enterprise details and contact info
- Status management
- Location tracking

### Employee Management
- Employee records within enterprises
- Department and role tracking
- Salary management
- Status tracking

### Product Management
- Product catalog management
- SKU and pricing
- Category organization
- Enterprise and employee associations

## 🔧 Configuration

### API Configuration
```javascript
// src/redux/api/index.js
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // API endpoints
  }),
});
```

### Theme Configuration
```javascript
// tailwind.config.js
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // ... more colors
      },
    },
  },
};
```

## 🚀 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues

# Component Generation
npx shadcn@latest add [component]  # Add shadcn/ui component
```

### Code Style

- **ESLint**: Configured with React and TypeScript rules
- **Prettier**: Code formatting
- **Conventional Commits**: Git commit message format

### Component Guidelines

1. **Functional Components**: Use React hooks
2. **Props Validation**: Use PropTypes or TypeScript
3. **Error Boundaries**: Wrap components in error boundaries
4. **Loading States**: Always show loading indicators
5. **Accessibility**: Use semantic HTML and ARIA labels

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px (drawer navigation)
- **Tablet**: 768px - 1024px (responsive layout)
- **Desktop**: > 1024px (full layout)

### Mobile Features
- Drawer navigation
- Touch-friendly buttons
- Swipe gestures
- Optimized forms

## 🔒 Security

### Token Management
- JWT tokens stored in localStorage
- Automatic token refresh
- Secure token transmission
- Token expiration handling

### Input Validation
- Client-side validation with Zod
- Server-side validation
- XSS protection
- CSRF protection

## 🧪 Testing

### Manual Testing
```bash
# Test login
1. Navigate to /login
2. Enter credentials (admin/admin123)
3. Verify redirect to dashboard

# Test permissions
1. Create user with limited role
2. Login with new user
3. Verify limited navigation
```

### Component Testing
```bash
# Run tests (when implemented)
npm test

# Run tests with coverage
npm run test:coverage
```

## 🚀 Deployment

### Build Process
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview build
npm run preview
```

### Deployment Options

#### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Netlify
```bash
# Build and deploy
npm run build
# Upload dist/ folder to Netlify
```

#### Docker
```dockerfile
FROM node:16-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🔧 Troubleshooting

### Common Issues

1. **API Connection Error**
   - Check backend server is running
   - Verify API URL in .env
   - Check CORS configuration

2. **Authentication Issues**
   - Clear localStorage
   - Check JWT token format
   - Verify token expiration

3. **Permission Issues**
   - Check user role assignment
   - Verify role permissions
   - Clear browser cache

4. **Build Errors**
   - Clear node_modules and reinstall
   - Check Node.js version
   - Verify all dependencies

### Debug Mode
```bash
# Enable debug logging
DEBUG=* npm run dev

# Check Redux DevTools
# Install Redux DevTools browser extension
```

## 📊 Performance

### Optimization Techniques
- **Code Splitting**: Lazy loading of modules
- **Memoization**: React.memo and useMemo
- **Bundle Analysis**: Analyze bundle size
- **Image Optimization**: Compressed images
- **Caching**: API response caching with RTK Query

### Bundle Analysis
```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist
```

## 📞 Support

### Getting Help
1. Check the troubleshooting section
2. Review component documentation
3. Check API documentation
4. Verify environment configuration

### Contributing
1. Fork the repository
2. Create feature branch
3. Make changes
4. Add tests
5. Submit pull request

## 📄 License

This project is licensed under the MIT License.

## 🔄 Updates

### Version History
- **v1.0.0**: Initial release with all core modules
- **v1.1.0**: Added dashboard analytics
- **v1.2.0**: Enhanced permission system

### Roadmap
- [ ] Dark mode implementation
- [ ] Advanced filtering
- [ ] Export functionality
- [ ] Real-time notifications
- [ ] Mobile app
