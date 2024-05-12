import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { readTopics } from '../../actions/TopicActions';
import TopicList from './TopicList';

interface ITopicsProps {
    topics: { id: string, name: string, description: string, tags: string[], hierarchies: string[] }[],
    loading: boolean,
    error: object,
    timestamp: number,
    readTopics: (force: boolean) => void
}

interface ITopicsState {
}

interface IAppTopicsState {
    items: { id: string, name: string, description: string, tags: string[], hierarchies: string[] }[],
    loading: boolean,
    error: object,
    timestamp: number
}

interface IAppState {
    topics: IAppTopicsState
}

class Topics extends Component<ITopicsProps, ITopicsState> {
    
    constructor(props: ITopicsProps) {
        super(props);

        this.refreshTopics = this.refreshTopics.bind(this);
    }

    componentDidMount() {
        this.props.readTopics(false);
    }

    refreshTopics() {
        this.props.readTopics(true);
    }

    render() {
        return (
            <Container>
                <TopicList 
                    topics={this.props.topics} 
                    loading={this.props.loading} 
                    error={this.props.error} 
                    timestamp={this.props.timestamp} 
                    onRefreshTopics={this.refreshTopics} 
                    topicspagenum={5} /> 
            </Container>
        );
    } 
}
  
const mapStateToProps = (state: IAppState) => ({
    topics: state.topics.items,
    loading: state.topics.loading,
    error: state.topics.error,
    timestamp: state.topics.timestamp
});
  
export default connect(mapStateToProps, { readTopics })(Topics);