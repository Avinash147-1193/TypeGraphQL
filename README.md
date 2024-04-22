## TypeScript Application Readme
This TypeScript application is a portfolio management tool built using TypeORM and TypeGraphQL. Below is an overview of the project structure, functionality, and usage.

## Project Structure
PageEntity.ts: Represents a page entity in the portfolio. It contains fields such as id, name, url, and portfolioVersionId.

PortfolioEntity.ts: Represents a portfolio entity. It includes fields like id, name, url, and an array of versions.

PortfolioVersionEntity.ts: Represents a version of the portfolio. It includes fields such as id, type, portfolioId, and an array of pages.

CreateSnapshotMutation.ts: Resolver for creating a snapshot of a portfolio version.

ListPortfoliosResolver.ts: Resolver for listing all portfolios.

ListPortfolioVersionsResolver.ts: Resolver for listing all versions of a portfolio.

PortfolioPagesResolver.ts: Resolver for fetching all pages of a portfolio version.

index.ts: Entry point of the application. It sets up the Koa server, connects to the database, and initializes the Apollo Server.

## Entity Definitions
PageEntity: Represents a page entity in the portfolio.
PortfolioEntity: Represents a portfolio entity.
PortfolioVersionEntity: Represents a version of the portfolio.

## Resolvers
CreateSnapshotMutation: Resolver for creating a snapshot version of a portfolio.
ListPortfoliosResolver: Resolver for listing all portfolios.
ListPortfolioVersionsResolver: Resolver for listing all versions of a portfolio.
PortfolioPagesResolver: Resolver for fetching all pages of a portfolio version.

## Usage
To run the application locally:

## Clone the repository (for github clone).
Install dependencies using yarn install.
Make sure you have a running SQLite  database with the correct configuration.
Start the application using npm start.
The server will start listening on port 3003 by default. You can access the GraphQL playground at http://localhost:3003/graphql to interact with the API.
Dependencies
TypeORM: Object-Relational Mapping library for TypeScript and JavaScript.
TypeGraphQL: Modern framework for building GraphQL APIs with TypeScript and decorators.
Koa: Lightweight web framework for Node.js.
Apollo Server: GraphQL server implementation for JavaScript.
Reflect-Metadata: Provides metadata reflection APIs.

## Commands to run directly
- yarn install
-  yarn run test   (run jest test cases) 
- yarn dev    (run the app locally)
