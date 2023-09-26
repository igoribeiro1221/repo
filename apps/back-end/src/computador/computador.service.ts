import { Injectable } from '@nestjs/common';
import { CreateComputadorDto } from './dto/create-computador.dto';
import { UpdateComputadorDto } from './dto/update-computador.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ComputadorEntity } from './entities/computador.entity';
import { PerifericoEntity } from './entities/periferico.entity';
import { CreatePerifericoDto } from './dto/create-periferico.dto';

@Injectable()
export class ComputadorService {
  constructor(
    @InjectRepository(ComputadorEntity)
    private readonly computadorRepository: Repository<ComputadorEntity>,
    @InjectRepository(PerifericoEntity)
    private readonly perifericoRepository: Repository<PerifericoEntity>
  ) {}

  async create(createComputadorDto: CreateComputadorDto): Promise<void> {
    const computador = await this.computadorRepository.create(
      createComputadorDto
    );
    await this.computadorRepository.save(computador);
  }

  async findAll(): Promise<ComputadorEntity[]> {
    return await this.computadorRepository.find({ relations: ['perifericos'] });
  }

  async findOne(nome: string): Promise<ComputadorEntity | null> {
    const foundComputador = await this.computadorRepository
      .createQueryBuilder('computador')
      .where('computador.nome = :nome', { nome })
      .leftJoinAndSelect('computador.perifericos', 'periferico')
      .getOne();

    return foundComputador;
  }

  async update(
    nome: string,
    updateComputadorDto: UpdateComputadorDto
  ): Promise<void> {
    const foundComputador = await this.findOne(nome);
    if (!foundComputador) {
      throw new Error('Computador não encontrado');
    }
    await this.computadorRepository.update(nome, updateComputadorDto);
  }

  async remove(nome: string): Promise<void> {
    const foundComputador = await this.findOne(nome);
    if (!foundComputador) {
      throw new Error('Computador não encontrado');
    }
    console.log(foundComputador);
    if (foundComputador.perifericos.length > 0) {
      foundComputador.perifericos.forEach(async (periferico) => {
        await this.perifericoRepository.delete(periferico.nome);
      });
    }
    await this.computadorRepository.delete(nome);
  }

  async addPeriferico(
    computadorNome: string,
    periferico: CreatePerifericoDto
  ): Promise<void> {
    const computador = await this.findOne(computadorNome);

    if (!computador) {
      throw new Error('Computador não encontrado');
    }

    const perifericoEntity = await this.perifericoRepository.create(periferico);
    await this.perifericoRepository.save(perifericoEntity);

    computador.perifericos.push(perifericoEntity);

    await this.computadorRepository.save(computador);
  }

  async removePeriferico(
    computadorNome: string,
    perifericoNome: string
  ): Promise<void> {
    const computador = await this.findOne(computadorNome);

    if (!computador) {
      throw new Error('Computador não encontrado');
    }

    computador.perifericos = computador.perifericos.filter(
      (periferico) => periferico.nome !== perifericoNome
    );

    await this.computadorRepository.save(computador);

    const periferico = await this.findPeriferico(perifericoNome);
    if (periferico) {
      await this.perifericoRepository.delete(periferico.nome);
    }
  }

  async findPeriferico(nome: string): Promise<PerifericoEntity | null> {
    const foundPeriferico = await this.perifericoRepository
      .createQueryBuilder('periferico')
      .where('periferico.nome = :nome', { nome })
      .getOne();

    return foundPeriferico;
  }
}
