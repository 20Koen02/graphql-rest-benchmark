import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Server } from './entities/server.entity';

@Injectable()
export class ServersService {
  constructor(
    @InjectRepository(Server)
    private serverRepo: Repository<Server>,
  ) {}

  findOne(id: number) {
    return this.serverRepo.findOne(id);
  }
}
