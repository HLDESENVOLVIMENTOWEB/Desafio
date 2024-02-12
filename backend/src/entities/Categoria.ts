// src/entities/Categoria.ts
import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import {Produto} from './Produto';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true })
  nome?: string;

  @OneToMany(() => Produto, produto => produto.categoria, { nullable: true })
  produtos?: Produto[];
}
