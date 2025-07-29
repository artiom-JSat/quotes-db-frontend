import {
  isQuoteFormValid,
  getSearchInputValidationMessage,
} from '@utils/validation'

describe('Tests for isQuoteFormValid function', () => {
  let setValidationErrorsMock

  beforeEach(() => {
    setValidationErrorsMock = jest.fn()
  })

  it('returns true for valid data', () => {
    const result = isQuoteFormValid({
      values: {
        text: 'This is a valid quote',
        author: 'John Doe',
        categories: 'inspiration,motivation',
      },
      setValidationErrors: setValidationErrorsMock,
    })

    expect(result).toBe(true)
    expect(setValidationErrorsMock).toHaveBeenCalledWith({})
  })

  it('returns false and sets error if text is too short', () => {
    isQuoteFormValid({
      values: {
        text: 'short',
        author: 'John Doe',
        categories: 'life',
      },
      setValidationErrors: setValidationErrorsMock,
    })

    expect(setValidationErrorsMock).toHaveBeenCalledWith({
      text: 'Text must be at least 10 characters long.',
    })
  })

  it('returns false and sets error if author is too short', () => {
    isQuoteFormValid({
      values: {
        text: 'This is a valid quote',
        author: 'A',
        categories: 'life',
      },
      setValidationErrors: setValidationErrorsMock,
    })

    expect(setValidationErrorsMock).toHaveBeenCalledWith({
      author: 'Author must be between 2 and 255 characters long.',
    })
  })

  it('returns false and sets error if categories are empty', () => {
    isQuoteFormValid({
      values: {
        text: 'This is a valid quote',
        author: 'John Doe',
        categories: '   ',
      },
      setValidationErrors: setValidationErrorsMock,
    })

    expect(setValidationErrorsMock).toHaveBeenCalledWith({
      categories: 'There must be al least one category.',
    })
  })

  it('returns false and sets error for invalid category format', () => {
    isQuoteFormValid({
      values: {
        text: 'This is a valid quote',
        author: 'John Doe',
        categories: 'valid,Invalid!,123,another_one',
      },
      setValidationErrors: setValidationErrorsMock,
    })

    expect(setValidationErrorsMock).toHaveBeenCalledWith({
      categories:
        'Invalid categories: Invalid!,another_one. Category names can only lowercase letters, numbers and dashes.',
    })
  })
})

describe('Tests for getSearchInputValidationMessage function', () => {
  it('returns error for short text', () => {
    const result = getSearchInputValidationMessage('text', 'a')
    expect(result).toBe('* Text must be at least 2 characters long.')
  })

  it('returns error for short author', () => {
    const result = getSearchInputValidationMessage('author', 'a')
    expect(result).toBe('* Author must be at least 2 characters long.')
  })

  it('returns error for invalid category', () => {
    const result = getSearchInputValidationMessage('category', 'Invalid!')
    expect(result).toBe(
      '* Category can only contain lowercase letters, numbers and dashes.',
    )
  })

  it('returns undefined for valid inputs', () => {
    expect(getSearchInputValidationMessage('text', 'ok')).toBeUndefined()
    expect(getSearchInputValidationMessage('author', 'ok')).toBeUndefined()
    expect(
      getSearchInputValidationMessage('category', 'valid-category'),
    ).toBeUndefined()
  })

  it('returns undefined if value is empty or null', () => {
    expect(getSearchInputValidationMessage('text', '')).toBeUndefined()
    expect(getSearchInputValidationMessage('author', null)).toBeUndefined()
    expect(
      getSearchInputValidationMessage('category', undefined),
    ).toBeUndefined()
  })
})
