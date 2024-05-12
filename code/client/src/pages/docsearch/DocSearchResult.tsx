import React, { Component, Suspense } from 'react';
import { Container, Label, List, Icon, Button, SemanticICONS } from 'semantic-ui-react';
import ErrorBoundary from '../errors/ErrorBoundary';
import FileSaver from 'file-saver';
const DocumentViewer = React.lazy(() => import("../documents/DocumentViewer"));

interface IDocSearchResultProps {
    docsearchresult: { id: string, name: string, description: string, tags: string[], collections: string[], highlights: string[], score: number }
}

interface IDocSearchResultState {
}

class DocSearchResult extends Component<IDocSearchResultProps, IDocSearchResultState> {
    
    constructor(props: IDocSearchResultProps) {
        super(props);

        this.downloadDocument = this.downloadDocument.bind(this);
        this.getIcon = this.getIcon.bind(this);
    }

    downloadDocument() {
        return fetch(`http://${window.location.hostname}:30990/storage/download/success/${this.props.docsearchresult.name}`)
        .then(response => response.blob())
        .then(blob => FileSaver.saveAs(blob, this.props.docsearchresult.name))
        .catch((error: any) => {
            console.log('error');
        });
    }

    render() {
        var highlight = this.props.docsearchresult.highlights.join(' ... ');
        highlight = highlight.replace(/<em>/g, '<mark>');
        highlight = highlight.replace(/<\/em>/g, '</mark>');
        return (
            <List.Item>
                <List.Content>
                    <Icon name={this.getIcon() as SemanticICONS} />
                    <b>{this.props.docsearchresult.name}</b>
                    <br/>
                    <div dangerouslySetInnerHTML={{__html: highlight}} />
                    <Icon name='bullseye' />
                    &nbsp;
                    {this.props.docsearchresult.score}
                    &nbsp;
                    <Icon name='language' />&nbsp;
                    <b>{ this.props.docsearchresult.name === 'Ebola-Fiche-technique.pdf' ? 'fr' : 'en' }</b>
                    <br/><br/>
                    <ErrorBoundary>
                        <Suspense fallback={<div>Loading ...</div>}>
                            <DocumentViewer document={ 
                                    { id: this.props.docsearchresult.id, 
                                      name: this.props.docsearchresult.name, 
                                      description: this.props.docsearchresult.description.substring(0, 250), 
                                      tags: this.props.docsearchresult.tags, 
                                      collections: this.props.docsearchresult.collections } /*this.props.docsearchresult*/ } />
                            <Button onClick={this.downloadDocument}>Download</Button>
                        </Suspense>
                    </ErrorBoundary>
                    <br/><br/>
                    Collections:<br/>
                    {this.props.docsearchresult.collections.map(collection => <Label simple>{collection}</Label>)}
                    <br/>
                    Tags:<br/>
                    {this.props.docsearchresult.tags.map(tag => <Label simple>{tag}</Label>)}
                    <hr color="grey" />
                </List.Content>
            </List.Item>
        );
    } 

    getIcon() {
        var icon: SemanticICONS = 'book';
        var name = this.props.docsearchresult.name.toLowerCase();
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

export default DocSearchResult;