import React, {Component} from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';

class Feedback extends Component {

    static propTypes = {
        sentence: PropTypes.string.isRequired,
        polarity: PropTypes.number.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            beforeFeedbackSubmitted: true,
            snackbarOpen: false,
            snackbarMessage: ''
        };
        this.submitWrongAnalysis = this.submitWrongAnalysis.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            beforeFeedbackSubmitted: true,
            snackbarOpen: false,
            snackbarMessage: ''
        });
    }

    submitCorrectAnalysis = () => {
        return this.submitFeedback(true);
    };

    submitWrongAnalysis = () => {
        return this.submitFeedback(false);
    };

    submitFeedback = isCorrect => {
        fetch('http://localhost:9000/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.assign({}, this.props, {correct: isCorrect}))
        })
            .then(response => this.showSnackbarAndHideFeedbackOnSuccess(response.status))
            .catch(() => this.showSnackbarAndHideFeedbackOnSuccess(null))
    };

    showSnackbarAndHideFeedbackOnSuccess = status => {
        const success = status === 201;
        const message = success ? "Thanks for the feedback :)" : "Service currently not available";
        const keepFeedbackQueryOnServiceFailure = !success;

        this.setState({
            beforeFeedbackSubmitted: keepFeedbackQueryOnServiceFailure,
            snackbarOpen: true,
            snackbarMessage: message
        })
    };

    handleClose = () => {
        this.setState({
            snackbarOpen: false,
            snackbarMessage: '',
        });
    };

    feedbackQuery() {
        return <div className="feedback">
            <p>Was the analysis correct?</p>
            <IconButton onClick={this.submitCorrectAnalysis}>
                <i className="material-icons md-16 md-light">check</i>
            </IconButton>
            <IconButton onClick={this.submitWrongAnalysis}>
                <i className="material-icons md-16 md-light">close</i>
            </IconButton>
        </div>;
    }

    render() {
        const feedbackQueryComponent = this.state.beforeFeedbackSubmitted ?
            this.feedbackQuery() :
            null;

        return <div>
            {feedbackQueryComponent}
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