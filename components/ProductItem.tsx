import { memo } from "react";

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    title: string;
  };
}

function ProductItemComponent({ product }: ProductItemProps) {
  return (
    <div>
      {product.title} - <strong>{product.price}</strong>
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
