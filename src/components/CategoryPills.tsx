import Button from './Button'

type CategoryPillProps = {
  categories: string[]
}

export default function CategoryPills({ categories }: CategoryPillProps) {
  return (
    <div className="overflow-x-hidden relative">
      <div className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant="dark"
            className="py-1 px-3 rounded-lg whitespace-nowrap"
          >
            {cat}
          </Button>
        ))}
      </div>
    </div>
  )
}
