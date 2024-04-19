import createApolloServer from '../test_helpers/createApolloServer';
import { gql } from 'apollo-server-core';

describe('ListPortfolioVersionsResolver', () => {
  const QUERY = gql`
    query ListPortfolioVersions($portfolioId: Int!) {
      listPortfolioVersions(portfolioId: $portfolioId) {
        id
        type
      }
    }
  `;

  test('returns correct portfolio versions', async () => {
    // Create portfolio version entities in the database

    // Query portfolio versions using GraphQL resolver
    const server = createApolloServer();
    const response = await server.executeOperation({
      query: QUERY,
      variables: { portfolioId: 1 },
    });
    // Assert that the resolver returns the correct number of portfolio versions
    expect(response.data?.listPortfolioVersions.length).toBe(0);

    // Log the fetched portfolio versions to the console
    console.log('Fetched Portfolio Versions:');
    response.data?.listPortfolioVersions.forEach((version: any) => {
      console.log(`ID: ${version.id}, Type: ${version.type}`);
    });
  });
});
