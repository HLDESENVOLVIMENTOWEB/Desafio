import { JsonController, Get, Post, Put, Delete, Body, Param } from 'routing-controllers';
import { Produto } from '../entities/Produto';
import { ProdutoService } from '../services/produtos/ProdutoService';
import { Service } from 'typedi';

@Service()
@JsonController('/produtos')
export class ProdutoController {
    constructor(private produtoService: ProdutoService) {}

    @Get()
    getAll() {
        return this.produtoService.findAll();
    }

    @Get('/:id')
    getOne(@Param('id') id: number) {
        return this.produtoService.findOne(id);
    }

    @Post()
    create(@Body() produtoData: Produto) {
        return this.produtoService.create(produtoData);
    }

    @Put('/:id')
    update(@Param('id') id: number, @Body() produtoData: Produto) {
        return this.produtoService.update(id, produtoData);
    }

    @Delete('/:id')
    delete(@Param('id') id: number) {
        return this.produtoService.delete(id);
    }
}
