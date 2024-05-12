import React, { Component, Suspense } from 'react';
import { Container, Label, List, Icon, Button, SemanticICONS } from 'semantic-ui-react';
import ErrorBoundary from '../errors/ErrorBoundary';
import FileSaver from 'file-saver';
const DocumentViewer = React.lazy(() => import("./DocumentViewer"));

interface IDocumentProps {
    document: { id: string, name: string, description: string, tags: string[], collections: string[] }
}

interface IDocumentState {
}

class Document extends Component<IDocumentProps, IDocumentState> {
    
    constructor(props: IDocumentProps) {
        super(props);

        this.downloadDocument = this.downloadDocument.bind(this);
        this.getIcon = this.getIcon.bind(this);
    }

    downloadDocument() {
        return fetch(`http://${window.location.hostname}:30990/storage/download/success/${this.props.document.name}`)
        .then(response => response.blob())
        .then(blob => FileSaver.saveAs(blob, this.props.document.name))
        .catch((error: any) => {
            console.log('error');
        });
    }

    render() {
        return (
            <List.Item>
                <List.Content>
                    <Icon name={this.getIcon() as SemanticICONS} />
                    <b>{this.props.document.name}</b>
                    <br/>
                    <i>{this.props.document.description}</i>
                    <br/>
                    <Icon name='language' />&nbsp;
                    <b>{ this.props.document.name === 'Ebola-Fiche-technique.pdf' ? 'fr' : 'en' }</b>
                    <br/><br/>
                    <ErrorBoundary>
                        <Suspense fallback={<div>Loading ...</div>}>
                            <DocumentViewer document={this.props.document} />
                            <Button onClick={this.downloadDocument}>Download</Button>
                            {false ? <Button>Delete</Button> : '' }
                        </Suspense>
                    </ErrorBoundary>
                    <br/><br/>
                    Collections:<br/>
                    {this.props.document.collections.map(collection => <Label simple>{collection}</Label>)}
                    <br/>
                    Tags:<br/>
                    {this.props.document.tags.map(tag => <Label simple>{tag}</Label>)}
                    <hr color="grey" />
                </List.Content>
            </List.Item>
        );
    }

    getIcon() {
        var icon: SemanticICONS = 'book';
        var name = this.props.document.name.toLowerCase();
        if (name.endsWith('.jpg.txt') || 
            name.endsWith('.jpeg.txt') || 
            name.endsWith('.gif.txt') || 
            name.endsWith('.png.txt') || 
            name.endsWith('.bmp.txt'))
            icon = 'image';
        else if (name.endsWith('.wav.txt') || 
                 name.endsWith('.mp3.txt'))
            icon = 'volume up';
        return icon;
    }
}

export default Document;