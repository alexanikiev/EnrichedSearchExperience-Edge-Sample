import React, { Component, Suspense } from 'react';
import { Container, Search, Label, Button, List, Pagination, PaginationProps, Divider, Grid } from 'semantic-ui-react';
import Picture from './Picture';
import ErrorBoundary from '../errors/ErrorBoundary';
const PictureHelp = React.lazy(() => import("./PictureHelp"));

interface IPictureListProps {
    pictures: { id: string, name: string, description: string, tags: string[], collections: string[] }[],
    loading: boolean,
    error: object,
    timestamp: number,
    onRefreshPictures: () => void
}

interface IPictureListState {
    pictures: { id: string, name: string, description: string, tags: string[], collections: string[] }[]
}

class PictureList extends Component<IPictureListProps, IPictureListState> {
    
    constructor(props: IPictureListProps) {
        super(props);

        this.state = {
            pictures: this.props.pictures
        }

        this.refreshPictures = this.refreshPictures.bind(this);

        this.searchChange = this.searchChange.bind(this);
        this.pageChange = this.pageChange.bind(this);
    }

    componentWillReceiveProps(props: IPictureListProps) {
        this.setState({
            pictures: props.pictures
        });
    }

    refreshPictures() {
        this.props.onRefreshPictures();
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
                        <Search onSearchChange={this.searchChange} showNoResults={false} placeholder="Search pictures..." />
                    </Grid.Column>
                    <Grid.Column textAlign='right'>
                        <ErrorBoundary>
                            <Suspense fallback={<div>Loading ...</div>}>
                                <PictureHelp />
                            </Suspense>
                        </ErrorBoundary>
                    </Grid.Column>
                </Grid>
                <br/>
                <small>Number of pictures:&nbsp;x/x</small>
                <Divider hidden />
                { this.props.error ? <Label>{this.props.error}</Label> : '' }
                { this.props.loading ? <Label>Loading ...</Label> : '' }
                &nbsp;
                <Button type="button" value="Refresh" onClick={this.refreshPictures} />
                
                <Divider hidden />
                {pager}
                <hr color="grey" />
                <List relaxed>
                    {(this.state.pictures.length === 0) ?
                        <p>No pictures here. (Upload an picture or change a filter)</p> :
                        this.state.pictures.map(picture =>
                            <Picture picture={picture} />
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

export default PictureList;