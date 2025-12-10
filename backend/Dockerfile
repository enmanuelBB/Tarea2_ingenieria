# -------------------------------------------------------------------
# ETAPA 1: Construcción (Build)
# CAMBIO: Usamos una imagen con Maven y Java 21
# -------------------------------------------------------------------
FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src

RUN mvn clean package -DskipTests

# -------------------------------------------------------------------
# ETAPA 2: Ejecución (Run)
# CAMBIO: Usamos una imagen ligera de Java 21
# -------------------------------------------------------------------
FROM eclipse-temurin:21-jdk-jammy

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]