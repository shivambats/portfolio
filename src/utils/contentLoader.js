import matter from 'gray-matter';

// Mock data for blogs
const mockBlogs = [
  { 
    id: 'blog1', 
    title: 'Making a design system from scratch',
    date: '12 Feb 2020',
    tags: ['Design', 'Pattern'],
    excerpt: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
    content: `
# Making a design system from scratch

Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.

## The Challenge

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat, ipsum ac auctor ornare, nunc ligula scelerisque eros.

## The Solution

Praesent convallis nulla nec nisi tempus, vel tincidunt nunc condimentum. Nullam at lorem sed metus mollis placerat.
    `
  },
  { 
    id: 'blog2', 
    title: 'Creating pixel perfect icons in Figma',
    date: '12 Feb 2020',
    tags: ['Figma', 'Icon Design'],
    excerpt: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
    content: `
# Creating pixel perfect icons in Figma

Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.

## The Approach

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat, ipsum ac auctor ornare, nunc ligula scelerisque eros.

## The Techniques

Praesent convallis nulla nec nisi tempus, vel tincidunt nunc condimentum. Nullam at lorem sed metus mollis placerat.
    `
  }
];

// Mock data for case studies
const mockCaseStudies = [
  { 
    id: '1', 
    title: 'Designing Dashboards',
    year: '2020',
    tags: ['Dashboard', 'User Experience Design'],
    image: '/images/dashboard.jpg',
    excerpt: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
    content: `
# Designing Dashboards

Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.

## The Problem

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat, ipsum ac auctor ornare, nunc ligula scelerisque eros.

## The Process

Praesent convallis nulla nec nisi tempus, vel tincidunt nunc condimentum. Nullam at lorem sed metus mollis placerat.

## The Result

Cras ultricies ligula sed magna dictum porta. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.
    `
  },
  { 
    id: '2', 
    title: 'Vibrant Portraits of 2020',
    year: '2018',
    tags: ['Illustration'],
    image: '/images/portraits.jpg',
    excerpt: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
    content: `
# Vibrant Portraits of 2020

Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.

## The Inspiration

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat, ipsum ac auctor ornare, nunc ligula scelerisque eros.

## The Technique

Praesent convallis nulla nec nisi tempus, vel tincidunt nunc condimentum. Nullam at lorem sed metus mollis placerat.

## The Collection

Cras ultricies ligula sed magna dictum porta. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.
    `
  }
];

// Function to fetch all blogs
export async function fetchAllBlogs() {
  // Simulate a network delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockBlogs);
    }, 300);
  });
}

// Function to fetch a specific blog
export async function fetchBlog(id) {
  // Simulate a network delay
  return new Promise(resolve => {
    setTimeout(() => {
      const blog = mockBlogs.find(blog => blog.id === id);
      resolve(blog || null);
    }, 300);
  });
}

// Function to fetch all case studies
export async function fetchAllCaseStudies() {
  // Simulate a network delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockCaseStudies);
    }, 300);
  });
}

// Function to fetch a specific case study
export async function fetchCaseStudy(id) {
  // Simulate a network delay
  return new Promise(resolve => {
    setTimeout(() => {
      const caseStudy = mockCaseStudies.find(study => study.id === id);
      resolve(caseStudy || null);
    }, 300);
  });
} 