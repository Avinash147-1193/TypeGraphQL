import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
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
  @ManyToOne(() => PortfolioVersionEntity, portfolioVersion => portfolioVersion.pages, { nullable: false })
  @JoinColumn({ name: 'portfolioVersionId' }) // Define the name of the foreign key column
  portfolioVersion: PortfolioVersionEntity;

  @Column({ nullable: false })
  portfolioVersionId: number; // Define the foreign key column
}
