import React from 'react';
import { User, Zap, Square, Users, Flag, Eye } from 'lucide-react';

export default function AboutUs() {
  const commandments = [
    { icon: User, title: 'Excellence' },
    { icon: Zap, title: 'Need for Speed' },
    { icon: Square, title: 'Tenacity & Grit' },
    { icon: Users, title: 'Family Team' },
    { icon: Flag, title: 'Journey >> Destination' },
    { icon: Eye, title: 'Curiosity & Generosity' }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-cyan-600 py-4 px-6">
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <span className="text-cyan-400">✦</span>
          <span>Propheus - Real World Models</span>
        </div>
      </header>

      {/* About Section */}
      <section className="px-8 py-16">
        <h1 className="text-5xl md:text-6xl font-light text-center mb-16">
          About <span className="text-cyan-400">Propheus</span>
        </h1>

        <div className="max-w-5xl mx-auto border-2 border-cyan-600 rounded-lg">
          <div className="bg-gradient-to-br from-teal-700 to-teal-900 p-12 space-y-8 text-gray-100">
            <p className="text-lg leading-relaxed">
              Propheus is a Physical AI company on a mission to build the most comprehensive knowledge 
              representation of every place on Earth.
            </p>

            <p className="text-lg leading-relaxed">
              Through our Digital Atlas and Agentic AI Framework - Alchemy, we help data teams and business 
              users in organizations make faster, smarter decisions about their physical assets - from retail stores 
              and real estate to consumer goods, logistics fleets, infrastructure, and more.
            </p>

            <p className="text-lg leading-relaxed">
              The Digital Atlas encodes real-world signals - like demographics, mobility, weather, social sentiment, 
              and live events - into a machine-readable language that AI models can interpret. Alchemy, our Agentic 
              AI framework, fuses this with enterprise first-party data to deliver mission-critical insights with 
              unmatched agility and accuracy.
            </p>

            <p className="text-lg leading-relaxed">
              Propheus is based in the US, with teams across Singapore and India - powering the next generation of 
              real-world intelligence.
            </p>

            <p className="text-lg leading-relaxed">
              Write to us at info@propheus.com and follow us on{' '}
              <a href="#" className="text-cyan-300 hover:underline">LinkedIn</a> and{' '}
              <a href="#" className="text-cyan-300 hover:underline">X</a>.
            </p>
          </div>
        </div>
      </section>

      {/* Commandments Section */}
      <section className="px-8 py-16">
        <h2 className="text-5xl md:text-6xl font-light text-center mb-16">
          Our <span className="text-cyan-400">Commandments</span>
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {commandments.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center space-y-6">
                <div className="w-16 h-16 flex items-center justify-center">
                  <Icon className="w-12 h-12 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-light">{item.title}</h3>
              </div>
            );
          })}
        </div>
      </section>

      {/* Founders Section */}
      {/* <section className="px-8 py-16">
        <h2 className="text-5xl md:text-6xl font-light text-center mb-16">
          Our <span className="text-cyan-400">Founders</span>
        </h2>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex justify-center">
            <div className="w-80 h-96 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center">
              <User className="w-24 h-24 text-gray-500" />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-80 h-96 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center">
              <User className="w-24 h-24 text-gray-500" />
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
