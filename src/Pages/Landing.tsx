import { ActionButton, DefaultButton, DetailsList, DetailsListLayoutMode, IColumn, IIconProps, PrimaryButton, SelectionMode, Stack, TextField, mergeStyleSets, Text, MessageBar, MessageBarType, BaseButton, Button } from '@fluentui/react';
import React, { useEffect, useState } from 'react';
import AxiosService from '../helper/AxiosService';
import Uri from '../Uri';
import ModalBasic from '../Components/ModalBasic';
import Navbar from '../Components/Navbar';
import DialogBasic from '../Components/DialogBasic';
import HeaderButton from '../Components/HeaderButton';
import { useHistory } from 'react-router-dom';
import TelegramButton from '../Components/TelegramButton';

interface IContacts {
    id: string,
    name: string,
    phone: number
}

const addIcon: IIconProps = { iconName: "Add" };
const editIcon: IIconProps = { iconName: "Edit" };
const deleteIcon: IIconProps = { iconName: "Delete" };
const styles = mergeStyleSets({
    wrapper: {
        padding: 20
    },
    actionButton: {
        height: 20
    }
});
const columns: IColumn[] = [
    { key: 'column1', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'column2', name: 'Phone', fieldName: 'phone', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'column3', name: 'Action', fieldName: 'action', minWidth: 100, maxWidth: 200, isResizable: true },
];
const Landing: React.FC = () => {
    const axiosService = new AxiosService();
    const history = useHistory();
    const [contacts, setContacts] = useState<IContacts[]>([]);

    const [activeItem, setActiveItem] = useState<IContacts>();

    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<number | null>();
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [showError, setShowError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
    const [idContact, setIdContact] = useState<string>("");

    const [currentAction, setCurrentAction] = useState<"create" | "edit">("create");

    function displaySuccess(message: string) {
        setShowSuccess(true);
        setSuccessMessage(message);
        setTimeout(() => {
            setShowSuccess(false);
            setSuccessMessage("");
        }, 5000);
    }
    function displayError(message: string) {
        setShowError(true);
        setErrorMessage(message);
        setTimeout(() => {
            setShowError(false);
            setErrorMessage("");
        }, 5000);
    }

    async function loadData() {
        try {
            const { items: items, status: status, message: message, error: error } = await axiosService.getItems<IContacts>(Uri.getContact);
            console.log(items);
            setContacts(items);
        } catch (error) {
            console.log(error);
        }
    }

    async function save() {
        try {
            await axiosService.post<IContacts>(Uri.insertContact, { name: name!, phone: phone! });
            setIsOpenModal(false);
            displaySuccess("Success insert contact");
            loadData();
        } catch (error) {
            displayError("Error insert contact");
            console.log(error);
        }
    }
    async function deleteContact() {
        try {
            const { error: error, message: message, status: status } = await axiosService.delete(Uri.deleteContact + `/${idContact}`);
            if (error) {
                displayError(message);
                setIsOpenDialog(false);
                return;
            };
            setIsOpenDialog(false);
            displaySuccess("Success delete contact");
            loadData();
        } catch (error) {
            displayError("Error delete contact");
            console.log(error);
        }
    }
    async function editContact() {
        let updateData: any = {
            name: activeItem?.name !== name ? name : undefined,
            phone: activeItem?.phone !== phone ? phone : undefined
        }

        for (const key of Object.keys(updateData)) {
            if (updateData[key] == undefined) delete updateData[key];
        }

        try {

            const { error: error, message: message, status: status } = await axiosService.patchItem(Uri.patchContact + `/${idContact}`, updateData);
            if (error) {
                displayError(message);
                setIsOpenModal(false);
                return;
            };
            setIsOpenModal(false);
            displaySuccess("Success update contact");
            loadData();
        } catch (error) {
            displayError("Error update contact");
            console.log(error);
        }

    }
    function onRenderBody(): JSX.Element {
        return (
            <Stack>
                <div>
                    <TextField
                        label="Name"
                        value={name}
                        onChange={(event, newValue) => setName(newValue || "")}
                    />
                </div>
                <div>
                    <TextField
                        type="number"
                        label="Phone"
                        value={String(phone)}
                        onChange={(event, newValue) => setPhone(Number(newValue) || null)}
                    />
                </div>
            </Stack>
        )
    }
    function Footer(props: {
        cancelText: string,
        saveText: string,
        onClickSave: () => void,
        onClickCancel: () => void,
        disabledSave?: boolean
    }): JSX.Element {
        return (
            <Stack
                horizontal
                horizontalAlign="end"
                tokens={{ childrenGap: 10 }}
            >
                <DefaultButton
                    text={props.cancelText}
                    onClick={props.onClickCancel}
                />
                <PrimaryButton
                    text={props.saveText}
                    onClick={props.onClickSave}
                    disabled={props.disabledSave}
                />
            </Stack>
        )
    }

    function onRenderItemColumn(item: IContacts, index?: number | undefined, column?: IColumn | undefined) {
        switch (column?.key) {
            case "column3":
                return (
                    <Stack horizontal verticalAlign="center">
                        <ActionButton
                            iconProps={editIcon}
                            className={styles.actionButton}
                            onClick={() => {
                                setIsOpenModal(true);
                                setActiveItem(item);
                                setIdContact(item.id);
                                setName(item.name);
                                setPhone(item?.phone);
                                setCurrentAction("edit");
                            }}
                        />
                        <ActionButton
                            iconProps={deleteIcon}
                            className={styles.actionButton}
                            onClick={() => {
                                setIdContact(item?.id!)
                                setIsOpenDialog(true);
                            }}
                        />
                    </Stack>
                );
                break;
            default:
                return item && item[column?.fieldName! as keyof IContacts]
                break;
        }

    }

    function signOut() {
        localStorage.clear();
        history.push("/Login");
    }
    function handleTelegramResponse(user: any) {

    }
    useEffect(() => {
        console.log(history);
        loadData();
    }, []);
    return (
        <>
            <Navbar />
            <div className={styles.wrapper}>
                <TelegramButton
                    dataOnauth={handleTelegramResponse}
                    botName={'ContactOfficialBot'}
                    buttonSize={'medium'}
                    cornerRadius={14}
                    requestAccess={'write'}
                    usePic={undefined}
                    dataAuthUrl={undefined}
                    lang={"en"}
                    widgetVersion={22}
                    className={undefined}
                >
                    Login Telegram
                </TelegramButton>
            </div>
            <div>
                <HeaderButton
                    signOut={signOut}
                />
                {showSuccess &&
                    <div style={{ marginBottom: 10 }}>
                        <MessageBar
                            messageBarType={MessageBarType.success}
                        >
                            {successMessage}
                        </MessageBar>
                    </div>
                }
                {showError &&
                    <div style={{ marginBottom: 10 }}>
                        <MessageBar
                            messageBarType={MessageBarType.error}
                        >
                            {errorMessage}
                        </MessageBar>
                    </div>
                }
                <div>
                    <PrimaryButton
                        text="New"
                        iconProps={addIcon}
                        onClick={() => {
                            setIsOpenModal(true);
                            setName("");
                            setPhone(null);
                            setCurrentAction("create");
                        }}
                    />
                </div>
                <DetailsList
                    items={contacts}
                    columns={columns}
                    setKey="set"
                    layoutMode={DetailsListLayoutMode.justified}
                    selectionMode={SelectionMode.none}
                    onRenderItemColumn={onRenderItemColumn}
                />
                <ModalBasic
                    isOpen={isOpenModal}
                    onDismiss={() => setIsOpenModal(false)}
                    title={`${currentAction === "create" ? "New" : "Edit"} Contact`}
                    body={onRenderBody}
                    footer={() => {
                        return (
                            <Footer
                                cancelText={"Cancel"}
                                saveText={currentAction === "create" ? "Add" : "Save"}
                                onClickSave={currentAction === "create" ? save : editContact}
                                onClickCancel={() => setIsOpenModal(false)}
                                disabledSave={!!!name}
                            />)
                    }}
                    width={400}
                />
                <DialogBasic
                    isOpen={isOpenDialog}
                    onDismiss={() => setIsOpenDialog(false)}
                    title={"Confirmation"}
                    saveText={'Delete'}
                    cancelText={'Cancel'}
                    subText={'Are you sure delete this contact?'}
                    onSaveButton={deleteContact}
                    onCancelButton={() => setIsOpenDialog(false)} />
            </div>
        </>
    );
};

export default Landing;
