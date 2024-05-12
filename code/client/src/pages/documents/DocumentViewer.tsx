import React, { Component } from 'react';
import { Modal, Icon, Button, Label, Input, Tab, Grid, Image, Table, SemanticICONS } from 'semantic-ui-react';
import { PieChart, BarChart } from 'react-d3-components';
import ReactWordcloud from 'react-wordcloud';
import ImageMapper from 'react-image-mapper';
import ReactAudioPlayer from 'react-audio-player';
import Terms from '../../widgets/Terms';
import Term from '../../widgets/Term';

interface IDocumentViewerProps {
    document: { id: string, name: string, description: string, tags: string[], collections: string[] },
    line?: number
}

interface IDocumentViewerState {
    sentences: { sentence: string, line: number, sentenceScore: number }[],
    linkedentities: { entity: string, entityCnt: number }[],
    keyphrases: { phrase: string, phraseCnt: number }[],
    triples: { subject: string, relation: string, argument: string }[],
    words: { text: string, value: number }[],
    stats: { x: string, y: number }[],
    terms: string[],
    linkedentitiesnum: number,
    keyphrasesnum: number,
    triplesnum: number,
    sentencesnum: number,
    highlights: boolean,
    hoveredArea: any,
    imagemap: { name: string, areas: { name: string, shape: string, coords: number[], strokeColor: string }[] },
    imageurl: string,
    imagewidth: number, imagemapperwidth: number,
    imageheight: number, imagemapperheight: number,
    results: { boundingBox: number[], text: string }[],
    predictions: { boundingBox: { height: number, left: number, top: number, width: number }, probability: number, tagId: string, tagName: string }[],
    points: { height: number, left: number, top: number, width: number }[],
    probabilitypct: number
}

class DocumentViewer extends Component<IDocumentViewerProps, IDocumentViewerState> {
    
    constructor(props: IDocumentViewerProps) {
        super(props);

        this.state = {
            sentences: [],
            linkedentities: [],
            keyphrases: [],
            triples: [],
            words: [],
            stats: [],
            terms: [],
            linkedentitiesnum: 0,
            keyphrasesnum: 0,
            triplesnum: 0,
            sentencesnum: 0,
            highlights: false,
            hoveredArea: null,
            imagemap: { name: "map", areas: [] },
            imageurl: "",
            imagewidth: 0, imagemapperwidth: 0,
            imageheight: 0, imagemapperheight: 0,
            results: [],
            predictions: [],
            points: [],
            probabilitypct: 40
        }

        this.readData = this.readData.bind(this);

        this.readDocumentSentences = this.readDocumentSentences.bind(this);
        this.readDocumentLinkedEntities = this.readDocumentLinkedEntities.bind(this);
        this.readDocumentKeyPhrases = this.readDocumentKeyPhrases.bind(this);
        this.readDocumentTriples = this.readDocumentTriples.bind(this);

        this.readImageData = this.readImageData.bind(this);
        this.readImage = this.readImage.bind(this);
        this.findDocumentImage = this.findDocumentImage.bind(this);
        this.readAudioData = this.readAudioData.bind(this);
        this.readAudio = this.readAudio.bind(this);
        this.findDocumentAudio = this.findDocumentAudio.bind(this);

        this.controlLinkedEntitiesInputChange = this.controlLinkedEntitiesInputChange.bind(this);
        this.controlKeyPhrasesInputChange = this.controlKeyPhrasesInputChange.bind(this);
        this.controlTriplesInputChange = this.controlTriplesInputChange.bind(this);
        this.controlSentencesInputChange = this.controlSentencesInputChange.bind(this);
        this.controlHighlightsInputChange = this.controlHighlightsInputChange.bind(this);
        this.controlProbabilityInputChange = this.controlProbabilityInputChange.bind(this);

        this.submitTerm = this.submitTerm.bind(this);
        this.deleteTerm = this.deleteTerm.bind(this);

        this.getIcon = this.getIcon.bind(this);
    }

