import React, { Component } from 'react';
import { Modal, Icon, Button, Divider, Embed } from 'semantic-ui-react';
import eleasticsearch_logo from '../../logos/elastic/logo-elastic-search-color-64.svg';
import kibana_logo from '../../logos/elastic/logo-kibana-64-color.svg';

interface IDocSearchResultHelpProps {
}

interface IDocSearchResultHelpState {
}

class DocSearchResultHelp extends Component<IDocSearchResultHelpProps, IDocSearchResultHelpState> {
    
    constructor(props: IDocSearchResultHelpProps) {
        super(props);
    }

    render() {
        return (
            <Modal closeOnDimmerClick={false} closeIcon trigger={<Button icon><Icon name='help' /></Button>} >
                <Modal.Header>
                    <Icon name='help' />
                    Document Search Help topic
                </Modal.Header>
                <Modal.Content>
                    &nbsp;&nbsp;&nbsp;&nbsp;On the Document Search page using a query phrase you can search (full text search) through the contents of the existing documents which belong to different collections.&nbsp;
                    When searching you can additionally specify desired tags to further filter the resulting documents, at least one of the specified tags should be present on a document to qualify (logical OR principle).&nbsp;
                    Each resulting document is scored with a relevance score according to the query phrase and resulting documents are displayed in the order of their score (highest to lowest).&nbsp;
                    After a document has been successfully found in the repository you can view the contents of that document for review, visualize the contents of that documents as a dashboard for analysis, and more.&nbsp;
                    From the technical point of view all document contents and their details are stored appropriately in the search index (ElasticSearch).&nbsp;
                    Document Search page displays qualified documents stored in the search index (ElasticSearch) as its data source.
                    <Divider/>
                    <img src={eleasticsearch_logo} alt="logo-elastic-search-color-64" width="100" height="50" />
                    <img src={kibana_logo} alt="logo-kibana-64-color" width="100" height="50" />
                    <br/>
                    <small>Elastic Search and Kibana logos are used according to the official guidelines posted <a href="https://www.elastic.co/brand">here</a></small>
                    <Divider/>
                    The following brief tutorial video demonstrates the functionality of the Document Search page
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

export default DocSearchResultHelp;