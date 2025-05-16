import Layout from '../../components/Layout'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'

export default function BlogPost({ mdxSource, frontMatter }) {
  return (
    <Layout>
      <article className="prose lg:prose-xl mx-auto">
        <h1>{frontMatter.title}</h1>
        <MDXRemote {...mdxSource} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  // Get all blog slugs
  const paths = [] // Add your blog slugs

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  // Fetch blog content here
  const mdxSource = await serialize('') // Add your markdown content
  const frontMatter = {} // Add your front matter

  return {
    props: {
      mdxSource,
      frontMatter,
    },
  }
} 