import { Suspense, useEffect, useState } from "react";
import { BelongingMemberList } from "./BelongingMemberList";
import { useTranslation } from "react-i18next";

const TableSkeleton = () => {
  return (
    <div className="table-responsive mb-5">
      <table>
        <thead>
          <tr className="h-10">
            <th className="w-1/4"></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {[...Array(6)].map((_, index) => (
            <tr key={index}>
              <td className="w-1/4">
                <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-[2rem] rounded-md" />
              </td>
              <td>
                <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-[2rem] rounded-md" />
              </td>
              <td>
                <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-[2rem] rounded-md" />
              </td>
              <td>
                <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-[2rem] rounded-md" />
              </td>
              <td>
                <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-[2rem] rounded-md" />
              </td>
              <td>
                <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-[2rem] rounded-md" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

type Props = {
  chatRoomId: string;
};

export const BelongingMemberTable = ({ chatRoomId }: Props) => {
  const [page, setPage] = useState(1);
  const PAGE_SIZES = [5, 10, 20, 30];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);
  const [totalCount, setTotalCount] = useState(0);
  const { t } = useTranslation("table");

  const [search, setSearch] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        setSearchName(search);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [search]);

  return (
    <div className="panel">
      <div className="flex md:items-center md:flex-row flex-col mb-2 gap-5">
        <div className="ltr:ml-auto rtl:mr-auto">
          <input
            type="text"
            className="form-input w-auto"
            placeholder={t("search-placeholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="datatables">
        <Suspense fallback={<TableSkeleton />}>
          <BelongingMemberList
            chatRoomId={chatRoomId}
            perPage={pageSize}
            page={page}
            searchName={searchName}
            setTotalCount={setTotalCount}
          />
        </Suspense>
        <div className="flex justify-between mt-5">
          <div className="flex gap-2">
            {totalCount > 0 ? (
              <span className="flex items-center text-sm">
                {t("table-page-show-off", {
                  startData: (page - 1) * pageSize + 1,
                  endData: Math.min(page * pageSize, totalCount),
                  totalData: totalCount,
                })}
              </span>
            ) : (
              <span className="flex items-center text-sm">
                {t("table-page-no-data")}
              </span>
            )}
            <select
              className="form-select w-20"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {PAGE_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <button
              className="btn"
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page === 1}
            >
              {t("table-page-previous")}
            </button>
            {Array.from({ length: Math.ceil(totalCount / pageSize) }).map(
              (_, index) => (
                <button
                  key={index}
                  className={`flex justify-center font-semibold px-3.5 py-2 rounded-full transition ${
                    page === index + 1
                      ? "bg-primary text-white dark:text-white-light dark:bg-primary"
                      : "bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary"
                  }`}
                  onClick={() => setPage(index + 1)}
                >
                  {index + 1}
                </button>
              )
            )}

            <button
              className="btn"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page * pageSize >= totalCount}
            >
              {t("table-page-next")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
