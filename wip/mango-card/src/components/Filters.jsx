export function Filters({ categories, onChangeCategoryFilter }) {
  const handleChangeCategoryFilter = event => {
    const newCategoryFilter = event.target.value
    onChangeCategoryFilter(newCategoryFilter)
  }

  return (
    <search>
      <form>
        <label>
          Categorías:
          <select onChange={handleChangeCategoryFilter}>
            {
              categories.map(category => (
                <option key={category}>{category}</option>
              ))
            }
          </select>
        </label>
      </form>
    </search>
  )
}