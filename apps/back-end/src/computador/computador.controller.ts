import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ComputadorService } from './computador.service';
import { CreateComputadorDto } from './dto/create-computador.dto';
import { UpdateComputadorDto } from './dto/update-computador.dto';
import { CreatePerifericoDto } from './dto/create-periferico.dto';

@Controller('computador')
export class ComputadorController {
  constructor(private readonly computadorService: ComputadorService) {}

  @Post()
  create(@Body() createComputadorDto: CreateComputadorDto) {
    return this.computadorService.create(createComputadorDto);
  }

  @Get()
  findAll() {
    return this.computadorService.findAll();
  }

  @Get(':nome')
  findOne(@Param('nome') nome: string) {
    return this.computadorService.findOne(nome);
  }

  @Put(':nome')
  update(
    @Param('nome') nome: string,
    @Body() updateComputadorDto: UpdateComputadorDto
  ) {
    return this.computadorService.update(nome, updateComputadorDto);
  }

  @Delete(':nome')
  remove(@Param('nome') nome: string) {
    return this.computadorService.remove(nome);
  }

  @Post(':nome/perifericos')
  addPerifericoToComputador(
    @Param('nome') computadorNome: string,
    @Body() periferico: CreatePerifericoDto
  ) {
    return this.computadorService.addPeriferico(computadorNome, periferico);
  }

  @Delete(':nome/perifericos/:perifericoNome')
  removePerifericoFromComputador(
    @Param('nome') computadorNome: string,
    @Param('perifericoNome') perifericoNome: string
  ) {
    return this.computadorService.removePeriferico(
      computadorNome,
      perifericoNome
    );
  }
}
