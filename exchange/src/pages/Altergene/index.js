import React, {useContext, useEffect, useMemo, useRef} from 'react';

import {Unity, useUnityContext} from "react-unity-webgl";
import {ButtonMenu, CardBody, Text} from "@gametheory/uikit";
import CardNav from "../../components/CardNav";
import AppBody from "../AppBody";
import PageHeader from "../../components/PageHeader";
import {AutoColumn} from "../../components/Column";
import {RowBetween} from "../../components/Row";
import Question from "../../components/QuestionHelper";
import {LightCard} from "../../components/Card";
import {Dots} from "../Pool/styleds";
import Container from "../../components/Container";
import {useHistory} from "react-router-dom";

/**
 * Blocks all navigation attempts. This is useful for preventing the page from
 * changing until some condition is met, like saving form data.
 *
 * @param  blocker
 * @param  when
 * @see https://reactrouter.com/api/useBlocker
 */
export function useBlocker( blocker, when = true ) {
    const navigator = useHistory();

    useEffect( () => {
        if ( ! when ) return;

        const unblock = navigator.block( ( tx ) => {
            const autoUnblockingTx = {
                ...tx,
                retry() {
                    // Automatically unblock the transition so it can play all the way
                    // through before retrying it. TODO: Figure out how to re-enable
                    // this block if the transition is cancelled for some reason.
                    unblock();
                    tx.retry();
                },
            };

            blocker( autoUnblockingTx );
        } );

        return unblock;
    }, [ navigator, blocker, when ] );
}

const useScript = url => {
    useEffect(() => {
        const script = document.createElement('script');

        script.src = url;
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, [url]);
};

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        //logErrorToMyService(error, errorInfo);
        if(!error.message.includes('getBoundingClientRect')) console.log(error);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <></>;
        }

        return this.props.children;
    }
}

const Altergene = () => {
    useScript("web3/index.js");
    const unityContext = useUnityContext({
        loaderUrl: "Build/Client.loader.js",
        dataUrl: "Build/Client.data",
        frameworkUrl: "Build/Client.framework.js",
        codeUrl: "Build/Client.wasm",
    });
    const iframeRef = useRef();
    useEffect(() => {
        console.log("use effect content:");
        return () => {
            if (iframeRef !== null) {
                //window.location.reload();

                unityContext?.unload()?.then(()=>{
                    window.document
                        .getElementById("iframeContainer")
                        .removeChild(iframeRef.current);
                });

            }
        };
    }, []);
    const history = useHistory();
    useEffect(() => {
        const unblock = history.block((location, action) => {
            if(location.pathname.startsWith("/")) {
                window.location.href = `/#${location.pathname}`;
                window.location.reload();
                return false;
            }
            return true;
        });

        return () => {
            unblock();
        };
    }, []);
    return (
        <ErrorBoundary>
        <Container>
            {/*<CardNav activeIndex={5} />*/}
            <AppBody>
                <div id="iframeContainer">
                <Unity unityProvider={unityContext.unityProvider} style={{width: "100%"}} ref={iframeRef}/>
                </div>
            </AppBody>
        </Container>
        </ErrorBoundary>
    )
};

export default Altergene;