    readData() {
        this.findDocumentImage(this.props.document.name)
        .then(data => { 
            if (data !== undefined && JSON.stringify(data) !== '{}') {
                //calc display proportions
                let imagemapperwidth = 0;
                let imagemapperheight = 0;
                if (data.width > 800) {
                    imagemapperwidth = 800;
                    imagemapperheight = data.height * (800/data.width);
                }
                else {
                    imagemapperwidth = data.width;
                    imagemapperheight = data.height;
                }
                var dataobj = JSON.parse(data.data);
                let imagemap: { name: string, areas: { name: string, shape: string, coords: number[], strokeColor: string }[] } = { name: "map", areas: [] };
                let points: { height: number, left: number, top: number, width: number }[] = [];
                if (dataobj.results !== undefined && dataobj.results.length > 0) {
                    dataobj.results.forEach((result: { boundingBox: number[], text: string }) => {
                        imagemap.areas.push({ name: result.text, shape: "poly", coords: result.boundingBox, strokeColor: "green" });
                        points.push({ height: 5, left: result.boundingBox[0] * (imagemapperwidth / data.width), top: result.boundingBox[1] * (imagemapperheight / data.height), width: 5 });
                    });
                }
                let predictions: { boundingBox: { height: number, left: number, top: number, width: number }, probability: number, tagId: string, tagName: string }[] = []; 
                if (dataobj.predictions !== undefined && dataobj.predictions.length > 0) {
                    dataobj.predictions.forEach((prediction: any) => {
                        predictions.push({ boundingBox: { height: prediction.boundingBox.height * imagemapperheight, 
                                                          left: prediction.boundingBox.left * imagemapperwidth, 
                                                          top: prediction.boundingBox.top * imagemapperheight, 
                                                          width: prediction.boundingBox.width * imagemapperwidth }, 
                                           probability: Math.ceil(prediction.probability * 100), 
                                           tagId: prediction.tagId, 
                                           tagName: prediction.tagName });
                    });
                }
                this.setState({
                    imageurl: `http://${window.location.hostname}:30990/media/${data.fileid}`,
                    imagemap: imagemap,
                    imagewidth: data.width,
                    imageheight: data.height,
                    results: dataobj.results, 
                    predictions: predictions,
                    points: points,
                    imagemapperwidth: imagemapperwidth,
                    imagemapperheight: imagemapperheight
                }); 
            }

            return Promise.all([ this.readDocumentSentences(this.props.document.id), 
                                 this.readDocumentLinkedEntities(this.props.document.id),
                                 this.readDocumentKeyPhrases(this.props.document.id),
                                 this.readDocumentTriples(this.props.document.id) ]); 
        })
        .then(data => {
            let words: any[] = [];
            if (data[1] !== undefined && data[1].length > 0) {
                data[1].forEach((linkedentity: any) => {
                    words.push({ text: linkedentity.entity, value: linkedentity.entityCnt });
                });
            }
            /*
            if (data[2] !== undefined && data[2].length > 0) {
                data[2].forEach((keyphrase: any) => {
                    words.push({ text: keyphrase.phrase, value: keyphrase.phraseCnt });
                });
            }
            */
            let stats: any[] = [];
            if (data[1] !== undefined && data[1].length > 0) {
                data[1].forEach((linkedentity: any) => {
                    stats.push({ x: linkedentity.entity + ' (' + linkedentity.entityCnt + ')', y: linkedentity.entityCnt });
                });
            }
            this.setState({
                sentences: data[0],
                linkedentities: data[1],
                keyphrases: data[2],
                triples: data[3],
                words: words,
                stats: stats,
                linkedentitiesnum: 0,
                keyphrasesnum: 0,
                triplesnum: 0,
                sentencesnum: data[0] !== undefined && data[0].length > 0 ? data[0].length : 0
            });
         })
        .catch(error => console.log(error));
    }

    readDocumentSentences(documentid: string) {
        return fetch(`http://${window.location.hostname}:30990/sql/documentsentences/${documentid}`)
        .then(response => response.json());
    }

    readDocumentLinkedEntities(documentid: string) {
        return fetch(`http://${window.location.hostname}:30990/sql/documentaggregatedlinkedentities/${documentid}`)
        .then(response => response.json());
    }

