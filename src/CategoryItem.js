
export default function CategoryItem({item, removeCategory}) {
  return (
    <li className="List-item">
      <article className="Row">
        <p>{item}</p>
        <button className="Button" onClick={() => removeCategory(item)}>Delete</button>
      </article>
    </li>
  )
}