import { Service, Container } from 'typedi';
import { Categoria } from '../../entities/Categoria';
import { CategoriaRepository } from '../../repositories/CategoriaRepository';

@Service()
export class CategoriaService {
    constructor(private categoriaRepository = Container.get(CategoriaRepository)) {}

    async create(categoriaData: Partial<Categoria>): Promise<Categoria> {
         const categoria = await this.categoriaRepository.create(categoriaData);
         return categoria;
    }

    async findAll(): Promise<Categoria[]> {
        return this.categoriaRepository.findAll();
    }

    async findOne(id: number): Promise<Categoria | undefined> {
       return this.categoriaRepository.findOne(id);
    }

    async update(id: number, categoriaData: Partial<Categoria>): Promise<Categoria> {
        let produto = await this.categoriaRepository.findOne(id);
        if (!produto) {
            throw new Error('Categoria não encontrado');
        }
        return  this.categoriaRepository.update(produto);
    }

    async delete(id: number): Promise<void> {
        const categoria = await this.categoriaRepository.findOne(id);
        if (!categoria) {
            throw new Error('Categoria não encontrado');
        }
        await this.categoriaRepository.delete(id);
    }
}
