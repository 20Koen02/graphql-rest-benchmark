import { Firewall } from 'src/firewalls/entities/firewall.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('server')
export class Server {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  ipAddress: string;

  @ManyToOne(() => Firewall, (firewall) => firewall.servers)
  firewall: Firewall;
}
