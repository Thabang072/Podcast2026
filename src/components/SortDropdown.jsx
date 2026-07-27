import "./SortDropdown.css";

function SortDropdown({ sortOption, setSortOption }) {
  return (
    <div className="sort-dropdown">
      <label htmlFor="sort">Sort By:</label>

      <select
        id="sort"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="az">Alphabetical (A-Z)</option>
        <option value="za">Alphabetical (Z-A)</option>
        <option value="newest">Recently Updated</option>
        <option value="oldest">Least Recently Updated</option>
      </select>
    </div>
  );
}

export default SortDropdown;