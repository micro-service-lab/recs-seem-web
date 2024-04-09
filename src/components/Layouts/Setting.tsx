import PerfectScrollbar from 'react-perfect-scrollbar';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { toggleAnimation, toggleLayout, toggleMenu, toggleNavbar, toggleRTL, toggleTheme, toggleSemidark } from '../../store/themeConfigSlice';
import IconSettings from '../Icon/IconSettings';
import IconX from '../Icon/IconX';
import IconSun from '../Icon/IconSun';
import IconMoon from '../Icon/IconMoon';
import IconLaptop from '../Icon/IconLaptop';
import { useTranslation } from 'react-i18next';

const Setting = () => {
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const dispatch = useDispatch();
  const { t } = useTranslation('theme');

  const [showCustomizer, setShowCustomizer] = useState(false);

  return (
    <div>
      <div className={`${(showCustomizer && '!block') || ''} fixed inset-0 bg-[black]/60 z-[51] px-4 hidden transition-[display]`} onClick={() => setShowCustomizer(false)}></div>
      <nav
        className={`${
          (showCustomizer && 'ltr:!right-0 rtl:!left-0') || ''
        } bg-white fixed ltr:-right-[400px] rtl:-left-[400px] top-0 bottom-0 w-full max-w-[400px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-[right] duration-300 z-[51] dark:bg-black p-4`}
      >
        <button
          type="button"
          className="bg-primary ltr:rounded-tl-full rtl:rounded-tr-full ltr:rounded-bl-full rtl:rounded-br-full absolute ltr:-left-12 rtl:-right-12 top-0 bottom-0 my-auto w-12 h-10 flex justify-center items-center text-white cursor-pointer"
          onClick={() => setShowCustomizer(!showCustomizer)}
        >
          <IconSettings className="animate-[spin_3s_linear_infinite] w-5 h-5" />
        </button>

        <PerfectScrollbar className="relative overflow-x-hidden h-full">
          <div className="text-center relative pb-5">
            <button type="button" className="absolute top-0 ltr:right-4 rtl:left-4 opacity-30 hover:opacity-100 dark:text-white" onClick={() => setShowCustomizer(false)}>
              <IconX className="w-5 h-5" />
            </button>

            <h4 className="mb-1 dark:text-white">{t('layout-custom')}</h4>
            <p className="text-white-dark">{t('layout-description')}</p>
          </div>

          <div className="border border-dashed border-white-light dark:border-[#1b2e4b] rounded-md mb-3 p-3">
            <h5 className="mb-1 text-base dark:text-white leading-none">{t('color-scheme')}</h5>
            <p className="text-white-dark text-xs">{t('color-scheme-description')}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 mt-3">
              <button type="button" className={`${themeConfig.theme === 'light' ? 'btn-primary' : 'btn-outline-primary'} btn`} onClick={() => dispatch(toggleTheme('light'))}>
                <IconSun className="w-4 h-4 shrink-0 ltr:mr-1 rtl:ml-1" />
                {t('theme-light')}
              </button>

              <button type="button" className={`${themeConfig.theme === 'dark' ? 'btn-primary' : 'btn-outline-primary'} btn`} onClick={() => dispatch(toggleTheme('dark'))}>
                <IconMoon className="w-4 h-4 shrink-0 ltr:mr-1 rtl:ml-1" />
                {t('theme-dark')}
              </button>

              <button type="button" className={`${themeConfig.theme === 'system' ? 'btn-primary' : 'btn-outline-primary'} btn`} onClick={() => dispatch(toggleTheme('system'))}>
                <IconLaptop className="w-4 h-4 shrink-0 ltr:mr-1 rtl:ml-1" />
                {t('theme-system')}
              </button>
            </div>
          </div>

          <div className="border border-dashed border-white-light dark:border-[#1b2e4b] rounded-md mb-3 p-3">
            <h5 className="mb-1 text-base dark:text-white leading-none">{t('navigation-position')}</h5>
            <p className="text-white-dark text-xs">{t('navigation-position-description')}</p>
            <div className="grid grid-cols-3 gap-2 mt-3">
              <button type="button" className={`${themeConfig.menu === 'horizontal' ? 'btn-primary' : 'btn-outline-primary'} btn`} onClick={() => dispatch(toggleMenu('horizontal'))}>
                {t('nav-horizon')}
              </button>

              <button type="button" className={`${themeConfig.menu === 'vertical' ? 'btn-primary' : 'btn-outline-primary'} btn`} onClick={() => dispatch(toggleMenu('vertical'))}>
                {t('nav-vertical')}
              </button>

              <button
                type="button"
                className={`${themeConfig.menu === 'collapsible-vertical' ? 'btn-primary' : 'btn-outline-primary'} btn`}
                onClick={() => dispatch(toggleMenu('collapsible-vertical'))}
              >
                {t('nav-collapsible')}
              </button>
            </div>
            <div className="mt-5 text-primary">
              <label className="inline-flex mb-0">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={themeConfig.semidark === true || themeConfig.semidark === 'true'}
                  onChange={(e) => dispatch(toggleSemidark(e.target.checked))}
                />
                <span>{t('semi-dark-opt')}</span>
              </label>
            </div>
          </div>

          <div className="border border-dashed border-white-light dark:border-[#1b2e4b] rounded-md mb-3 p-3">
            <h5 className="mb-1 text-base dark:text-white leading-none">{t('layout-style')}</h5>
            <p className="text-white-dark text-xs">{t('layout-style-description')}</p>
            <div className="flex gap-2 mt-3">
              <button type="button" className={`${themeConfig.layout === 'boxed-layout' ? 'btn-primary' : 'btn-outline-primary'} btn flex-auto`} onClick={() => dispatch(toggleLayout('boxed-layout'))}>
                {t('style-box')}
              </button>

              <button type="button" className={`${themeConfig.layout === 'full' ? 'btn-primary' : 'btn-outline-primary'} btn flex-auto`} onClick={() => dispatch(toggleLayout('full'))}>
                {t('style-full')}
              </button>
            </div>
          </div>

          <div className="border border-dashed border-white-light dark:border-[#1b2e4b] rounded-md mb-3 p-3">
            <h5 className="mb-1 text-base dark:text-white leading-none">{t('direction')}</h5>
            <p className="text-white-dark text-xs">{t('direction-description')}</p>
            <div className="flex gap-2 mt-3">
              <button type="button" className={`${themeConfig.rtlClass === 'ltr' ? 'btn-primary' : 'btn-outline-primary'} btn flex-auto`} onClick={() => dispatch(toggleRTL('ltr'))}>
                {t('direction-ltr')}
              </button>

              <button type="button" className={`${themeConfig.rtlClass === 'rtl' ? 'btn-primary' : 'btn-outline-primary'} btn flex-auto`} onClick={() => dispatch(toggleRTL('rtl'))}>
                {t('direction-rtl')}
              </button>
            </div>
          </div>

          <div className="border border-dashed border-white-light dark:border-[#1b2e4b] rounded-md mb-3 p-3">
            <h5 className="mb-1 text-base dark:text-white leading-none">{t('nav-type')}</h5>
            <p className="text-white-dark text-xs">{t('nav-type-description')}</p>
            <div className="mt-3 flex items-center gap-3 text-primary">
              <ul>
                <li>
                  <label className="inline-flex mb-0">
                    <input type="radio" checked={themeConfig.navbar === 'navbar-sticky'} value="navbar-sticky" className="form-radio" onChange={() => dispatch(toggleNavbar('navbar-sticky'))} />
                    <span>{t('nav-type-sticky')}</span>
                  </label>
                </li>
                <li>
                  <label className="inline-flex mb-0">
                    <input type="radio" checked={themeConfig.navbar === 'navbar-floating'} value="navbar-floating" className="form-radio" onChange={() => dispatch(toggleNavbar('navbar-floating'))} />
                    <span>{t('nav-type-floating')}</span>
                  </label>
                </li>
                <li>
                  <label className="inline-flex mb-0">
                    <input type="radio" checked={themeConfig.navbar === 'navbar-static'} value="navbar-static" className="form-radio" onChange={() => dispatch(toggleNavbar('navbar-static'))} />
                    <span>{t('nav-type-static')}</span>
                  </label>
                </li>
              </ul>
            </div>
          </div>

          <div className="border border-dashed border-white-light dark:border-[#1b2e4b] rounded-md mb-3 p-3">
            <h5 className="mb-1 text-base dark:text-white leading-none">{t('router-transition')}</h5>
            <p className="text-white-dark text-xs">{t('router-transition-description')}</p>
            <div className="mt-3">
              <select className="form-select border-primary text-primary" value={themeConfig.animation} onChange={(e) => dispatch(toggleAnimation(e.target.value))}>
                <option value=" ">{t('transition-none')}</option>
                <option value="animate__fadeIn">{t('transition-fade')}</option>
                <option value="animate__fadeInDown">{t('transition-fade-down')}</option>
                <option value="animate__fadeInUp">{t('transition-fade-up')}</option>
                <option value="animate__fadeInLeft">{t('transition-fade-left')}</option>
                <option value="animate__fadeInRight">{t('transition-fade-right')}</option>
                <option value="animate__slideInDown">{t('transition-slide-down')}</option>
                <option value="animate__slideInLeft">{t('transition-slide-left')}</option>
                <option value="animate__slideInRight">{t('transition-slide-right')}</option>
                <option value="animate__zoomIn">{t('transition-zoom-in')}</option>
              </select>
            </div>
          </div>
        </PerfectScrollbar>
      </nav>
    </div>
  );
};

export default Setting;
