import faker from 'faker';
import { DeepPartial, getRepository } from 'typeorm';
import PageEntity from '../../src/entities/PageEntity';
import PortfolioVersionEntity from '../../src/entities/PortfolioVersionEntity';

// Function to build a PageEntity object with optional properties
export function buildPageEntity(properties?: DeepPartial<PageEntity>): PageEntity {
  const repository = getRepository(PageEntity);

  // Create a new PageEntity object with random data using Faker library
  const page = repository.create({
    name: faker.name.findName(), // Generate a random name
    url: faker.internet.url(), // Generate a random URL
    ...properties, // Override default properties if provided
  });

  return page;
}

// Function to create a PageEntity in the database
async function createPageEntity(portfolioVersionId: PortfolioVersionEntity | number): Promise<PageEntity> {
  const repository = getRepository(PageEntity);
  
  // Get the PortfolioVersionEntity instance based on the input
  const portfolioVersionEntity = typeof portfolioVersionId === 'number' ? { id: portfolioVersionId } : portfolioVersionId;

  // Build a PageEntity object with optional properties
  const page = buildPageEntity({ ...portfolioVersionEntity });

  // Save the PageEntity object to the database
  const savedPage = await repository.save(page);

  return savedPage;
}

export default createPageEntity;
