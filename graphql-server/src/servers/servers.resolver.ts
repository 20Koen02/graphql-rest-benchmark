import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { ServersService } from './servers.service';
import { Server } from './entities/server.entity';

@Resolver(() => Server)
export class ServersResolver {
  constructor(private readonly serversService: ServersService) {}

  @Query(() => Server, { name: 'server' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.serversService.findOne(id);
  }
}
