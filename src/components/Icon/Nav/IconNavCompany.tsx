import { FC } from 'react';

interface IconNavCompanyProps {
  className?: string;
}

const IconNavCompany: FC<IconNavCompanyProps> = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className={className}>
      <path
        fill="currentColor"
        d="M18 15h-2v2h2m0-6h-2v2h2m2 6h-8v-2h2v-2h-2v-2h2v-2h-2V9h8M10 7H8V5h2m0 6H8V9h2m0 6H8v-2h2m0 6H8v-2h2M6 7H4V5h2m0 6H4V9h2m0 6H4v-2h2m0 6H4v-2h2m6-10V3H2v18h20V7H12Z"
      />
    </svg>
  );
};

export default IconNavCompany;
