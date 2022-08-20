build:
      FROM golang:1.18
      WORKDIR /app
      COPY main.go go.mod go.sum .
      COPY --dir vendor/ ./
      RUN go build -mod=vendor -o hub main.go
      SAVE ARTIFACT hub AS LOCAL hub
