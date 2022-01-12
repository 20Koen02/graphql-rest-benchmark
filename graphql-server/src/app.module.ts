import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServersModule } from './servers/servers.module';
import { FirewallsModule } from './firewalls/firewalls.module';
import { RulesModule } from './rules/rules.module';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    ServersModule,
    FirewallsModule,
    RulesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
