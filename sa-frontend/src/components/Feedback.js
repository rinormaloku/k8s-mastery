import React, {Component} from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';

class Feedback extends Component {

    propTypes = {
        sentence: PropTypes.string.isRequired,
        polarity: PropTypes.number.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            snackbarOpen: false,
            snackbarMessage: undefined
        };
        this.submitWrongAnalysis = this.submitWrongAnalysis.bind(this);
    }

    submitCorrectAnalysis = () => {
        return this.submitFeedback(true);
    };

    submitWrongAnalysis = () => {
        return this.submitFeedback(false);
    };

    submitFeedback = isCorrect => {
        return fetch('/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.assign({}, this.props, {correct: isCorrect}))
        })
            .then(response => this.showSnackbar(response.status))
    };

    showSnackbar = status => {
        const success = status === 201;
        const message = success ? "Thanks for the feedback :)" : "Service not available";
        this.setState({
            snackbarOpen: success,
            snackbarMessage: message
        })
    };

    handleClose = () => {
        this.setState({
            snackbarOpen: false,
            snackbarMessage: undefined,
        });
    };

    render() {
        return <div className="feedback">
            <p>Was the analysis correct?</p>
            <IconButton onClick={this.submitCorrectAnalysis}>
                <i className="material-icons md-16 md-light">check</i>
            </IconButton>
            <IconButton onClick={this.submitWrongAnalysis}>
                <i className="material-icons md-16 md-light">close</i>
            </IconButton>
            <Snackbar
                open={this.state.snackbarOpen}
                message={this.state.snackbarMessage}
                autoHideDuration={4000}
                onRequestClose={this.handleClose}
            />
        </div>
    }
}

export default Feedback;