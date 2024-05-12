import React, { Component } from 'react';
import { Label } from 'semantic-ui-react';

interface IErrorBoundaryProps {
}

interface IErrorBoundaryState {
    hasError: boolean
}

class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
    
    constructor(props: IErrorBoundaryProps) {
        super(props);

        this.state = { 
            hasError: false 
        };
    }

    static getDerivedStateFromError(error: any) {
        return { hasError: true };
    }

    componentDidCatch(error: any, info: any) {
        //logErrorToMyService(error, info);
    }

    render() {
        if (this.state.hasError) {
            return <Label>Oops :(</Label>;
        }
        return this.props.children; 
    }
}

export default ErrorBoundary;