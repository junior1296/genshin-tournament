import CategoryItem from './CategoryItem'

export default function CategoryList({items, removeCategory}) {
  return (
    <div className="Card">
      <ul className="List-formatted">
        {
          items.map(item => <CategoryItem key={item} item={item} removeCategory={removeCategory}/>)
        }
      </ul>
    </div>
  )
}