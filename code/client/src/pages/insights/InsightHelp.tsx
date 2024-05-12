import React, { Component } from 'react';
import { Modal, Icon, Button, Divider, Embed } from 'semantic-ui-react';
import mongodb_logo from '../../logos/mongodb/MongoDB_Logo_FullColorBlack_RGB.svg';

interface IInsightHelpProps {
}

interface IInsightHelpState {
}

class InsightHelp extends Component<IInsightHelpProps, IInsightHelpState> {
    
    constructor(props: IInsightHelpProps) {
        super(props);
    }

    render() {
        return (
            <Modal closeOnDimmerClick={false} closeIcon trigger={<Button icon><Icon name='help' /></Button>} >
                <Modal.Header>
                    <Icon name='help' />
                    Insights Help topic
                </Modal.Header>
                <Modal.Content>
                    &nbsp;&nbsp;&nbsp;&nbsp;On the Insights page you can create new insights in the system and view the list of existing insights which belong to different hieraerchies.&nbsp;
                    Each insight may belong to multiple hierarchies and each hierarchy may contain multiple insights.&nbsp;
                    Insights are created by the result of your search and research, and formulate your findings and hypothesis' in a concise manner while pointing to the source(s) for verification and validation.&nbsp;
                    From the technical point of view all insight definitions and their details are stored appropriately in non-relational database (NoSQL MongoDB) and graph database (Tinkerpop Gremlin).&nbsp;
                    Insights page displays solely insight definitions stored in non-relational database (NoSQL MongoDB) as its data source.
                    <Divider/>
                    <img src={mongodb_logo} alt="MongoDB_Logo_FullColorBlack_RGB" width="100" height="50" />
                    <br/>
                    <small>MongoDB logo is used according to the official guidelines posted <a href="https://www.mongodb.com/brand-resources">here</a></small>
                    <Divider/>
                    The following brief tutorial video demonstrates the functionality of the Insights page
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

export default InsightHelp;

/*
https://www.elastic.co/brand
https://www.mongodb.com/brand-resources
https://www.apache.org/foundation/marks/pmcs
*/