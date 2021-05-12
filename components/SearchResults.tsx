import { ProductItem } from "./ProductItem";
import { List, ListRowRenderer } from "react-virtualized";

interface SearchResultsProps {
  totalPrice: number;
  results: Array<{
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  }>;
  onAddToWishlist: (id: number) => void;
}

export function SearchResults({
  totalPrice,
  results,
  onAddToWishlist,
}: SearchResultsProps) {
  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem
          product={results[index]}
          onAddToWishlist={onAddToWishlist}
        />
      </div>
    );
  };

  return (
    <div>
      <h2>{totalPrice}</h2>

      <List
        height={300} // posso passar o valor fixo ou utilizar o utilizar o AUTOSIZER que vem da biblioteca e ele calcula o tamanho que ela pode ocupar
        rowHeight={25} // cada linha tem tantos px de altura
        width={900} // ou usar o autoSizer
        overscanRowCount={5} // quantos itens eu quero que a minha aplicação deixe pré-carregados tanto para cima e para baixo
        rowCount={results.length} // quantos itens eu tenho na lista no máximo
        rowRenderer={rowRenderer} // uma função que vai renderizar cada itens da lista
      />
    </div>
  );
}

// useMemo:
// utilizado para calculos pesados e para
// igualdade referencial ( quando a gente repassa aquela informação de uma variável a um componente filho)

/**
 * REACT-VIRTUALIZED- biblioteca utilizada para quando temos telas com muita informação sendo em formato de lista, tabelas, caso o usuário so
 * consegue visualizar as informações dando um scrool na página
 * A virtualização permite que mostramos em tela realmente no html somente os itens que estão visiveis no navegador do usuário
 */
