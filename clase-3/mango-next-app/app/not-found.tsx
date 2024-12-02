import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image
        src="/this-is-fine-404.gif"
        alt="This is fine"
        width="400"
        height="400"
      />
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-2xl">Page not found</p>
    </div>
  )
}