# RocketDrop Backend Setup Guide

## Overview

RocketDrop is a full-stack e-commerce platform for exclusive sneaker drops. This guide covers the backend setup using Spring Boot, MySQL, and JWT authentication.

## Prerequisites

- **Java 17+** - Spring Boot 4.0.3 requires Java 17 or higher
- **Maven 3.6+** - Build tool
- **MySQL 8.0+** - Database server
- **Git** - Version control (optional)

## System Requirements

- **OS**: Windows, macOS, or Linux
- **RAM**: 2GB minimum (4GB recommended)
- **Storage**: 500MB for dependencies + database
- **Network**: Internet for Maven dependency download

## Installation

### Step 1: Set Up MySQL Database

1. **Install MySQL Server** (if not already installed)
   - Download from https://dev.mysql.com/downloads/mysql/
   - Follow installation wizard
   - Note your root password

2. **Create Database and User**
   
   Using MySQL Workbench or MySQL CLI:
   
   ```sql
   -- Connect as root user
   
   -- Create database
   CREATE DATABASE IF NOT EXISTS rocketdrop_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   
   -- Create dedicated user (optional but recommended)
   CREATE USER 'rocketdrop'@'localhost' IDENTIFIED BY 'RocketDrop@123';
   
   -- Grant privileges
   GRANT ALL PRIVILEGES ON rocketdrop_db.* TO 'rocketdrop'@'localhost';
   FLUSH PRIVILEGES;
   ```
   
   Or use the default credentials:
   - **Username**: root
   - **Password**: Mundke@22
   - **Database**: rocketdrop_db
   - **Host**: localhost:3306

3. **Verify Connection**
   ```bash
   mysql -u root -p -h localhost
   SHOW DATABASES;
   ```

### Step 2: Clone Backend Project

```bash
# Navigate to your projects folder
cd d:\Mohil\FSJ

# Navigate to RocketDrop backend
cd RocketDrop/backend
```

### Step 3: Configure Application Properties

Edit `src/main/resources/application.properties`:

```properties
# Server Configuration
server.port=8080
server.servlet.context-path=/

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/rocketdrop_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=Mundke@22
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate Configuration
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=true

# JWT Configuration
jwt.secret=RocketDropSecretKeyForJwtSigningNeeds32Chars!
jwt.access.expiration=86400000
jwt.refresh.expiration=604800000

# Logging
logging.level.root=INFO
logging.level.com.rocketdrop=DEBUG
```

### Step 4: Build Project

```bash
# Clean and build
mvn clean install

# Or skip tests for faster build
mvn clean install -DskipTests
```

**Expected Output:**
```
BUILD SUCCESS
Total time: XX.XXs
```

**Troubleshooting:**
- If Maven is not found, add Maven `bin` folder to PATH
- If Java version error, verify `java -version` shows 17+

### Step 5: Run Backend

```bash
# Option 1: Using Maven
mvn spring-boot:run

# Option 2: Using built JAR
java -jar target/backend-0.0.1-SNAPSHOT.jar

# Option 3: From IDE (IntelliJ/Eclipse)
# Right-click BackendApplication.java > Run
```

**Expected Output:**
```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_|\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::        (v4.0.3)

2024-03-30 12:00:00 [main] INFO - Starting BackendApplication v0.0.1-SNAPSHOT
...
2024-03-30 12:00:05 [main] INFO - Tomcat started on port 8080 (http)
2024-03-30 12:00:05 [main] INFO - Started BackendApplication in XX seconds
```

### Step 6: Verify Backend is Running

```bash
# Test API endpoint
curl http://localhost:8080/api/products

# Or open in browser
# http://localhost:8080/api/products
```

Expected response:
```json
{
  "content": [],
  "pageable": { ... },
  "totalElements": 0,
  "totalPages": 0
}
```

## API Documentation

### Base URL
```
http://localhost:8080/api
```

### Authentication Endpoints

**Register User**
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "SecurePassword123"
}

Response: 200 OK
{
  "user": { ... },
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc..."
}
```

**Login**
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePassword123"
}

Response: 200 OK
{
  "user": { ... },
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc..."
}
```

**Refresh Token**
```
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGc..."
}

Response: 200 OK
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc..."
}
```

### Product Endpoints

**Get All Products**
```
GET /api/products?page=0&size=20
Authorization: Bearer {token}

Response: 200 OK
{
  "content": [
    {
      "id": 1,
      "name": "Nike Air Max",
      "price": 12999.99,
      "category": "FOOTWEAR",
      "stock": 50
    }
  ],
  "totalElements": 100,
  "totalPages": 5
}
```

**Get Single Product**
```
GET /api/products/{id}
Authorization: Bearer {token}

Response: 200 OK
{
  "id": 1,
  "name": "Nike Air Max",
  "category": "FOOTWEAR",
  "price": 12999.99,
  "stock": 50,
  "description": "...",
  "images": [...]
}
```

**Search Products**
```
GET /api/products/search?keyword=nike&category=FOOTWEAR&page=0&size=20
Authorization: Bearer {token}

Response: 200 OK
{
  "content": [...],
  "totalElements": 10,
  "totalPages": 1
}
```

### Drop Endpoints

**Get All Drops**
```
GET /api/drops?page=0&size=20
Authorization: Bearer {token}

Response: 200 OK
{
  "content": [
    {
      "id": 1,
      "product": { ... },
      "dropTime": "2024-04-15T10:00:00Z",
      "stock": 1000,
      "status": "SCHEDULED"
    }
  ]
}
```

