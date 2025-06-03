
import React, { createContext, useContext, useEffect, useState } from 'react';

interface TenantConfig {
  id: string;
  domain: string;
  brandName: string;
  logoUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  customCSS?: string;
  customJS?: string;
}

interface TenantContextType {
  tenant: TenantConfig | null;
  isLoading: boolean;
}

const TenantContext = createContext<TenantContextType>({
  tenant: null,
  isLoading: true,
});

export const useTenant = () => useContext(TenantContext);

export const TenantProvider = ({ children }: { children: React.ReactNode }) => {
  const [tenant, setTenant] = useState<TenantConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch tenant config based on domain
    // For demo purposes, using a mock configuration
    const mockTenant: TenantConfig = {
      id: '1',
      domain: window.location.hostname,
      brandName: 'TechFest 2025',
      logoUrl: '/placeholder.svg',
      primaryColor: '#1e40af',
      secondaryColor: '#3b82f6',
      accentColor: '#06b6d4',
      customCSS: `
        /* Custom CSS for this domain */
        .custom-hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .custom-button {
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
        }
        .custom-button:hover {
          transform: translateY(-2px);
        }
      `,
      customJS: `
        // Custom JavaScript for this domain
        console.log('Custom JS loaded for ${window.location.hostname}');
        
        // Add custom analytics or third-party scripts here
        window.customDomainFeatures = {
          trackEvent: function(eventName, data) {
            console.log('Custom tracking:', eventName, data);
          }
        };
      `,
    };

    setTimeout(() => {
      setTenant(mockTenant);
      setIsLoading(false);
    }, 500);
  }, []);

  // Inject custom CSS when tenant loads
  useEffect(() => {
    if (tenant?.customCSS) {
      const styleElement = document.createElement('style');
      styleElement.id = 'tenant-custom-css';
      styleElement.textContent = tenant.customCSS;
      document.head.appendChild(styleElement);

      return () => {
        const existingStyle = document.getElementById('tenant-custom-css');
        if (existingStyle) {
          existingStyle.remove();
        }
      };
    }
  }, [tenant?.customCSS]);

  // Inject custom JS when tenant loads
  useEffect(() => {
    if (tenant?.customJS) {
      const scriptElement = document.createElement('script');
      scriptElement.id = 'tenant-custom-js';
      scriptElement.textContent = tenant.customJS;
      document.head.appendChild(scriptElement);

      return () => {
        const existingScript = document.getElementById('tenant-custom-js');
        if (existingScript) {
          existingScript.remove();
        }
      };
    }
  }, [tenant?.customJS]);

  return (
    <TenantContext.Provider value={{ tenant, isLoading }}>
      {children}
    </TenantContext.Provider>
  );
};