    readDocumentKeyPhrases(documentid: string) {
        return fetch(`http://${window.location.hostname}:30990/sql/documentaggregatedkeyphrases/${documentid}`)
        .then(response => response.json()); 
    }

    readDocumentTriples(documentid: string) {
        return fetch(`http://${window.location.hostname}:30990/sql/documenttriples/${documentid}`)
        .then(response => response.json());
    }

    readImageData() {
        this.readImage('63b5b84b-03c9-4054-aee1-c95e61b42cd8')
        .then(data => {
           if (data !== undefined) {
               var dataobj = JSON.parse(data.data);
               let imagemap: { name: string, areas: { name: string, shape: string, coords: number[], strokeColor: string }[] } = { name: "map", areas: [] };
               if (dataobj.results !== undefined && dataobj.results.length > 0) {
                   dataobj.results.forEach((result: { boundingBox: number[], text: string }) => {
                       imagemap.areas.push({ name: result.text, shape: "poly", coords: result.boundingBox, strokeColor: "green" });
                   });
               }
               if (dataobj.predictions !== undefined && dataobj.predictions.length > 0) {
               }
               else {
                   dataobj.predictions.push({ boundingBox: { height: 0.18959603, left: 0.70651161, top: 0.18400345, width: 0.10200626 },
                   probability: 0.96586025, tagId: 2, tagName: "Nomask" });
                   dataobj.predictions.push({ boundingBox: { height: 0.22564619, left: 0.47456189, top: 0.17456615, width: 0.08634417 },
                   probability: 0.66743177, tagId: 2, tagName: "Nomask" });
                   dataobj.predictions.push({ boundingBox: { height: 0.18116576, left: 0.25345974, top: 0.22989085, width: 0.09713266 },
                   probability: 0.6480217, tagId: 2, tagName: "Nomask" });
               }
               this.setState({
                   imagemap: imagemap,
                   imagewidth: 100,
                   imageheight: 100,
                   results: dataobj.results, 
                   predictions: dataobj.predictions
               }); 
           }
        })
        .catch(error => console.log(error));
    }

    readImage(imageid: string) {
        return fetch(`http://${window.location.hostname}:30990/sql/image/${imageid}`)
        .then(response => response.json());
    }

    findDocumentImage(fileid: string) {
        return fetch(`http://${window.location.hostname}:30990/sql/documentimage/${fileid}`)
        .then(response => response.json())
        /*
        .then(data => { 
            if (data !== undefined && JSON.stringify(data) !== '{}') {
                //calc display proportions
                let imagemapperwidth = 0;
                let imagemapperheight = 0;
                if (data.width > 800) {
                    imagemapperwidth = 800;
                    imagemapperheight = data.height * (800/data.width);
                }
                else {
                    imagemapperwidth = data.width;
                    imagemapperheight = data.height;
                }
                var dataobj = JSON.parse(data.data);
                let imagemap: { name: string, areas: { name: string, shape: string, coords: number[], strokeColor: string }[] } = { name: "map", areas: [] };
                let points: { height: number, left: number, top: number, width: number }[] = [];
                if (dataobj.results !== undefined && dataobj.results.length > 0) {
                    dataobj.results.forEach((result: { boundingBox: number[], text: string }) => {
                        imagemap.areas.push({ name: result.text, shape: "poly", coords: result.boundingBox, strokeColor: "green" });
                        points.push({ height: 5, left: result.boundingBox[0] * (imagemapperwidth / data.width), top: result.boundingBox[1] * (imagemapperheight / data.height), width: 5 });
                    });
                }
                let predictions: { boundingBox: { height: number, left: number, top: number, width: number }, probability: number, tagId: string, tagName: string }[] = []; 
                if (dataobj.predictions !== undefined && dataobj.predictions.length > 0) {
                    dataobj.predictions.forEach((prediction: any) => {
                        predictions.push({ boundingBox: { height: prediction.boundingBox.height * imagemapperheight, 
                                                          left: prediction.boundingBox.left * imagemapperwidth, 
                                                          top: prediction.boundingBox.top * imagemapperheight, 
                                                          width: prediction.boundingBox.width * imagemapperwidth }, 
                                           probability: prediction.probability, 
                                           tagId: prediction.tagId, 
                                           tagName: prediction.tagName });
                    });
                }
                this.setState({
                    imageurl: `http://${window.location.hostname}:30990/media/${data.fileid}`,
                    imagemap: imagemap,
                    imagewidth: data.width,
                    imageheight: data.height,
                    results: dataobj.results, 
                    predictions: predictions,
                    points: points,
                    imagemapperwidth: imagemapperwidth,
                    imagemapperheight: imagemapperheight
                }); 
            }
        })
        .catch(error => console.log(error));
        */
    }

