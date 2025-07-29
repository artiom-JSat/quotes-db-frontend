import { render } from '@testing-library/react'
import { Quote } from '@components/Quote'

// Mock the CategoryTags component
jest.mock('@components/CategoryTags', () => ({
  CategoryTags: () => <div data-testid="category-tags" />,
})) // Mock the Quote component

describe('Tests for Quote Component', () => {
  const mockQuote = {
    id: 1,
    text: 'The is a test quote text is more than 200 characters long. This is to ensure we test the text truncation property. This is to ensure we test the text truncation property. This is to ensure we test the text truncation property.',
    author: 'The Author',
    categories: ['category1', 'category2'],
  }

  it('renders the quote text and author', () => {
    const { getByText } = render(
      <Quote quote={mockQuote} selectedCategory="category1" searchText="" />,
    )

    // Check if the quote text is rendered
    expect(
      getByText(/The is a test quote text is more than 200 characters long/),
    ).toBeTruthy()
    expect(getByText(/The Author/)).toBeTruthy()
  })

  it('truncates the quote text if it is too long', () => {
    const { getByText } = render(
      <Quote quote={mockQuote} selectedCategory="category1" searchText="" />,
    )

    // Check if the quote text is truncated
    expect(
      getByText(
        /The is a test quote text is more than 200 characters long. This is to ensure we test the text truncation property. This is to ensure we test the text truncation property. This is to ensure we test the\.\.\./,
      ),
    ).toBeTruthy()
  })

  it('renders the CategoryTags component', () => {
    const { getByTestId } = render(
      <Quote quote={mockQuote} selectedCategory="category1" searchText="" />,
    )

    // Check if CategoryTags component is rendered
    expect(getByTestId('category-tags')).toBeTruthy()
  })

  it('highlights the search text in the quote', () => {
    const searchText = 'test quote text'
    const { getByText } = render(
      <Quote
        quote={mockQuote}
        selectedCategory="category1"
        searchText={searchText}
      />,
    )

    // Check if the highlighted text is a span
    const highlightText = getByText(/test quote text/i)
    expect(highlightText).toBeTruthy()
    expect(highlightText.tagName).toBe('SPAN') // Ensure it's in a <span>

    // Check if the surrounding span has the bg-yellow-200 class
    expect(highlightText).toHaveClass('bg-yellow-200')

    // Check if the highlighted text is rendered
    expect(getByText(/The is a /)).toBeTruthy() // Before highlighted text
    expect(getByText(/test quote text/)).toBeTruthy() // Highlighted text
    expect(getByText(/ is more than 200 characters long/)).toBeTruthy() // After highlighted text
  })
})
