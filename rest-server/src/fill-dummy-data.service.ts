import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Firewall } from 'src/firewalls/entities/firewall.entity';
import { Rule } from 'src/rules/entities/rule.entity';
import { Server } from 'src/servers/entities/server.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FillDummyDataService {
  ruleTypes = ['UDP', 'TCP', 'UDPTCP'];

  constructor(
    @InjectRepository(Firewall)
    private firewallRepo: Repository<Firewall>,
    @InjectRepository(Rule)
    private ruleRepo: Repository<Rule>,
    @InjectRepository(Server)
    private serverRepo: Repository<Server>,
  ) {
    this.fillDummyData();
  }

  async fillDummyData(): Promise<void> {
    const firewall = new Firewall();
    firewall.name = 'Firewall 1';
    await this.firewallRepo.save(firewall);

    const server = new Server();
    server.name = 'Server 1';
    server.ipAddress = '123.123.123.123';
    server.firewall = firewall;
    await this.serverRepo.save(server);

    for (let i = 0; i < 50; i++) {
      const rule = new Rule();
      rule.ruleType =
        this.ruleTypes[Math.floor(Math.random() * this.ruleTypes.length)];
      rule.cidr = '123.123.123.123/32';
      rule.firewall = firewall;
      rule.port = Math.floor(Math.random() * 65535);
      await this.ruleRepo.save(rule);
    }
  }
}
