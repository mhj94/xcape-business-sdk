FROM openjdk:17-jdk-slim

WORKDIR /app

ARG JASYPT_KEY

RUN chmod +x ./gradlew
RUN ./gradlew clean build

ENTRYPOINT ["java", "-Djasypt.encryptor.password=${JASYPT_KEY}", "-jar", "app.jar"]
