import React, { Component } from 'react';
import { Modal, Icon, Button, Label, Input } from 'semantic-ui-react';

interface IPictureViewerProps {
    picture: { id: string, name: string, description: string, tags: string[], collections: string[] }
}

interface IPictureViewerState {
}

class PictureViewer extends Component<IPictureViewerProps, IPictureViewerState> {
    
    constructor(props: IPictureViewerProps) {
        super(props);

        this.readData = this.readData.bind(this);
    }

    readData() {
    }

    render() {
        return (
            <Modal closeOnDimmerClick={false} closeIcon trigger={<Button>View</Button>} onOpen={this.readData} >
                <Modal.Header>
                    <Icon name='book' />
                    {this.props.picture.name}
                </Modal.Header>
                <Modal.Content>
                </Modal.Content>
            </Modal>
        );
    } 
}

export default PictureViewer;