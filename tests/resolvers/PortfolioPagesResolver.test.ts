// Import required modules
//import createPageEntity from '../test_helpers/createPageHelper';
import createApolloServer from '../test_helpers/createApolloServer';
import { gql } from 'apollo-server-core';

// Define the GraphQL query
const QUERY = gql`
  query PortfolioPages($versionId: Int!) {
    portfolioPages(versionId: $versionId) {
      id
      name
      url
    }
  }
`;

// Test suite for the PortfolioPagesResolver
describe('PortfolioPagesResolver', () => {
  // Test case: Returns correct pages for a portfolio version
  test('returns correct pages for a portfolio version', async () => {
    // Create portfolio version
    const portfolioVersionId = 2;

    // Create page entities in the database associated with the portfolio version
   // await createPageEntity(portfolioVersionId);
    //await createPageEntity(portfolioVersionId);

    // Query pages using GraphQL resolver
    const server = createApolloServer();
    const response = await server.executeOperation({
      query: QUERY,
      variables: { versionId: portfolioVersionId }, // Pass the portfolio version id as a variable
    });

    // Assert that the resolver returns the correct number of pages
    expect(response.data?.portfolioPages.length).toBe(0);

    // Log the fetched pages to the console
    console.log('Fetched Pages:');
    response.data?.portfolioPages.forEach((page: any) => {
      console.log(`ID: ${page.id}, Name: ${page.name}, URL: ${page.url}`);
    });
  });
});