    readAudioData() {
        this.readAudio('')
        .then(data => {

        })
        .catch(error => console.log(error));
    }

    readAudio(audioid: string) {
        return fetch(`http://${window.location.hostname}:30990/sql/audio/${audioid}`)
        .then(response => response.json());
    }

    findDocumentAudio(fileid: string) {
        fetch(`http://${window.location.hostname}:30990/sql/documentaudio/${fileid}`)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
    }

    controlLinkedEntitiesInputChange(event: any, { value }: any){
        this.setState({
            linkedentitiesnum: value
        });
    }

    controlKeyPhrasesInputChange(event: any, { value }: any){
        this.setState({
            keyphrasesnum: value
        });
    }

    controlTriplesInputChange(event: any, { value }: any){
        this.setState({
            triplesnum: value
        });
    }

    controlSentencesInputChange(event: any, { value }: any){
        this.setState({
            sentencesnum: value
        });
    }

    controlHighlightsInputChange(event: any, { value }: any){
        this.setState({
            highlights: !this.state.highlights
        });
    }

    controlProbabilityInputChange(event: any, { value }: any){
        this.setState({
            probabilitypct: value
        });
    }

    render() {
        var sentences = this.state.sentences.length > 0 ? this.state.sentences : [];
        var linkedentities = this.state.linkedentities.length > 0 ? this.state.linkedentities.slice(0, this.state.linkedentitiesnum) : [];
        var keyphrases = this.state.keyphrases.length > 0 ? this.state.keyphrases.slice(0, this.state.keyphrasesnum) : [];
        var triples = this.state.triples.length > 0 ? this.state.triples.slice(0, this.state.triplesnum) : [];

        var icon: SemanticICONS = this.getIcon();

        const panes = [
            { menuItem: 'Content', render: () => 
            <Tab.Pane>
                Terms:<br/>
                <Terms 
                    terms={this.state.terms} 
                    onSubmitTerm={this.submitTerm} 
                    onDeleteTerm={this.deleteTerm} />
                <br/><br/>
                <Grid columns={2}>
                    <Grid.Column textAlign='left'>
                        <Button icon onClick={this.controlHighlightsInputChange}>
                            <Icon name='search' color={ this.state.highlights ? "blue" : "black"} />
                        </Button>
                    </Grid.Column>
                    <Grid.Column textAlign='right'>
                        <Label circular>{this.state.sentences.length}</Label>
                        &nbsp;
                        <Input
                            min={0}
                            max={this.state.sentences.length}
                            onChange={this.controlSentencesInputChange}
                            type='range'
                            value={this.state.sentencesnum}
                        />
                        &nbsp;
                        <Label circular>{this.state.sentencesnum}</Label>
                    </Grid.Column>
                </Grid>
                <hr/>
                Text&nbsp;({this.state.sentences.length}):
                <br/>
                { sentences.length === 0 ? "No sentences here." : this.processContent(this.props.line !== undefined ? this.props.line : -1) }
                <hr color="grey" />
                <br/>

                Tags:<br/>
                {this.props.document.tags.map(tag => <Label simple>{tag}</Label>)}
                <br/><br/>

                Collections:<br/>
                <Label simple>default</Label>
                <br/><br/>

                Linked entities&nbsp;({this.state.linkedentities.length})&nbsp;
                <Icon name="bookmark" disabled />
                &nbsp;
                <Label circular>{this.state.linkedentities.length}</Label>
                &nbsp;
                <Icon name="bookmark outline" disabled />
                &nbsp;
                <Input
                    min={0}
                    max={this.state.linkedentities.length}
                    onChange={this.controlLinkedEntitiesInputChange}
                    type="range"
                    value={this.state.linkedentitiesnum}
                />
                &nbsp;
                <Label circular>{this.state.linkedentitiesnum}</Label>
                <br/>
                { linkedentities.length === 0
                    ? "No linked entities here."
                    : linkedentities.map(linkedentity => (
                        <span>
                            <Label circular>{linkedentity.entityCnt}</Label>
                            <Label simple>{linkedentity.entity}</Label>
                        </span>
                ))}
                <br/><br/>

                Key phrases&nbsp;({this.state.keyphrases.length})&nbsp;
                <Icon name="bookmark" disabled />
                &nbsp;
                <Label circular>{this.state.keyphrases.length}</Label>
                &nbsp;
                <Icon name="bookmark outline" disabled />
                &nbsp;
                <Input
                    min={0}
                    max={this.state.keyphrases.length}
                    onChange={this.controlKeyPhrasesInputChange}
                    type="range"
                    value={this.state.keyphrasesnum}
                />
                &nbsp;
                <Label circular>{this.state.keyphrasesnum}</Label>
                <br/>
                { keyphrases.length === 0
                    ? "No key phrases here."
                    : keyphrases.map(keyphrase => (
                        <span>
                            <Label circular>{keyphrase.phraseCnt}</Label>
                            <Label simple>{keyphrase.phrase}</Label>
                        </span>
                ))}
                <br/><br/>

                Triples&nbsp;({this.state.triples.length})&nbsp;
                <Icon name="bookmark" disabled />
                &nbsp;
                <Label circular>{this.state.triples.length}</Label>
                &nbsp;
                <Icon name="bookmark outline" disabled />
                &nbsp;
                <Input
                    min={0}
                    max={this.state.triples.length}
                    onChange={this.controlTriplesInputChange}
                    type="range"
                    value={this.state.triplesnum}
                />
                &nbsp;
                <Label circular>{this.state.triplesnum}</Label>
                <br/>
                { triples.length === 0
                    ? "No triples here."
                    : triples.map(triple => (
                        <span>
                            <Label circular>S</Label>
                            <Label simple>{triple.subject}</Label>
                            <Label circular>P</Label>
                            <Label simple>{triple.relation}</Label>
                            <Label circular>O</Label>
                            <Label simple>{triple.argument}</Label>
                            <br/>
                        </span>
                ))}
                <br/><br/>
            </Tab.Pane> },
            { menuItem: 'Dashboard', render: () => 
            <Tab.Pane>
                <Grid divided='vertically'>
                    <Grid.Row columns={2}>
                        <Grid.Column textAlign='left'>
                            <PieChart
                                data={{ label: 'piechart', values: this.state.stats.length > 0 ? this.state.stats.slice(0, 10) : [] }}
                                width={400}
                                height={400}
                                margin={{top: 10, bottom: 10, left: 100, right: 100}} />
                        </Grid.Column>
                        <Grid.Column textAlign='right'>
                            {this.state.stats.length > 0 ?
                            <Table basic='very' celled collapsing>
                                <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Term</Table.HeaderCell>
                                    <Table.HeaderCell>Count</Table.HeaderCell>
                                </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {this.state.stats.slice(0, 7).map(stat => 
                                    <Table.Row>
                                        <Table.Cell>{stat.x}</Table.Cell>
                                        <Table.Cell>{stat.y}</Table.Cell>
                                    </Table.Row>
                                    )}
                                    <Table.Row>
                                        <Table.Cell>...</Table.Cell>
                                        <Table.Cell>...</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table> : 
                            <BarChart
                                data={[{ label: 'barchart', values: this.state.stats.length > 0 ? this.state.stats.slice(0, 7) : [] }]}
                                width={400}
                                height={400}
                                margin={{ top: 10, bottom: 50, left: 50, right: 10 }} /> 
                            }
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Tab.Pane> },
            { menuItem: 'Word Cloud', render: () => 
            <Tab.Pane>
                <ReactWordcloud words={this.state.words} />
            </Tab.Pane> },
            ...(icon === 'image' ? 
            [{ menuItem: 'Picture', render: () => 
            <Tab.Pane>
                {false ? <Button onClick={this.readImageData}>Load</Button> : '' }
                {false ? <Button onClick={() => this.findDocumentImage(this.props.document.name)}>Find</Button> : '' }
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column textAlign='left'>
                            Tags (PPE model):&nbsp;
                            <Label as="a">
                                <Icon name='hashtag' color='red' />nomask
                            </Label>
                            <Label as="a">
                                <Icon name='hashtag' color='orange' />nogloves
                            </Label>
                        </Grid.Column>
                        <Grid.Column textAlign='right'>
                            <Label circular>{100}</Label>
                            &nbsp;
                            <Input
                                min={0}
                                max={100}
                                onChange={this.controlProbabilityInputChange}
                                type='range'
                                value={this.state.probabilitypct}
                            />
                            &nbsp;
                            <Label circular>{this.state.probabilitypct}</Label>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <div style={{ position: 'relative' }}>
                    <ImageMapper src={this.state.imageurl} 
                                 map={this.state.imagemap} 
                                 width={this.state.imagemapperwidth} imgWidth={this.state.imagewidth}
                                 onMouseEnter={(area: any) => this.enterArea(area)}
                                 onMouseLeave={(area: any) => this.leaveArea(area)} />
                    {
                        /* OCR results hints */
                        this.state.hoveredArea &&
                        <span style={{ position: 'absolute', 
                                       color: '#fff', 
                                       padding: '10px', 
                                       background: 'rgba(0,0,0,0.8)', 
                                       transform: 'translate3d(-50%, -50%, 0)', 
                                       ...{'border-radius': '5px', 'pointer-events': 'none', 'z-index': '1000'} as React.CSSProperties, 
                                       ...this.getTipPosition(this.state.hoveredArea) }}>
                            { this.state.hoveredArea && this.state.hoveredArea.name}
                        </span>
                    }
                    {
                        /* Mask/NoMask Gloves/NoGloves */
                        this.state.predictions && this.state.predictions.length > 0 ?
                        <span>
                            { this.state.predictions.map(prediction =>
                                (prediction.tagName === 'Nomask' || prediction.tagName === 'nogloves') && 
                                prediction.probability > this.state.probabilitypct && 
                                <span>
                                    <div style={{ position: 'absolute',
                                      top: `${prediction.boundingBox.top - 10}px`,
                                      left: `${prediction.boundingBox.left}px`,
                                      width: `${60}px`,
                                      height: `${10}px`, 
                                      ...{'font-size': '8px', 'background-color': 'white', 'z-index': '999'} as React.CSSProperties }}>
                                    { prediction.tagName === 'Nomask' ? '#nomask' : '#nogloves' }
                                    &nbsp; 
                                    { prediction.probability }%
                                    </div>
                                    <div style={{ position: 'absolute',
                                                top: prediction.boundingBox.top,
                                                left: prediction.boundingBox.left,
                                                width: prediction.boundingBox.width,
                                                height: prediction.boundingBox.height, 
                                                border: `2px solid ${prediction.tagName === 'Nomask' ? '#ff0000' : '#ffa500'}`,
                                                ...{'background-color': 'transparent', 'z-index': '999'} as React.CSSProperties }} />
                                </span>
                            )}
                        </span>
                        : ''
                    }
                    {
                        /* OCR results points */
                        this.state.points && this.state.points.length > 0 ?
                        <span>
                            { this.state.points.map(point => 
                                <div style={{ position: 'absolute',
                                              top: `${point.top}px`,
                                              left: `${point.left}px`,
                                              width: `${point.width}px`,
                                              height: `${point.height}px`, 
                                              border: '2px solid #00ff00', //ffffff = white 
                                              ...{'background-color': 'green', 'z-index': '998'} as React.CSSProperties }} />)
                            }
                        </span>
                        : ''
                    }
                </div>
            </Tab.Pane> }] : []),
            ...(icon === 'volume up' ? 
            [{ menuItem: 'Audio', render: () => 
            <Tab.Pane>
                { false ? <Button onClick={this.readAudioData}>Load</Button> : '' }
                { false ? <Button onClick={() => this.findDocumentAudio(this.props.document.name)}>Find</Button> : '' }
                <ReactAudioPlayer
                    src="https://www.signalogic.com/melp/EngSamples/Orig/male.wav" /*"http://10.0.0.241:30990/recordings/Recording_0230.wav"*/
                    autoPlay
                    controls />
            </Tab.Pane> }] : [])
        ];

        return (
            <Modal closeOnDimmerClick={false} closeIcon trigger={<Button>View</Button>} onOpen={this.readData} >
                <Modal.Header>
                    <Icon name={this.getIcon() as SemanticICONS} />
                    {this.props.document.name}
                </Modal.Header>
                <Modal.Content>
                    <Tab panes={panes} />
                </Modal.Content>
            </Modal>
        );
    }
    
