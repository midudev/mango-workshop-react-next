import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='container flex justify-center items-center flex-col gap-y-4'>
      <img src="https://midu.dev/images/this-is-fine-404.gif" />
      <h3 className="text-xl font-bold">Se ha roto algo...</h3>
      <Link href="/">Vuelve a la página principal</Link>
    </div>
  )
}