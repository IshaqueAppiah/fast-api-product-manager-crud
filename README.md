# FastAPI Product Manager CRUD

A full-stack product management system built with FastAPI, PostgreSQL, and a modern HTML frontend, all containerized with Docker.

## 🚀 Features

- **Complete CRUD Operations**: Create, Read, Update, Delete products
- **Modern HTML Frontend**: Beautiful, responsive interface with real-time statistics
- **FastAPI Backend**: High-performance REST API with automatic documentation
- **PostgreSQL Database**: Robust database with persistent storage
- **Docker Containerization**: Easy deployment with Docker Compose
- **CORS Enabled**: Frontend-backend communication without restrictions
- **Input Validation**: Form validation and error handling
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Tech Stack

### Backend
- **FastAPI**: Modern Python web framework
- **PostgreSQL**: Relational database
- **SQLAlchemy**: ORM for database operations
- **Pydantic**: Data validation and serialization
- **Uvicorn**: ASGI server

### Frontend
- **HTML/CSS/JavaScript**: Modern vanilla web technologies
- **Nginx**: Web server for serving static files
- **Responsive Design**: Mobile-first approach

### DevOps
- **Docker**: Containerization
- **Docker Compose**: Multi-container orchestration
- **Environment Variables**: Secure configuration management

## 📋 Prerequisites

- Docker Desktop
- Docker Compose
- Git

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/IshaqueAppiah/fast-api-product-manager-crud.git
cd fast-api-product-manager-crud
```

### 2. Setup Environment Variables
```bash
# Copy the example environment file
cp .env.docker.example .env.docker

# Edit .env.docker with your preferred database credentials
# The default values will work for local development
```

### 3. Start the Application
```bash
docker-compose -f docker-compose.dev.yml up -d
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 📱 Application Interface

### Frontend Features
- 📊 **Dashboard**: Real-time statistics (total products, total value, total quantity)
- ➕ **Add Products**: Form with validation for creating new products
- 📋 **Product List**: Grid view of all products with details
- 🗑️ **Delete Products**: Remove products with confirmation dialog
- 📱 **Responsive**: Works on all screen sizes

### API Endpoints
```
GET  /products        - List all products
POST /product         - Create new product
GET  /product/{id}    - Get single product
PUT  /product/{id}    - Update product
DELETE /product/{id}  - Delete product
GET  /               - Health check
POST /reset-db        - Reset database with sample data
```

## 🏗️ Project Structure

```
fast-api-product-manager-crud/
├── backend/
│   ├── Dockerfile              # Backend container configuration
│   ├── main.py                 # FastAPI application
│   ├── models.py               # Pydantic models
│   ├── database.py             # Database connection
│   ├── database_models.py      # SQLAlchemy models
│   ├── requirements.txt        # Python dependencies
│   └── .env                    # Environment variables
├── frontend/
│   ├── Dockerfile.html         # Frontend container configuration
│   ├── index.html              # HTML application
│   └── nginx.conf              # Nginx configuration
├── docker-compose.dev.yml      # Development environment
├── docker-compose.prod.yml     # Production environment
└── README.md                   # Project documentation
```

## 🔧 Development

### Environment Variables

#### Docker Environment
Copy the example environment file and customize it:
```bash
cp .env.docker.example .env.docker
```

The `.env.docker` file contains:
```env
# Database Configuration
POSTGRES_DB=your_database_name
POSTGRES_USER=your_username  
POSTGRES_PASSWORD=your_secure_password

# Backend Configuration
DATABASE_URL=postgresql://your_username:your_secure_password@db:5432/your_database_name
```

#### Backend Development
Create a `.env` file in the `backend` directory:
```env
DATABASE_URL=postgresql://postgres:admin@localhost:5432/telusko
```

### Running Locally (without Docker)
1. **Backend**:
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

2. **Frontend**: Serve the `frontend/index.html` file with any web server.

