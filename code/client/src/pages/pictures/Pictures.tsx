import React, { Component, Suspense } from 'react';
import { Container, Accordion, Divider, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { readPictures } from '../../actions/PictureActions';
import AddPicture from './AddPicture';
import PictureList from './PictureList';

interface IPicturesProps {
    pictures: { id: string, name: string, description: string, tags: string[], collections: string[] }[],
    loading: boolean,
    error: object,
    timestamp: number,
    readPictures: (force: boolean) => void
}

interface IPicturesState {
}

interface IAppPicturesState {
    items: { id: string, name: string, description: string, tags: string[], collections: string[] }[],
    loading: boolean,
    error: object,
    timestamp: number
}

interface IAppState {
    pictures: IAppPicturesState
}

class Pictures extends Component<IPicturesProps, IPicturesState> {
    
    constructor(props: IPicturesProps) {
        super(props);

        this.refreshPictures = this.refreshPictures.bind(this);
    }

    componentDidMount() {
        this.props.readPictures(false);
    }

    refreshPictures() {
        this.props.readPictures(true);
    }

    render() {
        const panels = [{
            key: `AddPicturePanel`,
            title: { content: <Label color='blue' size="large" content="Need to upload pictures?" /> },
            content: { content: <AddPicture /> }
        }];

        return (
            <Container>
                <Accordion defaultActiveIndex={-1} panels={panels} />
                <Divider hidden />
                <PictureList 
                    pictures={this.props.pictures} 
                    loading={this.props.loading} 
                    error={this.props.error} 
                    timestamp={this.props.timestamp} 
                    onRefreshPictures={this.refreshPictures} />
            </Container>
        );
    } 
}

const mapStateToProps = (state: IAppState) => ({
    pictures: state.pictures.items,
    loading: state.pictures.loading,
    error: state.pictures.error,
    timestamp: state.pictures.timestamp
});

export default connect(mapStateToProps, { readPictures })(Pictures);