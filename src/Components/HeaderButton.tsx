import React from "react";
import { ActionButton, IIconProps, Stack } from "@fluentui/react";

interface IHeaderButton {
    signOut: () => void
}

const signOutIcon: IIconProps = { iconName: "SignOut" }
const settingsIcon: IIconProps = { iconName: "Settings" }
const HeaderButton: React.FunctionComponent<IHeaderButton> = (props: IHeaderButton) => {
    return (
        <Stack>
            <Stack
                horizontalAlign="end"
                horizontal>
                <ActionButton
                    iconProps={settingsIcon}
                />
                <ActionButton
                    iconProps={signOutIcon}
                    onClick={props.signOut}
                />
            </Stack>
        </Stack>
    )
}

export default HeaderButton;