module.exports = () => {
  const data = {
    products: [],
  };

  for (let i = 0; i < 1000; i++) {
    data.products.push({
      id: i + 1,
      price: 80,
      title: `Camiseta ${i + 1}`,
    });
  }

  return data;
};
//api fake de uma listagens de produtos
// instala o json-server (yarn add json-server -d) ele aceita servidores tanto em formato json como formato javascript
// no package.json -> script "server": que vai rodar "json-server -d 750(adicionar um delay toda requisição demora 750 milhesegundos) -w (ficar observando o arquivo caso ele mude para restartar o servidor ) "
