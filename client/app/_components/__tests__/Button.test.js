import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@components/Button'

describe('Tests for Button Component', () => {
  const mockOnClick = jest.fn()

  afterEach(() => {
    jest.clearAllMocks() // Clear any previous mock calls
  })

  test('renders with primary variant by default', () => {
    render(<Button text="Click Me" onClick={mockOnClick} />)

    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-violet-800') // Check for primary variant class
  })

  test('renders with secondary variant', () => {
    render(<Button text="Click Me" onClick={mockOnClick} variant="secondary" />)

    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toHaveClass('bg-gray-300') // Check for secondary variant class
  })

  test('renders with danger variant', () => {
    render(<Button text="Delete" onClick={mockOnClick} variant="danger" />)

    const button = screen.getByRole('button', { name: /delete/i })
    expect(button).toHaveClass('bg-red-800') // Check for danger variant class
  })

  test('calls onClick function when clicked', () => {
    render(<Button text="Click Me" onClick={mockOnClick} />)

    const button = screen.getByRole('button', { name: /click me/i })
    fireEvent.click(button)

    expect(mockOnClick).toHaveBeenCalledTimes(1) // Ensure the onClick function is called
  })
})
