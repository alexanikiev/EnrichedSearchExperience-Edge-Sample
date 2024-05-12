import React, { Component, Suspense } from 'react';
import { Container, Accordion, Divider, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { readDocuments } from '../../actions/DocumentActions';
import AddDocument from './AddDocument';
import DocumentList from './DocumentList';

interface IDocumentsProps {
    documents: { id: string, name: string, description: string, tags: string[], collections: string[] }[],
    loading: boolean,
    error: object,
    timestamp: number,
    readDocuments: (force: boolean) => void
}

interface IDocumentsState {
}

interface IAppDocumentsState {
    items: { id: string, name: string, description: string, tags: string[], collections: string[] }[],
    loading: boolean,
    error: object,
    timestamp: number
}

interface IAppState {
    documents: IAppDocumentsState
}

class Documents extends Component<IDocumentsProps, IDocumentsState> {
    
    constructor(props: IDocumentsProps) {
        super(props);

        this.refreshDocuments = this.refreshDocuments.bind(this);
    }

    componentDidMount() {
        this.props.readDocuments(false);
    }

    refreshDocuments() {
        this.props.readDocuments(true);
    }

    render() {
        /*
        const panels = [{
            key: `AddDocumentPanel`,
            title: { content: <Label color='blue' size="large" content="Need to upload documents?" /> },
            content: { content: <AddDocument /> }
        }];
        */
        return (
            <Container>
                <DocumentList 
                    documents={this.props.documents} 
                    loading={this.props.loading} 
                    error={this.props.error} 
                    timestamp={this.props.timestamp} 
                    onRefreshDocuments={this.refreshDocuments} 
                    documentspagenum={5} />
            </Container>
        );
    } 
}

const mapStateToProps = (state: IAppState) => ({
    documents: state.documents.items,
    loading: state.documents.loading,
    error: state.documents.error,
    timestamp: state.documents.timestamp
});

export default connect(mapStateToProps, { readDocuments })(Documents);

/*
<Accordion defaultActiveIndex={-1} panels={panels} />
<Divider hidden />
*/