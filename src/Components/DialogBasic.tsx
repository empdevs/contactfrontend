import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';

const dialogStyles = { main: { maxWidth: 450, minHeight: 0 } };

interface IDialogBasic {
    isOpen: boolean,
    onDismiss: (ev?: React.MouseEvent<HTMLButtonElement>) => any,
    title: string,
    subText: string,
    saveText: string,
    cancelText: string,
    onSaveButton: () => void,
    onCancelButton: () => void

}

const DialogBasic: React.FunctionComponent<IDialogBasic> = (props: IDialogBasic) => {
    const isOpen = props.isOpen;
    const onDismiss = props.onDismiss;
    const onCancel = props.onCancelButton;
    const onSave = props.onSaveButton;
    const cancelText = props.cancelText;
    const saveText = props.saveText;
    const title = props.title;
    const subText = props.subText
    const dialogContentProps = {
        type: DialogType.normal,
        title: title,
        closeButtonAriaLabel: 'Close',
        subText: subText,
    };
    return (
        <Dialog
            hidden={!!!isOpen}
            onDismiss={onDismiss}
            dialogContentProps={dialogContentProps}
            styles={dialogStyles}
            isBlocking={true}
        >
            <DialogFooter>
                <DefaultButton onClick={onCancel} text={cancelText} />
                <PrimaryButton onClick={onSave} text={saveText} />
            </DialogFooter>
        </Dialog>
    );
};

export default DialogBasic;
