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

module.exports = {
  dummy, totalLikes, favBlog
}
