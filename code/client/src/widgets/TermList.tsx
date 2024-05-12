import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import Term from './Term';

interface ITermListProp {
    terms: string[],
    onDeleteTerm?: (term: string) => void
}

interface ITermListState {
    terms: string[]
}

class TermList extends Component<ITermListProp, ITermListState> {
    
    constructor(props: ITermListProp) {
        super(props);

        this.state = {
            terms: this.props.terms
        };

        this.deleteTerm = this.deleteTerm.bind(this);
    }

    componentWillReceiveProps(props: ITermListProp) {
        this.setState({
            terms: props.terms
        });
    }

    deleteTerm(term: string) {
        if (this.props.onDeleteTerm)
            this.props.onDeleteTerm(term);
    }

    render() {
        return (
            <Container>
            {(this.state.terms.length === 0) ?
            'No terms here.' :
            this.state.terms.map(term =>
                    <Term  
                        term={term}
                        onDeleteTerm={this.deleteTerm} />
                )
            }
            </Container>
        );
    }

}

export default TermList;