import React, { Component } from 'react';
import { Modal, Icon, Button, Divider, Embed } from 'semantic-ui-react';
import mongodb_logo from '../../logos/mongodb/MongoDB_Logo_FullColorBlack_RGB.svg';

interface ITopicHelpProps {
}

interface ITopicHelpState {
}

class TopicHelp extends Component<ITopicHelpProps, ITopicHelpState> {
    
    constructor(props: ITopicHelpProps) {
        super(props);
    }

    render() {
        return (
            <Modal closeOnDimmerClick={false} closeIcon trigger={<Button icon><Icon name='help' /></Button>} >
                <Modal.Header>
                    <Icon name='help' />
                    Topics Help topic
                </Modal.Header>
                <Modal.Content>
                    &nbsp;&nbsp;&nbsp;&nbsp;On the Topics page you can view the list of synchronized topics which belong to different hierarchies.&nbsp;
                    Each topic may belong to multiple hierarchies and each hierarchy may contain multiple topics.&nbsp;
                    When a topic is being synchronized from the cloud the system will also create a corresponding topic in the graph which will subsequently be used on the Graph Search page while searching.&nbsp;
                    Topics may also be assigned as tags to other topics, entities, insights and documents.&nbsp;
                    From the technical point of view all topic definitions and their details are stored appropriately in non-relational database (NoSQL MongoDB) and graph database (Tinkerpop Gremlin).&nbsp;
                    Topics page displays solely topic definitions stored in non-relational database (NoSQL MongoDB) as its data source.
                    <Divider/>
                    <img src={mongodb_logo} alt="MongoDB_Logo_FullColorBlack_RGB" width="100" height="50" />
                    <br/>
                    <small>MongoDB logo is used according to the official guidelines posted <a href="https://www.mongodb.com/brand-resources">here</a></small>
                    <Divider/>
                    The following brief tutorial video demonstrates the functionality of the Topics page
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

export default TopicHelp;