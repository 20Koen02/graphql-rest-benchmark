import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Firewall } from './entities/firewall.entity';

@Injectable()
export class FirewallsService {
  constructor(
    @InjectRepository(Firewall)
    private firewallRepo: Repository<Firewall>,
  ) {}

  findOne(id: number) {
    return this.firewallRepo.findOne(id);
  }

  async getRules(id: number) {
    const firewall = await this.firewallRepo.findOne(id, {
      relations: ['rules'],
    });
    return firewall.rules;
  }
}
