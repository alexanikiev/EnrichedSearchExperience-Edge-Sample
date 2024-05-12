import React, { Component } from 'react';
import { Container, Tab, Button, Input, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { readUsers } from '../../actions/UserActions';

interface ISettingsProps {
    users: { _id: string, id: string, name: string, description: string, settings: { graphsearch: { subjectlen: number, predicatelen: number, objectlen: number } } }[],
    loading: boolean,
    error: object,
    timestamp: number,
    readUsers: (force: boolean) => void
}

interface ISettingsState {
    userid: string;
    subjectlen: number;
    predicatelen: number;
    objectlen: number;
}

interface IAppSettingsState {
    items: { _id: string, id: string, name: string, description: string, settings: { graphsearch: { subjectlen: number, predicatelen: number, objectlen: number } } }[],
    loading: boolean,
    error: object,
    timestamp: number
}

interface IAppState {
    users: IAppSettingsState
}

class Settings extends Component<ISettingsProps, ISettingsState> {
    
    constructor(props: ISettingsProps) {
        super(props);

        this.state = {
            userid: '',
            subjectlen: 0,
            predicatelen: 0,
            objectlen: 0
        };

        this.refreshUsers = this.refreshUsers.bind(this);
        this.updateUser = this.updateUser.bind(this);

        this.controlSubjectLenInputChange = this.controlSubjectLenInputChange.bind(this);
        this.controlPredicateLenInputChange = this.controlPredicateLenInputChange.bind(this);
        this.controlObjectLenInputChange = this.controlObjectLenInputChange.bind(this);
    }

    componentDidMount() {
        this.props.readUsers(false);
    }

    componentWillReceiveProps(props: ISettingsProps) {
        var user = props.users !== undefined && props.users.length > 0 ? props.users[0] : undefined;
        if (user !== undefined && user.settings !== undefined && user.settings.graphsearch !== undefined) {
            this.state = {
                userid: user._id,
                subjectlen: user.settings.graphsearch.subjectlen,
                predicatelen: user.settings.graphsearch.predicatelen,
                objectlen: user.settings.graphsearch.objectlen
            };
        }
    }

    refreshUsers() {
        this.props.readUsers(true);
    }

    updateUser() {
        fetch(`http://${window.location.hostname}:30990/mongo/user`, {
            method: 'put',
            body: JSON.stringify({ id: this.state.userid, 
                                   settings: {
                                       graphsearch: {
                                           subjectlen: this.state.subjectlen,
                                           predicatelen: this.state.predicatelen,
                                           objectlen: this.state.objectlen
                                       }
                                   }})
        })
        .then(() => console.log("success"))
        .catch((error: any) => console.log(error));
    }

    render() {
        const panes = [
            { menuItem: 'Graph Search', render: () => 
            <Tab.Pane>
                Subject:<br/>
                <Label circular>{255}</Label>
                &nbsp;
                <Input
                    min={0}
                    max={255}
                    type='range'
                    onChange={this.controlSubjectLenInputChange}
                    value={this.state.subjectlen}/>
                &nbsp;
                <Label circular>{this.state.subjectlen}</Label>
                <br/>
                <small>Maximum number of characters to represent the subject in a triple</small>
                <br/><br/>
                Predicate:<br/>
                <Label circular>{255}</Label>
                &nbsp;
                <Input
                    min={0}
                    max={255}
                    type='range'
                    onChange={this.controlPredicateLenInputChange}
                    value={this.state.predicatelen}/>
                &nbsp;
                <Label circular>{this.state.predicatelen}</Label>
                <br/>
                <small>Maximum number of characters to represent the predicate in a triple</small>
                <br/><br/>
                Object:<br/>
                <Label circular>{255}</Label>
                &nbsp;
                <Input
                    min={0}
                    max={255}
                    type='range'
                    onChange={this.controlObjectLenInputChange}
                    value={this.state.objectlen}/>
                &nbsp;
                <Label circular>{this.state.objectlen}</Label>
                <br/>
                <small>Maximum number of characters to represent the object in a triple</small>
                <br/>
            </Tab.Pane> }
        ];
        return (
            <Container>
                <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
                <Button icon='save' content='Save' disabled={this.state.userid === ''} onClick={this.updateUser} />
            </Container>
        );
    } 

    controlSubjectLenInputChange(event: any, { value }: any){
        this.setState({
            subjectlen: value
        });
    }

    controlPredicateLenInputChange(event: any, { value }: any){
        this.setState({
            predicatelen: value
        });
    }

    controlObjectLenInputChange(event: any, { value }: any){
        this.setState({
            objectlen: value
        });
    }
}

const mapStateToProps = (state: IAppState) => ({
    users: state.users.items,
    loading: state.users.loading,
    error: state.users.error,
    timestamp: state.users.timestamp
});

export default connect(mapStateToProps, { readUsers })(Settings);