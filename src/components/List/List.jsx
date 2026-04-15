function List({ items, renderItem }) {


const onclick = (item) => {  alert(`${item} clicked!`)}



  return (
 <ul>
    {items.map((item, index) => (
      <li key={index} onClick={() => onclick(item)}>
        {renderItem(item, index)}
      </li>
    ))}
 </ul>
  );
}

export default List;