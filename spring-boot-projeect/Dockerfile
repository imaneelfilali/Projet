# Use the official OpenJDK image from the Docker Hub
FROM openjdk:17-jdk

# Copy the JAR file from the target directory to the root of the container's file system
COPY target/spring-boot-projeect.jar spring-boot-projeect.jar

# Expose the port that your Spring Boot application will run on
EXPOSE 9192

# Set the entry point to run the JAR file
ENTRYPOINT ["java", "-jar", "spring-boot-projeect.jar"]
