import React, { Component, Suspense } from 'react';
import { Container, Search, Label, Button, List, Pagination, PaginationProps, Divider, Image, Grid } from 'semantic-ui-react';
import Document from './Document';
import ErrorBoundary from '../errors/ErrorBoundary';
const DocumentHelp = React.lazy(() => import("./DocumentHelp"));

interface IDocumentListProps {
    documents: { id: string, name: string, description: string, tags: string[], collections: string[] }[],
    loading: boolean,
    error: object,
    timestamp: number,
    onRefreshDocuments: () => void,
    documentspagenum: number
}

interface IDocumentListState {
    documents: { id: string, name: string, description: string, tags: string[], collections: string[] }[],
    _documents: { id: string, name: string, description: string, tags: string[], collections: string[] }[],
    search: string,
    pagenum: number,
    pagesnum: number,
    documentsnum: number
}

class DocumentList extends Component<IDocumentListProps, IDocumentListState> {
    
    constructor(props: IDocumentListProps) {
        super(props);

        this.state = {
            documents: this.props.documents,
            _documents: [],
            search: '',
            pagenum: 1,
            pagesnum: 0,
            documentsnum: 0
        }

        this.refreshDocuments = this.refreshDocuments.bind(this);

        this.searchChange = this.searchChange.bind(this);
        this.pageChange = this.pageChange.bind(this);
    }

    componentWillReceiveProps(props: IDocumentListProps) {
        let documents: any[] = [];
        documents = this.searchDocuments(props.documents, '');
        let _documents = this.pageDocuments(documents, this.state.pagenum);
        this.setState({
            documents: props.documents,
            _documents: _documents,
            pagesnum: Math.ceil(documents.length / this.props.documentspagenum),
            documentsnum: documents.length
        });
    }

    refreshDocuments() {
        this.props.onRefreshDocuments();
    }

    searchChange(event: any) {
        let documents = [];
        documents = this.searchDocuments(this.state.documents, event.target.value); 
        let _documents = this.pageDocuments(documents, 1);
        this.setState({ 
            search: event.target.value,
            _documents : _documents,
            pagenum: 1,
            pagesnum: Math.ceil(documents.length / this.props.documentspagenum),
            documentsnum: documents.length
        });
    }

    pageChange(event: any, props: PaginationProps) {
        let documents = [];
        documents = this.searchDocuments(this.state.documents, this.state.search); 
        let _documents = this.pageDocuments(documents, props.activePage as number);
        this.setState({  
            _documents: _documents,
            pagenum: props.activePage as number 
        });
    }

    render() {
        let placeholdersnum = this.props.documentspagenum - this.state._documents.length;
        placeholdersnum = placeholdersnum > 0 ? placeholdersnum : 0;

        let pager = (this.state.pagesnum <= 1) ? '' : 
            <Pagination totalPages={this.state.pagesnum} 
                        activePage={this.state.pagenum} 
                        onPageChange={this.pageChange} 
                        pointing
                        secondary />;
                                
        return (
            <Container>
                <Grid columns={2}>
                    <Grid.Column textAlign='left'>
                        <Search value={this.state.search} onSearchChange={this.searchChange} showNoResults={false} placeholder="Search documents..." />
                    </Grid.Column>
                    <Grid.Column textAlign='right'>
                        <ErrorBoundary>
                            <Suspense fallback={<div>Loading ...</div>}>
                                <DocumentHelp />
                            </Suspense>
                        </ErrorBoundary>
                    </Grid.Column>
                </Grid>
                <br/>
                <small>Number of documents:&nbsp;{this.state.documentsnum}/{this.state.documents.length}</small>
                <Divider hidden />
                { this.props.error ? <Label>{this.props.error}</Label> : '' }
                { this.props.loading ? <Label>Loading ...</Label> : '' }
                {pager}
                <hr color="grey" />
                <List relaxed>
                    {(this.state._documents.length === 0) ?
                        <p>No documents here. (Upload an document or change a filter)</p> :
                        this.state._documents.map(document =>
                            <Document document={document} />
                        )
                    }
                    {[...Array(placeholdersnum)].map(x => 
                    <div>
                        <Divider hidden />
                            <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' disabled />
                        <Divider hidden />
                    </div>
                    )}
                </List>
                {pager}
                <Divider hidden />
                <small>{this.props.timestamp}</small>
            </Container>
        );
    }

    searchDocuments(documents: any[], search: string) {
        if (search !== '') {
            return documents.filter(document => {
                    return document.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
                }
            );  
        } 
        return documents;
    }

    pageDocuments(documents: any[], pagenum: number) {
        let start = (pagenum - 1) * this.props.documentspagenum;
        let end = start + this.props.documentspagenum;
        return documents.slice(start, end);
    }
}

export default DocumentList;

/*
&nbsp;
<Button type="button" value="Refresh" onClick={this.refreshDocuments} />
<Divider hidden />
*/