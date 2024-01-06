import React, { useEffect, useRef } from 'react';

interface ITelegramButton {
    dataOnauth: (user: any) => void,
    botName: string,
    buttonSize: string,
    cornerRadius: any,
    requestAccess: any,
    usePic: any,
    dataAuthUrl: any,
    lang: any,
    widgetVersion: any,
    className: any,
    children: any,
}
declare global {
    interface Window {
        TelegramLoginWidget: any
        // dataOnauth?: (user: any) => void;
    }
}

const TelegramButton = (props: ITelegramButton) => {
    // const instanceRef: any = useRef(null);

    // useEffect(() => {
    //     window.TelegramLoginWidget = {
    //         dataOnauth: (user: any) => props.dataOnauth(user),
    //     };
    //     const script = document.createElement("script");
    //     script.src = `https://telegram.org/js/telegram-widget.js?${props.widgetVersion}`;
    //     script.setAttribute("data-telegram-login", props.botName);
    //     script.setAttribute("data-size", props.buttonSize);
    //     if (props.cornerRadius !== undefined) {
    //         script.setAttribute("data-radius", props.cornerRadius);
    //     }
    //     script.setAttribute("data-request-access", props.requestAccess);
    //     script.setAttribute("data-userpic", props.usePic);
    //     script.setAttribute("data-lang", props.lang);

    //     if (props.dataAuthUrl !== undefined) script.setAttribute("data-auth-url", props.dataAuthUrl);
    //     else script.setAttribute("data-onauth", "TelegramLoginWidget.dataOnauth(user)");

    //     script.async = true;
    //     instanceRef.current.appendChild(script);
        
    // }, [
    //     props.botName,
    //     props.buttonSize,
    //     props.cornerRadius,
    //     props.requestAccess,
    //     props.usePic,
    //     props.dataOnauth,
    //     props.dataAuthUrl,
    //     props.lang,
    //     props.widgetVersion,
    // ]);

    return (
        <>
            {/* <div
                className={props.className}
                ref={(component) => {
                    instanceRef.current = component;
                }}
            >
                {props.children}
            </div> */}
        </>
    );
};

export default TelegramButton;