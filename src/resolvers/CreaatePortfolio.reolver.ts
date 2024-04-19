import { Resolver, Mutation } from 'type-graphql';
import PortfolioEntity from '../entities/PortfolioEntity';
import { getRepository } from 'typeorm';
import PortfolioVersionEntity from '../entities/PortfolioVersionEntity';
import PageEntity from '../entities/PageEntity';
import { PORTFOLIO_VERSIONS } from '../helpers/constants';

@Resolver()
export default class CreatePortfolioResolver {
  @Mutation(() => PortfolioEntity)
  async createPortfolioWithVersionAndPages(): Promise<PortfolioEntity> {
    // Create a new portfolio entity
    const portfolioRepository = getRepository(PortfolioEntity);
    const portfolio = new PortfolioEntity();
    portfolio.id = 1;
    portfolio.name = 'Example Portfolio';
    portfolio.url = 'http://example.com/portfolio';

    // Save the portfolio to the database
    const savedPortfolio = await portfolioRepository.save(portfolio);

    // Create a new portfolio version entity
    const portfolioVersionRepository = getRepository(PortfolioVersionEntity);
    const portfolioVersion = new PortfolioVersionEntity();
    portfolioVersion.id = 2;
    portfolioVersion.type = PORTFOLIO_VERSIONS.DRAFT;
    portfolioVersion.portfolio = savedPortfolio;

    // Save the portfolio version to the database
    const savedPortfolioVersion = await portfolioVersionRepository.save(portfolioVersion);

    
    // Create example pages associated with the portfolio version
    const pageRepository = getRepository(PageEntity);
    const pages: PageEntity[] = [];
    for (let i = 1; i <= 5; i++) {
      const page = new PageEntity();
      page.name = `Page ${i}`;
      page.url = `http://example.com/page${i}`;
      page.portfolioVersion = savedPortfolioVersion;
      pages.push(page);
    }

    console.log('----created data', savedPortfolio, pages, portfolioVersion);
    // Save the pages to the database
    await pageRepository.save(pages);

    return savedPortfolio;
  }
}
