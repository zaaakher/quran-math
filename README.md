# Quran Math

A Next.js application for analyzing and visualizing mathematical patterns in the Holy Quran. This project provides statistical insights, linguistic analysis, and various visualizations of Quranic data.

## Features

- 📊 **Comprehensive Statistics**: View detailed statistics about surahs, ayahs, letters, and words
- 🔤 **Letter Frequency Analysis**: Analyze the frequency and distribution of Arabic letters
- 📈 **Visual Charts**: Interactive charts showing revelation patterns, page distribution, and more
- 🌐 **Bilingual Support**: Available in English and Arabic (العربية)
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Internationalization**: next-intl
- **UI Components**: Custom components with shadcn/ui inspiration

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
quran-math/
├── app/
│   ├── [locale]/          # Localization routes
│   ├── dashboard/         # Dashboard components
│   └── page.tsx           # Main page
├── components/
│   ├── dashboard/         # Dashboard widgets and charts
│   └── ui/                # Reusable UI components
├── lib/
│   ├── analysis.ts        # Quran analysis logic
│   ├── quran-api.ts       # Quran data API
│   └── utils.ts           # Utility functions
├── hooks/                 # Custom React hooks
├── messages/              # i18n messages (en.json, ar.json)
└── types/                 # TypeScript type definitions
```

## Available Dashboards

- **Overview Cards**: Key statistics at a glance
- **Surah Characteristics**: Details about each surah
- **Letter Frequency**: Distribution of Arabic letters
- **Linguistic Stats**: Word and character analysis
- **Revelation Charts**: Patterns in revelation order
- **Page Distribution**: Visualizing Quranic pages
- **Word Statistics**: Analysis of word usage
- And many more...

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- [Quran API](https://quran-api.developer(placeholder)) for providing Quranic data
- All contributors and supporters of this project
