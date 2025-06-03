
import React, { createContext, useContext, useEffect, useState } from 'react';

interface TenantConfig {
  id: string;
  domain: string;
  brandName: string;
  logoUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
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
    };

    setTimeout(() => {
      setTenant(mockTenant);
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <TenantContext.Provider value={{ tenant, isLoading }}>
      {children}
    </TenantContext.Provider>
  );
};
