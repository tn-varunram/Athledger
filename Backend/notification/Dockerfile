# Use a base image with Java 17
FROM amazoncorretto:17

# Set working directory
WORKDIR /app

# Copy Gradle wrapper and project files
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src

# Grant execute permission to Gradle wrapper
RUN chmod +x gradlew

# Build the application
RUN ./gradlew build -x test

# Run the JAR file
CMD ["java", "-jar", "build/libs/notification-0.0.1-SNAPSHOT.jar"]
