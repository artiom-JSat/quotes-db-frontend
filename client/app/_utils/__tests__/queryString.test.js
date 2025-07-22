import { createSearchQueryString } from '@utils/queryString'

describe('Testing createSearchQueryString function', () => {
  test('should return a valid query string with allowed params', () => {
    const queryParams = {
      text: 'life',
      author: 'Albert Einstein',
      category: 'inspiration',
      limit: 10,
      offset: 5,
    }
    const result = createSearchQueryString(queryParams)
    expect(result).toBe(
      'text=life&author=Albert+Einstein&category=inspiration&limit=10&offset=5',
    )
  })

  test('should filter out disallowed params', () => {
    const queryParams = {
      text: 'life',
      author: 'Albert Einstein',
      foo: 'bar', // This param is not allowed
    }
    const result = createSearchQueryString(queryParams)
    expect(result).toBe('text=life&author=Albert+Einstein')
  })

  test('should filter empty string, undefined and null values', () => {
    const queryParams = {
      text: '',
      author: undefined,
      category: null,
      limit: 10,
    }
    const result = createSearchQueryString(queryParams)
    expect(result).toBe('limit=10')
  })

  test('should return an empty string when no valid params are provided', () => {
    const queryParams = {
      foo: 'bar', // Disallowed param
      bar: 'baz', // Disallowed param
    }
    const result = createSearchQueryString(queryParams)
    expect(result).toBe('')
  })

  test('should keep 0 as param value and not omit it', () => {
    const queryParams = {
      author: 'Alice',
      limit: 50,
      offset: 0,
    }
    const result = createSearchQueryString(queryParams)
    expect(result).toBe('author=Alice&limit=50&offset=0')
  })
})
