import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { readDocSearchResults } from '../../actions/DocSearchActions';
import DocSearchResultList from './DocSearchResultList';

interface IDocSearchResultsProps {
    docsearchresults: { id: string, name: string, description: string, tags: string[], collections: string[], highlights: string[], score: number }[],
    collections: string[],
    tags: string[],
    loading: boolean,
    query: string,
    error: object,
    timestamp: number,
    readDocSearchResults: (search: string, collections: string[], tags: string[]) => void
}

interface IDocSearchResultsState {
}

interface IAppDocSearchResultsState {
    loading: boolean,
    query: string,
    collections: string[],
    tags: string[],
    items: { id: string, name: string, description: string, tags: string[], collections: string[], highlights: string[], score: number }[],
    error: object,
    timestamp: number
}

interface IAppState {
    docsearchresults: IAppDocSearchResultsState
}

class DocSearchResults extends Component<IDocSearchResultsProps, IDocSearchResultsState> {
    
    constructor(props: IDocSearchResultsProps) {
        super(props);

        this.queryDocSearchResults = this.queryDocSearchResults.bind(this);
    }

    componentDidMount() {
        this.props.readDocSearchResults('', [], []);
    }

    queryDocSearchResults(search: string, collections: string[], tags: string[]) {
        this.props.readDocSearchResults(search, collections, tags);
        return Promise.resolve(true);
    }

    render() {
        return (
            <Container>
                <DocSearchResultList 
                    docsearchresults={this.props.docsearchresults} 
                    collections={this.props.collections} 
                    tags={this.props.tags} 
                    loading={this.props.loading}
                    query={this.props.query} 
                    error={this.props.error} 
                    timestamp={this.props.timestamp} 
                    onQueryDocSearchResults={this.queryDocSearchResults} 
                    docsearchresultspagenum={10} />
            </Container>
        );
    } 
}

const mapStateToProps = (state: IAppState) => ({
    docsearchresults: state.docsearchresults.items,
    collections: state.docsearchresults.collections,
    tags: state.docsearchresults.tags,
    loading: state.docsearchresults.loading,
    query: state.docsearchresults.query,
    error: state.docsearchresults.error,
    timestamp: state.docsearchresults.timestamp
});

export default connect(mapStateToProps, { readDocSearchResults })(DocSearchResults);