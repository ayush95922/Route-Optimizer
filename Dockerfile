# Stage 1: Build the backend with Maven
FROM maven:3.9.6-eclipse-temurin-17-jammy AS build
WORKDIR /app

# Copy the pom.xml and source code
COPY backend/pom.xml ./backend/
COPY backend/src ./backend/src

# Copy frontend into Spring Boot's static folder so it is served together
COPY frontend ./backend/src/main/resources/static

# Build the JAR file
WORKDIR /app/backend
RUN mvn clean package -DskipTests

# Stage 2: Run the Spring Boot application
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=build /app/backend/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
