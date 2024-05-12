import React, { Component } from 'react';
import { Modal, Icon, Button, Divider, Embed } from 'semantic-ui-react';
import mongodb_logo from '../../logos/mongodb/MongoDB_Logo_FullColorBlack_RGB.svg';
import apachetika_logo from '../../logos/apache/Apache_Tika_Logo.svg';
import stanfordcorenlp_logo from '../../logos/stanford/stanford_corenlp_logo.png';
import mscogservices_logo from '../../logos/microsoft/Cognitive Services.svg';

interface IDocumentHelpProps {
}

interface IDocumentHelpState {
}

class DocumentHelp extends Component<IDocumentHelpProps, IDocumentHelpState> {
    
    constructor(props: IDocumentHelpProps) {
        super(props);
    }

    render() {
        return (
            <Modal closeOnDimmerClick={false} closeIcon trigger={<Button icon><Icon name='help' /></Button>} >
                <Modal.Header>
                    <Icon name='help' />
                    Documents Help topic
                </Modal.Header>
                <Modal.Content>
                    &nbsp;&nbsp;&nbsp;&nbsp;On the Documents page you can ingest new documents into the repository and view the list of existing documents which belong to different collections.&nbsp;
                    Each document may belong to multiple collections and each collection may contain multiple documents.&nbsp;
                    When a document is being ingested into the repository the system will crack that document open and extract its sentences, linked entities, key words, triples (subject-predicate-object tuples) and more.&nbsp;
                    After a document has been successfully ingested into the repository you can view the contents of that document for review, visualize the contents of that documents as a dashboard for analysis, search through the contents of that document on Document Search, Graph Search and Text Search pages, and more.&nbsp;
                    From the technical point of view all document definitions and their details are stored appropriately in non-relational database (NoSQL MongoDB), relational database (SQL Express), graph database (Tinkerpop Gremlin) and search index (ElasticSearch).&nbsp;
                    Documents page displays solely document definitions stored in non-relational database (NoSQL MongoDB) as its data source.&nbsp;
                    Document cracking pipeline which supports document(s) ingest process consists of multiple steps and leverages Apache Tika for document content and metadata extraction, Stanford CoreNLP for document sentences split, linked entities and triples extraction, and Microsoft Cognitive Services (Text Analytics) for language detection and key words extraction. 
                    <Divider/>
                    <img src={apachetika_logo} alt="Apache_Tika_Logo" width="75" height="40" />
                    <img src={stanfordcorenlp_logo} alt="stanford_corenlp_logo" width="75" height="75" />
                    <img src={mscogservices_logo} alt="Cognitive Services" width="75" height="40" />
                    <img src={mongodb_logo} alt="MongoDB_Logo_FullColorBlack_RGB" width="100" height="50" />
                    <br/>
                    <small>MongoDB logo is used according to the official guidelines posted <a href="https://www.mongodb.com/brand-resources">here</a></small>
                    <Divider/>
                    The following brief tutorial video demonstrates the functionality of the Documents page
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

export default DocumentHelp;