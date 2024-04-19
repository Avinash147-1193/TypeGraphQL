import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import PageEntity from './PageEntity';
import PortfolioEntity from './PortfolioEntity';
import { ObjectType, Field } from 'type-graphql';

@ObjectType('PortfolioVersion')
@Entity()
export default class PortfolioVersionEntity {
  @Field() // Decorate fields with @Field() to define GraphQL fields
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('varchar', { nullable: false })
  type: string;

  @ManyToOne(() => PortfolioEntity, { nullable: false })
  portfolio: PortfolioEntity;

  @Field(() => [PageEntity]) 
  @OneToMany(() => PageEntity, page => page.portfolioVersion) 
  pages: PageEntity[]; 
}
