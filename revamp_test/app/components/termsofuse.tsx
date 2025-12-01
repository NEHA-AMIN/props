import React from 'react';

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Terms of Use</h1>
        <p className="text-gray-400 text-lg mb-8">Effective Date: 21 February 2024</p>
        
        <p className="text-gray-300 mb-12 leading-relaxed">
          Welcome to Propheus! By accessing and using our website{' '}
          <a href="https://www.propheus.ai" className="text-cyan-400 hover:text-cyan-300">
            www.propheus.ai
          </a>{' '}
          ("Site") and services, you agree to comply with and be bound by the following terms and conditions. If you do not agree to these terms, then you are expressly prohibited and must refrain from using our Site.
        </p>

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-300 leading-relaxed">
            By using our Site and services, you acknowledge that you have read, understood, and agree to be bound by these terms. We reserve the right, in our sole discretion, to update or modify these terms at any time without prior notice.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">2. User Responsibilities</h2>
          <p className="text-gray-300 leading-relaxed">
            It is your responsibility to periodically review these terms to stay informed of the updates. Your continued use of the Site will constitute acceptance of the updated terms.
          </p>
        </section>

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">3. Information Collected through Site</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            When you submit information to this Site via the webform, we collect the data requested in the webform which includes the following:
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Information</h3>
              <div className="space-y-3">
                <p className="text-gray-300 text-lg">Contact Details</p>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>First Name</li>
                  <li>Last Name</li>
                  <li>Company Name</li>
                  <li>E-mail</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Purpose</h3>
              <ul className="list-disc list-inside space-y-3 text-gray-300">
                <li>To track and respond to your queries when you contact us.</li>
                <li>To provide more information on our products and services when you contact us.</li>
                <li>Send marketing emails.</li>
                <li>This information is shared with Framer, our Site hosting provider, so that they can provide Site services to us.</li>
              </ul>
            </div>
          </div>

          <p className="text-gray-300 mb-6 leading-relaxed">
            This Site collects personal data to power our site analytics, which includes the following:
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Information</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Information about your browser, network and device</li>
                <li>Web pages you visited prior to coming to the Site</li>
                <li>Web pages you view while on the Site</li>
                <li>Your IP address</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Purpose</h3>
              <ul className="list-disc list-inside space-y-3 text-gray-300">
                <li>To run this Site, and to protect and improve its platform and services.</li>
                <li>This information is shared with Framer, our Site analytics provider, to learn about site traffic and activity. Framer analyses the data in a depersonalised form.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">4. Prohibited Conduct</h2>
          <p className="text-gray-300 mb-4 leading-relaxed">While using our Site, you agree not to:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-300 leading-relaxed">
            <li>use the Site in a manner inconsistent with any applicable laws or regulations</li>
            <li>infringe upon the rights of others</li>
            <li>transmit any harmful or malicious code</li>
            <li>engage in any activity that could damage, disable, or impair our Site or services</li>
            <li>Interfere with, disrupt, or create an undue burden on the Site or the networks or services connected to the Site.</li>
            <li>use the Site as part of any effort to compete with us or otherwise use the Site and/or the content for any revenue-generating endeavour or commercial enterprise</li>
            <li>decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Site</li>
            <li>upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party's uninterrupted use and enjoyment of the Site or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Site</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">5. Intellectual Property</h2>
          <p className="text-gray-300 mb-4 leading-relaxed">
            Unless otherwise indicated, the Site is proprietary property of Propheus and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of the United States, foreign jurisdictions, and international conventions.
          </p>
          <p className="text-gray-300 mb-4 leading-relaxed">
            The Content and the Marks are provided on the Site "AS IS" for your information and personal use only. No part of the Site and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Provided that you are eligible to use the Site, you are granted a limited licence to access and use the Site for your personal, non-commercial use. We reserve all rights not expressly granted to you in and to the Site, the Content and the Marks.
          </p>
        </section>

        {/* Section 6 */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">6. Sharing of collected information</h2>
          
          <p className="text-gray-300 mb-4 leading-relaxed">
            <strong>Group Companies.</strong> Propheus will share your personal information within the group of companies for the purposes identified above. If you are using an email address that is associated with a business domain (e.g., yourname@businessname.com) to access the Site, we may provide your personal information to that business.
          </p>
          
          <p className="text-gray-300 mb-4 leading-relaxed">
            <strong>Service Providers.</strong> Propheus will share your personal information with companies that help us run our business by processing personal information on behalf of Propheus for the purposes identified above. Such companies include Amazon Web Services and Google Analytics.
          </p>
          
          <p className="text-gray-300 mb-4 leading-relaxed">
            <strong>Government, Law Enforcement Agencies or Regulatory Bodies.</strong> Propheus will share your personal information with applicable government, legal agencies or regulatory bodies in order to comply with applicable laws and investigations or to respond to a court order, judicial or other government subpoena.
          </p>
          
          <p className="text-gray-300 mb-4 leading-relaxed">
            <strong>Acquisition or Merger.</strong> Propheus may transfer information, including any personal information, to a successor entity in connection with a corporate merger, consolidation, sale of assets, bankruptcy or other corporate change. If Propheus is involved in a merger, acquisition, or sale of all or a portion of its assets, you will be notified via email and/or a prominent notice on our Site of any change in ownership or uses of your personal information, as well as any choices you may have regarding your personal information.
          </p>
          
          <p className="text-gray-300 leading-relaxed">
            <strong>Other Information Sharing</strong> Propheus may share your personal information with your consent or if it believes that it will protect Propheus, you or any other person or third party or to enforce any legal rights.
          </p>
        </section>

        {/* Section 7 */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">7. Links to third-party properties</h2>
          <p className="text-gray-300 mb-4 leading-relaxed">
            We do not own or have any control over the third-party websites that may be integrated with our Site and such websites are not covered by this Website policy. The Site may provide links to third-party websites, applications, including social media tools or "plug-ins," such as social networking tools, however, we are not responsible for their policies or privacy practices.
          </p>
          <p className="text-gray-300 leading-relaxed">
            All third parties maintain separate policies. If you decide to use any of the links available on the Site, you should review their privacy notices to learn about their data practices. If you use these tools to share personal information or you otherwise interact with these features, those companies may collect information about you and may use and share such information in accordance with your account settings, including by sharing such information with us and the general public.
          </p>
        </section>

        {/* Section 8 */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">8. Security</h2>
          <p className="text-gray-300 leading-relaxed">
            Propheus has implemented reasonable security measures to protect the information we receive. This includes but is not limited to the use of firewalls and encryption. We cannot guarantee absolute security as no method of transmission over the Internet or method of electronic storage is 100% secure. However, we strive to use commercially acceptable means to protect the information we receive.
          </p>
        </section>

        {/* Section 9 */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">9. Storage</h2>
          <p className="text-gray-300 leading-relaxed">
            Propheus will store the information for no longer than 12 months from the time of collection, or such shorter period as required by law. However, we may retain your information beyond this time if required by law.
          </p>
        </section>

        {/* Section 10 */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">10 Access to your information</h2>
          <p className="text-gray-300 leading-relaxed">
            For updating, correcting or deleting any inaccuracies in the personal information that you may have shared with us, you may contact us at info@propheus.ai. We will respond to your request within a reasonable timeframe.
          </p>
        </section>

        {/* Section 11 */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">11 Contact Us</h2>
          <p className="text-gray-300 leading-relaxed">
            If you have any questions about these Terms of Use, please contact us at info@propheus.ai
          </p>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-800 pt-8 mt-16">
          <div className="flex flex-wrap items-center justify-between gap-4 text-gray-400">
            <p>©Propheus Pte. Ltd. 2025</p>
            <div className="flex flex-wrap gap-6">
              <a href="/privacy-policy" className="text-cyan-400 hover:text-cyan-300">Privacy Policy</a>
              <a href="/terms-of-use" className="text-cyan-400 hover:text-cyan-300">Terms of use</a>
              <a href="/products" className="text-cyan-400 hover:text-cyan-300">Products</a>
              <a href="/about" className="text-cyan-400 hover:text-cyan-300">About Us</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default TermsOfUse;