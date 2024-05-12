import React, { Component, Suspense } from 'react';
import { Container, Button, Form, Grid, Header, Image, Message, Segment  } from 'semantic-ui-react';

interface ILoginProps {
}

interface ILoginState {
}

class Login extends Component<ILoginProps, ILoginState> {
    
    constructor(props: ILoginProps) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='blue' textAlign='center'>
                        <Image src='/logo.png' /> Log-in to your account
                    </Header>
                    <Form size='large'>
                        <Segment stacked>
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                        />

                        <Button color='blue' fluid size='large'>
                            Login
                        </Button>
                        </Segment>
                    </Form>
                    <Message>
                        Don't have an account? <a href='#'>Contact administrator</a>
                    </Message>
                    </Grid.Column>
                </Grid>
            </Container>
        );
    }
}

export default Login;