# ------------ Build stage ------------
FROM gradle:8.7-jdk17 AS builder

WORKDIR /app

COPY . .

RUN gradle bootJar --no-daemon

# ------------ Runtime stage ------------
FROM gcr.io/distroless/java21

WORKDIR /app

COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
