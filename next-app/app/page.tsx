import { getProducts } from "@/app/logic/products";
import ProductCard from "@/app/components/ProductCard";

export default async function Home() {
  const products = await getProducts()

  return (
    <div>
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-20 px-12">
        {
          products.map((product, index) => (
            <ProductCard
              key={product.id}
              image={product.images[0]}
              fetchWithPriority={index < 4}
              priority={index === 0}
              {...product}
            />
          ))
        }
      </section>
    </div>
  );
}