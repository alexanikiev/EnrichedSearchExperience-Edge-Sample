import React, { Component } from 'react';
import { Divider } from 'semantic-ui-react';

interface ISettingHierarchiesProps {
}

interface ISettingHierarchiesState {
}

class SettingHierarchies extends Component<ISettingHierarchiesProps, ISettingHierarchiesState> {
    
    constructor(props: ISettingHierarchiesProps) {
        super(props);
    }

    render() {
        return (
            <div>SettingHierarchies</div>
        );
    } 
}

export default SettingHierarchies as React.ComponentType;