# My Website

[![Deployment](https://img.shields.io/badge/Vercel-View%20Deployment-black?style=flat-square)](https://itsmrnatural.vercel.app)
[![GitHub License](https://img.shields.io/github/license/itsmrnatural/my-website?label=License&style=flat-square)](/LICENSE.md)
[![GitHub Issues](https://img.shields.io/github/issues/itsmrnatural/my-website?label=Issues&style=flat-square)](https://github.com/itsmrnatural/my-website/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/itsmrnatural/my-website?label=Pull%20Requests&style=flat-square)](https://github.com/itsmrnatural/my-website/pulls)

Welcome to my personal website! This is a simple and elegant portfolio site that you can use to showcase your work, skills, and interests. The website is built using React and Tailwind CSS, and is fully customizable to suit your needs.

## Acknowledgements

Special thanks to [umutxyp](https://github.com/umutxyp) for providing the initial source code and inspiration for this project.

## Features

- Clean and simple design with coffee-inspired color palette
- Responsive layout that looks great on all devices
- **MDX-powered blog system** with full Markdown support
- **Tag-based filtering** and search functionality for blog posts
- **Syntax highlighting** for code blocks (Monokai theme)
- **Dark/Light theme toggle** (☕ coffee cup for light, 🌙 moon for dark)
- **Comment system** integration with Giscus
- Built using modern web technologies, including Next.js, React, and Tailwind CSS
- Custom fonts: Philosopher (headings), Lora (sub-headings), Karla (sans-serif), JetBrains Mono (code)

## Getting Started

To get started with this website, you'll need to have Node.js and npm installed on your computer. Then, follow these steps:

1. Clone the repository: `git clone https://github.com/itsmrnatural/my-website.git`
2. Install the dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

This will launch the website in your default browser and you can start customizing it to your liking.

## Blog System

### Creating Blog Posts

Blog posts are written in MDX (Markdown + JSX) and stored in the `content/blog/` directory. Each post should have frontmatter metadata:

```mdx
---
title: "Your Post Title"
date: "2024-01-20"
author: "Your Name"
image: "https://example.com/banner.jpg"
preview: "A short description of your post"
tags: ["javascript", "tutorial", "nextjs"]
---

# Your Post Title

Your content here with full Markdown support...
```

### Supported Features

- **Markdown syntax**: Headers, lists, links, images, blockquotes
- **Code blocks with syntax highlighting**: JavaScript, Python, and more
- **Footnotes**: Use `[^1]` for references
- **Tags**: Categorize posts with tags
- **Comments**: Giscus integration for discussions
- **File downloads**: Use the `FileDownload` component

### Configuring Giscus Comments

To enable comments:

1. Set up Giscus for your repository at [giscus.app](https://giscus.app)
2. Update the `pages/blog/[id].jsx` file with your `repoId` and `categoryId`

### Theme Customization

The site uses a coffee-inspired color palette defined in `tailwind.config.js`. The theme can be toggled between light and dark modes using the coffee cup/moon button in the header.

## Contributing

Contributions are always welcome! If you have any suggestions, bug reports, or pull requests, please submit them to the repository's [issue tracker](https://github.com/itsmrnatural/my-website/issues) or [pull requests](https://github.com/itsmrnatural/my-website/pulls) page.

## License

This project is licensed under the [MIT License](/LICENSE.md). Feel free to use, modify, and distribute the code as you see fit.

## Contact

If you have any questions, feedback, or just want to say hi, feel free to reach out to me at [something.mrnatural@gmail.com](mailto:something.mrnatural@gmail.com).
