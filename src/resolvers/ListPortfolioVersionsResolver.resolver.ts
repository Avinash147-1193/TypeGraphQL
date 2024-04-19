// ListPortfolioVersionsResolver.ts

import { Query, Resolver, Arg } from 'type-graphql';
import { Service } from 'typedi';
import { getRepository } from 'typeorm';
import PortfolioVersionEntity from '../entities/PortfolioVersionEntity';

@Resolver()
@Service()
export default class ListPortfolioVersionsResolver {
  @Query(() => [PortfolioVersionEntity])
  async listPortfolioVersions(@Arg('portfolioId') portfolioId: number): Promise<PortfolioVersionEntity[]> {
    const portfolioVersionRepository = getRepository(PortfolioVersionEntity);
    return portfolioVersionRepository.find({
      where: { portfolio: portfolioId },
      relations: ['pages']
    });
  }
}
