import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog/>', () => {
  const blog = {
    title: 'evf',
    author: 'enzo',
    likes: 1,
    url: 'sasd'
  }

  const view = render(
    <Blog blog={blog}/>
  )

  test('renders content', () => {
  
    expect(view.container).toHaveTextContent(
      'evf enzo'
    )

  })
})