import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Rule } from 'src/rules/entities/rule.entity';
import { Server } from 'src/servers/entities/server.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('firewall')
@ObjectType()
export class Firewall {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Server])
  @OneToMany(() => Server, (server) => server.firewall)
  servers: Server[];

  @Field(() => [Rule])
  @OneToMany(() => Rule, (rule) => rule.firewall)
  rules: Rule[];
}
