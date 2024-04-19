// ListPortfolioVersionsResolver.ts

import { Query, Resolver, Arg, Int } from 'type-graphql';
import { Service } from 'typedi';
import { getRepository } from 'typeorm';
import PortfolioVersionEntity from '../entities/PortfolioVersionEntity';

@Resolver()
@Service()
export default class ListPortfolioVersionsResolver {
  @Query(() => [PortfolioVersionEntity])
  async listPortfolioVersions(@Arg('portfolioId', () => Int) portfolioId: number): Promise<PortfolioVersionEntity[]> {
    console.log('-----hitting, version list');
    const portfolioVersionRepository = getRepository(PortfolioVersionEntity);
    return await portfolioVersionRepository.find({
      where: { portfolio: portfolioId },
      relations: ['pages'],
    });
  }
}
