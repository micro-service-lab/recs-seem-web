import { useCallback, useEffect } from 'react';
//
import { useAuthContext } from '../hooks';
import { useNavigate, useSearchParams } from 'react-router-dom';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function GuestGuard({ children }: Props) {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const returnTo = searchParams.get('returnTo') || '/';

  const { authenticated } = useAuthContext();

  const check = useCallback(() => {
    if (authenticated) {
      navigate(returnTo);
    }
  }, [authenticated, returnTo, navigate]);

  useEffect(() => {
    check();
  }, [check]);

  return <>{children}</>;
}