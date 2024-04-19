import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import PageEntity from './PageEntity';
import PortfolioEntity from './PortfolioEntity';

@ObjectType('PortfolioVersion')
@Entity()
export default class PortfolioVersionEntity {
  @Field() // Decorate fields with @Field() to define GraphQL fields
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('varchar', { nullable: false })
  type: string;

  @Field(() => PortfolioEntity)
  @ManyToOne(() => PortfolioEntity, portfolio => portfolio.versions, { nullable: false })
  @JoinColumn({ name: 'portfolioId' }) // Define the name of the foreign key column
  portfolio: PortfolioEntity;

  @Column({ nullable: false })
  portfolioId: number; // Define the foreign key column

  @Field(() => [PageEntity])
  @OneToMany(() => PageEntity, (page) => page.portfolioVersion)
  pages: PageEntity[];
}
