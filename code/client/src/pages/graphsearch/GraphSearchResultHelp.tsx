import React, { Component } from 'react';
import { Modal, Icon, Button, Divider, Embed } from 'semantic-ui-react';
import apachetinkerpop_logo from '../../logos/apache/apache-tinkerpop-logo.png';
import mssql_logo from '../../logos/microsoft/SQL Databases.svg';
import gremlin_logo from '../../logos/apache/gremlin-logo.png'
import apachejena_logo from '../../logos/apache/Apache_Jena_Logo.svg.png'
import sparql_logo from '../../logos/apache/sparql.svg'
import rdf_logo from '../../logos/apache/rdf.png'

interface IGraphSearchResultHelpProps {
}

interface IGraphSearchResultHelpState {
}

class GraphSearchResultHelp extends Component<IGraphSearchResultHelpProps, IGraphSearchResultHelpState> {
    
    constructor(props: IGraphSearchResultHelpProps) {
        super(props);
    }

    render() {
        return (
            <Modal closeOnDimmerClick={false} closeIcon trigger={<Button icon><Icon name='help' /></Button>} >
                <Modal.Header>
                    <Icon name='help' />
                    Graph Search Help topic
                </Modal.Header>
                <Modal.Content>
                    &nbsp;&nbsp;&nbsp;&nbsp;On the Graph Search page using a query phrase you can search through the graph of interconnected documents, triples, entities, topics and insights.&nbsp;
                    On the graph each document may be associated with multiple triples, and linked to the list of entities and topics based on the assigned tags.&nbsp;
                    Graph connections are gradually, continuously and automatically built out as you enter documents, entities and topics in the system and cross-assign them as tags.&nbsp; 
                    When searching you can additionally specify desired tags to further filter the resulting documents and their triples, at least one of the specified tags should be present on a document for it and its triples to qualify (logical OR principle).&nbsp;
                    Each resulting document brings in its associated entities and topics which will also be displayed on the graph.&nbsp;
                    After the graph is rendered on the canvas you can visually explore the connections between documents, triples, entities, topics and insights, view the contents of documents and their triples with highlighted target triples for contextual review and drill-down, visualize the contents of a document as a dashboard for analysis, and more.&nbsp;
                    From the technical point of view all documents, entities, topics and insights and their details are stored appropriately in the graph database (Tinkerpop Gremlin) and document triples are stored appropriately in the relational database (SQL Express).&nbsp;
                    Graph Search page displays qualified documents, entities, topics and insights stored in the relational database (SQL Express) as its data source and combines this data with triples, associated with qualified documents, stored in the relational database (SQL Express).
                    <Divider/>
                    <img src={apachetinkerpop_logo} alt="apache-tinkerpop-logo" width="150" height="50" />
                    <img src={gremlin_logo} alt="gremlin_logo" width="150" height="50" />
                    <img src={apachejena_logo} alt="Apache_Jena_Logo" width="80" height="50" />
                    <img src={sparql_logo} alt="sparql" width="100" height="50" />
                    <img src={rdf_logo} alt="rdf" width="50" height="50" />
                    <img src={mssql_logo} alt="SQL Databases" width="100" height="50" />
                    <br/>
                    <small>Apache logo is used according to the official guidelines posted <a href="https://www.elastic.co/brand">here</a></small>
                    <Divider/>
                    The following brief tutorial video demonstrates the functionality of the Graph Search page
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

export default GraphSearchResultHelp;