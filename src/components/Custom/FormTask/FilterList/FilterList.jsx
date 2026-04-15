import { useState } from "react";

const items = ["Apple", "Banana", "Orange", "Mango", "Grapes", "Peach", "Cherry"];

function FilterList() {
  const [query, setQuery] = useState("");

  const filtered = items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", maxWidth: "300px", margin: "40px auto" }}>
      <h2>Filter List</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        style={{ width: "100%", padding: "8px", fontSize: "1rem" }}
      />
      <ul>
        {filtered.length > 0 ? (
          filtered.map((item, index) => (
            <li key={index}>{item}</li>
          ))
        ) : (
          <li>No results found</li>
        )}
      </ul>
    </div>
  );
}

export default FilterList;
