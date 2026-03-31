const CollectionSort = ({ sortValue, onUpdate }) => (
  <select
    className="border px-4 py-2 rounded"
    value={sortValue}
    onChange={(e) => onUpdate(e.target.value)}
  >
    <option value="">Sort By</option>
    <option value="price-asc">Price: Low to High</option>
    <option value="price-desc">Price: High to Low</option>
    <option value="name-asc">Name: A-Z</option>
    <option value="name-desc">Name: Z-A</option>
  </select>
);

export default CollectionSort;
