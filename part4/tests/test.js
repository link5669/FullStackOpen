const listHelper = require('../utils/utils_fortesting')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const listWithNoBlogs = []

const listWithNBlogs = [{
  _id: '5a422aa71b54a676234d17f8',
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 5,
  __v: 0
},
{
  _id: '5a422aa71b54a676234d17f9',
  title: 'Uhh Book Title 2',
  author: 'Author 2',
  url: 'url.com',
  likes: 2,
  __v: 0
},
{
  _id: '5a422aa71b54a646234d17f8',
  title: 'Dijkstra Book 2',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 5,
  __v: 0
}
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has zero blogs, return 0 likes', () => {
    const result = listHelper.totalLikes(listWithNoBlogs)
    expect(result).toBe(0)
  })

  test('when list has n blogs, return sum(blogs.likes)', () => {
    const result = listHelper.totalLikes(listWithNBlogs)
    expect(result).toBe(12)
  })
})

describe('favorite blog', () => {
  test('when a list has zero blogs, return nothing', () => {
    const result = listHelper.favBlog(listWithNoBlogs)
    expect(result).toBe(null)
  })

  test('when a list has 1 blog, return that blog', () => {
    const result = listHelper.favBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })

  test('when a list has N blogs, return the blog with most likes', () => {
    const result = listHelper.favBlog(listWithNBlogs)
    expect(result).toEqual(listWithOneBlog[0])
  })
})

describe('favorite author', () => {
  test('when a list has zero blogs, return nothing', () => {
    const result = listHelper.favAuthor(listWithNoBlogs)
    expect(result).toBe(null)
  })

  test('when a list has 1 blog, return that blog', () => {
    const result = listHelper.favAuthor(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0].author)
  })

  test('when a list has N blogs, return the author with most likes', () => {
    const result = listHelper.favAuthor(listWithNBlogs)
    expect(result).toEqual('Edsger W. Dijkstra')
  })
})

describe('author with most blogs', () => {
  test('when a list has zero blogs, return nothing', () => {
    const result = listHelper.mostBlogs(listWithNoBlogs)
    expect(result).toBe(null)
  })

  test('when a list has 1 blog, return that author', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0].author)
  })

  test('when a list has N blogs, return the author with most blogs', () => {
    const result = listHelper.mostBlogs(listWithNBlogs)
    expect(result).toEqual('Edsger W. Dijkstra')
  })
})
