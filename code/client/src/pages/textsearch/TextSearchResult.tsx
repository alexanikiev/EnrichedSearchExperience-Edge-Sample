import React, { Component, Suspense } from 'react';
import { Table, Popup, Label } from 'semantic-ui-react';
import ErrorBoundary from '../errors/ErrorBoundary';
const DocumentViewer = React.lazy(() => import("../documents/DocumentViewer"));

interface ITextSearchResultProps {
    textsearchresult: { id: string, name: string, description: string, document: string, file: string, subject: string, predicate: string, object: string, line: number, tags: string[], collections: string[], score: number }
}

interface ITextSearchResultState {
}

class TextSearchResult extends Component<ITextSearchResultProps, ITextSearchResultState> {
    
    constructor(props: ITextSearchResultProps) {
        super(props);
    }

    render() {
        return (
            <Table.Row>
                <Table.Cell>
                    <Popup
                        trigger={<Label>{this.props.textsearchresult.name}</Label>} 
                        header={this.props.textsearchresult.name}
                        content={`Score: ${this.props.textsearchresult.score} Line: ${this.props.textsearchresult.line}`}
                    />
                </Table.Cell>
                <Table.Cell>
                    <Popup
                        trigger={<Label basic>{this.props.textsearchresult.subject}</Label>} 
                        header={this.props.textsearchresult.name}
                        content={'(S) ' + this.props.textsearchresult.subject + ' (P) ' + this.props.textsearchresult.predicate + ' (O) ' + this.props.textsearchresult.object}
                    />
                </Table.Cell>
                <Table.Cell>
                    <Popup
                        trigger={<Label basic>{this.props.textsearchresult.predicate}</Label>} 
                        header={this.props.textsearchresult.name}
                        content={'(S) ' + this.props.textsearchresult.subject + ' (P) ' + this.props.textsearchresult.predicate + ' (O) ' + this.props.textsearchresult.object}
                    />
                </Table.Cell>
                <Table.Cell>
                    <Popup
                        trigger={<Label basic>{this.props.textsearchresult.object}</Label>} 
                        header={this.props.textsearchresult.name}
                        content={'(S) ' + this.props.textsearchresult.subject + ' (P) ' + this.props.textsearchresult.predicate + ' (O) ' + this.props.textsearchresult.object}
                    />
                </Table.Cell>
                <Table.Cell>
                    <ErrorBoundary>
                        <Suspense fallback={<div>Loading ...</div>}>
                            <DocumentViewer 
                                document={
                                    { id: this.props.textsearchresult.document, 
                                      name: this.props.textsearchresult.file, 
                                      description: this.props.textsearchresult.document, 
                                      tags: this.props.textsearchresult.tags, 
                                      collections: this.props.textsearchresult.collections }
                                } 
                                line={this.props.textsearchresult.line} />
                        </Suspense>
                    </ErrorBoundary>
                </Table.Cell>
            </Table.Row>
        );
    }  
}

export default TextSearchResult;