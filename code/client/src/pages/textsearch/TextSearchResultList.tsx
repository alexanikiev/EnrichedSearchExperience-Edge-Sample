import React, { Component, Suspense } from 'react';
import { Container, Table, Divider, Form, List, Button, Input, Image, Icon, Label, Pagination, PaginationProps, Grid } from 'semantic-ui-react';
import TextSearchResult from './TextSearchResult';
import ErrorBoundary from '../errors/ErrorBoundary';
const TextSearchResultHelp = React.lazy(() => import("./TextSearchResultHelp"));

interface ITextSearchResultListProps {
    textsearchresults: { id: string, name: string, description: string, document: string, file: string, subject: string, predicate: string, object: string, line: number, tags: string[], collections: string[], score: number }[],
    collections: string[], 
    tags: string[],
    loading: boolean,
    query: string,
    error: object,
    timestamp: number,
    onQueryTextSearchResults: (search: string, collections: string[], tags: string[]) => Promise<boolean>,
    textsearchresultspagenum: number
}

interface ITextSearchResultListState {
    textsearchresults: { id: string, name: string, description: string, document: string, file: string, subject: string, predicate: string, object: string, line: number, tags: string[], collections: string[], score: number }[],
    _textsearchresults: { id: string, name: string, description: string, document: string, file: string, subject: string, predicate: string, object: string, line: number, tags: string[], collections: string[], score: number }[],
    pagenum: number,
    pagesnum: number,
    textsearchresultsnum: number
}

class TextSearchResultList extends Component<ITextSearchResultListProps, ITextSearchResultListState> {
    search: string;

    searchDocument: string;
    searchSubject: string;
    searchPredicate: string;
    searchObject: string;

    constructor(props: ITextSearchResultListProps) {
        super(props);

        this.search = '';

        this.searchDocument = '';
        this.searchSubject = '';
        this.searchPredicate = '';
        this.searchObject = '';

        this.state = {
            textsearchresults: this.props.textsearchresults,
            _textsearchresults: [],
            pagenum: 1,
            pagesnum: 0,
            textsearchresultsnum: 0
        }

        this.queryTextSearchResults = this.queryTextSearchResults.bind(this);

        this.queryChange = this.queryChange.bind(this);
        this.searchChange = this.searchChange.bind(this);
        this.pageChange = this.pageChange.bind(this);
        this.formSubmit = this.formSubmit.bind(this);

        this.changeSearchDocument = this.changeSearchDocument.bind(this);
        this.changeSearchSubject = this.changeSearchSubject.bind(this);
        this.changeSearchPredicate = this.changeSearchPredicate.bind(this);
        this.changeSearchObject = this.changeSearchObject.bind(this);
    }

    componentWillReceiveProps(props: ITextSearchResultListProps) {
        let textsearchresults: any[] = [];
        textsearchresults = this.searchTextSearchResults(props.textsearchresults, this.searchDocument, this.searchSubject, this.searchPredicate, this.searchObject);
        let _textsearchresults = this.pageTextSearchResults(textsearchresults, this.state.pagenum);
        this.setState({
            textsearchresults: props.textsearchresults,
            _textsearchresults: _textsearchresults,
            pagesnum: Math.ceil(textsearchresults.length / this.props.textsearchresultspagenum),
            textsearchresultsnum: textsearchresults.length
        });
    }

    queryTextSearchResults() {
        return this.props.onQueryTextSearchResults(this.search, ["coll1", "coll3"], ["tag1", "tag3"]);
    }

    queryChange(event: any) {
        this.search = event.target.value;
    }

    searchChange(event: any) {
        let textsearchresults: any[] = [];
        textsearchresults = this.searchTextSearchResults(this.state.textsearchresults, this.searchDocument, this.searchSubject, this.searchPredicate, this.searchObject);
        let _textsearchresults = this.pageTextSearchResults(textsearchresults, 1);
        this.setState({
            _textsearchresults: _textsearchresults,
            pagenum: 1,
            pagesnum: Math.ceil(textsearchresults.length / this.props.textsearchresultspagenum),
            textsearchresultsnum: textsearchresults.length
        });
    }

    searchTextSearchResults(textsearchresults: { id: string, name: string, description: string, document: string, file: string, subject: string, predicate: string, object: string, line: number, tags: string[], collections: string[], score: number }[], 
        searchDocument: string, searchSubject: string, searchPredicate: string, searchObject: string) {
        return textsearchresults.filter(textsearchresult => 
            (textsearchresult.document.toLowerCase().includes(searchDocument.toLowerCase()) === true || searchDocument === '' ) &&
            (textsearchresult.subject.toLowerCase().includes(searchSubject.toLowerCase()) === true || searchSubject === '' ) && 
            (textsearchresult.predicate.toLowerCase().includes(searchPredicate.toLowerCase()) === true || searchPredicate === '') &&
            (textsearchresult.object.toLowerCase().includes(searchObject.toLowerCase()) === true || searchObject === '')
        );
    }

