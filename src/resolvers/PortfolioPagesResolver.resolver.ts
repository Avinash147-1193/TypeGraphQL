// PortfolioPagesResolver.ts

import { Query, Resolver, Arg, Int } from 'type-graphql';
import { Service } from 'typedi';
import { getRepository } from 'typeorm';
import PageEntity from '../entities/PageEntity';

@Resolver()
@Service()
export default class PortfolioPagesResolver {
  @Query(() => [PageEntity])
  async portfolioPages(@Arg('versionId', () => Int) versionId: number): Promise<PageEntity[]> {
    const pageRepository = getRepository(PageEntity);
    return pageRepository.createQueryBuilder('pv')
    .where('pv.portfolioVersionId = :versionId', { versionId })
    .getMany();
  }
}
