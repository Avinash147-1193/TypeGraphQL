import { gql } from 'apollo-server-core';
import createApolloServer from '../test_helpers/createApolloServer';
import CreatePortfolioResolver from './CreaatePortfolio.reolver'; // Import the PortfolioResolver class
import PortfolioEntity from '../../src/entities/PortfolioEntity';
import PortfolioVersionEntity from '../../src/entities/PortfolioVersionEntity';

const server = createApolloServer();
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

const QUERY2 = gql`
  query ListPortfolioVersions($portfolioId: Int!) {
    listPortfolioVersions(portfolioId: $portfolioId) {
      id
      type
    }
  }
`;

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
    const response = await server.executeOperation({ query: QUERY });

    const listVersions = await server.executeOperation({ query: QUERY2, variables: { portfolioId: 1 } });

    const listPagesByVersion = await server.executeOperation({ query: QUERY3, variables: { versionId: 2 } });

    response.data?.listPortfolios.forEach((portfolio: PortfolioEntity) => {
      console.log(portfolio);
    });

    listVersions.data?.listPortfolioVersions.forEach((portfolioVersion: PortfolioVersionEntity) => {
      console.log(portfolioVersion);
    });

    listPagesByVersion.data?.portfolioPages.forEach((portfolioVersion: PortfolioVersionEntity) => {
      console.log(portfolioVersion);
    });
    // Assert that the resolver returns the correct number of portfolios
    expect(response.data?.listPortfolios.length).toBe(1); // Update the expected value to 1 since we are creating only one portfolio
    expect(listVersions.data?.listPortfolioVersions.length).toBe(1);
    expect(listPagesByVersion.data?.portfolioPages.length).toBe(5);
    // Log the fetched portfolios to the console
  });
});
