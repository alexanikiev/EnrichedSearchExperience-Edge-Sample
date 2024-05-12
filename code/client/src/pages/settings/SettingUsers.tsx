import React, { Component } from 'react';
import { Divider } from 'semantic-ui-react';

interface ISettingUsersProps {
}

interface ISettingUsersState {
}

class SettingUsers extends Component<ISettingUsersProps, ISettingUsersState> {
    
    constructor(props: ISettingUsersProps) {
        super(props);
    }

    render() {
        return (
            <div>SettingUsers</div>
        );
    } 
}

export default SettingUsers as React.ComponentType;