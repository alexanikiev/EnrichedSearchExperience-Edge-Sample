import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';

interface IAddTermProp {
    onSubmitTerm?: (term: string) => void
}

interface IAddTermState {
    term: string
}

class AddTerm extends Component<IAddTermProp, IAddTermState> {
    constructor(props: IAddTermProp) {
        super(props);

        this.state = {
            term: ''
        };

        this.submitTerm = this.submitTerm.bind(this);
        this.changeTerm = this.changeTerm.bind(this);
    }

    submitTerm(event: any) {
        event.preventDefault();
        if (event.target[0].value === '')
            return;
        let term = event.target[0].value;
        if(this.props.onSubmitTerm)
            this.props.onSubmitTerm(term);
        this.setState({ 
            term: ''
        });
    }

    changeTerm(event:any) {
        this.setState({ 
            term: event.target.value
        }); 
    }

    render() {
        return (
            <form onSubmit={this.submitTerm}>
                <div>
                    <Input
                        icon='tag'
                        iconPosition='left'
                        placeholder='Add term' 
                        value={this.state.term} 
                        onChange={this.changeTerm} 
                    />
                </div>
            </form>
        );
    }  
}

export default AddTerm;