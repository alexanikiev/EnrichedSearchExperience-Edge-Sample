import React, { Component } from 'react';
import { Segment, Form, Input, Icon, Label, Button } from 'semantic-ui-react';

interface IAddInsightProps {
}

interface IAddInsightState {
    error: any,
    success: any,
    progress: boolean
}

class AddInsight extends Component<IAddInsightProps, IAddInsightState> {
    
    constructor(props: IAddInsightProps) {
        super(props);

        this.state = {
            error: undefined,
            success: undefined,
            progress: false
        };

        this.formSubmit = this.formSubmit.bind(this);
    }

    render() {
        return (
            <Segment>
                <Form encType="multipart/form-data" onSubmit={this.formSubmit}>
                    <Form.Field>
                        <label>Hierarchies:</label>
                    </Form.Field>
                    <Form.Field>
                        <label>Tags:</label>
                    </Form.Field>
                    <Form.Field>
                        Insight
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

    formSubmit(event: any) {
        this.setState({
            progress: true
        });

        event.preventDefault();

        this.setState({
            progress: false
        });
    }
}

export default AddInsight;