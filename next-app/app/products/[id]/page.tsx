import { getProduct } from "@/app/logic/products";
import { Metadata, ResolvingMetadata } from "next";
import { Params } from "next/dist/server/request/params";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
 
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

export default async function ProductDetail({ params }: { params: Params}) {
  const { id } = await params

  if (id === undefined) return notFound()

  const product = await getProduct(+id)

  if (product === undefined) return notFound()

  return (
    <article className="container mx-auto px-4 py-16 max-w-3xl">
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
      
    </article>
  );
}