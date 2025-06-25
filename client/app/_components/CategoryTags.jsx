import { CategoryTag } from '@components/CategoryTag'

const MAX_VISIBLE_CATEGORY = 10

export const CategoryTags = ({
  categories,
  selectedCategory,
  isSingleQuotePage,
}) => {
  let displayedCategories = categories

  if (!isSingleQuotePage) {
    displayedCategories = categories.slice(0, MAX_VISIBLE_CATEGORY)

    if (selectedCategory && categories.includes(selectedCategory)) {
      const selectedIndex = categories.indexOf(selectedCategory)
      if (selectedIndex >= MAX_VISIBLE_CATEGORY) {
        displayedCategories = [
          ...displayedCategories.slice(0, MAX_VISIBLE_CATEGORY - 1),
          selectedCategory,
        ]
      }
    }
  }

  return (
    <div
      className={`${
        isSingleQuotePage ? 'justify-center' : ''
      } flex flex-wrap mt-2 gap-2`}
    >
      {displayedCategories.map((category) => (
        <CategoryTag
          key={category}
          category={category}
          selectedCategory={selectedCategory}
          isSingleQuotePage={isSingleQuotePage}
        />
      ))}
      {!isSingleQuotePage && categories.length > MAX_VISIBLE_CATEGORY && (
        <span className="text-m">...</span>
      )}
    </div>
  )
}
