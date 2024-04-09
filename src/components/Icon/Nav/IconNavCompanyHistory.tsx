import { FC } from 'react';

interface IconNavCompanyHistoryProps {
  className?: string;
}

const IconNavCompanyHistory: FC<IconNavCompanyHistoryProps> = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="20" height="20" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M10 7h4V5.615q0-.269-.173-.442T13.385 5h-2.77q-.269 0-.442.173T10 5.615V7Zm8 15q-1.671 0-2.836-1.164T14 18q0-1.671 1.164-2.836T18 14q1.671 0 2.836 1.164T22 18q0 1.671-1.164 2.836T18 22ZM4.615 20q-.69 0-1.152-.462Q3 19.075 3 18.385v-9.77q0-.69.463-1.152Q3.925 7 4.615 7H9V5.615q0-.69.463-1.152Q9.925 4 10.614 4h2.77q.69 0 1.153.463q.462.462.462 1.152V7h4.385q.69 0 1.152.463q.463.462.463 1.152v4.198q-.683-.413-1.448-.613Q18.787 12 18 12q-2.496 0-4.248 1.752T12 18q0 .506.086 1.009q.085.503.262.991H4.615Zm13.77-2.162V15.5q0-.162-.112-.273q-.111-.112-.273-.112t-.273.112q-.112.111-.112.273v2.333q0 .161.056.3t.187.27l1.519 1.52q.111.112.263.121q.152.01.283-.12t.13-.274q0-.142-.13-.273l-1.538-1.539Z"
      />
    </svg>
  );
};

export default IconNavCompanyHistory;
