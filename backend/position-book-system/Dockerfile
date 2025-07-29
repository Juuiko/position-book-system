FROM openjdk:23-jdk
ARG JAR_FILE=target/*.jar
COPY ./target/position-book-system-0.0.1.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]