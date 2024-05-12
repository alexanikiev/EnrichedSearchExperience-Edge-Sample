import React, { Component } from 'react';
import { Divider } from 'semantic-ui-react';

interface ISettingCollectionsProps {
}

interface ISettingCollectionsState {
}

class SettingCollections extends Component<ISettingCollectionsProps, ISettingCollectionsState> {
    
    constructor(props: ISettingCollectionsProps) {
        super(props);
    }

    render() {
        return (
            <div>SettingCollections</div>
        );
    } 
}

export default SettingCollections as React.ComponentType;