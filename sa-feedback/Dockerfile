FROM microsoft/dotnet:2.1.500-sdk-alpine AS build

COPY *.csproj ./app/
COPY . ./app/
WORKDIR /app
RUN dotnet publish -c Release -o out

ENV DATABASE_DIR=./

FROM microsoft/dotnet:2.1.5-aspnetcore-runtime-alpine AS runtime
WORKDIR /app
COPY --from=build /app/out ./
ENTRYPOINT ["dotnet", "SA.Feedback.dll"]