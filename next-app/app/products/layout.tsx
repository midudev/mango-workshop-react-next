import { getCategories } from "@/app/logic/products";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ProductLayout({ children }: { children: React.ReactNode }) {
  const categories = await getCategories()

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <nav>
        <ul className="inline-flex gap-2 justify-center flex-wrap">
          {
            categories.map(category => (
              <li key={category.slug}>
                <Button asChild variant="link">
                  <Link href={`/?category=${category.slug}`}> 
                    {category.name}
                  </Link>
                </Button>
              </li>
            ))
          }
        </ul>
      </nav>
      {children}
    </div>
  );
}