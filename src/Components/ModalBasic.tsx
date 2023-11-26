import React, { ReactElement } from "react";
import { FontWeights, getTheme, mergeStyleSets, Text } from "@fluentui/react";
import { Modal } from "antd";

interface IModal {
    isOpen: boolean,
    onDismiss: ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined,
    width?: number,
    title?: string,
    body?: () => JSX.Element,
    footer?: () => JSX.Element
}


const theme = getTheme();
const contentStyles = mergeStyleSets({
    container: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'stretch',
    },
    header: [
        {
            flex: '1 1 auto',
            color: theme.palette.neutralPrimary,
            display: 'flex',
            alignItems: 'center',
            fontWeight: FontWeights.semibold,
        },
    ],
    body: {
        flex: '4 4 auto',
        // padding: '0 24px 24px 24px',
        selectors: {
            p: { margin: '14px 0' },
            'p:first-child': { marginTop: 0 },
            'p:last-child': { marginBottom: 0 },
        },
    },
    footer: {
        marginTop: 20
    }
});


const ModalBasic: React.FC<IModal> = (props: IModal) => {
    return (
        <Modal
            visible={props.isOpen}
            onCancel={props.onDismiss}
            footer={null}
            width={props.width}
            destroyOnClose={true}
            transitionName=""
            maskClosable={false}
        >
            <div className={contentStyles.header}>
                <Text variant="xLarge">{props.title}</Text>
            </div>
            <div className={contentStyles.body}>
                {props?.body && props.body()}
            </div>
            <div className={contentStyles.footer}>
                {props?.footer && props.footer()}
            </div>
        </Modal>
    )
}

export default ModalBasic;