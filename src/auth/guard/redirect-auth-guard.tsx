import { useEffect, useCallback, useState } from 'react';
//
import { useAuthContext } from '../hooks';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const navigate = useNavigate();

  const { authenticated } = useAuthContext();

  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!authenticated) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname,
      }).toString();

      const loginPath = '/login';

      const href = `${loginPath}?${searchParams}`;

      navigate(href);
    } else {
      setChecked(true);
    }
  }, [authenticated, navigate]);

  useEffect(() => {
    check();
  }, [check]);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}