import React, { Component, Suspense } from 'react';
import { Container, Search, Label, Button, List, Pagination, PaginationProps, Divider, Image, Grid } from 'semantic-ui-react';
import Topic from './Topic';
import ErrorBoundary from '../errors/ErrorBoundary';
const TopicHelp = React.lazy(() => import("./TopicHelp"));

interface ITopicListProps {
    topics: { id: string, name: string, description: string, tags: string[], hierarchies: string[] }[],
    loading: boolean,
    error: object,
    timestamp: number,
    onRefreshTopics: () => void,
    topicspagenum: number
}

interface ITopicListState {
    topics: { id: string, name: string, description: string, tags: string[], hierarchies: string[] }[],
    _topics: { id: string, name: string, description: string, tags: string[], hierarchies: string[] }[],
    search: string,
    pagenum: number,
    pagesnum: number,
    topicsnum: number
}

class TopicList extends Component<ITopicListProps, ITopicListState> {
    
    constructor(props: ITopicListProps) {
        super(props);

        this.state = {
            topics: this.props.topics,
            _topics: [],
            search: '',
            pagenum: 1,
            pagesnum: 0,
            topicsnum: 0
        }

        this.refreshTopics = this.refreshTopics.bind(this);

        this.searchChange = this.searchChange.bind(this);
        this.pageChange = this.pageChange.bind(this);
    }

    componentWillReceiveProps(props: ITopicListProps) {
        let topics: any[] = [];
        topics = this.searchTopics(props.topics, '');
        let _topics = this.pageTopics(topics, this.state.pagenum);
        this.setState({
            topics: props.topics,
            _topics: _topics,
            pagesnum: Math.ceil(topics.length / this.props.topicspagenum),
            topicsnum: topics.length
        });
    }

    refreshTopics() {
        this.props.onRefreshTopics();
    }

    searchChange(event: any) {
        let topics = [];
        topics = this.searchTopics(this.state.topics, event.target.value); 
        let _topics = this.pageTopics(topics, 1);
        this.setState({ 
            search: event.target.value,
            _topics : _topics,
            pagenum: 1,
            pagesnum: Math.ceil(topics.length / this.props.topicspagenum),
            topicsnum: topics.length
        });
    }

    pageChange(event: any, props: PaginationProps) {
        let topics = [];
        topics = this.searchTopics(this.state.topics, this.state.search); 
        let _topics = this.pageTopics(topics, props.activePage as number);
        this.setState({  
            _topics: _topics,
            pagenum: props.activePage as number 
        });
    }

    render() {
        let placeholdersnum = this.props.topicspagenum - this.state._topics.length;
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
                        <Search value={this.state.search} onSearchChange={this.searchChange} showNoResults={false} placeholder="Search topics..." />
                    </Grid.Column>
                    <Grid.Column textAlign='right'>
                        <ErrorBoundary>
                            <Suspense fallback={<div>Loading ...</div>}>
                                <TopicHelp />
                            </Suspense>
                        </ErrorBoundary>
                    </Grid.Column>
                </Grid>
                <br/>
                <small>Number of topics:&nbsp;{this.state.topicsnum}/{this.state.topics.length}</small>
                <Divider hidden />
                { this.props.error ? <Label>{this.props.error}</Label> : '' }
                { this.props.loading ? <Label>Loading ...</Label> : '' }
                {pager}
                <hr color="grey" />
                <List relaxed>
                    {(this.state._topics.length === 0) ?
                        <p>No topics here. (Sync a topic or change a filter)</p> :
                        this.state._topics.map(topic =>
                            <Topic topic={topic} />
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

    searchTopics(topics: any[], search: string) {
        if (search !== '') {
            return topics.filter(topic => {
                    return topic.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
                }
            );  
        } 
        return topics;
    }

    pageTopics(topics: any[], pagenum: number) {
        let start = (pagenum - 1) * this.props.topicspagenum;
        let end = start + this.props.topicspagenum;
        return topics.slice(start, end);
    }
}

export default TopicList;

/*
&nbsp;
<Button type="button" value="Refresh" onClick={this.refreshTopics} />
<Divider hidden />
*/