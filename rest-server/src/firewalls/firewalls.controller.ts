import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FirewallsService } from './firewalls.service';

@ApiTags('firewalls')
@Controller('firewalls')
export class FirewallsController {
  constructor(private readonly firewallsService: FirewallsService) {}
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.firewallsService.findOne(+id);
  }

  @Get(':id/rules')
  getRules(@Param('id') id: string) {
    return this.firewallsService.getRules(+id);
  }
}
