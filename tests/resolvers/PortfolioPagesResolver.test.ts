import { gql } from 'apollo-server-core';
import createApolloServer from '../test_helpers/createApolloServer';
import CreatePortfolioResolver from './CreaatePortfolio.reolver'; // Import the PortfolioResolver class
import PageEntity from '../../src/entities/PageEntity';

const server = createApolloServer();
// Define the GraphQL query

const QUERY3 = gql`
  query PortfolioPages($versionId: Int!) {
    portfolioPages(versionId: $versionId) {
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
    const portfolioResolver = new CreatePortfolioResolver(); // using dummy resolver as source

    // Invoke the resolver function to create portfolios with versions and pages
    await portfolioResolver.createPortfolioWithVersionAndPages();

    // Query portfolios using GraphQL resolve

    const listPagesByVersion = await server.executeOperation({ query: QUERY3, variables: { versionId: 2 } });

    listPagesByVersion.data?.portfolioPages.forEach((portfolioVersionPages: PageEntity) => {
      console.log('---pages: ',portfolioVersionPages);
    });
    // Assert that the resolver returns the correct number of portfolios
    expect(listPagesByVersion.data?.portfolioPages.length).toBe(5); // Update the expected value to 5 since we are creating five pages
    // Log the fetched portfolios to the console
  });
});
