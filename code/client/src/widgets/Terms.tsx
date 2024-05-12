import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import TermList from './TermList';
import AddTerm from './AddTerm';

interface ITermsProp {
    terms: string[],
    onSubmitTerm?: (term: string) => void,
    onDeleteTerm?: (term: string) => void
}

interface ITermsState {
}

class Terms extends Component<ITermsProp, ITermsState> {
    
    constructor(props: ITermsProp) {
        super(props);

        this.state = {
        };

        this.submitTerm = this.submitTerm.bind(this);
        this.deleteTerm = this.deleteTerm.bind(this);
    }

    submitTerm(term: string) {
        if (this.props.onSubmitTerm)
            this.props.onSubmitTerm(term);
    }

    deleteTerm(term: string) {
        if (this.props.onDeleteTerm)
            this.props.onDeleteTerm(term);
    }

    render() {
        return (
            <Container>
                <Grid>
                    <Grid.Column floated='left' width={11}>
                        <TermList
                            terms={this.props.terms}
                            onDeleteTerm={this.deleteTerm} />
                    </Grid.Column>
                    <Grid.Column floated='right' width={5}>
                        <AddTerm 
                            onSubmitTerm={this.submitTerm} />
                    </Grid.Column>
                </Grid> 
            </Container>
        );
    }

}

export default Terms;