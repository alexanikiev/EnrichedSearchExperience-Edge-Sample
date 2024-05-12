import React, { Component } from 'react';
import { Modal, Icon, Button, Divider, Embed } from 'semantic-ui-react';
import mongodb_logo from '../../logos/mongodb/MongoDB_Logo_FullColorBlack_RGB.svg';

interface IHierarchyHelpProps {
}

interface IHierarchyHelpState {
}

class HierarchyHelp extends Component<IHierarchyHelpProps, IHierarchyHelpState> {
    
    constructor(props: IHierarchyHelpProps) {
        super(props);
    }

    render() {
        return (
            <Modal closeOnDimmerClick={false} closeIcon trigger={<Button icon><Icon name='help' /></Button>} >
                <Modal.Header>
                    <Icon name='help' />
                    Hierarchies Help topic
                </Modal.Header>
                <Modal.Content>
                    &nbsp;&nbsp;&nbsp;&nbsp;On the Hierarchies page you can view the list of synchronized hierarchies which consist of different entities and topics.&nbsp;
                    Each hierarchy may contain multiple entities and topics and each entity or topic may participate in different hierarchies.&nbsp;
                    Hierarchies represent organized semantical ontologies describing your knowledge in different problems domains as a multi-level/layer tree structure.&nbsp;
                    From the technical point of view all hierarchy definitions and their details are stored appropriately in non-relational database (NoSQL MongoDB).&nbsp;
                    Hierarchies page displays solely hierarchy definitions stored in non-relational database (NoSQL MongoDB) as its data source.
                    <Divider/>
                    <img src={mongodb_logo} alt="MongoDB_Logo_FullColorBlack_RGB" width="100" height="50" />
                    <br/>
                    <small>MongoDB logo is used according to the official guidelines posted <a href="https://www.mongodb.com/brand-resources">here</a></small>
                    <Divider/>
                    The following brief tutorial video demonstrates the functionality of the Hierarchies page
                    <br/><br/>
                    <Embed
                        icon='right circle arrow'
                        placeholder='/images/image-16by9.png'
                        url='https://esestoragepilot.blob.core.windows.net/help/ESE_Video%20Series_1_Intro.mp4?sp=r&st=2019-11-12T07:26:07Z&se=2020-11-12T15:26:07Z&spr=https&sv=2019-02-02&sr=b&sig=e6VVqOXg4WwfdMBSL1tlTN3JTvZJ%2BqvPzQqvzDPINuc%3D'
                    />
                </Modal.Content>
            </Modal>
        );
    }
}

export default HierarchyHelp;

/*
https://www.elastic.co/brand
https://www.mongodb.com/brand-resources
https://www.apache.org/foundation/marks/pmcs
*/