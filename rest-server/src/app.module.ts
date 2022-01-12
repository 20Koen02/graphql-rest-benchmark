import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServersModule } from './servers/servers.module';
import { FirewallsModule } from './firewalls/firewalls.module';
import { RulesModule } from './rules/rules.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: '../benchmark.db',
      synchronize: true,
      // entities: [Rule, Server, Firewall],
      entities: [__dirname + '/entities/**/*.js'],
      autoLoadEntities: true,
    }),
    ServersModule,
    FirewallsModule,
    RulesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
