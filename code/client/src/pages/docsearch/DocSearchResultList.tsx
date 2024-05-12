import React, { Component, Suspense } from 'react';
import { Container, Divider, Form, List, Button, Input, Image, Icon, Label, Pagination, PaginationProps, Grid } from 'semantic-ui-react';
import DocSearchResult from './DocSearchResult';
import ErrorBoundary from '../errors/ErrorBoundary';
const DocSearchResultHelp = React.lazy(() => import("./DocSearchResultHelp"));

interface IDocSearchResultListProps {
    docsearchresults: { id: string, name: string, description: string, tags: string[], collections: string[], highlights: string[], score: number }[],
    collections: string[], 
    tags: string[],
    loading: boolean,
    query: string,
    error: object,
    timestamp: number,
    onQueryDocSearchResults: (search: string, collections: string[], tags: string[]) => Promise<boolean>,
    docsearchresultspagenum: number
}

interface IDocSearchResultListState {
    docsearchresults: { id: string, name: string, description: string, tags: string[], collections: string[], highlights: string[], score: number }[],
    _docsearchresults: { id: string, name: string, description: string, tags: string[], collections: string[], highlights: string[], score: number }[],
    pagenum: number,
    pagesnum: number,
    docsearchresultsnum: number
}

class DocSearchResultList extends Component<IDocSearchResultListProps, IDocSearchResultListState> {
    search: string;

    constructor(props: IDocSearchResultListProps) {
        super(props);

        this.search = '';

        this.state = {
            docsearchresults: this.props.docsearchresults,
            _docsearchresults: [],
            pagenum: 1,
            pagesnum: 0,
            docsearchresultsnum: 0
        }

        this.queryDocSearchResults = this.queryDocSearchResults.bind(this);

        this.queryChange = this.queryChange.bind(this);
        this.pageChange = this.pageChange.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    componentWillReceiveProps(props: IDocSearchResultListProps) {
        let docsearchresults: any[] = [];
        docsearchresults = props.docsearchresults;
        let _docsearchresults = this.pageDocSearchResults(docsearchresults, this.state.pagenum);
        this.setState({
            docsearchresults: props.docsearchresults,
            _docsearchresults: _docsearchresults,
            pagesnum: Math.ceil(docsearchresults.length / this.props.docsearchresultspagenum),
            docsearchresultsnum: docsearchresults.length
        });
    }

    queryDocSearchResults() {
        return this.props.onQueryDocSearchResults(this.search, ["coll1", "coll3"], ["tag1", "tag3"]);
    }

    queryChange(event: any) {
        this.search = event.target.value;
    }

    pageChange(event: any, props: PaginationProps) {
        let docsearchresults = [];
        docsearchresults = this.state.docsearchresults;
        let _docsearchresults = this.pageDocSearchResults(docsearchresults, props.activePage as number);
        this.setState({  
            _docsearchresults: _docsearchresults,
            pagenum: props.activePage as number 
        });
    }

    pageDocSearchResults(docsearchresults: { id: string, name: string, description: string, tags: string[], collections: string[], highlights: string[], score: number }[], 
        pagenum: number) {
        let start = (pagenum - 1) * this.props.docsearchresultspagenum;
        let end = start + this.props.docsearchresultspagenum;
        return docsearchresults.slice(start, end);
    }

    render() {
        let placeholdernum = this.props.docsearchresultspagenum - this.state._docsearchresults.length;
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
                                <input id="docsearch" onChange={this.queryChange} />
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
                                <DocSearchResultHelp />
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
                <small>Number of results:&nbsp;{this.state.docsearchresultsnum}/{this.state.docsearchresults.length}</small>
                <Divider hidden />
                {pager}
                <hr color="grey" />
                <List relaxed>
                    {(this.state._docsearchresults.length === 0) ?
                            <p>No results here. (Change search phrase or filter)</p>
                            :
                            this.state._docsearchresults.map(docsearchresult => 
                                <DocSearchResult 
                                    docsearchresult={docsearchresult} />
                            )
                    }
                    {[...Array(placeholdernum)].map(x => 
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

    formSubmit(event: any) {
        event.preventDefault();

        var startTime = new Date();
        var endTime = undefined;
        var timeDiff = 0;

        this.queryDocSearchResults()
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

export default DocSearchResultList;