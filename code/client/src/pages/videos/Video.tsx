import React, { Component, Suspense } from 'react';
import { Container, Label, List, Icon } from 'semantic-ui-react';
import ErrorBoundary from '../errors/ErrorBoundary';
const VideoViewer = React.lazy(() => import("./VideoViewer"));

interface IVideoProps {
    video: { id: string, name: string, description: string, tags: string[], collections: string[] }
}

interface IVideoState {
}

class Video extends Component<IVideoProps, IVideoState> {
    
    constructor(props: IVideoProps) {
        super(props);
    }

    render() {
        return (
            <List.Item>
                <List.Content>
                    <Icon name='book' />
                    <b>{this.props.video.name}</b>
                    <br/>
                    <i>{this.props.video.description}</i>
                    <br/><br/>
                    <ErrorBoundary>
                        <Suspense fallback={<div>Loading ...</div>}>
                            <VideoViewer video={this.props.video} />
                        </Suspense>
                    </ErrorBoundary>
                    <br/><br/>
                    Collections:<br/>
                    {this.props.video.collections.map(collection => <Label simple>{collection}</Label>)}
                    <br/>
                    Tags:<br/>
                    {this.props.video.tags.map(tag => <Label simple>{tag}</Label>)}
                    <hr color="grey" />
                </List.Content>
            </List.Item>
        );
    }
}

export default Video;