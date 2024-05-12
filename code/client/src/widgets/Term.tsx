import React, { Component } from "react";
import { Container, Label, Icon, Flag, Popup, Header, Button, Grid, Accordion, Segment, Form, Divider, FlagNameValues, SemanticICONS } from "semantic-ui-react";
import * as Persons from "../pages/graphsearch/utils/Persons";
import * as Organizations from "../pages/graphsearch/utils/Organizations";
import * as Locations from "../pages/graphsearch/utils/Locations";
import * as Topics from "../pages/graphsearch/utils/Topics";
import * as Countries from "../Countries";

interface ITermProp {
    term: string;
    onDeleteTerm?: (term: string) => void;
}

interface ITermState {
    term: string;
}

class Term extends Component<ITermProp, ITermState> {
    constructor(props: ITermProp) {
        super(props);

        this.state = {
            term: this.props.term
        };

        this.deleteTerm = this.deleteTerm.bind(this);
    }

    componentWillReceiveProps(props: ITermProp) {
        this.setState({
            term: props.term
        });
    }

    deleteTerm(term: string) {
        if (this.props.onDeleteTerm) 
            this.props.onDeleteTerm(term);
    }

    render() {
        var flag = '';
        var icon = 'tag';
        var countryIndex = Countries.countries.map((country: any) => country.name.toLowerCase()).indexOf(this.state.term.toLowerCase());
        if (countryIndex !== -1) {
            flag = Countries.countries[countryIndex].flag;
        }
        else {
            if (Persons.persons.includes(this.state.term.toLowerCase())) {
                icon = 'address book';
            }
            else if (Organizations.organizations.includes(this.state.term.toLowerCase())) {
                icon = 'building';
            }
            else if (Locations.locations.includes(this.state.term.toLowerCase())) {
                icon = 'map';
            }
            else if (Topics.topics.includes(this.state.term.toLowerCase())) {
                icon = 'pencil';
            }
        }

        return (
            <Label as="a">
                {(flag !== '') ?
                    <Flag name={flag as FlagNameValues} /> :
                    <Icon name={icon as SemanticICONS} />
                }
                {this.state.term}
                <Icon name="delete" onClick={() => this.deleteTerm(this.state.term)} />
            </Label>
        );
    }
}

export default Term;