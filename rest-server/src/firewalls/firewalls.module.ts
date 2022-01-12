import { Module } from '@nestjs/common';
import { FirewallsService } from './firewalls.service';
import { FirewallsController } from './firewalls.controller';
import { Firewall } from './entities/firewall.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rule } from 'src/rules/entities/rule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Firewall, Rule])],
  controllers: [FirewallsController],
  providers: [FirewallsService],
})
export class FirewallsModule {}
