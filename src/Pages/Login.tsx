import React, { useEffect, useState } from 'react';
import { Stack, TextField, PrimaryButton, IStackStyles, Text, MessageBar, MessageBarType, mergeStyleSets, ProgressIndicator } from '@fluentui/react';
import AxiosService from '../helper/AxiosService';
import Uri from '../Uri';
import { useHistory } from 'react-router-dom';

export interface IUser {
    id: string,
    username: string,
    accessToken?: string
}
interface ILogin {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    setAppLoadingMsg: React.Dispatch<React.SetStateAction<string>>,
    authentication: Function
}
const Login: React.FC<ILogin> = (props: ILogin) => {

    const axiosService = new AxiosService();
    const history = useHistory();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showError, setShowError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    // const [loading, setLoading] = useState<boolean>(true);
    // const [appLoadingMsg, setAppLoadingMsg] = useState<string>("");


    function displayError(message: string) {
        setShowError(true);
        setErrorMessage(message);
        setTimeout(() => {
            setShowError(false);
            setErrorMessage("");
        }, 5000);
    }

    const handleLogin = async () => {

        if (!!!username || !!!password) {
            displayError("Please insert username and password");
            return;
        }
        try {
            const { item: item, message: message } = await axiosService.post<IUser>(Uri.auth, { username: username, password: password });
            console.log(item)
            if (item) {
                localStorage.setItem("accessToken", item.accessToken!);
                setUsername("");
                setPassword("");
                history.push('Index/Landing');
            } else {
                displayError(message);
            }
        } catch (error) {
            displayError(String(error))
        }

    };

    const styles = mergeStyleSets({
        wrapper: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '85vh'
        },
        forms: {
            border: '1px solid #ddd',
            borderRadius: 5,
            padding: 20,
            width: 300,
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
            backgroundColor: '#fff',
        }
    });

    useEffect(() => {
        // console.log("Login");
        props.authentication();
    }, []);

    return (
        <div style={{
            padding: 20,
        }}>
            {showError &&
                <MessageBar
                    messageBarType={MessageBarType.error}
                >
                    {errorMessage}
                </MessageBar>
            }

            <div
                className={styles.wrapper}
                onKeyDown={(event) => {
                    if (event.code == "Enter") handleLogin();
                }}>
                <Stack
                    tokens={{ childrenGap: 10 }}
                    className={styles.forms}
                >
                    <Text variant={"xxLarge"} style={{ textAlign: "center" }}>Login</Text>
                    <TextField
                        label="Username"
                        value={username}
                        onChange={(event, newValue) => setUsername(newValue || "")}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(event, newValue) => setPassword(newValue || "")}
                        canRevealPassword
                    />
                    <PrimaryButton
                        text="Login"
                        onClick={handleLogin}
                        allowDisabledFocus
                    />
                </Stack>
            </div>
        </div>
    );
};

export default Login;
