import React, { Component, Suspense } from 'react';
import { Container, Form, Input, Button, Icon, Segment, Pagination, Grid, Divider, Label, Popup, SemanticICONS } from 'semantic-ui-react';
import GraphSearchResult from './GraphSearchResult';
import DocumentViewer from '../documents/DocumentViewer';
import ErrorBoundary from '../errors/ErrorBoundary';
const GraphSearchResultHelp = React.lazy(() => import("./GraphSearchResultHelp"));

interface IGraphSearchResultListProps {
    graphsearchresults: { id: string, name: string, description: string, subject: string, predicate: string, object: string, document: string }[],
    collections: string[], 
    tags: string[],
    loading: boolean,
    query: string,
    error: object,
    timestamp: number,
    onQueryGraphSearchResults: (search: string, collections: string[], tags: string[]) => Promise<boolean>,
    onAppendGraphSearchResults: (search: string, collections: string[], tags: string[]) => Promise<{ triples: { id: string; subject: string; predicate: string; object: string; document: string; }[]}>,
    onCountGraphSearchResults: (search: string, collections: string[], tags: string[]) => Promise<{ count: number }>,
    onFindGraphSearchResult: (subject: string, predicate: string, object: string) => Promise<{ id: number, document: string, file: string, argument: string, line: number, subject: string, relation: string, searchid: string }>
}

interface IGraphSearchResultListState {
    triples: { id: string, subject: string, predicate: string, object: string, document: string }[],
    tripleid: number,
    documentid: string,
    documentname: string,
    line: number,
    plustriplesnum: number,
    minustriplesnum: number,
    longtriples: boolean
}

class GraphSearchResultList extends Component<IGraphSearchResultListProps, IGraphSearchResultListState> {
    search: string;

    constructor(props: IGraphSearchResultListProps) {
        super(props);

        this.search = '';

        this.state = {
            triples: [],
            tripleid: 1,
            documentid: '',
            documentname: '',
            line: 0,
            plustriplesnum: 0,
            minustriplesnum: 0,
            longtriples: true
        };

        this.queryGraphSearchResults = this.queryGraphSearchResults.bind(this);
        this.appendGraphSearchResults = this.appendGraphSearchResults.bind(this);
        this.selectGraphSearchResult = this.selectGraphSearchResult.bind(this);
        this.countGraphSearchResults = this.countGraphSearchResults.bind(this);

        this.queryChange = this.queryChange.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.pageChange = this.pageChange.bind(this);

        this.getIcon = this.getIcon.bind(this);

        this.controlLongTriplesInputChange = this.controlLongTriplesInputChange.bind(this);
    }

    queryGraphSearchResults() {
        return this.props.onQueryGraphSearchResults(this.search, ["coll1", "coll3"], ["tag1", "tag3"]);
    }

    appendGraphSearchResults(search: string) {
        return this.props.onAppendGraphSearchResults(search, ["coll1", "coll3"], ["tag1", "tag3"]);
    }

    selectGraphSearchResult(search: string, results: { id: string; subject: string; predicate: string; object: string; document: string; }[] ) {
        var triples: any[] = [];
        var documentid = '';
        var documentname = '';
        var line = 0;
        var triplesnum = 0;

        this.props.onCountGraphSearchResults(search, ["coll1", "coll3"], ["tag1", "tag3"])
        .then(data => {
            if (data !== undefined) {
                triplesnum = data.count;
            }
            if (search !== '' && results.length > 0)
                return this.props.onFindGraphSearchResult(results[0].subject, results[0].predicate, results[0].object);
            else 
                return Promise.resolve(undefined);
        })
        .then(data => {
            if (data !== undefined) {
                documentid = data.document;
                documentname = data.file;
                line = data.line;
            }

            search !== '' && results.length > 0 && results.forEach(result => {
                if (result.subject == search || result.predicate == search || result.object == search)
                    triples.push({ id: "", subject: result.subject, predicate: result.predicate, object: result.object, document: "" });
            });
            this.setState({
                triples,
                tripleid: 1,
                documentid: documentid,
                documentname: documentname,
                line: line,
                plustriplesnum: triplesnum - triples.length > 0 ? triplesnum - triples.length : 0,
                minustriplesnum: triples.length
            });
        });
    }

    countGraphSearchResults(search: string) {
        return this.props.onCountGraphSearchResults(search, ["coll1", "coll3"], ["tag1", "tag3"]);
    }

    queryChange(event: any) {
        this.search = event.target.value;
    }

