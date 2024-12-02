import { notFound } from "next/navigation"
import Image from "next/image"

import { getProduct, getProductsByCategory } from "@/app/logic/products"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

const SkeletonRelatedProducts = () => {
  return (
    <div className="mt-12 block" style={{ marginBlock: '48px' }}>
      <h2 className="text-3xl font-bold">Related articles</h2>
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

const RelatedProducts = async ({ category } : { category: string}) => {
  const related = await getProductsByCategory(category)

  return (
    <div className="mt-12 block" style={{ marginBlock: '48px' }}>
      <h2 className="text-3xl font-bold">Related articles</h2>
      <ul className="grid grid-cols-2 gap-4">
        {related.map(product => (
          <li key={product.id}>
            <a href={`/product/${product.id}`}>
              <Image
                src={product.images[0]}
                alt={product.title}
                width={100}
                height={100}
                className="rounded-lg object-contain"
              />
              <h3>{product.title}</h3>
              <h4>{product.price}</h4>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export async function generateMetadata (
  { params }:
  { params: Promise<{ id: string }>}) {
    const { id } = await params

    const product = await getProduct(id)

    if (product === undefined) return {}

    return {
      title: product.title,
      description: product.description,
    }
}

export default async function ProductDetail (
  { params }:
  { params: Promise<{ id: string }>}
) {
  const { id } = await params

  let product
  try {
    product = await getProduct(id)
  } catch {
    notFound()
  }

  return (
    <div className="container max-w-3xl mx-auto px-10 pt-10">
      <article>
      <Image
        src={product.images[0]}
        alt={product.title}
        width={100}
        height={100}
        className="mb-4"
      />
      <h1 className="text-5xl font-semibold pt-10 mb-4">{product.title}</h1>
      <p>{product.description}</p>
      <p className="opacity-55 text-lg font-bold">{product.price}</p>
      </article>
      
      <Suspense fallback={<SkeletonRelatedProducts />}>
        <RelatedProducts category={product.category} />
      </Suspense>
    </div>
  )
}