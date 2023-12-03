import "../public/styles/globals.css";
import "../public/styles/tooltip.css";
import Head from "next/head";
import dynamic from "next/dynamic";
import "tippy.js/animations/scale-subtle.css";
import "tippy.js/animations/scale-extreme.css";
import "tippy.js/animations/shift-away.css";
import "tippy.js/animations/shift-toward.css";
import Router, { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
const Header = dynamic(() => import("../components/Header"));
const Footer = dynamic(() => import("../components/Footer"));

function MyApp({ Component, pageProps }) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleRouteChangeStart = () => {
            setLoading(true);
            document.documentElement.style.pointerEvents = "none";
        };

        const handleRouteChangeComplete = () => {
            setTimeout(() => {
                setLoading(false);
                document.documentElement.style.pointerEvents = "all";
            }, 1000);
        };

        const handleRouteChangeError = () => {
            setTimeout(() => {
                setLoading(false);
                document.documentElement.style.pointerEvents = "all";
            }, 1000);
        };

        Router.events.on("routeChangeStart", handleRouteChangeStart);
        Router.events.on("routeChangeComplete", handleRouteChangeComplete);
        Router.events.on("routeChangeError", handleRouteChangeError);

        return () => {
            Router.events.off("routeChangeStart", handleRouteChangeStart);
            Router.events.off("routeChangeComplete", handleRouteChangeComplete);
            Router.events.off("routeChangeError", handleRouteChangeError);
        };
    }, []);

    return (
        <>
            <Head>
                <title>Mr. Natural • Home</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link
                    href="https://pro.fontawesome.com/releases/v5.15.4/css/all.css"
                    rel="stylesheet"
                />
            </Head>
            <Transition
                as={Fragment}
                show={loading}
                enter="transform duration-[50ms] transition"
                enterFrom="opacity-0"
                enterTo="opacity-80"
                leave="transform duration-[100ms] transition ease-in-out"
                leaveFrom="opacity-80"
                leaveTo="opacity-0"
            >
                <div
                    style={{ zIndex: 99999 }}
                    className="fixed bg-black/75 w-full h-screen flex justify-center items-center pointer-events-none"
                >
                    <div className="flex items-center gap-x-6 animate-pulse">
                        <div className="text-center">
                            <p className="text-6xl mb-5 font-semibold">Loading...</p>
                            <p className="uppercase text-xl font-semibold text-white">
                                <i className="fal fa-spinner-third fa-spin" />
                            </p>
                        </div>
                    </div>
                </div>
            </Transition>
            <main className="border-b-[7px] border-t-[7px] h-full border-neutral-800/50 w-full">
                <div className="min-h-screen max-w-screen-lg p-5 w-full md:w-10/12 lg:w-8/12 mx-auto transition-all duration-300">
                    <Header />
                    <Component {...pageProps} />
                </div>
                <div className="p-4 w-full md:w-10/12 lg:w-8/12 mx-auto transition-all duration-300">
                    <div className="bg-neutral-800/5">
                        <div className="flex flex-row mx-20">
                            <Footer />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default MyApp;
