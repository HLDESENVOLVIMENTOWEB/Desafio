// __mocks__/typeorm.ts

export class Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
  }

export const getRepository = jest.fn().mockReturnValue({
    find: jest.fn().mockResolvedValue([
      { id: 1, nome: 'Produto 1', descricao: 'Descrição do Produto 1', preco: 100 },
      { id: 2, nome: 'Produto 2', descricao: 'Descrição do Produto 2', preco: 200 }
    ]),
    
    findOne: jest.fn().mockImplementation((id: number) => 
      Promise.resolve({ id: id, nome: `Produto ${id}`, descricao: `Descrição do Produto ${id}`, preco: 100 * id })
    ),
    
    save: jest.fn().mockImplementation((produto: Produto) => 
      Promise.resolve({ ...produto, id: produto.id || Math.floor(Math.random() * 1000) })
    ),
    
  });
  