### Docker Commands
```bash
# Start all services
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs

# Stop all services
docker-compose -f docker-compose.dev.yml down

# Rebuild containers
docker-compose -f docker-compose.dev.yml build
```

## 🐳 Docker Services

| Service | Port | Description |
|---------|------|-------------|
| `db` | 5432 | PostgreSQL database |
| `backend` | 8000 | FastAPI REST API |
| `frontend` | 3000 | HTML application (served by nginx) |

## 📊 Database Schema

### Products Table
```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity INTEGER NOT NULL
);
```

## 🧪 Testing

### Manual Testing
1. Open http://localhost:3000
2. Add a new product using the form
3. Verify it appears in the product list
4. Test the delete functionality
5. Check that statistics update correctly

### API Testing
```bash
# Get all products
curl http://localhost:8000/products

# Create a product
curl -X POST http://localhost:8000/product \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","description":"Test product","price":10.99,"quantity":5}'

# Delete a product
curl -X DELETE http://localhost:8000/product/1
```

## 🚀 Production Deployment

For production deployment, use the production Docker Compose file:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- FastAPI for the excellent Python web framework
- PostgreSQL for the robust database
- Docker for containerization
- Nginx for serving static files

## 📞 Contact

Ishaque Appiah - [@IshaqueAppiah](https://github.com/IshaqueAppiah)

Project Link: [https://github.com/IshaqueAppiah/fast-api-product-manager-crud](https://github.com/IshaqueAppiah/fast-api-product-manager-crud)

---

⭐ **Star this repository if you found it helpful!**
cd fastapi

# Start development environment with hot reload
docker-compose -f docker-compose.dev.yml up --build

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

### Option 2: Production Mode
```bash
# Start production environment
docker-compose up --build

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
```

## 📁 Project Structure

```
fastapi/
├── backend/                 # FastAPI Backend
│   ├── main.py             # FastAPI application
│   ├── models.py           # Pydantic models
│   ├── database.py         # Database configuration
│   ├── database_models.py  # SQLAlchemy models
│   ├── requirements.txt    # Python dependencies
│   ├── Dockerfile          # Backend container config
│   ├── .dockerignore       # Docker ignore rules
│   ├── .env               # Environment variables
│   └── .env.example       # Environment template
├── frontend/               # React Frontend
│   ├── src/               # React source code
│   ├── public/            # Static assets
│   ├── package.json       # Node.js dependencies
│   ├── Dockerfile         # Frontend container config
│   ├── nginx.conf         # Nginx configuration
│   └── .dockerignore      # Docker ignore rules
├── docker-compose.yml     # Production Docker setup
├── docker-compose.dev.yml # Development Docker setup
├── .env.docker           # Docker environment template
├── DOCKER.md             # Docker commands reference
└── README.md             # This file
```

## 🐳 Docker Setup

### Prerequisites
- Docker Desktop installed
- Docker Compose available

### Development Environment
```bash
# Start all services with hot reload
docker-compose -f docker-compose.dev.yml up --build

# Stop services
docker-compose -f docker-compose.dev.yml down

# View logs
docker-compose -f docker-compose.dev.yml logs -f
```

### Production Environment
```bash
# Start production services
docker-compose up --build -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f [service_name]
```

### Individual Services
```bash
# Backend only
cd backend && docker build -t fastapi-backend .
docker run -p 8000:8000 fastapi-backend

# Frontend only
cd frontend && docker build -t react-frontend .
docker run -p 3000:80 react-frontend
```

### Database Access
```bash
# Connect to PostgreSQL
docker-compose exec db psql -U postgres -d telusko

# Reset database (development)
curl -X POST http://localhost:8000/reset-db
```

## �️ Docker Architecture

### Container Services
- **🐍 Backend**: FastAPI application with auto-reload in development
- **⚛️ Frontend**: React app served by Nginx in production
- **🐘 Database**: PostgreSQL with persistent volumes
- **🌐 Nginx**: Reverse proxy for production (optional)

### Network & Volumes
- **fastapi_network**: Internal Docker network for service communication
- **postgres_data**: Persistent volume for database storage

### Environment Configuration
```bash
# Copy environment template
cp .env.docker .env

# Edit environment variables
DATABASE_URL=postgresql://postgres:admin@db:5432/telusko
REACT_APP_API_URL=http://localhost:8000
```

### Docker Commands Reference

#### Start Services
```bash
# Development with hot reload
docker-compose -f docker-compose.dev.yml up --build

# Production mode
docker-compose up --build -d

# Start specific service
docker-compose up backend
```

#### Management Commands
```bash
# Stop all services
docker-compose down

# Stop and remove volumes (⚠️ deletes data)
docker-compose down -v

# View service status
docker-compose ps

# View logs
docker-compose logs -f [service_name]

# Execute commands in container
docker-compose exec backend bash
docker-compose exec frontend sh
```

#### Troubleshooting
```bash
# Rebuild specific service
docker-compose up --build backend

# Clear Docker cache
docker system prune -a

# View resource usage
docker stats

# Restart specific service
docker-compose restart backend
```

### Health Checks
All services include health checks for monitoring:
- **Backend**: `GET /` endpoint
- **Frontend**: Nginx health endpoint
- **Database**: PostgreSQL readiness check

## 🚀 Deployment Options

### Local Development
1. **With Docker (Recommended)**:
   ```bash
   docker-compose -f docker-compose.dev.yml up --build
   ```

2. **Manual Setup**: Follow the manual setup instructions below

### Production Deployment
1. **Docker Compose**: 
   ```bash
   docker-compose up --build -d
   ```

2. **Container Registry**: 
   ```bash
   docker tag fastapi-backend:latest your-registry/fastapi-backend:latest
   docker push your-registry/fastapi-backend:latest
   ```

3. **Kubernetes**: Use the generated Docker images with K8s manifests

### Cloud Deployment
- **AWS**: Use ECS, EKS, or Elastic Beanstalk
- **Google Cloud**: Use Cloud Run, GKE, or App Engine
- **Azure**: Use Container Instances, AKS, or App Service
- **DigitalOcean**: Use App Platform or Kubernetes

## �💻 Manual Setup (Alternative)

If you prefer to run without Docker:

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Activate virtual environment:**
   ```bash
   # From the root directory
   venv\\Scripts\\activate  # Windows
   ```

3. **Install Python dependencies:**
   ```bash
   pip install fastapi uvicorn sqlalchemy psycopg2-binary python-dotenv
   ```

4. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Update database credentials in `.env`

5. **Run the backend:**
   ```bash
   cd backend
   uvicorn main:app --reload --port 8000
   ```

   The API will be available at: http://localhost:8000
   API documentation: http://localhost:8000/docs

## Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

   The frontend will be available at: http://localhost:3000

## API Endpoints

### Products
- `GET /products` - Get all products
- `GET /product/{id}` - Get product by ID
- `POST /product` - Create new product
- `PUT /product/{id}` - Update existing product
- `DELETE /product/{id}` - Delete product

### Health Check
- `GET /` - Health check endpoint

## ✨ Features

### 🐳 Docker & DevOps
- ✅ **Full Containerization**: Complete Docker setup for all services
- ✅ **Development Environment**: Hot reload with docker-compose.dev.yml
- ✅ **Production Ready**: Optimized multi-stage builds
- ✅ **Health Monitoring**: Built-in health checks for all services
- ✅ **Persistent Data**: PostgreSQL data persistence with Docker volumes
- ✅ **Network Isolation**: Secure internal Docker networking
- ✅ **Environment Management**: Template-based configuration
- ✅ **Zero Setup**: One command starts entire application stack

### 🚀 Backend (FastAPI)
- ✅ RESTful API for product management
- ✅ PostgreSQL database integration
- ✅ SQLAlchemy ORM with proper error handling
- ✅ Environment variable configuration
- ✅ CORS enabled for frontend integration
- ✅ Automatic API documentation with Swagger
- ✅ Database initialization and reset endpoints
- ✅ Comprehensive error handling and validation
- ✅ Security best practices (non-root containers)

### ⚛️ Frontend (React + TypeScript)
- ✅ Modern React with TypeScript
- ✅ Product listing with responsive grid layout
- ✅ Create, Read, Update, Delete (CRUD) operations
- ✅ Modal forms for adding/editing products
- ✅ Form validation and error handling
- ✅ Loading states and user feedback
- ✅ API integration with Axios
- ✅ Production build with Nginx optimization
- ✅ PWA-ready with service worker support

### 🛡️ Security & Production
- ✅ Non-root Docker containers
- ✅ Security headers in Nginx configuration
- ✅ Environment variable separation
- ✅ CORS configuration for multiple environments
- ✅ Health check endpoints for monitoring
- ✅ Database connection pooling
- ✅ Static file optimization and caching

## 🎯 Development

### 🐳 With Docker (Recommended)
```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up --build

# View logs in real-time
docker-compose -f docker-compose.dev.yml logs -f

# Access services
# Frontend: http://localhost:3000
# Backend: http://localhost:8000
# API Docs: http://localhost:8000/docs
# Database: localhost:5432
```

### 💻 Manual Development (Alternative)

#### Backend Terminal:
```bash
cd backend
uvicorn main:app --reload --port 8000
```

#### Frontend Terminal:
```bash
cd frontend
npm start
```

### 🔄 Development Workflow

1. **Make Changes**: Edit code in your favorite IDE
2. **Auto Reload**: Docker dev environment automatically reloads
3. **Test API**: Use http://localhost:8000/docs for API testing
4. **View Frontend**: Changes appear instantly at http://localhost:3000
5. **Database**: Access via `docker-compose exec db psql -U postgres -d telusko`

### 📊 Monitoring & Debugging
```bash
# View service status
docker-compose ps

# Monitor resource usage
docker stats

# Access container shell
docker-compose exec backend bash
docker-compose exec frontend sh

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db
```

## 🌟 Why Docker?

### 🚀 Development Benefits
- **⚡ One Command Setup**: `docker-compose up` starts everything
- **🔄 Hot Reload**: Code changes reflect immediately
- **🏗️ Consistent Environment**: Same setup across all machines
- **🧹 Clean Workspace**: No need to install dependencies locally
- **🔗 Service Integration**: Database, backend, and frontend work together seamlessly

### 🏭 Production Benefits
- **📦 Optimized Images**: Multi-stage builds for smaller containers
- **🛡️ Security**: Non-root users, minimal attack surface
- **📊 Monitoring**: Built-in health checks for all services
- **🔧 Scalability**: Ready for orchestration platforms
- **🌍 Portability**: Runs anywhere Docker is supported

### 🎛️ Operations Benefits
- **📈 Monitoring**: Health check endpoints for load balancers
- **🔄 CI/CD Ready**: Easy integration with deployment pipelines
- **☸️ Kubernetes**: Ready for container orchestration
- **📋 Logging**: Centralized log collection
- **🔧 Maintenance**: Easy updates and rollbacks

### Database Migration

The application automatically creates tables on startup. Make sure your PostgreSQL database is running and accessible with the credentials in your `.env` file.

## Environment Variables

Create a `.env` file in the backend directory:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
```

## Security Notes

- The `.env` file containing database credentials is excluded from version control
- CORS is configured to allow requests from the frontend (localhost:3000)
- In production, update CORS settings to only allow your domain

## Production Deployment

### Backend
- Use a production WSGI server like Gunicorn
- Set up proper environment variables
- Configure database with production credentials
- Enable HTTPS

### Frontend
- Build the production bundle: `npm run build`
- Serve static files with a web server like Nginx
- Update API base URL for production backend

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).