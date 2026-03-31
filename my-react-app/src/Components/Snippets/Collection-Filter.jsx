const CollectionFilters = ({ filterValue, onUpdate }) => (
  <select
    className="border px-4 py-2 rounded"
    value={filterValue}
    onChange={(e) => onUpdate(e.target.value)}
  >
    <option value="">All</option>
    <option value="in">In Stock</option>
    <option value="out">Out of Stock</option>
  </select>
);
export default CollectionFilters;
