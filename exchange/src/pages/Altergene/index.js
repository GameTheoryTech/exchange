import React, {useEffect, useMemo, useRef} from 'react';

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
                window.document
                    .getElementById("iframeContainer")
                    .removeChild(iframeRef.current);
            }
        };
    }, []);
    return (
        <Container>
            {/*<CardNav activeIndex={5} />*/}
            <AppBody>
                <div id="iframeContainer" ref={iframeRef}>
                <Unity unityProvider={unityContext.unityProvider} style={{
                    height: '100vh',
                    width: '100vw',
                    display: 'block',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}/>
                </div>
            </AppBody>
        </Container>
    )
};

export default Altergene;