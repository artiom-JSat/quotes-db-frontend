import { render } from '@testing-library/react'
import { Quotes } from '@components/Quotes'

jest.mock('@components/Quote', () => ({
  Quote: ({ quote }) => <div data-testid="quote-component">{quote.text}</div>,
})) // Mock the Quote component

describe('Tests for Quotes Component', () => {
  const mockQuotes = [
    {
      id: 1,
      text: 'First test quote',
      author: 'Author 1',
      categories: ['cat1'],
    },
    {
      id: 2,
      text: 'Second test quote',
      author: 'Author 2',
      categories: ['cat2'],
    },
    {
      id: 3,
      text: 'Third test quote',
      author: 'Author 3',
      categories: ['cat3'],
    },
  ]

  test('renders correctly with given quotes', () => {
    const { getByText } = render(
      <Quotes quotes={mockQuotes} selectedCategory="All" searchText="" />,
    )

    // Check if quotes are rendered
    expect(getByText('First test quote')).toBeInTheDocument()
    expect(getByText('Second test quote')).toBeInTheDocument()
    expect(getByText('Third test quote')).toBeInTheDocument()
  })

  test('renders the correct number of Quote components', () => {
    const { getAllByTestId } = render(
      <Quotes quotes={mockQuotes} selectedCategory="All" searchText="" />,
    )

    // Assuming that each Quote component has a data-testid attribute
    expect(getAllByTestId('quote-component')).toHaveLength(mockQuotes.length)
  })

  test('renders quotes with the correct text', () => {
    const { getByText } = render(
      <Quotes quotes={mockQuotes} selectedCategory="" searchText="" />,
    )

    // Check if all the quotes texts are rendered
    mockQuotes.forEach((quote) => {
      expect(getByText(quote.text)).toBeInTheDocument()
    })
  })

  test('renders without crashing when no quotes are provided', () => {
    const { container } = render(
      <Quotes quotes={[]} selectedCategory="" searchText="" />,
    )

    // Check if the component renders without any errors
    expect(container).toBeTruthy()
  })
})
