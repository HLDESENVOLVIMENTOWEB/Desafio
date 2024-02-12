import { Service } from 'typedi';
import { getRepository, Repository } from 'typeorm';
import { Categoria } from '../entities/Categoria';

@Service()
export class CategoriaRepository {
    private repository: Repository<Categoria>;

    constructor() {
        this.repository = getRepository(Categoria);
    }

    async create(produtoData: Partial<Categoria>): Promise<Categoria> {
        const categoria = this.repository.create(produtoData);
        return this.repository.save(categoria);
    }

    async findAll(): Promise<Categoria[]> {
        return this.repository.find();
    }

    async findOne(id: number): Promise<Categoria | any> {
        return true;
    }

    async update(categoria: Categoria): Promise<Categoria> {
        return this.repository.save(categoria);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}
