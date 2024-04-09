import { useTranslation } from 'react-i18next';
import IconCaretDown from '../Icon/IconCaretDown';
import { NavLink } from 'react-router-dom';
import IconNavCompany from '../Icon/Nav/IconNavCompany';
import IconNavAdmin from '../Icon/Nav/IconNavAdmin';
import IconNavRole from '../Icon/Nav/IconNavRole';
import IconNavInformation from '../Icon/Nav/IconNavInfomation';
import IconNavContact from '../Icon/Nav/IconNavContact';
import IconNavSetting from '../Icon/Nav/IconNavSetting';

export const HorizonNaviMenu = () => {
  const { t } = useTranslation('page');

  return (
    <ul className="horizontal-menu hidden py-1.5 font-semibold px-6 lg:space-x-1.5 xl:space-x-8 rtl:space-x-reverse bg-white border-t border-[#ebedf2] dark:border-[#191e3a] dark:bg-black text-black dark:text-white-dark">
      <li className="menu nav-item relative">
        <button type="button" className="nav-link">
          <div className="flex items-center">
            <IconNavAdmin className="shrink-0" />
            <span className="px-1">{t('admin')}</span>
          </div>
          <div className="right_arrow">
            <IconCaretDown />
          </div>
        </button>
        <ul className="sub-menu">
          <li>
            <NavLink to="/">{t('list')}</NavLink>
          </li>
          <li>
            <NavLink to="/create">{t('create')}</NavLink>
          </li>
        </ul>
      </li>
      <li className="menu nav-item relative">
        <button type="button" className="nav-link">
          <div className="flex items-center">
            <IconNavRole className="shrink-0" />
            <span className="px-1">{t('role')}</span>
          </div>
          <div className="right_arrow">
            <IconCaretDown />
          </div>
        </button>
        <ul className="sub-menu">
          <li>
            <NavLink to="/roles">{t('list')}</NavLink>
          </li>
        </ul>
      </li>
      <li className="menu nav-item relative">
        <button type="button" className="nav-link">
          <div className="flex items-center">
            <IconNavInformation className="shrink-0" />
            <span className="px-1">{t('information')}</span>
          </div>
          <div className="right_arrow">
            <IconCaretDown />
          </div>
        </button>
        <ul className="sub-menu">
          <li>
            <NavLink to="/informations">{t('list')}</NavLink>
          </li>
          <li>
            <NavLink to="/informaions/create">{t('create')}</NavLink>
          </li>
          <li className="relative">
            <button type="button">
              {t('category')}
              <div className="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
                <IconCaretDown />
              </div>
            </button>
            <ul className="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden">
              <li>
                <NavLink to="/informations/categories">{t('list')}</NavLink>
              </li>
              <li>
                <NavLink to="/informations/categories/create">{t('create')}</NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li className="menu nav-item relative">
        <button type="button" className="nav-link">
          <div className="flex items-center">
            <IconNavContact className="shrink-0" />
            <span className="px-1">{t('contact')}</span>
          </div>
          <div className="right_arrow">
            <IconCaretDown />
          </div>
        </button>
        <ul className="sub-menu">
          <li>
            <NavLink to="/contacts">{t('list')}</NavLink>
          </li>
          <li className="relative">
            <button type="button">
              {t('category')}
              <div className="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
                <IconCaretDown />
              </div>
            </button>
            <ul className="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden">
              <li>
                <NavLink to="/contacts/categories">{t('list')}</NavLink>
              </li>
              <li>
                <NavLink to="/contacts/categories/create">{t('create')}</NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li className="menu nav-item relative">
        <button type="button" className="nav-link">
          <div className="flex items-center">
            <IconNavCompany className="shrink-0" />
            <span className="px-1">{t('company')}</span>
          </div>
          <div className="right_arrow">
            <IconCaretDown />
          </div>
        </button>
        <ul className="sub-menu">
          <li className="relative">
            <button type="button">
              {t('main-client')}
              <div className="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
                <IconCaretDown />
              </div>
            </button>
            <ul className="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden">
              <li>
                <NavLink to="/company/main-clients">{t('list')}</NavLink>
              </li>
              <li>
                <NavLink to="/company/main-clients/create">{t('create')}</NavLink>
              </li>
            </ul>
          </li>
          <li className="relative">
            <button type="button">
              {t('company-history')}
              <div className="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
                <IconCaretDown />
              </div>
            </button>
            <ul className="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden">
              <li>
                <NavLink to="/company/company-histories">{t('list')}</NavLink>
              </li>
              <li>
                <NavLink to="/company/company-histories/create">{t('create')}</NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li className="menu nav-item relative">
        <button type="button" className="nav-link">
          <div className="flex items-center">
            <IconNavSetting className="shrink-0" />
            <NavLink to="/settings" className="px-1">{t('setting')}</NavLink>
          </div>
        </button>
      </li>
    </ul>
  );
};
