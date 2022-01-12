import { Module } from '@nestjs/common';
import { ServersService } from './servers.service';
import { ServersController } from './servers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Server } from './entities/server.entity';
import { Firewall } from 'src/firewalls/entities/firewall.entity';
import { Rule } from 'src/rules/entities/rule.entity';
// import { FillDummyDataService } from 'src/fill-dummy-data.service';

@Module({
  imports: [TypeOrmModule.forFeature([Server, Firewall, Rule])],
  controllers: [ServersController],
  // providers: [ServersService, FillDummyDataService],
  providers: [ServersService],
})
export class ServersModule {}
