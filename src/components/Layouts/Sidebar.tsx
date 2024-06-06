import PerfectScrollbar from "react-perfect-scrollbar";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { toggleSidebar } from "../../store/themeConfigSlice";
import AnimateHeight from "react-animate-height";
import { IRootState } from "../../store";
import { useState, useEffect } from "react";
import IconCaretsDown from "../Icon/IconCaretsDown";
import IconCaretDown from "../Icon/IconCaretDown";
import IconMinus from "../Icon/IconMinus";
import IconNavMember from "../Icon/Nav/IconNavMember";
import IconNavRole from "../Icon/Nav/IconNavRole";
import IconNavAttendance from "../Icon/Nav/IconNavAttendance";
import IconNavChat from "../Icon/Nav/IconNavChat";
import IconNavCalender from "../Icon/Nav/IconNavCalender";
import IconNavLocation from "../Icon/Nav/IconNavLocation";
import IconNavOrganization from "../Icon/Nav/IconNavOrganization";
import IconNavSetting from "../Icon/Nav/IconNavSetting";
import IconNavPermission from "../Icon/Nav/IconNavPermission";
import IconNavMinutes from "../Icon/Nav/IconNavMinutes";

/* eslint-disable @typescript-eslint/no-explicit-any */
const Sidebar = () => {
  const [currentMenu, setCurrentMenu] = useState<string>("");
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation("page");
  const toggleMenu = (value: string) => {
    setCurrentMenu((oldValue) => {
      return oldValue === value ? "" : value;
    });
  };

  useEffect(() => {
    const selector = document.querySelector(
      '.sidebar ul a[href="' + window.location.pathname + '"]'
    );
    if (selector) {
      selector.classList.add("active");
      const ul: any = selector.closest("ul.sub-menu");
      if (ul) {
        let ele: any =
          ul.closest("li.menu").querySelectorAll(".nav-link") || [];
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
              <img
                className="w-8 ml-[5px] flex-none"
                src="/assets/images/logo.svg"
                alt="logo"
              />
              <span
                className={`text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light  ${
                  location.pathname === "/"
                    ? "text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 dark:text-transparent dark:from-sky-500 dark:to-emerald-500"
                    : ""
                }`}
              >
                ReCS/SEEM
              </span>
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
                <span>{t("general")}</span>
              </h2>
              <li className="menu nav-item">
                <button
                  type="button"
                  className={`${
                    currentMenu === "member" ? "active" : ""
                  } nav-link group w-full`}
                  onClick={() => toggleMenu("member")}
                >
                  <div className="flex items-center">
                    <IconNavMember className="group-hover:!text-primary shrink-0" />
                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                      {t("member")}
                    </span>
                  </div>

                  <div
                    className={
                      currentMenu !== "member" ? "rtl:rotate-90 -rotate-90" : ""
                    }
                  >
                    <IconCaretDown />
                  </div>
                </button>

                <AnimateHeight
                  duration={300}
                  height={currentMenu === "member" ? "auto" : 0}
                >
                  <ul className="sub-menu text-gray-500">
                    <li>
                      <NavLink to="/member">{t("list")}</NavLink>
                    </li>
                    <li>
                      <NavLink to="/member/create">{t("create")}</NavLink>
                    </li>
                  </ul>
                </AnimateHeight>
              </li>
              <li className="menu nav-item">
                <button
                  type="button"
                  className={`${
                    currentMenu === "role" ? "active" : ""
                  } nav-link group w-full`}
                  onClick={() => toggleMenu("role")}
                >
                  <div className="flex items-center">
                    <IconNavRole className="group-hover:!text-primary shrink-0" />
                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                      {t("role")}
                    </span>
                  </div>

                  <div
                    className={
                      currentMenu !== "role" ? "rtl:rotate-90 -rotate-90" : ""
                    }
                  >
                    <IconCaretDown />
                  </div>
                </button>

                <AnimateHeight
                  duration={300}
                  height={currentMenu === "role" ? "auto" : 0}
                >
                  <ul className="sub-menu text-gray-500">
                    <li>
                      <NavLink to="/role">{t("list")}</NavLink>
                    </li>
                    <li>
                      <NavLink to="/role/create">{t("create")}</NavLink>
                    </li>
                  </ul>
                </AnimateHeight>
              </li>
              <li className="menu nav-item">
                <button
                  type="button"
                  className={`${
                    currentMenu === "attendance" ? "active" : ""
                  } nav-link group w-full`}
                  onClick={() => toggleMenu("attendance")}
                >
                  <div className="flex items-center">
                    <IconNavAttendance className="group-hover:!text-primary shrink-0" />
                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                      {t("attendance")}
                    </span>
                  </div>

                  <div
                    className={
                      currentMenu !== "attendance"
                        ? "rtl:rotate-90 -rotate-90"
                        : ""
                    }
                  >
                    <IconCaretDown />
                  </div>
                </button>

                <AnimateHeight
                  duration={300}
                  height={currentMenu === "attendance" ? "auto" : 0}
                >
                  <ul className="sub-menu text-gray-500">
                    <li>
                      <NavLink to="/attendance/absence-form">
                        {t("absence-form")}
                      </NavLink>
                    </li>
                  </ul>
                </AnimateHeight>
              </li>
              <li className="menu nav-item">
                <NavLink to="/chat-room" className="nav-link group">
                  <div className="flex items-center">
                    <IconNavChat className="group-hover:!text-primary shrink-0" />
                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                      {t("chat")}
                    </span>
                  </div>
                </NavLink>
              </li>
              <li className="menu nav-item">
                <NavLink to="/calender" className="nav-link group">
                  <div className="flex items-center">
                    <IconNavCalender className="group-hover:!text-primary shrink-0" />
                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                      {t("calender")}
                    </span>
                  </div>
                </NavLink>
              </li>
              <li className="menu nav-item">
                <NavLink to="/location-information" className="nav-link group">
                  <div className="flex items-center">
                    <IconNavLocation className="group-hover:!text-primary shrink-0" />
                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                      {t("location-information")}
                    </span>
                  </div>
                </NavLink>
              </li>

              <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                <IconMinus className="w-4 h-5 flex-none hidden" />
                <span>{t("system")}</span>
              </h2>

              <li className="menu nav-item">
                <button
                  type="button"
                  className={`${
                    currentMenu === "organization" ? "active" : ""
                  } nav-link group w-full`}
                  onClick={() => toggleMenu("organization")}
                >
                  <div className="flex items-center">
                    <IconNavOrganization className="group-hover:!text-primary shrink-0" />
                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                      {t("organization")}
                    </span>
                  </div>

                  <div
                    className={
                      currentMenu !== "organization"
                        ? "rtl:rotate-90 -rotate-90"
                        : ""
                    }
                  >
                    <IconCaretDown />
                  </div>
                </button>

                <AnimateHeight
                  duration={300}
                  height={currentMenu === "organization" ? "auto" : 0}
                >
                  <ul className="sub-menu text-gray-500">
                    <li>
                      <NavLink to="/organization">{t("list")}</NavLink>
                    </li>
                    <li>
                      <NavLink to="/organization/create">{t("create")}</NavLink>
                    </li>
                  </ul>
                </AnimateHeight>
              </li>

              <li className="menu nav-item">
                <button
                  type="button"
                  className={`${
                    currentMenu === "permission" ? "active" : ""
                  } nav-link group w-full`}
                  onClick={() => toggleMenu("permission")}
                >
                  <div className="flex items-center">
                    <IconNavPermission className="group-hover:!text-primary shrink-0" />
                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                      {t("permission")}
                    </span>
                  </div>

                  <div
                    className={
                      currentMenu !== "permission"
                        ? "rtl:rotate-90 -rotate-90"
                        : ""
                    }
                  >
                    <IconCaretDown />
                  </div>
                </button>

                <AnimateHeight
                  duration={300}
                  height={currentMenu === "permission" ? "auto" : 0}
                >
                  <ul className="sub-menu text-gray-500">
                    <li>
                      <NavLink to="/permission">{t("list")}</NavLink>
                    </li>
                    <li>
                      <NavLink to="/permission/create">{t("create")}</NavLink>
                    </li>
                  </ul>
                </AnimateHeight>
              </li>

              <li className="menu nav-item">
                <button
                  type="button"
                  className={`${
                    currentMenu === "minutes" ? "active" : ""
                  } nav-link group w-full`}
                  onClick={() => toggleMenu("minutes")}
                >
                  <div className="flex items-center">
                    <IconNavMinutes className="group-hover:!text-primary shrink-0" />
                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                      {t("minutes")}
                    </span>
                  </div>

                  <div
                    className={
                      currentMenu !== "minutes"
                        ? "rtl:rotate-90 -rotate-90"
                        : ""
                    }
                  >
                    <IconCaretDown />
                  </div>
                </button>

                <AnimateHeight
                  duration={300}
                  height={currentMenu === "minutes" ? "auto" : 0}
                >
                  <ul className="sub-menu text-gray-500">
                    <li>
                      <NavLink to="/minutes">{t("view")}</NavLink>
                    </li>
                    <li>
                      <NavLink to="/minutes/create">{t("create")}</NavLink>
                    </li>
                  </ul>
                </AnimateHeight>
              </li>

              <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                <IconMinus className="w-4 h-5 flex-none hidden" />
                <span>{t("others")}</span>
              </h2>

              <li className="menu nav-item">
                <NavLink to="/setting" className="nav-link group">
                  <div className="flex items-center">
                    <IconNavSetting className="group-hover:!text-primary shrink-0" />
                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                      {t("setting")}
                    </span>
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
