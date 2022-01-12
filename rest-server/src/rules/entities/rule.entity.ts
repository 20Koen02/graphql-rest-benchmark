import { Firewall } from 'src/firewalls/entities/firewall.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rule')
export class Rule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ruleType: string;

  @Column()
  cidr: string;

  @Column()
  port: number;

  @ManyToOne(() => Firewall, (firewall) => firewall.servers)
  firewall: Firewall;
}
