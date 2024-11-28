export function Filters({ categories, onChangeCategoryFilter, filterCategory }) {
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
                <option key={category} selected={category === filterCategory}>{category}</option>
              ))
            }
          </select>
        </label>
      </form>
    </search>
  )
}