import Layout from '../../components/Layout'
import VideoCard from '../../components/VideoCard'

export default function Videos({ videos }) {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">All Videos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  // Fetch all videos here
  const videos = [] // Add your video data

  return {
    props: {
      videos,
    },
  }
} 