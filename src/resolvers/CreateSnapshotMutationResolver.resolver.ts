// CreateSnapshotMutation.ts

import { Arg, Mutation, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { getRepository } from 'typeorm';
import PortfolioVersionEntity from '../entities/PortfolioVersionEntity';
import { PORTFOLIO_VERSIONS } from '../helpers/constants';

@Resolver()
@Service()
export default class CreateSnapshotMutation {
  @Mutation(() => PortfolioVersionEntity)
  async createSnapshot(@Arg('draftVersionId') draftVersionId: number): Promise<PortfolioVersionEntity> {
    const portfolioVersionRepository = getRepository(PortfolioVersionEntity);
    const draftVersion = await portfolioVersionRepository.findOne(draftVersionId, {
      relations: ['pages'],
    });

    if (!draftVersion) {
      throw new Error('Draft version not found');
    }

    const snapshotVersion = new PortfolioVersionEntity();
    snapshotVersion.type = PORTFOLIO_VERSIONS.SNAPSHOT;
    snapshotVersion.portfolio = draftVersion.portfolio;
    snapshotVersion.pages = draftVersion.pages; // Clone pages from draft version

    await portfolioVersionRepository.save(snapshotVersion);
    return snapshotVersion;
  }
}
