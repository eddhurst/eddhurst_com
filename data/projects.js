/*
  Projects — the single source of truth for projects.html and the homepage.

  To add a project, copy one entry and edit it. Fields:
    name         (required) Project name
    description  (required) One or two sentences
    category     (required) e.g. "Utility", "CSS experiment", "Android app"
    technologies (required) Array of short labels
    image        (optional) Relative path, e.g. "images/projects/my-project.png"
    imageAlt     (optional) Describe the image; use "" if purely decorative
    liveUrl      (optional) Full URL to the running project
    githubUrl    (optional) Full URL to the repository
    featured     (optional) true = eligible for the homepage selection
    placeholder  (optional) true = clearly marked as a placeholder

  The entries below are PLACEHOLDERS to show the layout. Replace or delete them.
*/
window.PROJECTS = [
  {
    name: "Placeholder project one",
    description:
      "A slot for a real project. Replace this entry in data/projects.js with a name, a short description and links.",
    category: "Utility",
    technologies: ["HTML", "CSS", "JavaScript"],
    featured: true,
    placeholder: true,
  },
  {
    name: "Placeholder project two",
    description:
      "Another empty plinth, waiting for a CSS experiment, an Android app or something in between.",
    category: "CSS experiment",
    technologies: ["CSS"],
    featured: true,
    placeholder: true,
  },
  {
    name: "Placeholder project three",
    description:
      "Small things, interesting ideas. Add a liveUrl or githubUrl and the links will appear here automatically.",
    category: "Experiment",
    technologies: ["HTML", "Accessibility"],
    featured: true,
    placeholder: true,
  },
];
