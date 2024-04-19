// Import necessary modules and entities
import createApolloServer from '../test_helpers/createApolloServer';
import { gql } from 'apollo-server-core';
import CreatePortfolioResolver from '../../src/resolvers/CreaatePortfolio.reolver';// Import the PortfolioResolver class
import PortfolioEntity from '../../src/entities/PortfolioEntity';

// Define the GraphQL query
const QUERY = gql`
  query ListPortfolios {
    listPortfolios {
      id
      name
      url
    }
  }
`;

// Test suite for the createPortfolioWithVersionAndPages function
describe('createPortfolioWithVersionAndPages', () => {
  // Test case: Returns correct portfolios with versions and pages
  test('returns correct portfolios with versions and pages', async () => {
    // Create an instance of the PortfolioResolver class
    const portfolioResolver = new CreatePortfolioResolver();

    // Invoke the resolver function to create portfolios with versions and pages
    await portfolioResolver.createPortfolioWithVersionAndPages();

    // Query portfolios using GraphQL resolver
    const server = createApolloServer();
    const response = await server.executeOperation({ query: QUERY });
    response.data?.listPortfolios.forEach((portfolio: PortfolioEntity) => {
        console.log(portfolio);
      });
    // Assert that the resolver returns the correct number of portfolios
    expect(response.data?.listPortfolios.length).toBe(1); // Update the expected value to 1 since we are creating only one portfolio

    // Log the fetched portfolios to the console
  });
});
