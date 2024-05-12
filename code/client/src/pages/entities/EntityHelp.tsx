import React, { Component } from 'react';
import { Modal, Icon, Button, Divider, Embed } from 'semantic-ui-react';
import mongodb_logo from '../../logos/mongodb/MongoDB_Logo_FullColorBlack_RGB.svg';

interface IEntityHelpProps {
}

interface IEntityHelpState {
}

class EntityHelp extends Component<IEntityHelpProps, IEntityHelpState> {
    
    constructor(props: IEntityHelpProps) {
        super(props);
    }

    render() {
        return (
            <Modal closeOnDimmerClick={false} closeIcon trigger={<Button icon><Icon name='help' /></Button>} >
                <Modal.Header>
                    <Icon name='help' />
                    Entities Help topic
                </Modal.Header>
                <Modal.Content>
                    &nbsp;&nbsp;&nbsp;&nbsp;On the Entities page you can view the list of synchronized entities which belong to different hierarchies.&nbsp;
                    Each entity may belong to multiple hierarchies and each hierarchy may contain multiple entities.&nbsp;
                    Entities may be of 3 types: person, organization and location.&nbsp;
                    When an entity is being synchronized from the cloud the system will also create a corresponding entity in the graph which will subsequently be used on the Graph Search page while searching.&nbsp;
                    Entities may also be assigned as tags to other entities, topics, insights and documents.&nbsp;
                    From the technical point of view all entity definitions and their details are stored appropriately in non-relational database (NoSQL MongoDB) and graph database (Tinkerpop Gremlin).&nbsp;
                    Entities page displays solely entity definitions stored in non-relational database (NoSQL MongoDB) as its data source.
                    <Divider/>
                    <img src={mongodb_logo} alt="MongoDB_Logo_FullColorBlack_RGB" width="100" height="50" />
                    <br/>
                    <small>MongoDB logo is used according to the official guidelines posted <a href="https://www.mongodb.com/brand-resources">here</a></small>
                    <Divider/>
                    The following brief tutorial video demonstrates the functionality of the Entities page
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

export default EntityHelp;