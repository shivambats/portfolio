import Layout from '../components/Layout'
import BlogCard from '../components/BlogCard'
import VideoCard from '../components/VideoCard'

const posts = [
  {
    title: "Making a design system from scratch",
    date: "12 Feb 2020",
    category: "Design, Pattern",
    excerpt: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
  },
  {
    title: "Creating pixel perfect icons in Figma",
    date: "12 Feb 2020",
    category: "Figma, Icon Design",
    excerpt: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
  }
]

export default function Home({ latestBlogs, latestVideos }) {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between py-16 px-4 md:px-0">
        <div className="flex-1 max-w-xl">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Hi, I am Shivam,<br />
            Creative Technologist
          </h1>
          <p className="mb-8 text-gray-700">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
          </p>
          <a
            href="/resume.pdf"
            className="inline-block bg-[#FF6464] text-white font-semibold px-6 py-3 rounded-md shadow hover:bg-[#ff7b7b] transition"
            download
          >
            Download Resume
          </a>
        </div>
        <div className="flex-1 flex justify-center mt-10 md:mt-0">
          <img
            src="/public/images/profile.png"
            alt="Profile"
            className="w-48 h-48 md:w-60 md:h-60 rounded-full object-cover border-4 border-white shadow-lg"
          />
        </div>
      </section>

      {/* Recent Posts */}
      <section className="bg-[#EDF7FA] py-12 px-4 md:px-8">
        <div className="flex justify-between items-center mb-8 max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold">Recent posts</h2>
          <a href="/blogs" className="text-blue-500 hover:underline">View all</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {posts.map((post, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow hover:shadow-md transition">
              <h3 className="text-xl font-bold mb-3">{post.title}</h3>
              <div className="text-gray-500 text-sm mb-4 flex items-center space-x-2">
                <span>{post.date}</span>
                <span>|</span>
                <span>{post.category}</span>
              </div>
              <p className="text-gray-700">{post.excerpt}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Latest Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestBlogs.map(blog => (
            <BlogCard key={blog.slug} blog={blog} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Latest Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestVideos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  // Fetch latest blogs and videos here
  const latestBlogs = [] // Add your blog data
  const latestVideos = [] // Add your video data

  return {
    props: {
      latestBlogs,
      latestVideos,
    },
  }
} 