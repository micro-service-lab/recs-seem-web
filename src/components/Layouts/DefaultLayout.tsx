import { PropsWithChildren, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import App from '../../App';
import { IRootState } from '../../store';
import { toggleSidebar } from '../../store/themeConfigSlice';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';
import Portals from '../../components/Portals';

const DefaultLayout = ({ children }: PropsWithChildren) => {
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();

    const [showTopButton, setShowTopButton] = useState(false);

    const goToTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    const onScrollHandler = () => {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            setShowTopButton(true);
        } else {
            setShowTopButton(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', onScrollHandler);
        return () => {
            window.removeEventListener('onscroll', onScrollHandler);
        };
    }, []);

    return (
        <App>
            {/* BEGIN MAIN CONTAINER */}
            <div className="relative text-black dark:text-white-dark">
                {/* sidebar menu overlay */}
                <div className={`${(!themeConfig.sidebar && 'hidden') || ''} fixed inset-0 bg-[black]/60 z-50 lg:hidden`} onClick={() => dispatch(toggleSidebar())}></div>
                {/* screen loader */}

                <div className="fixed bottom-6 ltr:right-6 rtl:left-6 z-50">
                    {showTopButton && (
                        <button type="button" className="btn btn-outline-primary rounded-full p-2 animate-pulse bg-[#fafafa] dark:bg-[#060818] dark:hover:bg-primary" onClick={goToTop}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7l4-4m0 0l4 4m-4-4v18" />
                            </svg>
                        </button>
                    )}
                </div>

                <div className="navbar-sticky main-container text-black dark:text-white-dark min-h-screen">
                    {/* BEGIN SIDEBAR */}
                    <Sidebar />
                    {/* END SIDEBAR */}

                    <div className="main-content flex flex-col min-h-screen">
                        {/* BEGIN TOP NAVBAR */}
                        <Header />

                        {/* END TOP NAVBAR */}

                        {/* BEGIN CONTENT AREA */}
                        <Suspense>
                            <div className="p-6">{children}</div>
                        </Suspense>
                        {/* END CONTENT AREA */}

                        {/* BEGIN FOOTER */}
                        <Footer />
                        {/* END FOOTER */}
                        <Portals />
                    </div>
                </div>
            </div>
        </App>
    );
};

export default DefaultLayout;