    render() {
        return (
            <Container>
                <Grid columns={2}>
                    <Grid.Column textAlign='left'>
                        <Form onSubmit={this.formSubmit}>
                            <Input type='text' placeholder='Search phrase...' action>
                                <input id="graphsearch" onChange={this.queryChange} />
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
                                <GraphSearchResultHelp />
                            </Suspense>
                        </ErrorBoundary>
                    </Grid.Column>
                </Grid>
                <br/>
                { false ? 
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
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column textAlign='left'>
                            <small>Number of results:&nbsp;{this.props.graphsearchresults.length}</small>   
                        </Grid.Column>
                        <Grid.Column textAlign='right'>
                            {false ? <Button icon onClick={this.controlLongTriplesInputChange}>
                                <Icon name='ellipsis horizontal' color={ this.state.longtriples ? "blue" : "black"} />
                            </Button> : '' }
                            <Label circular>{this.props.graphsearchresults.length}</Label>
                            &nbsp;
                            <Input disabled
                                min={0}
                                max={this.props.graphsearchresults.length}
                                onChange={() => {}}
                                type='range'
                                value={this.props.graphsearchresults.length}
                            />
                            &nbsp;
                            <Label circular>{this.props.graphsearchresults.length}</Label>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <hr color="grey" />
                <GraphSearchResult 
                    graphsearchresults={this.props.graphsearchresults}
                    onAppendGraphSearchResults={this.appendGraphSearchResults} 
                    onSelectGraphSearchResult={this.selectGraphSearchResult} 
                    longtriples={this.state.longtriples} />
                {this.state.triples.length > 0 ?
                <Segment>
                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column textAlign='left'>
                                <Icon name='search plus' />
                                &nbsp;
                                <Label circular>{this.state.plustriplesnum}</Label>
                                &nbsp;
                                <Icon name='search minus' />
                                &nbsp;
                                <Label circular>{this.state.minustriplesnum}</Label>
                                &nbsp;
                                |
                                &nbsp;
                                <Popup
                                    trigger={<Icon name={this.getIcon() as SemanticICONS} />} 
                                    header={this.state.documentname}
                                    content={`ID: ${this.state.documentid}`}
                                />
                                &nbsp;
                                <Label circular>S</Label>
                                <Label>
                                    <Icon name='tag' />{this.state.triples[this.state.tripleid-1].subject}
                                </Label>
                                &nbsp;
                                <Label circular>P</Label>
                                <Label>
                                    <Icon name='tag' />{this.state.triples[this.state.tripleid-1].predicate}
                                </Label>
                                &nbsp;
                                <Label circular>O</Label>
                                <Label>
                                    <Icon name='tag' />{this.state.triples[this.state.tripleid-1].object}
                                </Label>
                            </Grid.Column>
                            <Grid.Column textAlign='right'>
                                <DocumentViewer 
                                    document={{ id: this.state.documentid, 
                                                name: this.state.documentname, 
                                                description: '', 
                                                tags: [], 
                                                collections: [] }} 
                                    line={this.state.line} />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={2}>
                            {this.state.triples.length > 0 ?
                            <Pagination
                                totalPages={this.state.triples.length}
                                activePage={this.state.tripleid} 
                                onPageChange={this.pageChange}
                                pointing
                                secondary 
                            /> : '' }
                        </Grid.Row>
                    </Grid>
                </Segment> : 
                <Segment>
                    <Grid columns={2} stackable textAlign='center'>
                    <Divider vertical>Then</Divider>
                    <Grid.Row verticalAlign='middle'>
                        <Grid.Column>
                            <Icon name='tag' color='blue' />
                            <b>Select Node</b>&nbsp;(Left click)<br/>
                            <Icon name='eye' />&nbsp;
                            <b>View Associated Triple(s)</b>&nbsp;(View button)
                        </Grid.Column>
                        <Grid.Column>
                            <Icon name='search plus' />&nbsp;
                            <b>Expand Selected Node</b>&nbsp;(Left click)<br/>
                            <Icon name='search minus' />&nbsp;
                            <b>Collapse Selected Node</b>&nbsp;(Right click)
                        </Grid.Column>
                    </Grid.Row>
                    </Grid>
                </Segment> }
            </Container>
        );
    }

    formSubmit(event: any) {
        event.preventDefault();

        var startTime = new Date();
        var endTime = undefined;
        var timeDiff = 0;

        this.queryGraphSearchResults()
        .then((data: any) => {
            endTime = new Date();
            timeDiff = 2500;//endTime - startTime;
            timeDiff /= 1000;

            this.setState({
                triples: [],
                tripleid: 1,
                documentid: '',
                documentname: '',
                line: 0,
                plustriplesnum: 0,
                minustriplesnum: 0
            });
        })
        .catch((error: any) => {
            console.log('error');
        })
        .finally(() => {
        });
    }

    pageChange(event: any, data: any) {
        var documentid = '';
        var documentname = '';
        var line  = 0;
        var idx = data.activePage - 1;

        this.props.onFindGraphSearchResult(this.state.triples[idx].subject, this.state.triples[idx].predicate, this.state.triples[idx].object)
        .then(result => {
            if (result !== undefined) {
                documentid = result.document;
                documentname = result.file;
                line = result.line;
            }
            this.setState({
                tripleid: data.activePage,
                documentid: documentid,
                documentname: documentname,
                line: line
            });
        });
    }

    getIcon() {
        var icon: SemanticICONS = 'book';
        var name = this.state.documentname.toLowerCase();
        if (name.endsWith('.jpg.txt') || 
            name.endsWith('.jpeg.txt') || 
            name.endsWith('.gif.txt') || 
            name.endsWith('.png.txt') || 
            name.endsWith('.bmp.txt'))
            icon = 'image';
        else if (name.endsWith('.wav.txt') || 
                 name.endsWith('.mp3.txt'))
            icon = 'volume up';
        return icon;
    }

    controlLongTriplesInputChange(event: any, { value }: any){
        this.setState({
            longtriples: !this.state.longtriples
        });
    }
}

export default GraphSearchResultList;