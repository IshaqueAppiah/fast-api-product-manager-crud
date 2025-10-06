# Docker Commands Reference

## Quick Start

### Development (with hot reload)
```bash
docker-compose -f docker-compose.dev.yml up --build
```

### Production
```bash
docker-compose up --build
```

## Individual Services

### Build and run backend only
```bash
cd backend
docker build -t fastapi-backend .
docker run -p 8000:8000 --env-file .env fastapi-backend
```

### Build and run frontend only
```bash
cd frontend
docker build -t react-frontend .
docker run -p 3000:80 react-frontend
```

## Useful Commands

### View logs
```bash
docker-compose logs -f [service_name]
```

### Stop all services
```bash
docker-compose down
```

### Stop and remove volumes (⚠️ deletes data)
```bash
docker-compose down -v
```

### Rebuild specific service
```bash
docker-compose up --build [service_name]
```

### Execute commands in running container
```bash
docker-compose exec backend bash
docker-compose exec frontend sh
```

### Database access
```bash
docker-compose exec db psql -U postgres -d telusko
```

## Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://postgres:admin@db:5432/telusko
```

### Frontend (build time)
```env
REACT_APP_API_URL=http://localhost:8000
```

## Ports
- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- Database: localhost:5432
- Nginx (production): http://localhost:80

## Troubleshooting

### Clear all Docker data
```bash
docker system prune -a --volumes
```

### Check service health
```bash
docker-compose ps
```

### View resource usage
```bash
docker stats
```