    pageChange(event: any, props: PaginationProps) {
        let textsearchresults = [];
        textsearchresults = this.searchTextSearchResults(this.state.textsearchresults, this.searchDocument, this.searchSubject, this.searchPredicate, this.searchObject); 
        let _textsearchresults = this.pageTextSearchResults(textsearchresults, props.activePage as number);
        this.setState({  
            _textsearchresults: _textsearchresults,
            pagenum: props.activePage as number 
        });
    }

    pageTextSearchResults(textsearchresults: { id: string, name: string, description: string, document: string, file: string, subject: string, predicate: string, object: string, line: number, tags: string[], collections: string[], score: number }[], 
        pagenum: number) {
        let start = (pagenum - 1) * this.props.textsearchresultspagenum;
        let end = start + this.props.textsearchresultspagenum;
        return textsearchresults.slice(start, end);
    }

    changeSearchDocument(event: any) {
        this.searchDocument = event.target.value;
    }

    changeSearchSubject(event: any) {
        this.searchSubject = event.target.value;
    }

    changeSearchPredicate(event: any) {
        this.searchPredicate = event.target.value;
    }

    changeSearchObject(event: any) {
        this.searchObject = event.target.value;
    }

    render() {
        let placeholdernum = this.props.textsearchresultspagenum - this.state._textsearchresults.length;
        placeholdernum = placeholdernum > 0 ? placeholdernum : 0;

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
                        <Form onSubmit={this.formSubmit}>
                            <Input type='text' placeholder='Search phrase...' action>
                                <input id="textsearch" onChange={this.queryChange} />
                            </Input>
                            &nbsp;
                            <Button icon>
                                <Icon name='search' />
                            </Button>
                        </Form>
                    </Grid.Column>
                    <Grid.Column textAlign='right'>
                        <ErrorBoundary>
                            <Suspense fallback={<div>Loading ...</div>}>
                                <TextSearchResultHelp />
                            </Suspense>
                        </ErrorBoundary>
                    </Grid.Column>
                </Grid>
                <br/>
                {false ? 
                <span>
                    <small>Collections:&nbsp;</small>
                    <Label><Icon name='folder' />coll1</Label>
                    <Label><Icon name='folder' />coll2</Label>
                    <br/>
                    <small>Tags:&nbsp;</small>
                    <Label><Icon name='tag' />tag1</Label>
                    <Label><Icon name='tag' />tag2</Label>
                    <br/>
                </span> : '' }
                <small>Number of results:&nbsp;{this.state.textsearchresultsnum}/{this.state.textsearchresults.length}</small>
                <Divider hidden />
                {pager}
                <hr color="grey" />
                <Table striped celled selectable fixed singleLine>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={3}>Document</Table.HeaderCell>
                        <Table.HeaderCell width={3}>Subject</Table.HeaderCell>
                        <Table.HeaderCell width={3}>Predicate</Table.HeaderCell>
                        <Table.HeaderCell width={5}>Object</Table.HeaderCell>
                        <Table.HeaderCell>&nbsp;</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>

                    <Table.Row>
                        <Table.Cell>
                            <Input id="textsearchdocument" placeholder='Search documents...' onChange={this.changeSearchDocument} />
                        </Table.Cell>
                        <Table.Cell>
                            <Input id="textsearchsubject" placeholder='Search subjects...' onChange={this.changeSearchSubject} />
                        </Table.Cell>
                        <Table.Cell>
                            <Input id="textsearchpredicate" placeholder='Search predicates...' onChange={this.changeSearchPredicate} />
                        </Table.Cell>
                        <Table.Cell>
                            <Input id="textsearchobject" placeholder='Search objects...' onChange={this.changeSearchObject} />
                        </Table.Cell>
                        <Table.Cell>
                            <Button type='button' onClick={this.searchChange}>Go</Button>
                        </Table.Cell>
                    </Table.Row>

                    {(this.state._textsearchresults.length === 0) ?
                        <p>No results here. (Change search phrase or filter)</p> :
                        this.state._textsearchresults.map(textsearchresult =>
                            <TextSearchResult 
                                textsearchresult={textsearchresult} />
                        )
                    }
                    {[...Array(placeholdernum)].map(x => 
                        <div>
                            <Divider hidden />
                                <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' disabled />
                            <Divider hidden />
                        </div>
                    )}
                    </Table.Body>
                </Table>
                {pager}
                <Divider hidden />
                <small>{this.props.timestamp}</small>
            </Container>
        );
    } 

    formSubmit(event: any) {
        event.preventDefault();

        var startTime = new Date();
        var endTime = undefined;
        var timeDiff = 0;

        this.queryTextSearchResults()
        .then((data: any) => {
            endTime = new Date();
            timeDiff = 2500;//endTime - startTime;
            timeDiff /= 1000;
        })
        .catch((error: any) => {
            console.log('error');
        })
        .finally(() => {
        });
    } 
}

export default TextSearchResultList;