import React, { Component } from 'react';
import { Modal, Icon, Button, Divider, Embed } from 'semantic-ui-react';
import mssql_logo from '../../logos/microsoft/SQL Databases.svg';

interface ITextSearchResultHelpProps {
}

interface ITextSearchResultHelpState {
}

class TextSearchResultHelp extends Component<ITextSearchResultHelpProps, ITextSearchResultHelpState> {
    
    constructor(props: ITextSearchResultHelpProps) {
        super(props);
    }

    render() {
        return (
            <Modal closeOnDimmerClick={false} closeIcon trigger={<Button icon><Icon name='help' /></Button>} >
                <Modal.Header>
                    <Icon name='help' />
                    Text Search Help topic
                </Modal.Header>
                <Modal.Content>
                    &nbsp;&nbsp;&nbsp;&nbsp;On the Text Search page using a query phrase you can search (full text search) through the list of extracted document triples from existing documents which belong to different collections.&nbsp;
                    Each triple is represented by subject-predicate-object tuple describing a statement or a possible fact made in a certain document.&nbsp;
                    Multiple triples may be derived from each document sentence after a document is split into sentences during the document ingest process.&nbsp; 
                    When searching you can additionally specify desired tags to further filter the resulting triples, at least one of the specified tags should be present on a document for its triples to qualify (logical OR principle).&nbsp;
                    Each resulting triple is scored with a relevance score according to the relevance score of its parent document based on the query phrase and resulting triples are displayed in the order of their document parent score (highest to lowest).&nbsp;
                    After a document triple has been successfully found in the repository you can view the details of that triple, the contents of its parent document with a highlighted target triple for contextual review and drill-down, visualize the contents of the parent document as a dashboard for analysis, and more.&nbsp;
                    From the technical point of view all document triples and their details are stored appropriately in the relational database (SQL Express).&nbsp;
                    Text Search page displays qualified document triples stored in the relational database (SQL Express) as its data source.
                    <Divider/>
                    <img src={mssql_logo} alt="SQL Databases" width="100" height="50" />
                    <br/>
                    <small>Microsoft logo is used according to the official guidelines posted <a href="https://www.elastic.co/brand">here</a></small>
                    <Divider/>
                    The following brief tutorial video demonstrates the functionality of the Text Search page
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

export default TextSearchResultHelp;