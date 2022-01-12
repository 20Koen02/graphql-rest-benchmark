import { Module } from '@nestjs/common';
import { FirewallsService } from './firewalls.service';
import { FirewallsResolver } from './firewalls.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Firewall } from './entities/firewall.entity';
import { Rule } from 'src/rules/entities/rule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Firewall, Rule])],
  providers: [FirewallsResolver, FirewallsService],
})
export class FirewallsModule {}
