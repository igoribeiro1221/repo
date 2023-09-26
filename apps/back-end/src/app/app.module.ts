import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComputadorEntity } from '../computador/entities/computador.entity';
import { PerifericoEntity } from '../computador/entities/periferico.entity';
import { ComputadorModule } from '../computador/computador.module';

@Module({
  imports: [
    ComputadorModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '246810',
      database: 'postgres',
      entities: [ComputadorEntity, PerifericoEntity],
      synchronize: true,
      logging: true,
    }),
  ],
})
export class AppModule {}
