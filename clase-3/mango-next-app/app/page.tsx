import { getProducts } from "./logic/products";
import ProductCard from "./components/ProductCard";

export default async function Home({
  searchParams 
} : {
  searchParams: Promise<{[key: string]: string | undefined}>
}) {
  const { query } = await searchParams
  const products = await getProducts(query);

  return (
    <main className="container max-w-3xl mx-auto px-10">

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 gap-10">
      {
        products.map((product, index) => (
          <ProductCard
            key={product.id}
            {...product}
            image={product.images[0]}
            preload={index < 2}
            highFetchPriority={index < 4}
          />
        ))
      }
      </div>
    </main>
  );
}
