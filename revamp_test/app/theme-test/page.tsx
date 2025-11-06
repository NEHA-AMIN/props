'use client';

import { useTheme } from '@/app/providers/ThemeProvider';
import ThemeToggle from '@/app/components/ThemeToggle';
import { useState } from 'react';

export default function ThemeTestPage() {
  const { theme, resolvedTheme, systemTheme, setTheme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    category: 'general',
    newsletter: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-nav-background">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-nav-foreground">Theme Test Page</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Theme: {theme} | Resolved: {resolvedTheme} | System: {systemTheme}
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Theme Controls */}
        <section className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-card-foreground">Theme Controls</h2>
          <div className="flex flex-wrap gap-2">
            {(['light', 'dark', 'system'] as const).map((themeOption) => (
              <button
                key={themeOption}
                onClick={() => setTheme(themeOption)}
                className={`px-4 py-2 rounded-md border transition-colors ${
                  theme === themeOption
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                }`}
              >
                {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
              </button>
            ))}
          </div>
        </section>

        {/* Color Palette */}
        <section className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-card-foreground">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Background', class: 'bg-background', text: 'text-foreground' },
              { name: 'Card', class: 'bg-card', text: 'text-card-foreground' },
              { name: 'Primary', class: 'bg-primary', text: 'text-primary-foreground' },
              { name: 'Secondary', class: 'bg-secondary', text: 'text-secondary-foreground' },
              { name: 'Muted', class: 'bg-muted', text: 'text-muted-foreground' },
              { name: 'Accent', class: 'bg-accent', text: 'text-accent-foreground' },
              { name: 'Success', class: 'bg-green-500', text: 'text-white' },
              { name: 'Warning', class: 'bg-yellow-500', text: 'text-black' },
              { name: 'Error', class: 'bg-destructive', text: 'text-destructive-foreground' },
              { name: 'Info', class: 'bg-blue-500', text: 'text-white' },
            ].map((color) => (
              <div
                key={color.name}
                className={`${color.class} ${color.text} p-4 rounded-md border border-border`}
              >
                <div className="font-medium">{color.name}</div>
                <div className="text-sm opacity-75">Sample text</div>
              </div>
            ))}
          </div>
        </section>

        {/* Buttons */}
        <section className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-card-foreground">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
              Primary Button
            </button>
            <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors">
              Secondary Button
            </button>
            <button className="px-4 py-2 border border-border text-foreground rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
              Outline Button
            </button>
            <button className="px-4 py-2 text-foreground rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
              Ghost Button
            </button>
            <button className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors">
              Destructive Button
            </button>
            <button 
              className="px-4 py-2 bg-muted text-muted-foreground rounded-md cursor-not-allowed opacity-50"
              disabled
            >
              Disabled Button
            </button>
          </div>
        </section>

        {/* Form Elements */}
        <section className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-card-foreground">Form Elements</h2>
          <form className="space-y-4">
            <div>
          <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                placeholder="Enter your name"
              />
            </div>

            <div>
          <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            <div>
          <label htmlFor="category" className="block text-sm font-semibold text-foreground mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              >
                <option value="general">General</option>
                <option value="support">Support</option>
                <option value="feedback">Feedback</option>
                <option value="bug">Bug Report</option>
              </select>
            </div>

            <div>
          <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                placeholder="Enter your message"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="newsletter"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleInputChange}
                className="h-4 w-4 text-primary focus:ring-ring border-border rounded"
              />
              <label htmlFor="newsletter" className="ml-2 text-sm text-foreground">
                Subscribe to newsletter
              </label>
            </div>
          </form>
        </section>

        {/* Cards and Content */}
        <section className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-card-foreground">Cards and Content</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-surface border border-outline rounded-lg p-4">
              <h3 className="font-semibold text-on-surface mb-2">Surface Card</h3>
              <p className="text-on-surface-variant text-sm">
                This is a surface card with proper contrast ratios for both light and dark themes.
              </p>
            </div>
            <div className="bg-surface-variant border border-outline-variant rounded-lg p-4">
              <h3 className="font-semibold text-on-surface mb-2">Surface Variant</h3>
              <p className="text-on-surface-variant text-sm">
                This is a surface variant card with slightly different background color.
              </p>
            </div>
          </div>
        </section>

        {/* Teal Theme Elements */}
        <section className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-card-foreground">Teal Theme Elements</h2>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                <div
                  key={shade}
                  className={`w-16 h-16 rounded-md flex items-center justify-center text-xs font-medium`}
                  style={{
                    backgroundColor: `hsl(var(--teal-${shade}))`,
                    color: shade >= 500 ? 'white' : 'black'
                  }}
                >
                  {shade}
                </div>
              ))}
            </div>
            <button className="px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors">
              Teal Button
            </button>
          </div>
        </section>

        {/* Accessibility Features */}
        <section className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-card-foreground">Accessibility Features</h2>
          <div className="space-y-4">
            <div className="p-4 border border-border rounded-md">
              <h3 className="font-medium mb-2">Focus Indicators</h3>
              <div className="space-x-2">
                <button className="px-3 py-1 bg-primary text-primary-foreground rounded focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                  Focusable Button
                </button>
                <input
                  type="text"
                  placeholder="Focusable Input"
                  className="px-3 py-1 border border-input rounded focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="p-4 border border-border rounded-md">
              <h3 className="font-medium mb-2">High Contrast Support</h3>
              <p className="text-sm text-muted-foreground">
                This theme automatically adjusts for users with high contrast preferences.
              </p>
            </div>
          </div>
        </section>

        {/* Print Styles Test */}
        <section className="bg-card border border-border rounded-lg p-6 print:bg-white print:text-black">
        <h2 className="text-xl font-bold mb-4 text-card-foreground print:text-black">Print Styles</h2>
          <p className="text-muted-foreground print:text-gray-700">
            This section demonstrates print-friendly styles. Use your browser's print preview to test.
          </p>
          <div className="mt-4 p-4 bg-muted rounded-md print:bg-gray-100">
            <p className="text-sm">This content is optimized for printing in both themes.</p>
          </div>
        </section>
      </div>
    </div>
  );
}