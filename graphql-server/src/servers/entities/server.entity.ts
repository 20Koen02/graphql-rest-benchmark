import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Firewall } from 'src/firewalls/entities/firewall.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('server')
@ObjectType()
export class Server {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  ipAddress: string;

  @Field(() => Firewall)
  @ManyToOne(() => Firewall, (firewall) => firewall.servers)
  firewall: Firewall;
}
