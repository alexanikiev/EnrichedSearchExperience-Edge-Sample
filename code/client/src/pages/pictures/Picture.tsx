import React, { Component, Suspense } from 'react';
import { Container, Label, List, Icon } from 'semantic-ui-react';
import ErrorBoundary from '../errors/ErrorBoundary';
const PictureViewer = React.lazy(() => import("./PictureViewer"));

interface IPictureProps {
    picture: { id: string, name: string, description: string, tags: string[], collections: string[] }
}

interface IPictureState {
}

class Picture extends Component<IPictureProps, IPictureState> {
    
    constructor(props: IPictureProps) {
        super(props);
    }

    render() {
        return (
            <List.Item>
                <List.Content>
                    <Icon name='book' />
                    <b>{this.props.picture.name}</b>
                    <br/>
                    <i>{this.props.picture.description}</i>
                    <br/><br/>
                    <ErrorBoundary>
                        <Suspense fallback={<div>Loading ...</div>}>
                            <PictureViewer picture={this.props.picture} />
                        </Suspense>
                    </ErrorBoundary>
                    <br/><br/>
                    Collections:<br/>
                    {this.props.picture.collections.map(collection => <Label simple>{collection}</Label>)}
                    <br/>
                    Tags:<br/>
                    {this.props.picture.tags.map(tag => <Label simple>{tag}</Label>)}
                    <hr color="grey" />
                </List.Content>
            </List.Item>
        );
    }
}

export default Picture;