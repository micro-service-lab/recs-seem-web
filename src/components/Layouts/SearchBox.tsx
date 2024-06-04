import { useState, Fragment, useEffect } from 'react';
import IconSearch from '../Icon/IconSearch';
import { Dialog, Transition } from '@headlessui/react';
import IconXCircle from '../Icon/IconXCircle';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Path, paths } from '@/router/paths';
import { useNavigate } from 'react-router-dom';
import { useEventListener } from '@/hooks/use-event-listener';
import { useTranslation } from 'react-i18next';
import parse from 'html-react-parser';

export const SearchBox = () => {
  const [modal, setModal] = useState(false);
  const { t } = useTranslation('layout');

  const [search, setSearch] = useState<string>('');
  const [filteredItems, setFilteredItems] = useState<Path[]>(paths);
  const navigate = useNavigate();

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'k' && event.altKey) {
      setModal(true);
    }
  };

  useEventListener('keydown', handleKeyDown);

  useEffect(() => {
    setFilteredItems(() => {
      return paths.filter((path) => {
        return path.keyword.some((key) => {
          return key.toLowerCase().includes(search.toLowerCase()) || search.toLowerCase().includes(key.toLowerCase());
        });
      });
    });
  }, [search]);

  return (
    <>
      <div className="sm:ltr:mr-auto sm:rtl:ml-auto flex items-center space-x-2">
        <button type="button" onClick={() => setModal(true)} className="search_btn p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60">
          <IconSearch className="w-4.5 h-4.5 mx-auto dark:text-[#d0d2d6]" />
        </button>
        <div className="hidden sm:block">
          <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">Alt</kbd>
          <span className="mx-2">+</span>
          <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">K</kbd>
        </div>
      </div>
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" open={modal} onClose={() => setModal(false)}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0" />
          </Transition.Child>
          <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
            <div className="flex items-start justify-center min-h-screen px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden my-8 w-full max-w-3xl text-black dark:text-white-dark">
                  <div className="flex flex-col-reverse sm:flex-row w-full justify-between sm:px-3 pt-1 sm:pt-0 items-end sm:items-center sm:my-4">
                    <form className="mb-2 w-full sm:w-5/6 pt-2">
                      <div className="relative w-11/12 mx-auto">
                        <input
                          type="text"
                          value={search}
                          placeholder={t('search-palceholder')}
                          className="form-input shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)] bg-white rounded-full h-11 placeholder:tracking-wider ltr:pr-11 rtl:pl-11"
                          onChange={(e) => setSearch(e.target.value)}
                        />
                        <button type="button" className="btn btn-primary absolute ltr:right-1 rtl:left-1 inset-y-0 m-auto rounded-full w-9 h-9 p-0 flex items-center justify-center cursor-default">
                          <IconSearch className="w-4.5 h-4.5 mx-auto dark:text-[#d0d2d6]" />
                        </button>
                      </div>
                    </form>
                    <button type="button" className="hover:opacity-80" onClick={() => setModal(false)}>
                      <IconXCircle className="w-8 h-8 sm:hidden hover:scale-105" />
                      <kbd className="hidden sm:inline px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                        Esc
                      </kbd>
                    </button>
                  </div>

                  <div className="p-4 border border-white-dark/20 rounded-lg space-y-4 overflow-x-auto w-full block">
                    <PerfectScrollbar className="relative max-h-[50vh] overflow-x-hidden">
                      <div className="min-h-[45vh] px-4 space-y-4 my-4">
                        {!filteredItems.length ? (
                          <div className="flex justify-center items-center h-full w-full min-h-[40vh] flex-col">
                            <h6>{t('result-not-found')}</h6>
                            <div className="text-center mt-8">
                              {parse(t('not-found-key', { search }))}
                              <br /> {t('please-check-again')}
                            </div>
                          </div>
                        ) : (
                          filteredItems.map((item: Path) => {
                            return (
                              <PerfectScrollbar
                                className="overflow-y-hidden bg-white dark:bg-[#1b2e4b] rounded-xl shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)] px-4 flex items-center justify-between
                            text-gray-500 font-semibold hover:text-primary transition-all duration-150 hover:border border-dashed border-success cursor-pointer py-4"
                                key={item.title}
                              >
                                <div className="min-w-[625px]" onClick={() => navigate(item.link)}>
                                  <div>{t(item.title)}</div>
                                  <div className={`mx-2 px-2 badge badge-outline-info border-1 ring-indigo-300 ring-2 ring-offset-2 rounded-lg border-spacing-4.5`}>{item.link}</div>
                                </div>
                              </PerfectScrollbar>
                            );
                          })
                        )}
                      </div>
                    </PerfectScrollbar>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