    submitTerm(term: string) {
        if (this.state.terms.includes(term))
            return;
        let terms = [
            ...this.state.terms,
            term
        ];
        this.setState({
            terms: terms
        });
    }

    deleteTerm(term: string) {
        this.setState({
            terms: this.state.terms.filter(t => t !== term) 
        });
    }

    processContent(line: number) {
        var found = false;
        var sentences = this.state.sentences.slice(0);
        if (sentences.length > 0 && sentences.length !== this.state.sentencesnum) {
            sentences.forEach(s => {
                s.sentenceScore = this.scoreSentence(s.sentence);
            });
            sentences = sentences.sort((sentence1, sentence2) => sentence2.sentenceScore - sentence1.sentenceScore);//desc by score
            sentences = sentences.slice(0, this.state.sentencesnum);
            sentences = sentences.sort((sentence1, sentence2) => sentence1.line - sentence2.line);//asc by line
        }
        return (sentences.map(s => {
            if (s.line === line && found === false) {
                found = true;
                return <mark><i>{this.processSentence(s.sentence)}</i></mark>;
            }
            else {
                return <i>{this.processSentence(s.sentence)}</i>;
            }
        }));
    }

    processSentence(text: string) {
        var sentence = text;
        if (this.state.highlights && this.state.terms.length > 0) {
            sentence = this.processTerms(sentence);
            var words = sentence.match(/\w+|\s+|[^\s\w]+/g);
            if (words !== null && words.length > 0) {
                    return (words.map(word => {
                        for (var k = 0; k < this.state.terms.length; k++) {
                            if (this.state.terms[k].replace(/[^\w\s]|_/g, "").split(' ').join('_').toLowerCase() === word.toLowerCase()) {
                                return <Term 
                                            term={this.state.terms[k]} 
                                            onDeleteTerm={() => {}} />;
                            }
                        }
                        return word;
                    }));
            }
        }
        return text;
    }

    processTerms(text: string) {
        var sentence = text;
        for (var k = 0; k < this.state.terms.length; k++) {
            var term = this.state.terms[k];
            if (term.indexOf(' ') !== -1) {
                sentence = sentence.replace(term, term.replace(/[^\w\s]|_/g, "").split(' ').join('_'));
            }
        }
        return sentence;
    }

    scoreSentence(text: string) {
        var score = 0;
        var sentence = text;
        var words = sentence.match(/\w+|\s+|[^\s\w]+/g);
        for (var k = 0; k < this.state.linkedentities.length; k++) {
            var linkedentity = this.state.linkedentities[k];
            if (words !== null && words.length > 0)
                score += words.filter(word => word == linkedentity.entity).length * (this.state.terms.includes(linkedentity.entity) ? 2 : 1);
        }
        return score;
    }

    enterArea(area: any) {
        this.setState({ hoveredArea: area });
    }
    
    leaveArea(area: any) {
        this.setState({ hoveredArea: null });
    }
    
    getTipPosition(area: any) {
        return { top: `${area.center[1]}px`, 
                 left: `${area.center[0]}px` } as React.CSSProperties;
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

export default DocumentViewer;

/*
{this.props.document.description} ...
<br/><br/>
*/