import ClientPageWrapper from './components/ClientPageWrapper';
import { Metadata } from 'next';

// Next.js 16 with cacheComponents handles caching automatically
// All static optimizations are enabled by default

// Generate metadata for SEO and caching
export const metadata: Metadata = {
  title: "Propheus - We're a Physical AI company building the most comprehensive knowledge representation of every place on earth.",
  description: 'We turn maps into meaning, enabling AI agents that reason about the world through location, data, and context.',
  openGraph: {
    title: "Propheus - We're a Physical AI company building the most comprehensive knowledge representation of every place on earth.",
    description: 'We turn maps into meaning, enabling AI agents that reason about the world through location, data, and context.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Propheus - We're a Physical AI company building the most comprehensive knowledge representation of every place on earth.",
    description: 'We turn maps into meaning, enabling AI agents that reason about the world through location, data, and context.',
  },
};

export default function Home() {
  return <ClientPageWrapper />;
}
