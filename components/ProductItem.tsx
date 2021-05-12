import { memo, useState } from "react";
import dynamic from "next/dynamic";
import { AddProductToWishlistProps } from "./AddProductToWishlist";
//import { AddProductToWishlist } from "./AddProductToWishlist";

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(
  () => {
    return import("./AddProductToWishlist").then(
      (mod) => mod.AddProductToWishlist
    );
  },
  {
    loading: () => <span>Carregando...</span>,
  }
);

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  };
  onAddToWishlist: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishlist }: ProductItemProps) {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishlist(true)}>
        Adicionar aos favoritos
      </button>
      {isAddingToWishlist && (
        <AddProductToWishlist
          onAddToWishlist={() => onAddToWishlist(product.id)}
          onRequestClose={() => setIsAddingToWishlist(false)}
        />
      )}
    </div>
  );
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    return Object.is(prevProps.product, nextProps.product);
  }
);

// Memo -> vai conseguir evitar que o react crie uma nova versão do componente se nenhuma propriedade do componente tenha sido alterada
// Ele faz uma shallow compare(comparação rasa) => ele basicamente verifica a igualdade das informações que eu tenho
// dentro das propriedades

// Em quais situaçoes usar o memo =>
// 1. Pure Functional(dados os mesmo parametros sempre retornam o mesmo resultado) Components(componentes puros)= componentes apenas para abstrair alguma parte visual da aplicação
// 2. Render too often(componentes que renderizam damais)
// 3. Re-renders with same props(componente renderiza novamente com as mesmas props)
// 4. Medium to big size

/** DYNAMIC IMPORT (CODE SPLITTING)- é o poder de importar algum arquivo/ componente/ funcionalidade somente no momento que for utilizada
 * Quando utilizamos um componente e esse componente nem sempre vai estar visível em tela, ele só é visível em tela
 * a partir de uma ação do usuário, oque podemos fazer é :
 * colocar esse componente com um "carregamento preguiçoso", ou seja , carregar esse componente somente quando ele precisar ser exibido em tela
 * não ja no build da aplicação(quando a aplicação ja é carregada no primeiro momento)
 */
