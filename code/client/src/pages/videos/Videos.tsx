import React, { Component, Suspense } from 'react';
import { Container, Accordion, Divider, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { readVideos } from '../../actions/VideoActions';
import AddVideo from './AddVideo';
import VideoList from './VideoList';

interface IVideosProps {
    videos: { id: string, name: string, description: string, tags: string[], collections: string[] }[],
    loading: boolean,
    error: object,
    timestamp: number,
    readVideos: (force: boolean) => void
}

interface IVideosState {
}

interface IAppVideosState {
    items: { id: string, name: string, description: string, tags: string[], collections: string[] }[],
    loading: boolean,
    error: object,
    timestamp: number
}

interface IAppState {
    videos: IAppVideosState
}

class Videos extends Component<IVideosProps, IVideosState> {
    
    constructor(props: IVideosProps) {
        super(props);

        this.refreshVideos = this.refreshVideos.bind(this);
    }

    componentDidMount() {
        this.props.readVideos(false);
    }

    refreshVideos() {
        this.props.readVideos(true);
    }

    render() {
        const panels = [{
            key: `AddVideoPanel`,
            title: { content: <Label color='blue' size="large" content="Need to upload videos?" /> },
            content: { content: <AddVideo /> }
        }];

        return (
            <Container>
                <Accordion defaultActiveIndex={-1} panels={panels} />
                <Divider hidden />
                <VideoList 
                    videos={this.props.videos} 
                    loading={this.props.loading} 
                    error={this.props.error} 
                    timestamp={this.props.timestamp} 
                    onRefreshVideos={this.refreshVideos} />
            </Container>
        );
    } 
}

const mapStateToProps = (state: IAppState) => ({
    videos: state.videos.items,
    loading: state.videos.loading,
    error: state.videos.error,
    timestamp: state.videos.timestamp
});

export default connect(mapStateToProps, { readVideos })(Videos);