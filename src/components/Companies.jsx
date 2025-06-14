import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function Companies() {
  const { theme } = useContext(ThemeContext);
  const isDarkTheme = theme === 'dark';

  const companies = [
    {
      name: "Microsoft",
      logo: "/companies/RE1Mu3b.png",
      alt: "Microsoft",
      url: "https://microsoft.com"
    },
    {
      name: "Delhivery",
      logo: isDarkTheme ? "/companies/Delhivery_dark_theme.png" : "/companies/Delhivery_light_theme.png",
      alt: "Delhivery",
      url: "https://www.delhivery.com/"
    },
    {
      name: "Ula",
      logo: "/companies/logo-ULA.png",
      alt: "Ula",
      url: "https://www.ula.app/"
    },
    {
      name: "Wellcare",
      logo: "/companies/wellcarelogo180.png",
      alt: "Wellcare",
      url: "https://www.wellcare.com/"
    },
    {
      name: "Starlight Financial",
      logo: "/companies/starlight-financial-logo-114w.png",
      alt: "Starlight Financial",
      url: null // No URL provided
    },
    {
      name: "VerifyTreatment",
      logo: "/companies/VerifyTreatment-Logo-Header-400x63.webp",
      alt: "VerifyTreatment",
      url: "https://verifytx.com"
    }
  ];

  return (
    <section className="section companies">
      <div className="companies-header">
        <h2>Companies</h2>
        <p>Trusted by leading companies across various industries</p>
      </div>
      <div className="companies-grid">
        {companies.map((company, index) => (
          <div key={index} className="company-logo">
            {company.url ? (
              <a 
                href={company.url} 
                target="_blank" 
                rel="noopener noreferrer"
                title={`Visit ${company.name}`}
              >
                <img 
                  src={company.logo} 
                  alt={company.alt}
                  title={company.name}
                />
              </a>
            ) : (
              <img 
                src={company.logo} 
                alt={company.alt}
                title={company.name}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
} 