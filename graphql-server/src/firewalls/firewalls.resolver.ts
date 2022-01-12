import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { FirewallsService } from './firewalls.service';
import { Firewall } from './entities/firewall.entity';

@Resolver(() => Firewall)
export class FirewallsResolver {
  constructor(private readonly firewallsService: FirewallsService) {}

  @Query(() => Firewall, { name: 'firewall' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.firewallsService.findOne(id);
  }
}
