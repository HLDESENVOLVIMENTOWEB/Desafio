# Escolha a imagem base do Node.js
FROM node:16.13

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Instale dependências globais que possam ser necessárias
# Por exemplo, o nodemon para recarga automática
RUN npm install -g nodemon

# Copie o arquivo package.json e package-lock.json (se existir) para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie os arquivos restantes do projeto para o diretório de trabalho
COPY . .

# Exponha a porta que a aplicação utiliza
EXPOSE 3000

# Comando para executar a aplicação usando nodemon para recarga automática
CMD ["nodemon", "src/main.ts"]
