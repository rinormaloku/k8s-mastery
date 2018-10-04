import React, { Component } from 'react';
import './App.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Polarity from "./components/Polarity";

const style = {
    marginLeft: 12,
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sentence: '',
            polarity: undefined
        };
    };

    analyzeSentence() {
        fetch('/sentiment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({sentence: this.textField.getValue()})
        })
            .then(response => response.json())
            .then(data => this.setState(data));
    }

    onEnterPress = e => {
        if(e.key === 'Enter') {
            this.analyzeSentence();
        }
    };


    render() {
        if(!this.props.auth.isAuthenticated()) {
            this.props.auth.login();
            return;
        }

        const polarityComponent = this.state.polarity !== undefined ?
            <Polarity sentence={this.state.sentence} polarity={this.state.polarity}/> :
            null;

        return (
            <div className="centerize">
                <Paper zDepth={1} className="content">
                    <h2>Sentiment Analyser</h2>
                    <TextField ref={ref => this.textField = ref} onKeyUp={this.onEnterPress.bind(this)}
                               hintText="Type your sentence."/>
                    <RaisedButton  label="Send" style={style} onClick={this.analyzeSentence.bind(this)}/>
                    {polarityComponent}
                </Paper>
            </div>
        );
    }
}

export default App;
