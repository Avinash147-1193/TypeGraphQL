import { gql } from 'apollo-server-core';
import createApolloServer from '../test_helpers/createApolloServer';
import CreatePortfolioResolver from './CreaatePortfolio.reolver'; // Import the PortfolioResolver class
import PortfolioVersionEntity from '../../src/entities/PortfolioVersionEntity';

const server = createApolloServer();
const QUERY2 = gql`
  query ListPortfolioVersions($portfolioId: Int!) {
    listPortfolioVersions(portfolioId: $portfolioId) {
      id
      type
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

    const listVersions = await server.executeOperation({ query: QUERY2, variables: { portfolioId: 1 } });


    listVersions.data?.listPortfolioVersions.forEach((portfolioVersion: PortfolioVersionEntity) => {
      console.log('---portfolioVersion: ', portfolioVersion);
    });
    // Assert that the resolver returns the correct number of portfolios
    expect(listVersions.data?.listPortfolioVersions.length).toBe(1); // Update the expected value to 1 since we are creating only one portfolioVersion Draft
    // Log the fetched portfolios to the console
  });
});
