import { useDispatch, useSelector } from "react-redux";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link, useLocation } from "react-router-dom";
import { IRootState } from "../../store";
import {
  toggleTheme,
  toggleSidebar,
  toggleLocale,
} from "../../store/themeConfigSlice";
import i18next from "i18next";
import Dropdown from "../Dropdown";
import IconMenu from "../Icon/IconMenu";
import IconSun from "../Icon/IconSun";
import IconMoon from "../Icon/IconMoon";
import IconLaptop from "../Icon/IconLaptop";
import IconOnline from "../Icon/IconOnline";
import { SearchBox } from "./SearchBox";
import { UserAvatar } from "./UserAvatar";
import { useRecoilValue } from "recoil";
import {
  onlineMembersCountState,
  onlineMembersState,
} from "@/store/onlineMembers";

/* eslint-disable @typescript-eslint/no-explicit-any */
const Header = () => {
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const dispatch = useDispatch();
  const path = useLocation().pathname;
  const onlineMembers = useRecoilValue(onlineMembersState);
  const onlineMemberCounts = useRecoilValue(onlineMembersCountState);

  return (
    <header className="z-40">
      <div className="shadow-sm">
        <div className="relative bg-white flex w-full items-center px-5 py-2.5 dark:bg-black">
          <div className="horizontal-logo flex lg:hidden justify-between items-center ltr:mr-2 rtl:ml-2">
            <Link to="/" className="main-logo flex items-center shrink-0">
              <img
                className="w-8 ltr:-ml-1 rtl:-mr-1 inline"
                src="/assets/images/logo.svg"
                alt="logo"
              />
              <span
                className={`text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle hidden md:inline dark:text-white-light transition-all duration-300 ${
                  path === "/"
                    ? "text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 dark:text-transparent dark:from-sky-500 dark:to-emerald-500"
                    : ""
                }`}
              >
                ReCS/SEEM
              </span>
            </Link>
            <button
              type="button"
              className="collapse-icon flex-none dark:text-[#d0d2d6] hover:text-primary dark:hover:text-primary flex lg:hidden ltr:ml-2 rtl:mr-2 p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
              onClick={() => {
                dispatch(toggleSidebar());
              }}
            >
              <IconMenu className="w-5 h-5" />
            </button>
          </div>

          <div className="sm:flex-1 ltr:sm:ml-0 ltr:ml-auto sm:rtl:mr-0 rtl:mr-auto flex items-center space-x-1.5 lg:space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">
            <SearchBox />
            <div className="dropdown shrink-0 relative">
              <Dropdown
                offset={[0, 8]}
                placement="bottom-end"
                btnClassName="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                button={
                  <span className="w-5 h-5">
                    <IconOnline className="w-5 h-5 object-cover rounded-full" />
                    <span className="absolute right-0 bottom-0 w-4 h-4 rounded-full ring-2 ring-white dark:ring-white-dark bg-info flex justify-center items-center text-xs font-semibold text-white-light dark:text-black">
                      {onlineMemberCounts}
                    </span>
                  </span>
                }
              >
                <ul className="!px-2 text-dark dark:text-white-dark font-semibold dark:text-white-light/90 w-[280px] flex flex-col space-y-1 overflow-y-auto max-h-[400px]">
                <PerfectScrollbar>
                  {Object.entries(onlineMembers).map(([key, value]) => {
                    return (
                      <li key={key} className="flex flex-col border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-1">
                          <span className="ltr:ml-3 rtl:mr-3">
                            <span className="text-[0.7rem] font-semibold">
                              {key}
                            </span>
                          </span>
                        </div>
                        <ul className="flex flex-wrap space-x-1 px-2 justify-center">
                          {value.map((connectId: string) => {
                            return (
                              <li key={connectId}>
                                <span className="text-[0.65rem] font-semibold text-green-500">
                                  {connectId}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    );
                  })}
                  </PerfectScrollbar>
                </ul>
              </Dropdown>
            </div>
            <div>
              {themeConfig.theme === "light" ? (
                <button
                  className={`${
                    themeConfig.theme === "light" &&
                    "flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                  }`}
                  onClick={() => {
                    dispatch(toggleTheme("dark"));
                  }}
                >
                  <IconSun />
                </button>
              ) : (
                ""
              )}
              {themeConfig.theme === "dark" && (
                <button
                  className={`${
                    themeConfig.theme === "dark" &&
                    "flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                  }`}
                  onClick={() => {
                    dispatch(toggleTheme("system"));
                  }}
                >
                  <IconMoon />
                </button>
              )}
              {themeConfig.theme === "system" && (
                <button
                  className={`${
                    themeConfig.theme === "system" &&
                    "flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                  }`}
                  onClick={() => {
                    dispatch(toggleTheme("light"));
                  }}
                >
                  <IconLaptop />
                </button>
              )}
            </div>
            <div className="dropdown shrink-0">
              <Dropdown
                offset={[0, 8]}
                placement="bottom-end"
                btnClassName="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                button={
                  <img
                    className="w-5 h-5 object-cover rounded-full"
                    src={`/assets/images/flags/${themeConfig.locale.toUpperCase()}.svg`}
                    alt="flag"
                  />
                }
              >
                <ul className="!px-2 text-dark dark:text-white-dark grid grid-cols-2 gap-2 font-semibold dark:text-white-light/90 w-[280px]">
                  {themeConfig.languageList.map((item: any) => {
                    return (
                      <li key={item.code}>
                        <button
                          type="button"
                          className={`flex w-full hover:text-primary rounded-lg ${
                            i18next.language === item.code
                              ? "bg-primary/10 text-primary"
                              : ""
                          }`}
                          onClick={() => {
                            dispatch(toggleLocale(item.code));
                          }}
                        >
                          <img
                            src={`/assets/images/flags/${item.code.toUpperCase()}.svg`}
                            alt="flag"
                            className="w-5 h-5 object-cover rounded-full"
                          />
                          <span className="ltr:ml-3 rtl:mr-3">{item.name}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </Dropdown>
            </div>
            <UserAvatar />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
