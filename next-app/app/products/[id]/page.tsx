import { getProduct, getProductsByCategory } from "@/app/logic/products";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton"

type Props = {
  params: Promise<{ id: string }>
}

export const prerender = true
 
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = (await params).id
 
  // fetch data
  const product = await getProduct(+id)

  if (product === undefined) return {}
 
  const parentMetadata = await parent
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = parentMetadata.openGraph?.images || []
  
  return {
    title: `${product.title} | ${parentMetadata.title?.absolute}`,
    openGraph: {
      images: [product.images[0], ...previousImages],
    },
  }
}

const RelatedProducts = async ({ category }: { category: string }) => {
  const related = await getProductsByCategory(category)

  return (
    <div className="pt-10" style={{ paddingTop: '32px' }}>
      <h2 className="text-xl font-bold my-10 block">Related</h2>
      <ul className="grid grid-cols-2 gap-4">
        {
          related.map(product => (
            <li key={product.id}>
              <Link href={`/products/${product.id}`}>
                <Image
                  className="w-1/2 rounded-lg aspect-square object-contain"
                  src={product.images[0]}
                  width={300}
                  height={500}
                  alt={product.title}
                />
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-sm opacity-50 mb-4">{product.category}</p>
                <p className="text-lg font-semibold">{product.price}$</p>
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

const SkeletonRelatedProducts = () => {
  return (
    <div className="pt-10" style={{ paddingTop: '32px' }}>
    <h2 className="text-xl font-bold my-10 block">Related</h2>
    <ul className="grid grid-cols-2 gap-4">
      {
        Array.from({ length: 2 }).map((_, index) => (
          <li key={index} className="flex flex-col gap-4">
            <Skeleton className="aspect-square w-1/2 rounded-lg" />
            <Skeleton className="h-3 w-36" />
            <Skeleton className="h-2 w-6 opacity-50 mb-4" />
            <Skeleton className="h-3 w-6" />
          </li>
        ))
      }
    </ul>
  </div>
  )
}

export default async function ProductDetail({ params }: { params: Promise<{ id: string }>}) {
  const { id } = await params

  if (id === undefined) return notFound()

  const product = await getProduct(+id)

  if (product === undefined) return notFound()

  return (
    <article className="">
      <Image
        className="w-1/2 rounded-lg aspect-square object-contain"
        src={product.images[0]}
        width={300}
        height={500}
        alt={product.title}
      />
      <h1 className="text-3xl font-semibold">{product.title}</h1>
      <p className="text-lg opacity-50 mb-4">{product.category}</p>
      <p className="text-2xl font-semibold">{product.price}$</p>
      <p className="text-lg opacity-80">{product.description}</p>
      
      <Suspense fallback={<SkeletonRelatedProducts />}>
        <RelatedProducts category={product.category} />
      </Suspense>
    </article>
  );
}