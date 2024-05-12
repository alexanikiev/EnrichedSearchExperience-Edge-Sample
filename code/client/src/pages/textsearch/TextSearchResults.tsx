import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { readTextSearchResults } from '../../actions/TextSearchActions';
import TextSearchResultList from './TextSearchResultList';

interface ITextSearchResultsProps {
    textsearchresults: { id: string, name: string, description: string, document: string, file: string, subject: string, predicate: string, object: string, line: number, tags: string[], collections: string[], score: number }[],
    collections: string[],
    tags: string[],
    loading: boolean,
    query: string,
    error: object,
    timestamp: number,
    readTextSearchResults: (search: string, collections: string[], tags: string[]) => void
}

interface ITextSearchResultsState {
}

interface IAppTextSearchResultsState {
    loading: boolean,
    query: string,
    collections: string[],
    tags: string[],
    items: { id: string, name: string, description: string, document: string, file: string, subject: string, predicate: string, object: string, line: number, tags: string[], collections: string[], score: number }[],
    error: object,
    timestamp: number
}

interface IAppState {
    textsearchresults: IAppTextSearchResultsState
}

class TextSearchResults extends Component<ITextSearchResultsProps, ITextSearchResultsState> {
    
    constructor(props: ITextSearchResultsProps) {
        super(props);

        this.queryTextSearchResults = this.queryTextSearchResults.bind(this);
    }

    componentDidMount() {
        this.props.readTextSearchResults('', [], []);
    }

    queryTextSearchResults(search: string, collections: string[], tags: string[]) {
        this.props.readTextSearchResults(search, collections, tags);
        return Promise.resolve(true);
    }

    render() {
        return (
            <Container>
                <TextSearchResultList 
                    textsearchresults={this.props.textsearchresults} 
                    collections={this.props.collections} 
                    tags={this.props.tags} 
                    loading={this.props.loading}
                    query={this.props.query} 
                    error={this.props.error} 
                    timestamp={this.props.timestamp} 
                    onQueryTextSearchResults={this.queryTextSearchResults} 
                    textsearchresultspagenum={25} />
            </Container>
        );
    }  
}

const mapStateToProps = (state: IAppState) => ({
    textsearchresults: state.textsearchresults.items,
    collections: state.textsearchresults.collections,
    tags: state.textsearchresults.tags,
    loading: state.textsearchresults.loading,
    query: state.textsearchresults.query,
    error: state.textsearchresults.error,
    timestamp: state.textsearchresults.timestamp
});

export default connect(mapStateToProps, { readTextSearchResults })(TextSearchResults);