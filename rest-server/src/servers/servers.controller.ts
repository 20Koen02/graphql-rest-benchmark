import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ServersService } from './servers.service';

@ApiTags('servers')
@Controller('servers')
export class ServersController {
  constructor(private readonly serversService: ServersService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serversService.findOne(+id);
  }
}
