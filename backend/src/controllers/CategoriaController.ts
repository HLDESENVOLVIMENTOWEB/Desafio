import { JsonController, Get, Post, Put, Delete, Body, Param } from 'routing-controllers';
import { Categoria } from '../entities/Categoria';
import { CategoriaService } from '../services/produtos/CategoriaService';
import { Service } from 'typedi';

@Service()
@JsonController('/categoria')
export class CategoriaController {
    constructor(private categoriaService: CategoriaService) {}

    @Get()
    getAll() {
        return this.categoriaService.findAll();
    }

    @Get('/:id')
    getOne(@Param('id') id: number) {
        return this.categoriaService.findOne(id);
    }

    @Post()
    create(@Body() categoriaData: Categoria) {
        return this.categoriaService.create(categoriaData);
    }

    @Put('/:id')
    update(@Param('id') id: number, @Body() categoriaData: Categoria) {
        return this.categoriaService.update(id, categoriaData);
    }

    @Delete('/:id')
    delete(@Param('id') id: number) {
        return this.categoriaService.delete(id);
    }
}
