import { Rule } from 'src/rules/entities/rule.entity';
import { Server } from 'src/servers/entities/server.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('firewall')
export class Firewall {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Server, (server) => server.firewall)
  servers: Server[];

  @OneToMany(() => Rule, (rule) => rule.firewall)
  rules: Rule[];
}
