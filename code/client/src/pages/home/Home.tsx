import React, { Component } from 'react';
import { Container, Form, Input, Button, Grid, Search, List, Label, Checkbox, Icon, Segment, Divider, Header, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { readCollections } from '../../actions/CollectionActions';
import { readHierarchies } from '../../actions/HierarchyActions';

interface IHomeProps {
    collections: { id: string, name: string, description: string }[],
    hierarchies: { id: string, name: string, description: string }[],
    loading: boolean,
    error: object,
    timestamp: number,
    readCollections: (force: boolean) => void,
    readHierarchies: (force: boolean) => void
}

interface IHomeState {
    elasticSearchStatus: any,
    gremlinServerStatus: any,
    mongoStatus: any,
    sqlStatus: any,
    doctext: string, 
    isLoading: boolean,
    isLoadingSubmitContent: boolean,
    isLoadingCrackContent: boolean,
    files: any[],
    contentType: number,
    success: boolean
}

interface IAppHomeCollectionsState {
    items: { id: string, name: string, description: string }[],
    loading: boolean,
    error: object,
    timestamp: number
}

interface IAppHomeHierarchiesState {
    items: { id: string, name: string, description: string }[],
    loading: boolean,
    error: object,
    timestamp: number
}

interface IAppState {
    collections: IAppHomeCollectionsState,
    hierarchies: IAppHomeHierarchiesState
}

class Home extends Component<IHomeProps, IHomeState> {
    
    constructor(props: IHomeProps) {
        super(props);

        this.state = {
            elasticSearchStatus: false,
            gremlinServerStatus: false,
            mongoStatus: false,
            sqlStatus: false,
            doctext: '',
            isLoading: false,
            isLoadingSubmitContent: false,
            isLoadingCrackContent: false,
            files: [],
            contentType: 0,
            success: false
        };

        this.formSubmitContent = this.formSubmitContent.bind(this);
        this.crackContent = this.crackContent.bind(this);

        this.filesChange = this.filesChange.bind(this);

        this.controlContentTypeInputChange = this.controlContentTypeInputChange.bind(this);
    }

    componentDidMount() {
        this.props.readCollections(false);
        this.props.readHierarchies(false);
    }

    controlContentTypeInputChange(contentType: number){
        this.setState({
            contentType: contentType
        });
    }

    render() {
        let acceptContentType = '';
        switch (this.state.contentType) {
            case 2:
                acceptContentType = 'image/*';
                break;
            case 3:
                acceptContentType = 'audio/*'; 
                break;
            case 1:
            default:
                acceptContentType = '';
                break;
        }
        return (
            <Container>
                {false ?
                <Grid columns={2} divided>
                    <Grid.Row>
                        <Grid.Column>
                            <Search onSearchChange={() => {}} showNoResults={false} placeholder="Search collections..." />
                            <br/>
                            <small>Number of collections:&nbsp;3/3</small>
                            <br/><br/>
                            <List selection verticalAlign='middle'>
                                {(this.props.collections.length === 0) ?
                                <p>No collections here.</p> :
                                this.props.collections.map(collection =>
                                <List.Item>
                                    <List.Icon color="blue" name="folder" />
                                    <List.Content>
                                        <Checkbox checked={collection.name === 'coll1' || collection.name === 'coll2' ? true : false } />
                                        &nbsp;
                                        {collection.name}
                                    </List.Content>
                                </List.Item>
                                )}
                            </List>
                        </Grid.Column>
                        <Grid.Column>
                            <Search onSearchChange={() => {}} showNoResults={false} placeholder="Search hierarchies..." />
                            <br/>
                            <small>Number of hierarchies:&nbsp;3/3</small>
                            <br/><br/>
                            <List selection verticalAlign='middle'>
                                {(this.props.hierarchies.length === 0) ?
                                <p>No hierarchies here.</p> :
                                this.props.hierarchies.map(hierarchy =>
                                <List.Item>
                                    <List.Icon color="blue" name="share alternate" />
                                    <List.Content>
                                        <Checkbox checked={hierarchy.name === 'Ebola outbreak 2016' ? true : false } />
                                        &nbsp;
                                        {hierarchy.name}
                                    </List.Content>
                                </List.Item>
                                )}
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                </Grid> : '' }
                <Segment placeholder>
                    <Grid columns={2} stackable textAlign='center'>
                    <Divider vertical>Then</Divider>

                    <Grid.Row verticalAlign='middle'>
                        <Grid.Column>
                        <Header icon>
                            <Icon name='download' />
                            Submit Content
                        </Header>
                        <br/>
                        <Button.Group>
                            <Button icon onClick={() => this.controlContentTypeInputChange(0)}>
                                <Icon name='file text' color={this.state.contentType === 0 ? "blue" : "black"} />
                            </Button>
                            {false ? <Button icon onClick={() => this.controlContentTypeInputChange(1)}>
                                <Icon name='file text' color={this.state.contentType === 1 ? "blue" : "black"} />
                            </Button> : '' }
                            <Button icon onClick={() => this.controlContentTypeInputChange(2)}>
                                <Icon name='file' color={this.state.contentType === 2 ? "blue" : "black"} />
                            </Button>
                            <Button icon onClick={() => this.controlContentTypeInputChange(3)}>
                                <Icon name='file audio' color={this.state.contentType === 3 ? "blue" : "black"} />
                            </Button>
                        </Button.Group>
                        </Grid.Column>

                        <Grid.Column>
                        <Header icon>
                            <Icon name='cogs' />
                            Process Content
                        </Header>
                        <Button icon='cog' content='Process' onClick={this.crackContent} loading={this.state.isLoadingCrackContent === true ? true : false} />
                        </Grid.Column>
                    </Grid.Row>
                    </Grid>
                </Segment>

                <Form onSubmit={this.formSubmitContent} success={this.state.success}>
                    <Form.Field>
                        <label htmlFor="upload">Files:</label>
                        <Input id="upload" type="file" multiple="multiple" name="upload" onChange={this.filesChange} accept={acceptContentType} />
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
                        <label>Collections:</label>
                        {["coll1", "coll2"].map(collection => <Label simple>{collection}</Label>)}
                    </Form.Field>
                    <Form.Field>
                        <label>Tags:</label>
                        {["tag1", "tag2"].map(tag => <Label simple>{tag}</Label>)}
                    </Form.Field>
                    <Message
                        success
                        header='Submitted successfully'
                        content="Your files will be processed automatically on the defined schedule or you may choose to start the process right now by clicking 'Process' button above"
                    />
                    <Message
                        error
                        header='Something went wrong'
                        content="Please contact support"
                    />
                    <Message
                        warning
                        header='Something was not right'
                        content="Please contact support"
                    />
                    <Button icon='download' content='Submit' type='submit' loading={this.state.isLoadingSubmitContent === true ? true : false} />
                </Form>
                <br/><br/>
            </Container>
        );
    } 

    filesChange(event: any) {
        var files = [];
        for (var i = 0; i < event.target.files.length; i++) {
           //https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch08s25.html
           var filename = event.target.files[i].name.replace(/[\\/:"'*?<>|]+/g, '');
           var file = { document: event.target.files[i],
                        name: filename, 
                        size: event.target.files[i].size, 
                        type: event.target.files[i].type };
           files.push(file);
        }

        this.setState({
            files: files,
            success: false
        });
    }

    formSubmitContent(event: any) {

        this.setState({
            isLoading: true,
            isLoadingSubmitContent: true,
            success: false
        });

        event.preventDefault();

        let mostRecentPromise = this.state.files.reduce((previousPromise, file) => {
            return previousPromise.then((filesSoFar: any) => {

                var data = new FormData();

                switch(this.state.contentType) {
                    case 1:
                        data.append('documentFile', file.document);
                        data.append('documentFileName', file.name);
        
                        return fetch(`http://${window.location.hostname}:30991/cracking/documents`, {
                            method: 'post',
                            body: data
                        })
                        .then(result => {
                            filesSoFar.push(file.name);
                            return filesSoFar;
                        });
                        break;
                    case 2:
                        data.append('imageFile', file.document);
                        data.append('imageFileName', file.name);
        
                        return fetch(`http://${window.location.hostname}:30990/storage/stash`, {
                            method: 'post',
                            body: data
                        })
                        .then(() => fetch(`http://${window.location.hostname}:30962/cracking/images`, {
                            method: 'post',
                            body: data
                        }))
                        .then(result => {
                            filesSoFar.push(file.name);
                            return filesSoFar;
                        }); 
                        break;
                    case 3:
                        data.append('audioFile', file.document);
                        data.append('audioFileName', file.name);
        
                        return fetch(`http://${window.location.hostname}:30963/cracking/audios`, {
                            method: 'post',
                            body: data
                        })
                        .then(result => {
                            filesSoFar.push(file.name);
                            return filesSoFar;
                        });
                        break;
                    default:
                        data.append('documentFile', file.document);
                        data.append('documentFileName', file.name);

                        return fetch(`http://${window.location.hostname}:30990/storage/save`, {
                            method: 'post',
                            body: data
                        })
                        .then(result => {
                            filesSoFar.push(file.name);
                            return filesSoFar;
                        });
                }
              
                //original:
                /*
                data.append('documentFile', file.document);
                data.append('documentFileName', file.name);

                return fetch(`http://${window.location.hostname}:30991/cracking/documents`, {
                
                data.append('imageFile', file.document);
                data.append('imageFileName', file.name);

                return fetch(`http://${window.location.hostname}:30962/cracking/images`, {

                data.append('audioFile', file.document);
                data.append('audioFileName', file.name);

                return fetch(`http://${window.location.hostname}:30963/cracking/audios`, {
                    method: 'post',
                    body: data
                })
                .then(result => {
                    filesSoFar.push(file.name);
                    return filesSoFar;
                });
                */
            });
        }, Promise.resolve([]));

        /*
        fetch('http://localhost:9991/cracking/crack', {
            method: 'post',
            body: new FormData(event.target)
        })
        */

        mostRecentPromise
        .then((data: any) => {
            console.log(data);
        })
        .catch((error: any) => {
            console.log(error);
        })
        .finally(() => this.setState({
            isLoading: false,
            isLoadingSubmitContent: false,
            files: [],
            success: true
        }));
    }

    crackContent() {
        this.setState({
            isLoadingCrackContent: true
        });
        fetch(`http://${window.location.hostname}:30972/api/crackingdocuments`, {
            method: 'post',
            /*headers: new Headers({
                "Content-Type": "application/json",
                "Accept": "application/json",
                "x-functions-key": "test1",
                "mode": "cors"
            })*/
        })
        .then(() => console.log("success"))
        .catch(error => console.log(error))
        .finally(() => this.setState({
            isLoadingCrackContent: false
        }));
    }
}

const mapStateToProps = (state: IAppState) => ({
    collections: state.collections.items,
    hierarchies: state.hierarchies.items,
    loading: state.collections.loading,
    error: state.collections.error,
    timestamp: state.collections.timestamp
});

export default connect(mapStateToProps, { readCollections, readHierarchies })(Home);