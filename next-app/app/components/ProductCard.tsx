import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { HeartIcon, PlusIcon } from "lucide-react";

export default function ProductCard(
  { id, title, image, price, category, fetchWithPriority, priority }:
  { id: number, title: string; image: string; price: number; category: string, fetchWithPriority: boolean, priority: boolean }
) {
  return (
    <div className="group relative space-y-4">
      <figure className="group-hover:scale-110 transition">
        <Image
          className="w-full rounded-lg aspect-square object-contain"
          src={image}
          width={300}
          height={500}
          alt={title}
          priority={priority}
          fetchPriority={fetchWithPriority ? "high" : "low"}
        />
      </figure>
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg">
            <Link href={`/products/${id}`}>
              {title}
            </Link>
          </h3>
          <p className="text-sm text-muted-foreground">{category}</p>
        </div>
        <p className="text-lg font-semibold">{price}</p>
      </div>
      <div className="flex gap-4">
        <Button variant="outline" size="icon" className="flex-shrink-0">
          <HeartIcon className="size-4" />
        </Button>
        <Button variant="outline" className="w-full"> 
          <PlusIcon className="size-4 me-1" /> Add to Card
        </Button>
      </div>
    </div>
  );
}
