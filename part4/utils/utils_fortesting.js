const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let sum = 0
  blogs.forEach(blog => {
    sum += blog.likes
  })
  return sum
}

const favBlog = (blogs) => {
  let fav = null
  let maxLikes = 0
  blogs.forEach(blog => {
    if (blog.likes > maxLikes) {
      maxLikes = blog.likes
      fav = blog
    }
  })
  return fav
}

const favAuthor = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  let authorLikes = []
  blogs.forEach(blog => {
    let found = false
    for (let i = 0; i < authorLikes.length; i++) {
      if (authorLikes[i].author === blog.author) {
        authorLikes[i].likes += blog.likes
        found = true
      }
    }
    if (!found) {
      authorLikes.push({ author: blog.author, likes: blog.likes })
    }
  })
  let mostLikedIndex = 0
  for (let i = 0; i < authorLikes.length; i++) {
    if (authorLikes[i].likes > authorLikes[mostLikedIndex]) {
      mostLikedIndex = i
    }
  }
  return authorLikes[mostLikedIndex].author
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  let blogCounts = []
  blogs.forEach(blog => {
    let found = false
    for (let i = 0; i < blogCounts.length; i++) {
      if (blogCounts[i].author === blog.author) {
        blogCounts[i].likes += 1
        found = true
      }
    }
    if (!found) {
      blogCounts.push({ author: blog.author, likes: 1 })
    }
  })
  let mostBlogsIndex = 0
  for (let i = 0; i < blogCounts.length; i++) {
    if (blogCounts[i].likes > blogCounts[mostBlogsIndex]) {
      mostBlogsIndex = i
    }
  }
  return blogCounts[mostBlogsIndex].author
}

module.exports = {
  dummy, totalLikes, favBlog, favAuthor, mostBlogs
}
