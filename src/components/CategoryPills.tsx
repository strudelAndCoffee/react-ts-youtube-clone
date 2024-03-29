import { ChevronLeft, ChevronRight } from 'lucide-react'
import Button from './Button'
import { useEffect, useRef, useState } from 'react'

type CategoryPillProps = {
  categories: string[]
  selectedCategory: string
  onSelect: (cat: string) => void
}

const TRANSLATE_AMOUNT = 200

export default function CategoryPills({
  categories,
  selectedCategory,
  onSelect,
}: CategoryPillProps) {
  const [translate, setTranslate] = useState(0)
  const [isLeftVisible, setIsLeftVisible] = useState(false)
  const [isRightVisible, setIsRightVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current == null) return

    const observer = new ResizeObserver((entries) => {
      const container = entries[0]?.target
      if (container == null) return

      setIsLeftVisible(translate > 0)
      setIsRightVisible(
        translate + container.clientWidth < container.scrollWidth
      )
    })

    observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [categories, translate])

  return (
    <div ref={containerRef} className="overflow-x-hidden relative">
      <div
        className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]"
        style={{ transform: `translateX(-${translate}px)` }}
      >
        {categories.map((cat) => (
          <Button
            key={cat}
            onClick={() => onSelect(cat)}
            variant={selectedCategory === cat ? 'dark' : 'default'}
            className="py-1 px-3 rounded-lg whitespace-nowrap"
          >
            {cat}
          </Button>
        ))}
      </div>
      {isLeftVisible && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full">
          <Button
            variant="ghost"
            size="icon"
            className="h-full aspect-square w-auto p-1.5"
            onClick={() => {
              setTranslate((trans) => {
                const newTrans = trans - TRANSLATE_AMOUNT
                if (newTrans <= 0) return 0
                return newTrans
              })
            }}
          >
            <ChevronLeft />
          </Button>
        </div>
      )}
      {isRightVisible && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="h-full aspect-square w-auto p-1.5"
            onClick={() => {
              setTranslate((trans) => {
                if (containerRef.current == null) {
                  return trans
                }
                const newTrans = trans + TRANSLATE_AMOUNT
                const edge = containerRef.current.scrollWidth
                const width = containerRef.current.clientWidth
                if (newTrans + width >= edge) {
                  return edge - width
                }
                return newTrans
              })
            }}
          >
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  )
}
