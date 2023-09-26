import { Column, Entity, ManyToOne } from 'typeorm';
import { ComputadorEntity } from './computador.entity';

@Entity({ name: 'periferico' })
export class PerifericoEntity {
  @Column({ primary: true })
  nome: string;

  @ManyToOne(() => ComputadorEntity, (computador) => computador.perifericos)
  computador: ComputadorEntity;
}
