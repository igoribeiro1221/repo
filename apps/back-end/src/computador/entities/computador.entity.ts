import { Column, Entity, OneToMany } from 'typeorm';
import { PerifericoEntity } from './periferico.entity';

@Entity({ name: 'computador' })
export class ComputadorEntity {
  @Column({ primary: true })
  nome: string;

  @Column({ name: 'cor' })
  cor: string;

  @Column({ name: 'dataFabricacao' })
  dataFabricacao: number;

  @OneToMany(() => PerifericoEntity, (photo) => photo.computador)
  perifericos: PerifericoEntity[];
}
