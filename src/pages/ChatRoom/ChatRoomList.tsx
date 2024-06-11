import { IRootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, Suspense, Fragment } from "react";
import { setPageTitle } from "@/store/themeConfigSlice";
import IconChatPlus from "@/components/Icon/IconChatPlus";
import IconMenu from "@/components/Icon/IconMenu";
import IconMessage from "@/components/Icon/IconMessage";
import IconClose from "@/components/Icon/IconClose";
import { useTranslation } from "react-i18next";
import ChatRoomScrollList from "@/sections/Chat/ChatRoomScrollList";
import { PracticalChatRoomOnMember } from "@/types/entity/chat-room-belonging";
import ChatTalkList from "@/sections/Chat/ChatTalkList";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  mountChatRoomState,
  openChatRoomAdditionalActionState,
  openChatRoomMessageDeleteState,
  openChatRoomMessageOverrideState,
  openChatRoomReadReceiptState,
  openChatRoomState,
} from "@/store/openChatRoom";
import { useReadMessagesOnChatRoomQuery } from "@/api/readReceipt/useReadMessagesOnChatRoomQuery";
import {
  DeleteMessageOnChatRoomState,
  EditMessageOnChatRoomState,
  latestActionOnChatRoomState,
} from "@/store/chatRoomLatestAction";
import { ignoreChatRoomState } from "@/store/ignoreChatRoom";
import { Dialog, Transition } from "@headlessui/react";
import { CreateChatRoomForm } from "@/sections/Chat/CreateChatRoomForm";

