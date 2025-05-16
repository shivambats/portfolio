import Layout from '../../components/Layout'
import BlogCard from '../../components/BlogCard'

export default function Blogs({ blogs }) {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">All Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map(blog => (
          <BlogCard key={blog.slug} blog={blog} />
        ))}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  // Fetch all blogs here
  const blogs = [] // Add your blog data

  return {
    props: {
      blogs,
    },
  }
} 