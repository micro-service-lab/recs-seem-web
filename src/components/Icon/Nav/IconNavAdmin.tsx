import { FC } from 'react';

interface IconNavAdminProps {
  className?: string;
}

const IconNavAdmin: FC<IconNavAdminProps> = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="20" height="20" viewBox="0 0 24 24">
      <path fill="currentColor" d="M12 14v8H4a8 8 0 0 1 8-8Zm0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6s6 2.685 6 6s-2.685 6-6 6Zm9 4h1v5h-8v-5h1v-1a3 3 0 1 1 6 0v1Zm-2 0v-1a1 1 0 1 0-2 0v1h2Z" />
    </svg>
  );
};

export default IconNavAdmin;
