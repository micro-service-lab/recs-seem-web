import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../../store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '../../store';
import { useState, useEffect } from 'react';
import IconCaretsDown from '../Icon/IconCaretsDown';
import IconCaretDown from '../Icon/IconCaretDown';
import IconMinus from '../Icon/IconMinus';
import IconNavAdmin from '../Icon/Nav/IconNavAdmin';
import IconNavRole from '../Icon/Nav/IconNavRole';
import IconNavInformation from '../Icon/Nav/IconNavInfomation';
import IconNavContact from '../Icon/Nav/IconNavContact';
import IconNavSetting from '../Icon/Nav/IconNavSetting';
import IconNavMainClient from '../Icon/Nav/IconNavMainClient';
import IconNavCompanyHistory from '../Icon/Nav/IconNavCompanyHistory';

const defaultSubOpen = {
  informationCategory: false,
  contactCategory: false,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Sidebar = () => {
  const [currentMenu, setCurrentMenu] = useState<string>('');
  const [subMenu, setSubMenu] = useState(defaultSubOpen);
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation('page');
  const toggleMenu = (value: string) => {
    setCurrentMenu((oldValue) => {
      return oldValue === value ? '' : value;
    });
  };

  useEffect(() => {
    const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
    if (selector) {
      selector.classList.add('active');
      const ul: any = selector.closest('ul.sub-menu');
      if (ul) {
        let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
        if (ele.length) {
          ele = ele[0];
          setTimeout(() => {
            ele.click();
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1024 && themeConfig.sidebar) {
      dispatch(toggleSidebar());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div>
      <nav className="sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300">
        <div className="bg-white dark:bg-black h-full">
          <div className="flex justify-between items-center px-4 py-3">
            <NavLink to="/" className="main-logo flex items-center shrink-0">
              <img className="w-8 ml-[5px] flex-none" src="/assets/images/logo.svg" alt="logo" />
              <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">ReCS/SEEM</span>
            </NavLink>

            <button
              type="button"
              className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
              onClick={() => dispatch(toggleSidebar())}
            >
              <IconCaretsDown className="m-auto rotate-90" />
            </button>
          </div>
          <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
            <ul className="relative font-semibold space-y-0.5 p-4 py-0">
              <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                <IconMinus className="w-4 h-5 flex-none hidden" />
                <span>{t('general')}</span>
              </h2>
              <li className="menu nav-item">
                <button type="button" className={`${currentMenu === 'member' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('member')}>
                  <div className="flex items-center">
                    <IconNavAdmin className="group-hover:!text-primary shrink-0" />
                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('member')}</span>
                  </div>

                  <div className={currentMenu !== 'member' ? 'rtl:rotate-90 -rotate-90' : ''}>
                    <IconCaretDown />
                  </div>
                </button>

                <AnimateHeight duration={300} height={currentMenu === 'member' ? 'auto' : 0}>
                  <ul className="sub-menu text-gray-500">
                    <li>
                      <NavLink to="/">{t('list')}</NavLink>
                    </li>
                    <li>
                      <NavLink to="/create">{t('create')}</NavLink>
                    </li>
                  </ul>
                </AnimateHeight>
              </li>
              <li className="menu nav-item">
                <button type="button" className={`${currentMenu === 'role' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('role')}>
                  <div className="flex items-center">
                    <IconNavRole className="group-hover:!text-primary shrink-0" />
                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('role')}</span>
                  </div>

                  <div className={currentMenu !== 'role' ? 'rtl:rotate-90 -rotate-90' : ''}>
                    <IconCaretDown />
                  </div>
                </button>

                <AnimateHeight duration={300} height={currentMenu === 'role' ? 'auto' : 0}>
                  <ul className="sub-menu text-gray-500">
                    <li>
                      <NavLink to="/roles">{t('list')}</NavLink>
                    </li>
                    <li>
                      <NavLink to="/create">{t('create')}</NavLink>
                    </li>
                  </ul>
                </AnimateHeight>
              </li>
              <li className="menu nav-item">
                <button type="button" className={`${currentMenu === 'attendance' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('attendance')}>
                  <div className="flex items-center">
                    <IconNavInformation className="group-hover:!text-primary shrink-0" />
                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('attendance')}</span>
                  </div>

                  <div className={currentMenu !== 'attendance' ? 'rtl:rotate-90 -rotate-90' : ''}>
                    <IconCaretDown />
                  </div>
                </button>

                <AnimateHeight duration={300} height={currentMenu === 'attendance' ? 'auto' : 0}>
                  <ul className="sub-menu text-gray-500">
                    <li>
                      <NavLink to="/informations">{t('absence-from')}</NavLink>
                    </li>
                  </ul>
                </AnimateHeight>
              </li>
              <li className="menu nav-item">
                <button type="button" className={`${currentMenu === 'chat' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('chat')}>
                  <div className="flex items-center">
                    <IconNavInformation className="group-hover:!text-primary shrink-0" />
                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('chat')}</span>
                  </div>

                  <div className={currentMenu !== 'chat' ? 'rtl:rotate-90 -rotate-90' : ''}>
                    <IconCaretDown />
                  </div>
                </button>

                <AnimateHeight duration={300} height={currentMenu === 'chat' ? 'auto' : 0}>
                  <ul className="sub-menu text-gray-500">
                    <li>
                      <NavLink to="/informations">{t('room-create')}</NavLink>
                    </li>
                    <li>
                      <NavLink to="/informations">{t('room-list')}</NavLink>
                    </li>
                  </ul>
                </AnimateHeight>
              </li>
              <li className="menu nav-item">
                <button type="button" className={`${currentMenu === 'event' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('event')}>
                  <div className="flex items-center">
                    <IconNavContact className="group-hover:!text-primary shrink-0" />
                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('event')}</span>
                  </div>

                  <div className={currentMenu !== 'event' ? 'rtl:rotate-90 -rotate-90' : ''}>
                    <IconCaretDown />
                  </div>
                </button>

                <AnimateHeight duration={300} height={currentMenu === 'event' ? 'auto' : 0}>
                  <ul className="sub-menu text-gray-500">
                    <li>
                      <NavLink to="/informaions/create">{t('create')}</NavLink>
                    </li>
                  </ul>
                </AnimateHeight>
              </li>
              <li className="menu nav-item">
                <button type="button" className={`${currentMenu === 'calender' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('calender')}>
                  <div className="flex items-center">
                    <IconNavContact className="group-hover:!text-primary shrink-0" />
                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('calender')}</span>
                  </div>

                  <div className={currentMenu !== 'calender' ? 'rtl:rotate-90 -rotate-90' : ''}>
                    <IconCaretDown />
                  </div>
                </button>

                <AnimateHeight duration={300} height={currentMenu === 'calender' ? 'auto' : 0}>
                  <ul className="sub-menu text-gray-500">
                    <li>
                      <NavLink to="/informaions/create">{t('view')}</NavLink>
                    </li>
                  </ul>
                </AnimateHeight>
              </li>

              <li className="menu nav-item">
                <button type="button" className={`${currentMenu === 'location-information' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('location-information')}>
                  <div className="flex items-center">
                    <IconNavContact className="group-hover:!text-primary shrink-0" />
                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('location-information')}</span>
                  </div>

                  <div className={currentMenu !== 'location-information' ? 'rtl:rotate-90 -rotate-90' : ''}>
                    <IconCaretDown />
                  </div>
                </button>

                <AnimateHeight duration={300} height={currentMenu === 'location-information' ? 'auto' : 0}>
                  <ul className="sub-menu text-gray-500">
                    <li>
                      <NavLink to="/informaions/create">{t('history')}</NavLink>
                    </li>
                  </ul>
                </AnimateHeight>
              </li>

              <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                <IconMinus className="w-4 h-5 flex-none hidden" />
                <span>{t('system')}</span>
              </h2>

              <li className="menu nav-item">
                <button type="button" className={`${currentMenu === 'organization' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('organization')}>
                  <div className="flex items-center">
                    <IconNavMainClient className="group-hover:!text-primary shrink-0" />
                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('organization')}</span>
                  </div>

                  <div className={currentMenu !== 'organization' ? 'rtl:rotate-90 -rotate-90' : ''}>
                    <IconCaretDown />
                  </div>
                </button>

                <AnimateHeight duration={300} height={currentMenu === 'organization' ? 'auto' : 0}>
                  <ul className="sub-menu text-gray-500">
                    <li>
                      <NavLink to="/company/organizations">{t('list')}</NavLink>
                    </li>
                    <li>
                      <NavLink to="/company/organizations/create">{t('create')}</NavLink>
                    </li>
                  </ul>
                </AnimateHeight>
              </li>

              <li className="menu nav-item">
                <button type="button" className={`${currentMenu === 'permission' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('permission')}>
                  <div className="flex items-center">
                    <IconNavCompanyHistory className="group-hover:!text-primary shrink-0" />
                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('permission')}</span>
                  </div>

                  <div className={currentMenu !== 'permission' ? 'rtl:rotate-90 -rotate-90' : ''}>
                    <IconCaretDown />
                  </div>
                </button>

                <AnimateHeight duration={300} height={currentMenu === 'permission' ? 'auto' : 0}>
                  <ul className="sub-menu text-gray-500">
                    <li>
                      <NavLink to="/company/company-histories">{t('list')}</NavLink>
                    </li>
                    <li>
                      <NavLink to="/company/company-histories/create">{t('create')}</NavLink>
                    </li>
                  </ul>
                </AnimateHeight>
              </li>

              <li className="menu nav-item">
                <button type="button" className={`${currentMenu === 'minutes' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('minutes')}>
                  <div className="flex items-center">
                    <IconNavCompanyHistory className="group-hover:!text-primary shrink-0" />
                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('minutes')}</span>
                  </div>

                  <div className={currentMenu !== 'minutes' ? 'rtl:rotate-90 -rotate-90' : ''}>
                    <IconCaretDown />
                  </div>
                </button>

                <AnimateHeight duration={300} height={currentMenu === 'minutes' ? 'auto' : 0}>
                  <ul className="sub-menu text-gray-500">
                    <li>
                      <NavLink to="/company/company-histories">{t('view')}</NavLink>
                    </li>
                    <li>
                      <NavLink to="/company/company-histories/create">{t('create')}</NavLink>
                    </li>
                  </ul>
                </AnimateHeight>
              </li>

              <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                <IconMinus className="w-4 h-5 flex-none hidden" />
                <span>{t('others')}</span>
              </h2>

              <li className="menu nav-item">
                <NavLink to="/settings" className="nav-link group">
                  <div className="flex items-center">
                    <IconNavSetting className="group-hover:!text-primary shrink-0" />
                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('setting')}</span>
                  </div>
                </NavLink>
              </li>
            </ul>
          </PerfectScrollbar>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