/* eslint-disable @typescript-eslint/no-explicit-any */
const Chat = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle(tT("page-title-chat-room-list")));
  });
  const isDark = useSelector(
    (state: IRootState) =>
      state.themeConfig.theme === "dark" || state.themeConfig.isDarkMode
  );

  const [newChatRoomModal, setNewChatRoomModal] = useState(false);
  const { t } = useTranslation();
  const { t: tT } = useTranslation("page");
  const [openLatestActedAt, setOpenLatestActedAt] = useState<string | null>(
    null
  );

  const [isShowChatMenu, setIsShowChatMenu] = useState(false);
  const [isShowChat, setIsShowChat] = useState(false);
  const [openChatRoom, setOpenChatRoom] = useRecoilState(openChatRoomState);
  const setOpenChatRoomAdditionalAction = useSetRecoilState(
    openChatRoomAdditionalActionState
  );
  const setMountChatRoom = useSetRecoilState(mountChatRoomState);
  const setOpenChatRoomReadReceipt = useSetRecoilState(
    openChatRoomReadReceiptState
  );
  const setMessagesOverride = useSetRecoilState(
    openChatRoomMessageOverrideState
  );
  const setMessagesDelete = useSetRecoilState(openChatRoomMessageDeleteState);
  const { mutate: readMessagesOnChatRoom } = useReadMessagesOnChatRoomQuery();
  const setLatestActionOnChatRoom = useSetRecoilState(
    latestActionOnChatRoomState
  );
  const setEditMessageOnChatRoom = useSetRecoilState(
    EditMessageOnChatRoomState
  );
  const setDeleteMessageOnChatRoom = useSetRecoilState(
    DeleteMessageOnChatRoomState
  );
  const setIgnoreChatRoom = useSetRecoilState(ignoreChatRoomState);

  const scrollToBottom = () => {
    if (isShowChat) {
      setTimeout(() => {
        const element: any = document.querySelector(".chat-conversation-box");
        element.behavior = "smooth";
        element.scrollTop = element.scrollHeight;
      });
    }
  };
  const handleSelectChatRoom = (chatRoom: PracticalChatRoomOnMember) => {
    readMessagesOnChatRoom({ chatRoomId: chatRoom.chatRoom.chatRoomId });
    setOpenChatRoomAdditionalAction([]);
    setOpenChatRoomReadReceipt({});
    setMessagesOverride({});
    setMessagesDelete({});
    setOpenChatRoom(chatRoom);
    setIsShowChat(true);
    setIsShowChatMenu(false);
    scrollToBottom();
  };

  useEffect(() => {
    setMountChatRoom(true);
    return () => {
      setOpenChatRoom(null);
      setLatestActionOnChatRoom((p) => ({ data: [], dispatch: p.dispatch }));
      setOpenChatRoomAdditionalAction([]);
      setOpenChatRoomReadReceipt({});
      setMessagesOverride({});
      setMessagesDelete({});
      setIgnoreChatRoom({});
      setEditMessageOnChatRoom((p) => ({ data: [], dispatch: p.dispatch }));
      setDeleteMessageOnChatRoom((p) => ({ data: [], dispatch: p.dispatch }));
      setMountChatRoom(false);
    };
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  return (
    <div>
      <div
        className={`flex gap-5 relative sm:h-[calc(100vh_-_150px)] h-full sm:min-h-0 ${
          isShowChatMenu ? "xl:min-h-[999px]" : ""
        }`}
      >
        <div
          className={`panel p-4 flex-none max-w-xs w-full absolute xl:relative z-10 space-y-4 h-full hidden xl:block overflow-hidden ${
            isShowChatMenu ? "!block" : ""
          }`}
        >
          <div className="flex justify-between items-center">
            <div
              className="bg-primary hover:bg-primary-dark hover:text-white-dark
                             text-white dark:hover:bg-primary-dark cursor-pointer
                             rounded-md py-2 px-4 w-full dark:hover:bg-[#1b2e4b] flex items-center justify-center"
              onClick={() => setNewChatRoomModal(true)}
            >
              <span className="mr-2">{t("New Chat Room")}</span>
              <IconChatPlus width={24} height={24} />
            </div>
          </div>
          <Transition appear show={newChatRoomModal} as={Fragment}>
            <Dialog
              as="div"
              open={newChatRoomModal}
              onClose={() => setNewChatRoomModal(false)}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0" />
              </Transition.Child>
              <div
                id="login_modal"
                className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto"
              >
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
                    <Dialog.Panel className="panel border-0 py-1 px-4 rounded-lg overflow-hidden w-full max-w-4xl my-8 text-black dark:text-white-dark">
                      <div className="flex items-center justify-between p-5 font-semibold text-lg dark:text-white">
                        <h5>{t("New Chat Room")}</h5>
                        <button
                          type="button"
                          onClick={() => setNewChatRoomModal(false)}
                          className="text-white-dark hover:text-dark"
                        >
                          <IconClose className="w-6 h-6" />
                        </button>
                      </div>

                      <CreateChatRoomForm />
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
          <div className="mt-6 h-full min-h-[100px] sm:h-[calc(100vh_-_292px)]">
            <Suspense
              fallback={
                <div
                  role="status"
                  className="max-w-md p-4 space-y-12 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
                >
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                        <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                      </div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                  ))}
                </div>
              }
            >
              <ChatRoomScrollList
                searchName=""
                onSelectChatRoom={handleSelectChatRoom}
                setOpenLatestActedAt={setOpenLatestActedAt}
              />
            </Suspense>
          </div>
        </div>
        <div
          className={`bg-black/60 z-[5] w-full h-full absolute rounded-md hidden ${
            isShowChatMenu ? "!block xl:!hidden" : ""
          }`}
          onClick={() => setIsShowChatMenu(!isShowChatMenu)}
        ></div>
        <div className="panel p-0 flex-1">
          {!isShowChat && (
            <div className="flex items-center justify-center h-full relative p-4">
              <button
                type="button"
                onClick={() => setIsShowChatMenu(!isShowChatMenu)}
                className="xl:hidden absolute top-4 ltr:left-4 rtl:right-4 hover:text-primary"
              >
                <IconMenu />
              </button>

              <div className="py-8 flex items-center justify-center flex-col">
                <div className="w-[280px] md:w-[430px] mb-8 h-[calc(100vh_-_320px)] min-h-[120px] text-white dark:text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    data-name="Layer 1"
                    className="w-full h-full"
                    viewBox="0 0 891.29496 745.19434"
                    xmlns-xlink="http://www.w3.org/1999/xlink"
                  >
                    <ellipse
                      cx="418.64354"
                      cy="727.19434"
                      rx="352"
                      ry="18"
                      fill={isDark ? "#888ea8" : "#e6e6e6"}
                    />
                    <path
                      d="M778.64963,250.35008h-3.99878V140.80476a63.40187,63.40187,0,0,0-63.4018-63.40193H479.16232a63.40188,63.40188,0,0,0-63.402,63.4017v600.9744a63.40189,63.40189,0,0,0,63.4018,63.40192H711.24875a63.40187,63.40187,0,0,0,63.402-63.40168V328.32632h3.99878Z"
                      transform="translate(-154.35252 -77.40283)"
                      fill="#3f3d56"
                    />
                    <path
                      d="M761.156,141.24713v600.09a47.35072,47.35072,0,0,1-47.35,47.35h-233.2a47.35084,47.35084,0,0,1-47.35-47.35v-600.09a47.3509,47.3509,0,0,1,47.35-47.35h28.29a22.50659,22.50659,0,0,0,20.83,30.99h132.96a22.50672,22.50672,0,0,0,20.83-30.99h30.29A47.35088,47.35088,0,0,1,761.156,141.24713Z"
                      transform="translate(-154.35252 -77.40283)"
                      fill="currentColor"
                    />
                    <path
                      d="M686.03027,400.0032q-2.32543,1.215-4.73047,2.3-2.18994.99-4.4497,1.86c-.5503.21-1.10987.42-1.66992.63a89.52811,89.52811,0,0,1-13.6001,3.75q-3.43506.675-6.96,1.06-2.90991.33-5.87989.47c-1.41015.07-2.82031.1-4.24023.1a89.84124,89.84124,0,0,1-16.75977-1.57c-1.44043-.26-2.85009-.57-4.26025-.91a88.77786,88.77786,0,0,1-19.66992-7.26c-.56006-.28-1.12012-.58-1.68018-.87-.83008-.44-1.63965-.9-2.4497-1.38.38964-.54.81005-1.07,1.23974-1.59a53.03414,53.03414,0,0,1,78.87012-4.1,54.27663,54.27663,0,0,1,5.06006,5.86C685.25977,398.89316,685.6499,399.44321,686.03027,400.0032Z"
                      transform="translate(-154.35252 -77.40283)"
                      fill="#6c63ff"
                    />
                    <circle
                      cx="492.14325"
                      cy="234.76352"
                      r="43.90974"
                      fill="#2f2e41"
                    />
                    <circle
                      cx="642.49883"
                      cy="327.46205"
                      r="32.68086"
                      transform="translate(-232.6876 270.90663) rotate(-28.66315)"
                      fill="#a0616a"
                    />
                    <path
                      d="M676.8388,306.90589a44.44844,44.44844,0,0,1-25.402,7.85033,27.23846,27.23846,0,0,0,10.796,4.44154,89.62764,89.62764,0,0,1-36.61.20571,23.69448,23.69448,0,0,1-7.66395-2.63224,9.699,9.699,0,0,1-4.73055-6.3266c-.80322-4.58859,2.77227-8.75743,6.488-11.567a47.85811,47.85811,0,0,1,40.21662-8.03639c4.49246,1.16124,8.99288,3.12327,11.91085,6.731s3.78232,9.16981,1.00224,12.88488Z"
                      transform="translate(-154.35252 -77.40283)"
                      fill="#2f2e41"
                    />
                    <path
                      d="M644.5,230.17319a89.98675,89.98675,0,0,0-46.83984,166.83l.58007.34q.72.43506,1.43995.84c.81005.48,1.61962.94,2.4497,1.38.56006.29,1.12012.59,1.68018.87a88.77786,88.77786,0,0,0,19.66992,7.26c1.41016.34,2.81982.65,4.26025.91a89.84124,89.84124,0,0,0,16.75977,1.57c1.41992,0,2.83008-.03,4.24023-.1q2.97-.135,5.87989-.47,3.52513-.39,6.96-1.06a89.52811,89.52811,0,0,0,13.6001-3.75c.56005-.21,1.11962-.42,1.66992-.63q2.26464-.87,4.4497-1.86,2.40015-1.08,4.73047-2.3a90.7919,90.7919,0,0,0,37.03955-35.97c.04-.07995.09034-.16.13038-.24a89.30592,89.30592,0,0,0,9.6499-26.41,90.051,90.051,0,0,0-88.3501-107.21Zm77.06006,132.45c-.08008.14-.1499.28-.23.41a88.17195,88.17195,0,0,1-36.48,35.32q-2.29542,1.2-4.66992,2.25c-1.31006.59-2.64991,1.15-4,1.67-.57032.22-1.14991.44-1.73.64a85.72126,85.72126,0,0,1-11.73,3.36,84.69473,84.69473,0,0,1-8.95019,1.41c-1.8501.2-3.73.34-5.62012.41-1.21.05-2.42969.08-3.6499.08a86.762,86.762,0,0,1-16.21973-1.51,85.62478,85.62478,0,0,1-9.63037-2.36,88.46592,88.46592,0,0,1-13.98974-5.67c-.52-.27-1.04-.54-1.5503-.82-.73-.39-1.46972-.79-2.18994-1.22-.54-.3-1.08008-.62-1.60986-.94-.31006-.18-.62012-.37-.93018-.56a88.06851,88.06851,0,1,1,123.18018-32.47Z"
                      transform="translate(-154.35252 -77.40283)"
                      fill="#3f3d56"
                    />
                    <path
                      d="M624.2595,268.86254c-.47244-4.968-6.55849-8.02647-11.3179-6.52583s-7.88411,6.2929-8.82863,11.19308a16.0571,16.0571,0,0,0,2.16528,12.12236c2.40572,3.46228,6.82664,5.623,10.95,4.74406,4.70707-1.00334,7.96817-5.59956,8.90127-10.32105s.00667-9.58929-.91854-14.31234Z"
                      transform="translate(-154.35252 -77.40283)"
                      fill="#2f2e41"
                    />
                    <path
                      d="M691.24187,275.95964c-.47245-4.968-6.5585-8.02646-11.3179-6.52582s-7.88412,6.29289-8.82864,11.19307a16.05711,16.05711,0,0,0,2.16529,12.12236c2.40571,3.46228,6.82663,5.623,10.95,4.74406,4.70707-1.00334,7.96817-5.59955,8.90127-10.32105s.00667-9.58929-.91853-14.31234Z"
                      transform="translate(-154.35252 -77.40283)"
                      fill="#2f2e41"
                    />
                    <path
                      d="M488.93638,356.14169a4.47525,4.47525,0,0,1-3.30664-1.46436L436.00767,300.544a6.02039,6.02039,0,0,0-4.42627-1.94727H169.3618a15.02615,15.02615,0,0,1-15.00928-15.00927V189.025a15.02615,15.02615,0,0,1,15.00928-15.00928H509.087A15.02615,15.02615,0,0,1,524.0963,189.025v94.5625A15.02615,15.02615,0,0,1,509.087,298.59676h-9.63135a6.01157,6.01157,0,0,0-6.00464,6.00489v47.0332a4.474,4.474,0,0,1-2.87011,4.1958A4.52563,4.52563,0,0,1,488.93638,356.14169Z"
                      transform="translate(-154.35252 -77.40283)"
                      fill="currentColor"
                    />
                    <path
                      d="M488.93638,356.14169a4.47525,4.47525,0,0,1-3.30664-1.46436L436.00767,300.544a6.02039,6.02039,0,0,0-4.42627-1.94727H169.3618a15.02615,15.02615,0,0,1-15.00928-15.00927V189.025a15.02615,15.02615,0,0,1,15.00928-15.00928H509.087A15.02615,15.02615,0,0,1,524.0963,189.025v94.5625A15.02615,15.02615,0,0,1,509.087,298.59676h-9.63135a6.01157,6.01157,0,0,0-6.00464,6.00489v47.0332a4.474,4.474,0,0,1-2.87011,4.1958A4.52563,4.52563,0,0,1,488.93638,356.14169ZM169.3618,176.01571A13.024,13.024,0,0,0,156.35252,189.025v94.5625a13.024,13.024,0,0,0,13.00928,13.00927H431.5814a8.02436,8.02436,0,0,1,5.90039,2.59571l49.62208,54.1333a2.50253,2.50253,0,0,0,4.34716-1.69092v-47.0332a8.0137,8.0137,0,0,1,8.00464-8.00489H509.087a13.024,13.024,0,0,0,13.00928-13.00927V189.025A13.024,13.024,0,0,0,509.087,176.01571Z"
                      transform="translate(-154.35252 -77.40283)"
                      fill="#3f3d56"
                    />
                    <circle
                      cx="36.81601"
                      cy="125.19345"
                      r="13.13371"
                      fill="#6c63ff"
                    />
                    <path
                      d="M493.76439,275.26947H184.68447a7.00465,7.00465,0,1,1,0-14.00929H493.76439a7.00465,7.00465,0,0,1,0,14.00929Z"
                      transform="translate(-154.35252 -77.40283)"
                      fill={isDark ? "#888ea8" : "#e6e6e6"}
                    />
                    <path
                      d="M393.07263,245.49973H184.68447a7.00465,7.00465,0,1,1,0-14.00929H393.07263a7.00464,7.00464,0,0,1,0,14.00929Z"
                      transform="translate(-154.35252 -77.40283)"
                      fill={isDark ? "#888ea8" : "#e6e6e6"}
                    />
                    <path
                      d="M709.41908,676.83065a4.474,4.474,0,0,1-2.87011-4.1958v-47.0332a6.01157,6.01157,0,0,0-6.00464-6.00489H690.913a15.02615,15.02615,0,0,1-15.00928-15.00927V510.025A15.02615,15.02615,0,0,1,690.913,495.01571H1030.6382a15.02615,15.02615,0,0,1,15.00928,15.00928v94.5625a15.02615,15.02615,0,0,1-15.00928,15.00927H768.4186a6.02039,6.02039,0,0,0-4.42627,1.94727l-49.62207,54.1333a4.47525,4.47525,0,0,1-3.30664,1.46436A4.52563,4.52563,0,0,1,709.41908,676.83065Z"
                      transform="translate(-154.35252 -77.40283)"
                      fill="currentColor"
                    />
                    <path
                      d="M709.41908,676.83065a4.474,4.474,0,0,1-2.87011-4.1958v-47.0332a6.01157,6.01157,0,0,0-6.00464-6.00489H690.913a15.02615,15.02615,0,0,1-15.00928-15.00927V510.025A15.02615,15.02615,0,0,1,690.913,495.01571H1030.6382a15.02615,15.02615,0,0,1,15.00928,15.00928v94.5625a15.02615,15.02615,0,0,1-15.00928,15.00927H768.4186a6.02039,6.02039,0,0,0-4.42627,1.94727l-49.62207,54.1333a4.47525,4.47525,0,0,1-3.30664,1.46436A4.52563,4.52563,0,0,1,709.41908,676.83065ZM690.913,497.01571A13.024,13.024,0,0,0,677.9037,510.025v94.5625A13.024,13.024,0,0,0,690.913,617.59676h9.63135a8.0137,8.0137,0,0,1,8.00464,8.00489v47.0332a2.50253,2.50253,0,0,0,4.34716,1.69092l49.62208-54.1333a8.02436,8.02436,0,0,1,5.90039-2.59571h262.2196a13.024,13.024,0,0,0,13.00928-13.00927V510.025a13.024,13.024,0,0,0-13.00928-13.00928Z"
                      transform="translate(-154.35252 -77.40283)"
                      fill="#3f3d56"
                    />
                    <path
                      d="M603.53027,706.11319a89.06853,89.06853,0,0,1-93.65039,1.49,54.12885,54.12885,0,0,1,9.40039-12.65,53.43288,53.43288,0,0,1,83.90967,10.56994C603.2998,705.71316,603.41992,705.91318,603.53027,706.11319Z"
                      transform="translate(-154.35252 -77.40283)"
                      fill="#6c63ff"
                    />
                    <circle
                      cx="398.44256"
                      cy="536.68841"
                      r="44.20157"
                      fill="#2f2e41"
                    />
                    <circle
                      cx="556.81859"
                      cy="629.4886"
                      r="32.89806"
                      transform="translate(-416.96496 738.72884) rotate(-61.33685)"
                      fill="#ffb8b8"
                    />
                    <path
                      d="M522.25039,608.79582a44.74387,44.74387,0,0,0,25.57085,7.9025,27.41946,27.41946,0,0,1-10.8677,4.47107,90.22316,90.22316,0,0,0,36.85334.20707,23.852,23.852,0,0,0,7.71488-2.64973,9.76352,9.76352,0,0,0,4.762-6.36865c.80855-4.61909-2.7907-8.81563-6.53113-11.64387a48.17616,48.17616,0,0,0-40.4839-8.08981c-4.52231,1.169-9.05265,3.144-11.99,6.77579s-3.80746,9.23076-1.0089,12.97052Z"
                      transform="translate(-154.35252 -77.40283)"
                      fill="#2f2e41"
                    />
                    <path
                      d="M555.5,721.17319a89.97205,89.97205,0,1,1,48.5708-14.21875A89.87958,89.87958,0,0,1,555.5,721.17319Zm0-178a88.00832,88.00832,0,1,0,88,88A88.09957,88.09957,0,0,0,555.5,543.17319Z"
                      transform="translate(-154.35252 -77.40283)"
                      fill="#3f3d56"
                    />
                    <circle
                      cx="563.81601"
                      cy="445.19345"
                      r="13.13371"
                      fill="#6c63ff"
                    />
                    <path
                      d="M1020.76439,595.26947H711.68447a7.00465,7.00465,0,1,1,0-14.00929h309.07992a7.00464,7.00464,0,0,1,0,14.00929Z"
                      transform="translate(-154.35252 -77.40283)"
                      fill={isDark ? "#888ea8" : "#e6e6e6"}
                    />
                    <path
                      d="M920.07263,565.49973H711.68447a7.00465,7.00465,0,1,1,0-14.00929H920.07263a7.00465,7.00465,0,0,1,0,14.00929Z"
                      transform="translate(-154.35252 -77.40283)"
                      fill={isDark ? "#888ea8" : "#e6e6e6"}
                    />
                    <ellipse
                      cx="554.64354"
                      cy="605.66091"
                      rx="24.50394"
                      ry="2.71961"
                      fill={isDark ? "#888ea8" : "#e6e6e6"}
                    />
                    <ellipse
                      cx="335.64354"
                      cy="285.66091"
                      rx="24.50394"
                      ry="2.71961"
                      fill={isDark ? "#888ea8" : "#e6e6e6"}
                    />
                  </svg>
                </div>
                <p className="flex justify-center bg-white-dark/20 p-2 font-semibold rounded-md max-w-[190px] mx-auto">
                  <IconMessage className="ltr:mr-2 rtl:ml-2" />
                  Click User To Chat
                </p>
              </div>
            </div>
          )}
          {isShowChat && openChatRoom ? (
            <ChatTalkList
              chatRoom={openChatRoom}
              onClose={() => setIsShowChat(false)}
              toggleChatMenu={() => setIsShowChatMenu(!isShowChatMenu)}
              scrollToBottom={scrollToBottom}
              latestActedAt={openLatestActedAt}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
