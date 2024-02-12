// src/entities/Produto.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import {Categoria} from './Categoria'

@Entity('produto')
export class Produto {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true })
  nome?: string;

  @Column('text', { nullable: true })
  descricao?: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  preco?: number;

  @Column({ nullable: true })
  categoriaId?: number;
  

  @ManyToOne(() => Categoria, categoria => categoria.produtos, { nullable: true })
  @JoinColumn({ name: 'categoriaId' })
  categoria?: Categoria;
}
