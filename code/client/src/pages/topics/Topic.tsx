import React, { Component, Suspense } from 'react';
import { Container, Label, List, Icon } from 'semantic-ui-react';
import ErrorBoundary from '../errors/ErrorBoundary';
const TopicViewer = React.lazy(() => import("./TopicViewer"));

interface ITopicProps {
    topic: { id: string, name: string, description: string, tags: string[], hierarchies: string[] }
}

interface ITopicState {
}

class Topic extends Component<ITopicProps, ITopicState> {
    
    constructor(props: ITopicProps) {
        super(props);
    }

    render() {
        return (
            <List.Item>
                <List.Content>
                    <Icon name='pencil' />
                    <b>{this.props.topic.name}</b>
                    <br/>
                    <i>{this.props.topic.description}</i>
                    <br/><br/>
                    <ErrorBoundary>
                        <Suspense fallback={<div>Loading ...</div>}>
                            <TopicViewer topic={this.props.topic} />
                        </Suspense>
                    </ErrorBoundary>
                    <br/><br/>
                    Hierarchies:<br/>
                    {this.props.topic.hierarchies.map(hierarchy => <Label simple>{hierarchy}</Label>)}
                    <br/>
                    Tags:<br/>
                    {this.props.topic.tags.map(tag => <Label simple>{tag}</Label>)}
                    <hr color="grey" />
                </List.Content>
            </List.Item>
        );
    }  
}

export default Topic;