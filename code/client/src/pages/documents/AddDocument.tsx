import React, { Component } from 'react';
import { Segment, Form, Input, Icon, Label, Button } from 'semantic-ui-react';

interface IAddDocumentProps {
}

interface IAddDocumentState {
    files: any[],
    error: any,
    success: any,
    progress: boolean
}

class AddDocument extends Component<IAddDocumentProps, IAddDocumentState> {
    
    constructor(props: IAddDocumentProps) {
        super(props);

        this.state = {
            files: [],
            error: undefined,
            success: undefined,
            progress: false
        };

        this.formSubmit = this.formSubmit.bind(this);
        this.filesChange = this.filesChange.bind(this);
    }

    render() {
        return (
            <Segment>
                <Form encType="multipart/form-data" onSubmit={this.formSubmit}>
                    <Form.Field>
                        <label>Collections:</label>
                    </Form.Field>
                    <Form.Field>
                        <label>Tags:</label>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="fileinput">Files:</label>
                        <Input type="file" id="fileinput" multiple="multiple" onChange={this.filesChange} />
                        <small>
                        {(this.state.files.length === 0) ?
                            '' :
                            this.state.files.map(file =>
                                <div>{file.name} | {file.size} Bytes | {file.type}</div>
                            )
                        }
                        </small>
                    </Form.Field>
                    <Form.Field>
                        { this.state.error ? <Label><Icon color='red' name='x' />{this.state.error.message}</Label> : '' }
                        { this.state.success ? <Label><Icon color='green' name='checkmark' />{this.state.success}</Label>: '' }
                    </Form.Field>
                    <Button type="submit" loading={this.state.progress === true ? true : false}>Upload</Button>
                    <Button type="button" onClick={() => {}}>Reset</Button>
                </Form>
            </Segment>
        );
    } 

    filesChange(event: any) {
        var files = [];
        for (var i = 0; i < event.target.files.length; i++) {
           var filename = event.target.files[i].name.replace(/[\\/:"'*?<>|]+/g, '');
           var file = { document: event.target.files[i],
                        name: filename, 
                        size: event.target.files[i].size, 
                        type: event.target.files[i].type };
           files.push(file);
        }

        this.setState({
            files: files
        });
    }

    formSubmit(event: any) {
        this.setState({
            progress: true
        });

        event.preventDefault();

        let mostRecentPromise = this.state.files.reduce((previousPromise, file) => {
            return previousPromise.then((filesSoFar: any) => {

                var data = new FormData();
                data.append('documentFile', file.document);
                data.append('documentFileName', file.name);

                return fetch('http://localhost:9991/cracking/crack', {
                    method: 'post',
                    body: data
                })
                .then(result => {
                    filesSoFar.push(file.name);
                    return filesSoFar;
                });
            });
        }, Promise.resolve([]));

        mostRecentPromise
        .then((data: any) => {
            console.log(data);
        })
        .catch((error: any) => {
            console.log(error);
        })
        .finally(() => this.setState({
            progress: false
        }));
    }
}

export default AddDocument;