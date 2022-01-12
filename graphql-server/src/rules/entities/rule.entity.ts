import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Firewall } from 'src/firewalls/entities/firewall.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rule')
@ObjectType()
export class Rule {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  ruleType: string;

  @Field()
  @Column()
  cidr: string;

  @Field()
  @Column()
  port: number;

  @Field(() => Firewall)
  @ManyToOne(() => Firewall, (firewall) => firewall.servers)
  firewall: Firewall;
}
