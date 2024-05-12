import React, { Component, Suspense } from 'react';
import { Container, Search, Label, Button, List, Pagination, PaginationProps, Divider, Grid } from 'semantic-ui-react';
import Video from './Video';
import ErrorBoundary from '../errors/ErrorBoundary';
const VideoHelp = React.lazy(() => import("./VideoHelp"));

interface IVideoListProps {
    videos: { id: string, name: string, description: string, tags: string[], collections: string[] }[],
    loading: boolean,
    error: object,
    timestamp: number,
    onRefreshVideos: () => void
}

interface IVideoListState {
    videos: { id: string, name: string, description: string, tags: string[], collections: string[] }[]
}

class VideoList extends Component<IVideoListProps, IVideoListState> {
    
    constructor(props: IVideoListProps) {
        super(props);

        this.state = {
            videos: this.props.videos
        }

        this.refreshVideos = this.refreshVideos.bind(this);

        this.searchChange = this.searchChange.bind(this);
        this.pageChange = this.pageChange.bind(this);
    }

    componentWillReceiveProps(props: IVideoListProps) {
        this.setState({
            videos: props.videos
        });
    }

    refreshVideos() {
        this.props.onRefreshVideos();
    }

    searchChange(event: any) {
    }

    pageChange(event: any, props: PaginationProps) {
    }

    render() {
        let pager = false ? '' : 
                    <Pagination totalPages={1} 
                                activePage={1} 
                                onPageChange={this.pageChange} 
                                pointing
                                secondary />;
                                
        return (
            <Container>
                <Grid columns={2}>
                    <Grid.Column textAlign='left'>
                        <Search onSearchChange={this.searchChange} showNoResults={false} placeholder="Search videos..." />
                    </Grid.Column>
                    <Grid.Column textAlign='right'>
                        <ErrorBoundary>
                            <Suspense fallback={<div>Loading ...</div>}>
                                <VideoHelp />
                            </Suspense>
                        </ErrorBoundary>
                    </Grid.Column>
                </Grid>
                <br/>
                <small>Number of videos:&nbsp;x/x</small>
                <Divider hidden />
                { this.props.error ? <Label>{this.props.error}</Label> : '' }
                { this.props.loading ? <Label>Loading ...</Label> : '' }
                &nbsp;
                <Button type="button" value="Refresh" onClick={this.refreshVideos} />
                <Divider hidden />
                {pager}
                <hr color="grey" />
                <List relaxed>
                    {(this.state.videos.length === 0) ?
                        <p>No videos here. (Upload an video or change a filter)</p> :
                        this.state.videos.map(video =>
                            <Video video={video} />
                        )
                    }
                </List>
                {pager}
                <Divider hidden />
                <small>{this.props.timestamp}</small>
            </Container>
        );
    }
}

export default VideoList;