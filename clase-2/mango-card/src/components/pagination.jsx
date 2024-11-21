export function Pagination({ page, prevPage, nextPage, limit, total }) {
    const totalPages = Math.ceil(total / limit);

    return (
        <div>
            <button onClick={prevPage} disabled={page === 0}>Anterior</button>
            <span>Página {page + 1} de {totalPages}</span>
            <button onClick={nextPage} disabled={page + 1 >= totalPages}>Siguiente</button>
        </div>
    );
}