**Get Live Drops**
```
GET /api/drops/live
Authorization: Bearer {token}

Response: 200 OK
[
  {
    "id": 1,
    "product": { ... },
    "status": "LIVE",
    "stock": 500,
    "dropTime": "2024-03-30T10:00:00Z"
  }
]
```

**Get Upcoming Drops**
```
GET /api/drops/upcoming
Authorization: Bearer {token}

Response: 200 OK
[
  {
    "id": 2,
    "product": { ... },
    "status": "SCHEDULED",
    "stock": 800,
    "dropTime": "2024-04-05T10:00:00Z"
  }
]
```

## Database Schema

### User Table
```sql
CREATE TABLE user (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  role VARCHAR(20) DEFAULT 'USER',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Product Table
```sql
CREATE TABLE product (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(200) NOT NULL,
  category VARCHAR(50),
  description TEXT,
  retail_price DECIMAL(10,2),
  current_price DECIMAL(10,2) NOT NULL,
  stock INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP
);
```

### ProductDrop Table
```sql
CREATE TABLE product_drop (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  product_id BIGINT NOT NULL,
  drop_time DATETIME NOT NULL,
  stock INT NOT NULL,
  status VARCHAR(20) DEFAULT 'SCHEDULED',
  version BIGINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES product(id)
);
```

## Environment Variables

You can override properties using environment variables:

```bash
# Linux/macOS
export SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/rocketdrop_db
export SPRING_DATASOURCE_USERNAME=root
export SPRING_DATASOURCE_PASSWORD=Mundke@22

# Windows PowerShell
$env:SPRING_DATASOURCE_URL="jdbc:mysql://localhost:3306/rocketdrop_db"
$env:SPRING_DATASOURCE_USERNAME="root"
$env:SPRING_DATASOURCE_PASSWORD="Mundke@22"
```

## Development Tools

### IDE Setup

**IntelliJ IDEA** (Recommended)
1. Open project folder
2. Configure Java SDK 17
3. Run > Edit Configurations
4. Add Spring Boot configuration
5. Select `BackendApplication` as main class

**Eclipse**
1. File > Import > Maven > Existing Maven Projects
2. Right-click project > Run As > Spring Boot App

### Database Tools

**MySQL Workbench**
1. Create new connection: localhost:3306
2. Username: root
3. Password: Mundke@22
4. Test Connection

**DBeaver** (Alternative)
1. New Database Connection
2. Select MySQL
3. Enter connection details
4. Test connection

## Debugging

### Enable Debug Mode
```bash
mvn spring-boot:run -Dspring-boot.run.arguments="--debug"
```

### View SQL Queries
Add to `application.properties`:
```properties
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.use_sql_comments=true
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql=TRACE
```

### Common Issues and Solutions

**Issue: "Can't connect to MySQL server"**
```
Solution:
1. Verify MySQL service is running
2. Check credentials in application.properties
3. Ensure database exists: SHOW DATABASES;
4. Verify port 3306 is accessible
```

**Issue: "Port 8080 already in use"**
```bash
# Windows: Find process using port 8080
netstat -ano | findstr :8080
# Kill process
taskkill /PID <PID> /F

# Linux/macOS: Kill process using port 8080
lsof -ti:8080 | xargs kill -9
```

**Issue: "Java version not compatible"**
```bash
# Verify Java version
java -version
# Should show version 17+

# Set JAVA_HOME
# Windows: setx JAVA_HOME "C:\Program Files\Java\jdk-17"
# Linux/macOS: export JAVA_HOME=/usr/libexec/java_home -v 17
```

**Issue: "Maven not found"**
```bash
# Download Maven 3.6+
# Add <MAVEN_HOME>/bin to PATH
# Verify: mvn -version
```

## Production Deployment

### Create Executable JAR
```bash
mvn clean package -DskipTests
```

### Run Production JAR
```bash
java -Xmx512m -Xms256m \
  -Dspring.datasource.url=jdbc:mysql://prod-db:3306/rocketdrop \
  -Dspring.datasource.username=prod_user \
  -Dspring.datasource.password=SecurePassword \
  -jar backend-0.0.1-SNAPSHOT.jar &
```

### Docker Deployment
```dockerfile
FROM openjdk:17-jdk-slim

COPY target/backend-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

## Troubleshooting Checklist

- [ ] Java 17+ installed
- [ ] Maven installed
- [ ] MySQL server running
- [ ] Database `rocketdrop_db` created
- [ ] User credentials verified
- [ ] `application.properties` configured
- [ ] Port 8080 is free
- [ ] Build completes successfully
- [ ] API endpoints are accessible
- [ ] Token refresh working

## Performance Tuning

### Connection Pool
```properties
spring.datasource.hikari.maximum-pool-size=20
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.idle-timeout=600000
```

### Caching
```properties
spring.jpa.properties.hibernate.cache.use_second_level_cache=true
spring.jpa.properties.hibernate.cache.region.factory_class=org.hibernate.cache.jcache.JCacheRegionFactory
```

### Query Optimization
```properties
spring.jpa.properties.hibernate.jdbc.batch_size=20
spring.jpa.properties.hibernate.order_inserts=true
spring.jpa.properties.hibernate.order_updates=true
```

## Monitoring

### Enable Actuator
```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

### Health Check
```
GET http://localhost:8080/actuator/health
```

## Next Steps

1. Start the backend server
2. Verify database schema auto-created
3. Test API endpoints
4. Set up frontend
5. Configure CORS for frontend requests

## Support Resources

- Spring Boot Docs: https://spring.io/projects/spring-boot
- Spring Security: https://spring.io/projects/spring-security
- MySQL Server: https://dev.mysql.com/doc/
- JWT: https://jwt.io/

## License

MIT License - See LICENSE file for details
