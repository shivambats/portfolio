import React from 'react';
import { Link } from 'react-router-dom';

const projects = [
  { id: '1', title: 'Portfolio Website' },
  { id: '2', title: 'E-commerce App' },
];

export default function Projects() {
  return (
    <section className="section">
      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link to={`/project/${project.id}`}>{project.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
} 