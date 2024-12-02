export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container max-w-3xl">
      <h1 className="text-3xl font-bold">Productos</h1>
      {children}
    </div>
  );
}