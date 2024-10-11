import React, { ReactNode, FC } from 'react';

interface ProviderProps {
  children: ReactNode;
}

interface DynamicProvidersProps {
  providers: FC<ProviderProps>[];
  children: ReactNode;
}

const DynamicProviders: React.FC<DynamicProvidersProps> = ({ providers, children }) => {
  return providers.reduceRight((wrappedChildren, Provider) => <Provider>{wrappedChildren}</Provider>, children);
};

export default DynamicProviders;
