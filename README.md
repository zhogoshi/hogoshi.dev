# hogoshi.dev

My personal website built with React and TypeScript.

## Development

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/zhogoshi/hogoshi.dev.git
cd hogoshi.dev
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

## Deployment

This site is automatically deployed to GitHub Pages using GitHub Actions. The deployment process is handled by the workflow in `.github/workflows/deploy.yml`.

### Manual Deployment

If you want to deploy manually:

1. Build the project:
```bash
npm run build
```

2. Deploy to GitHub Pages:
```bash
npm run deploy
```

### GitHub Pages Configuration

1. Go to your repository settings
2. Navigate to "Pages" section
3. Set the source to "GitHub Actions"

The site will be available at `https://username.github.io`
Or your custom domain/path which u provided in settings of repo

## Project Structure

```
hogoshi.dev/
├── src/
│   ├── assets/                # Static assets
│   ├── components/            # Reusable components
│   └── routes/                # Page components
├── public/                    # Public assets
└── dist/                      # Build output
```

## Stack

- React
- TypeScript
- Vite
- Framer Motion
- GitHub Pages
- GitHub Actions 