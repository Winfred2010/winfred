import React from 'react';

// --- Exercise 1: BuggyCounter and ErrorBoundary ---

class BuggyCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { counter: 0 };
    }

    handleClick = () => {
        this.setState(({ counter }) => ({
            counter: counter + 1
        }));
    }

    render() {
        if (this.state.counter === 5) {
            throw new Error('I crashed!');
        }
        return <h1 onClick={this.handleClick} style={{ cursor: 'pointer', border: '1px dashed grey', display: 'inline-block', padding: '10px' }}>{this.state.counter}</h1>;
    }
}

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    }

    render() {
        if (this.state.error) {
            return (
                <details style={{ whiteSpace: 'pre-wrap', color: 'red' }}>
                    {this.state.error && this.state.error.toString()}
                    <br />
                    {this.state.errorInfo.componentStack}
                </details>
            );
        }
        return this.props.children;
    }
}

// --- Exercise 2 & 3: Lifecycle ---

class Child extends React.Component {
    componentWillUnmount() {
        alert("The component named Child is about to be unmounted.");
    }

    render() {
        return (
            <h1>Hello World!</h1>
        );
    }
}

class Color extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favoriteColor: 'red',
            show: true
        };
    }

    shouldComponentUpdate() {
        return true; 
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ favoriteColor: 'yellow' });
        }, 1000);
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("after update");
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log("in getSnapshotBeforeUpdate");
        return null;
    }

    changeColor = () => {
        this.setState({ favoriteColor: 'blue' });
    }

    handleDelete = () => {
        this.setState({ show: false });
    }

    render() {
        return (
            <div style={{ padding: '10px', border: '2px solid black', marginTop: '20px' }}>
                <h1>My Favorite Color is <i>{this.state.favoriteColor}</i></h1>
                <button onClick={this.changeColor}>Change Color</button>
                <hr />
                {this.state.show && <Child />}
                <button onClick={this.handleDelete}>Delete Header</button>
            </div>
        );
    }
}

// --- Main Application ---

export default function XPApp() {
    return (
        <div style={{ padding: '20px' }}>
            <h2>Simulation 1: Two counters in one ErrorBoundary</h2>
            <ErrorBoundary>
                <BuggyCounter />
                <BuggyCounter />
            </ErrorBoundary>
            <hr />
            <h2>Simulation 2: Each counter in its own ErrorBoundary</h2>
            <ErrorBoundary><BuggyCounter /></ErrorBoundary>
            <ErrorBoundary><BuggyCounter /></ErrorBoundary>
            <hr />
            <h2>Simulation 3: No ErrorBoundary (Crashes entire tree)</h2>
            <BuggyCounter />
            <hr />
            <h2>Lifecycle Exercises</h2>
            <Color />
        </div>
    );
}