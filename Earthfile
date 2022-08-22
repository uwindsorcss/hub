build:
      FROM golang:1.18 # start with go
      WORKDIR /app # change workdir

      COPY main.go go.mod go.sum . # copy files
      COPY --dir pkg/ vendor/ ./ # copy dirs

      COPY default.hcl . # copy config
      RUN cd pkg/config/;\ # copy config for embedded config
          go generate; \
          cd ../..

      RUN go build -mod=vendor -o hub main.go # build  with vendoring
      SAVE ARTIFACT hub AS LOCAL hub # save file
