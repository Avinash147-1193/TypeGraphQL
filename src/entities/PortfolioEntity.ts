import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import PortfolioVersionEntity from './PortfolioVersionEntity';
import { ObjectType, Field } from 'type-graphql';

@ObjectType('Portfolio')
@Entity()
export default class PortfolioEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('varchar', { nullable: false })
  name: string;

  @Field()
  @Column('varchar', { nullable: false, unique: true })
  url: string;

  @Field(() => [PortfolioVersionEntity])
  @OneToMany(() => PortfolioVersionEntity, version => version.portfolio)
  versions: PortfolioVersionEntity[];
}
