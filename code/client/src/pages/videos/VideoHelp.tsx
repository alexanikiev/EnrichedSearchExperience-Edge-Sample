import React, { Component } from 'react';
import { Modal, Icon, Button, Divider, Embed } from 'semantic-ui-react';
import mongodb_logo from '../../logos/mongodb/MongoDB_Logo_FullColorBlack_RGB.svg';
import apachetika_logo from '../../logos/apache/Apache_Tika_Logo.svg';
import stanfordcorenlp_logo from '../../logos/stanford/stanford_corenlp_logo.png';
import mscogservices_logo from '../../logos/microsoft/Cognitive Services.svg';

interface IVideoHelpProps {
}

interface IVideoHelpState {
}

class VideoHelp extends Component<IVideoHelpProps, IVideoHelpState> {
    
    constructor(props: IVideoHelpProps) {
        super(props);
    }

    render() {
        return (
            <Modal closeOnDimmerClick={false} closeIcon trigger={<Button icon><Icon name='help' /></Button>} >
                <Modal.Header>
                    <Icon name='help' />
                    Videos Help topic
                </Modal.Header>
                <Modal.Content>
                    &nbsp;&nbsp;&nbsp;&nbsp;On the Videos page you can ingest new videos into the repository and view the list of existing videos which belong to different collections.&nbsp;
                    Each video may belong to multiple collections and each collection may contain multiple videos.&nbsp;
                    When a video is being ingested into the repository the system will crack that video open and extract its sentences, linked entities, key words, triples (subject-predicate-object tuples) and more.&nbsp;
                    After a video has been successfully ingested into the repository you can view the contents of that video for review, visualize the contents of that videos as a dashboard for analysis, search through the contents of that video on Video Search, Graph Search and Text Search pages, and more.&nbsp;
                    From the technical point of view all video definitions and their details are stored appropriately in non-relational database (NoSQL MongoDB), relational database (SQL Express), graph database (Tinkerpop Gremlin) and search index (ElasticSearch).&nbsp;
                    Videos page displays solely video definitions stored in non-relational database (NoSQL MongoDB) as its data source.&nbsp;
                    Video cracking pipeline which supports video(s) ingest process consists of multiple steps and leverages Apache Tika for video content and metadata extraction, Stanford CoreNLP for video sentences split, linked entities and triples extraction, and Microsoft Cognitive Services (Text Analytics) for language detection and key words extraction. 
                    <Divider/>
                    <img src={apachetika_logo} alt="Apache_Tika_Logo" width="100" height="50" />
                    <img src={stanfordcorenlp_logo} alt="stanford_corenlp_logo" width="100" height="50" />
                    <img src={mscogservices_logo} alt="Cognitive Services" width="100" height="50" />
                    <img src={mongodb_logo} alt="MongoDB_Logo_FullColorBlack_RGB" width="100" height="50" />
                    <br/>
                    <small>MongoDB logo is used according to the official guidelines posted <a href="https://www.mongodb.com/brand-resources">here</a></small>
                    <Divider/>
                    The following brief tutorial video demonstrates the functionality of the Videos page
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

export default VideoHelp;