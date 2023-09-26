import { Module } from '@nestjs/common';
import { ComputadorService } from './computador.service';
import { ComputadorController } from './computador.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComputadorEntity } from './entities/computador.entity';
import { PerifericoEntity } from './entities/periferico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ComputadorEntity, PerifericoEntity])],
  controllers: [ComputadorController],
  providers: [ComputadorService],
})
export class ComputadorModule {}
