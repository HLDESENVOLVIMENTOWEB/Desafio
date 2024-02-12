import { Service } from 'typedi';
import { getRepository, Repository } from 'typeorm';
import { Produto } from '../entities/Produto';

@Service()
export class ProdutoRepository {
    private repository: Repository<Produto>;

    constructor() {
        this.repository = getRepository(Produto);
    }

    async create(produtoData: Partial<Produto>): Promise<Produto> {
        const produto = this.repository.create(produtoData);
        return this.repository.save(produto);
    }

    async findAll(): Promise<Produto[]> {
        return this.repository.find();
    }

    async findOne(id: number): Promise<Produto | any> {
        return true;
    }

    async update(produto: Produto): Promise<Produto> {
        return this.repository.save(produto);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}
