import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { readGraphSearchResults } from '../../actions/GraphSearchActions';
import GraphSearchResultList from './GraphSearchResultList';

interface IGraphSearchResultsProps {
    graphsearchresults: { id: string, name: string, description: string, subject: string, predicate: string, object: string, document: string }[],
    collections: string[],
    tags: string[],
    loading: boolean,
    query: string,
    error: object,
    timestamp: number,
    readGraphSearchResults: (search: string, subjectlen: number, predicatelen: number, objectlen: number, collections: string[], tags: string[]) => void
}

interface IGraphSearchResultsState {
    userid: string;
    subjectlen: number;
    predicatelen: number;
    objectlen: number;
}

interface IAppGraphSearchResultsState {
    loading: boolean,
    query: string,
    collections: string[],
    tags: string[],
    items: { id: string, name: string, description: string, subject: string, predicate: string, object: string, document: string }[],
    error: object,
    timestamp: number
}

interface IAppState {
    graphsearchresults: IAppGraphSearchResultsState
}

class GraphSearchResults extends Component<IGraphSearchResultsProps, IGraphSearchResultsState> {

    constructor(props: IGraphSearchResultsProps) {
        super(props);

        this.state = {
            userid: '',
            subjectlen: 255,
            predicatelen: 255,
            objectlen: 255
        };

        this.queryGraphSearchResults = this.queryGraphSearchResults.bind(this);
        this.appendGraphSearchResults = this.appendGraphSearchResults.bind(this);

        this.countGraphSearchResults = this.countGraphSearchResults.bind(this);
        this.findGraphSearchResult = this.findGraphSearchResult.bind(this);

        this.findGraphSearchSettings = this.findGraphSearchSettings.bind(this);
    }

    componentDidMount() {
        this.props.readGraphSearchResults('', 0, 0, 0, [], []);

        this.findGraphSearchSettings()
        .then(data => {
            var user = data !== undefined && data.length > 0 ? data[0] : undefined;
            if (user !== undefined && user.settings !== undefined && user.settings.graphsearch !== undefined) {
                this.state = {
                    userid: user._id,
                    subjectlen: user.settings.graphsearch.subjectlen,
                    predicatelen: user.settings.graphsearch.predicatelen,
                    objectlen: user.settings.graphsearch.objectlen
                };
            }
        })
        .catch((error: any) => console.log(error));
    }

    queryGraphSearchResults(search: string, collections: string[], tags: string[]) {
        this.props.readGraphSearchResults(search, this.state.subjectlen, this.state.predicatelen, this.state.objectlen, collections, tags);
        return Promise.resolve(true);
    }

    appendGraphSearchResults(search: string, collections: string[], tags: string[]) {
        return fetch(`http://${window.location.hostname}:30990/fuseki/searchpost`,
            {
                method: 'post',
                body: JSON.stringify({ search: search,
                                       subjectlen: this.state.subjectlen,
                                       predicatelen: this.state.predicatelen,
                                       objectlen: this.state.objectlen,
                                       collections: collections, 
                                       tags: tags }),
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            }
        )
        .then(response => response.json());
    }

    countGraphSearchResults(search: string, collections: string[], tags: string[]) {
        if (search !== "") {
            //return fetch(`http://${window.location.hostname}:30990/sql/documenttriplescount/${search}`)
            return fetch(`http://${window.location.hostname}:30990/fuseki/triplescountpost`, 
                {
                    method: 'post',
                    body: JSON.stringify({ search: search,
                                           subjectlen: this.state.subjectlen,
                                           predicatelen: this.state.predicatelen,
                                           objectlen: this.state.objectlen }),
                    headers: new Headers({
                        "Content-Type": "application/json"
                    })
                }
            )
            .then(response => response.json());
        }
        else {
            return Promise.resolve(undefined);
        }
    }

    findGraphSearchResult(subject: string, predicate: string, object: string) {
        return fetch(`http://${window.location.hostname}:30990/sql/documenttriple/${subject}/${predicate}/${object}`)
        .then(response => response.json());
    }

    findGraphSearchSettings() {
        return fetch(`http://${window.location.hostname}:30990/mongo/users`)
        .then(response => response.json());
    }

    render() {
        return (
            <Container>
                <GraphSearchResultList 
                    graphsearchresults={this.props.graphsearchresults} 
                    collections={this.props.collections} 
                    tags={this.props.tags} 
                    loading={this.props.loading}
                    query={this.props.query} 
                    error={this.props.error} 
                    timestamp={this.props.timestamp}
                    onQueryGraphSearchResults={this.queryGraphSearchResults}
                    onAppendGraphSearchResults={this.appendGraphSearchResults} 
                    onCountGraphSearchResults={this.countGraphSearchResults} 
                    onFindGraphSearchResult={this.findGraphSearchResult} />
            </Container>
        );
    }
}

const mapStateToProps = (state: IAppState) => ({
    graphsearchresults: state.graphsearchresults.items,
    collections: state.graphsearchresults.collections,
    tags: state.graphsearchresults.tags,
    loading: state.graphsearchresults.loading,
    query: state.graphsearchresults.query,
    error: state.graphsearchresults.error,
    timestamp: state.graphsearchresults.timestamp
});

export default connect(mapStateToProps, { readGraphSearchResults })(GraphSearchResults);

/*
    return Promise.resolve({ triples: [ { id: '101', subject: 'trump', predicate: 'addressed', object: 'who', document: '100' },
    { id: '102', subject: 'ebola', predicate: 'spread in', object: 'liberia', document: '102' },
    { id: '103', subject: 'who', predicate: 'is in', object: 'liberia', document: '101' }, 
    { id: '104', subject: 'people', predicate: 'is in', object: 'danger today', document: '102' }] });
*/

/*
    if (search === 'trump')
    return Promise.resolve({ triples: [ { id: '201', subject: 'biden', predicate: 'wins over', object: 'trump', document: '100' },
    { id: '202', subject: 'trump', predicate: 'decided to do', object: 'this and that', document: '101' },
    { id: '203', subject: 'people of united states', predicate: 'gave 46% of their votes for', object: 'trump', document: '100' }] });

    if (search === 'liberia')
    return Promise.resolve({ triples: [ { id: '204', subject: 'liberia', predicate: 'is in the middle of', object: 'an outbreak', document: '101' },
    { id: '205', subject: 'doctors', predicate: 'are seriously concerned in', object: 'liberia', document: '100' },
    { id: '206', subject: 'sierra leone', predicate: 'is close to', object: 'liberia', document: '200' }] });
*/

/*
    postData() {
        var triples: any[] = [];
        triples.push({ subject: "russia", predicate: "influences", object: "iraq" });
        triples.push({ subject: "russia", predicate: "disturbs", object: "ukraine" });
        triples.push({ subject: "ukraine", predicate: "had", object: "crimea" });
        triples.push({ subject: "united states", predicate: "deter", object: "russia" });
        triples.push({ subject: "united kingdom", predicate: "partners", object: "united states" });
        fetch(`http://${window.location.hostname}:30990/fuseki/demo`,
            {
                method: 'post',
                body: JSON.stringify({ triples }),
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            }
        )
        .then(() => console.log('Success'))
        .catch(error => console.log(error));
    }
*/