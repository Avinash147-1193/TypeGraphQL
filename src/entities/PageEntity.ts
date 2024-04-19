import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import PortfolioVersionEntity from './PortfolioVersionEntity';

@ObjectType('Page')
@Entity()
export default class PageEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('varchar', { nullable: false })
  name: string;

  @Field()
  @Column('varchar', { nullable: false })
  url: string;

  @Field(() => PortfolioVersionEntity)
  @ManyToOne(() => PortfolioVersionEntity, { nullable: false })
  portfolioVersion: PortfolioVersionEntity;
}
