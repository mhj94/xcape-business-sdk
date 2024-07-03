FROM openjdk:17-jdk-slim

WORKDIR /app

ARG JASYPT_KEY

COPY build.gradle settings.gradle ./

COPY gradlew gradlew
COPY gradle gradle

RUN chmod +x gradlew

RUN ./gradlew dependencies

COPY src src

RUN ./gradlew build

COPY build/libs/*.jar app.jar

ENTRYPOINT ["java", "-Djasypt.encryptor.password=${JASYPT_KEY}", "-jar", "app.jar"]