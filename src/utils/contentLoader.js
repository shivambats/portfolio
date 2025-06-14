import matter from 'gray-matter';
import { Buffer } from 'buffer';

// Make Buffer available globally for gray-matter
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}

// Mock data removed - using actual markdown files

// Function to fetch all posts (unified system for both blogs and case studies)
export async function fetchAllPosts() {
  try {
    // Fetch the index to get the list of post IDs
    const indexResponse = await fetch('/case_study/index.json');
    const postIds = await indexResponse.json();
    
    // Fetch each post markdown file
    const posts = await Promise.all(
      postIds.map(async (id) => {
        try {
          const response = await fetch(`/case_study/${id}.md`);
          
          if (!response.ok) {
            return null;
          }
          
          const markdownContent = await response.text();
          
          // Parse the markdown with frontmatter
          const { data, content } = matter(markdownContent);
          
          return {
            id,
            title: data.title,
            type: data.type || 'Case Study', // Default to Case Study for backward compatibility
            year: data.year,
            date: data.date,
            tags: data.tags || [],
            image: data.image,
            excerpt: data.excerpt,
            content
          };
        } catch (error) {
          return null;
        }
      })
    );
    
    // Filter out any null values (failed to load)
    const result = posts.filter(post => post !== null);
    return result;
  } catch (error) {
    return [];
  }
}

// Function to fetch posts by type
export async function fetchPostsByType(type) {
  const allPosts = await fetchAllPosts();
  return allPosts.filter(post => post.type === type);
}

// Function to fetch a specific post
export async function fetchPost(id) {
  try {
    const response = await fetch(`/case_study/${id}.md`);
    if (!response.ok) {
      throw new Error(`Post ${id} not found`);
    }
    
    const markdownContent = await response.text();
    const { data, content } = matter(markdownContent);
    
    return {
      id,
      title: data.title,
      type: data.type || 'Case Study',
      year: data.year,
      date: data.date,
      tags: data.tags || [],
      image: data.image,
      excerpt: data.excerpt,
      content
    };
  } catch (error) {
    return null;
  }
}

// Legacy function aliases for backward compatibility
export async function fetchAllCaseStudies() {
  return await fetchPostsByType('Case Study');
}

export async function fetchCaseStudy(id) {
  return await fetchPost(id);
}

export async function fetchAllBlogs() {
  return await fetchPostsByType('Blog');
}

export async function fetchBlog(id) {
  return await fetchPost(id);
} 