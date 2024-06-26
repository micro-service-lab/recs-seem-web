import { useAuthContext } from '@/auth/hooks';
import Dropdown from '../Dropdown';
import { Link } from 'react-router-dom';
import IconUser from '../Icon/IconUser';
import IconLogout from '../Icon/IconLogout';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { IRootState } from '@/store';
import IconSettings from '../Icon/IconSettings';
import { useToast } from '@/hooks/use-toast';

export const UserAvatar = () => {
  const { user, logout } = useAuthContext();
  const { t } = useTranslation();
  const toast = useToast();
  const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

  const handleLogout = async () => {
    try {
      await logout();
      toast.fire({
        icon: 'success',
        title: t('Logout successfully'),
        padding: '10px 20px',
      });
    } catch (error) {
      toast.fire({
        icon: 'error',
        title: t('Logout failed'),
        padding: '10px 20px',
      });
    }
  };

  return (
    <div className="dropdown shrink-0 flex">
      <Dropdown
        offset={[0, 8]}
        placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
        btnClassName="relative group block"
        button={<span className="flex justify-center items-center w-9 h-9 text-center rounded-full object-cover bg-success text-2xl">{user?.firstName[0]}</span>}
      >
        <ul className="text-dark dark:text-white-dark !py-0 w-[230px] font-semibold dark:text-white-light/90">
          <li>
            <div className="flex items-center px-4 py-4">
              <span className="flex justify-center items-center w-10 h-10 text-center rounded-md object-cover bg-success text-2xl">{user?.firstName[0]}</span>

              <div className="ltr:pl-4 rtl:pr-4 truncate">
                <h4 className="text-base">{user?.displayName}</h4>
                <button type="button" className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white">
                  {user?.email}
                </button>
              </div>
            </div>
          </li>
          <li>
            <Link to={`/profile/${user?.adminId}`} className="dark:hover:text-white">
              <IconUser className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
              Profile
            </Link>
          </li>
          <li>
            <Link to={`/settings`} className="dark:hover:text-white">
              <IconSettings className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
              Setting
            </Link>
          </li>
          <li className="border-t border-white-light dark:border-white-light/10 text-danger !py-3 flex px-4 cursor-pointer hover:bg-danger/10" onClick={handleLogout}>
            <IconLogout className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 rotate-90 shrink-0" />
            Sign Out
          </li>
        </ul>
      </Dropdown>
    </div>
  );
};
