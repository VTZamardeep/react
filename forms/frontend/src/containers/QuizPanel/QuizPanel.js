import React, { Component } from "react";
import classes from "./QuizPanel.css"
import Question from "../../components/Question/Question";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import Answer from "../../components/Answer/Answer";
import ShowResponse from "../../components/ShowResponse/ShowResponse";
import Axios from "../../axiosConfig";
import * as Constants from "../../Constants/Constants";
import Modal from "../../components/UI/Modal/Modal";
import CardAns from "../../components/UI/Card/card"
import * as LocalStorage from "../../Utilities/localStorage";

/**this class controls the quiz component where question answer with responses will be shown */
class QuizPanel extends Component {

    state = {
        loading: true,
        questionIds: null,
        questionId: null,
        questionInfo: null,
        answer: null,
        questionIndex: null,
        showResponse: false,
        isValid: false,
        showModal: false
    }

    /**when component will mount it will look in localstorage firts if some data is found test will be restarted or api call to server will be called 
     * to get all the questions and their ids and for loop will insert an empty answer object in questionIds state where answers will be saved when users submit answers.
      modal will come out if url not found*/
    componentDidMount() {
        if (LocalStorage.getLocalStorage(Constants.LOCAL_STORAGE_INFO)) {
            let data = LocalStorage.getLocalStorage(Constants.LOCAL_STORAGE_INFO);
            data = JSON.parse(data);
            this.setState({
                loading: data.loading,
                questionIds: data.questionIds,
                questionId: data.questionId,
                data: data.data,
                answer: data.answer,
                questionIndex: data.questionIndex,
                showResponse: data.showResponse,
                isValid: data.isValid,
            }, () => this.getQuestion())
        } else {
            Axios.get(Constants.GETQUESTION_IDS).then(res => {
                this.setState({
                    questionIds: res.data.data,
                    questionId: res.data.data[0].id,
                    questionIndex: 0
                }, () => {
                    const updatedQuestionIds = this.state.questionIds.map(id => {
                        return {
                            ...id,
                            //inserting empty object
                            answer: {},
                        }
                    });
                    this.setState({
                        questionIds: updatedQuestionIds,
                    }, () => this.getQuestion())
                })
            }).catch(error => {
                this.setState({
                    showModal: Constants.API_NOT_FOUND
                })
            });
        }

    }

    /**whenever change is detected in input element this mwthod will be invoked
     * It will update the answer state with new values.
     * It takes event and type of element which is changed as parameters.
     */
    answerHandler = (event, elementType) => {
        let targetName = event.target.name;
        let targetValue = event.target.value;
        const updatedAnswer = { ...this.state.answer };
        //special case for checkbox as we may have multiple values
        if (elementType === "checkbox") {
            function check(answer) {
                return answer === event.target.value;
            }
            const indexOfValue = this.state.answer[event.target.name].findIndex(check);
            if (indexOfValue === -1) {
                //adding if answer to array doesnot exists
                updatedAnswer[event.target.name].push(event.target.value);
            } else {
                //removing answer  from array already exists
                updatedAnswer[event.target.name].splice(indexOfValue, 1);
            }
        } else {
            updatedAnswer[event.target.name] = event.target.value;
        }
        this.setState({
            answer: updatedAnswer,
        }, () => this.validity(targetName, targetValue))
    }

    /**if old state is present this will be invoked
     * answer state will be updated with last answers.
     * questionIndex is parameter which is the refrences to questionIds array and extracts the values from there.
     */
    loadOldState = (questionIndex) => {
        if (Object.entries(this.state.questionIds[questionIndex].answer).length > 0) {
            const oldAnswers = { ...this.state.questionIds[questionIndex].answer };
            this.setState({
                answer: oldAnswers
            }, () =>  LocalStorage.setLocalStorage(Constants.LOCAL_STORAGE_INFO,this.state))

        } else {
            LocalStorage.setLocalStorage(Constants.LOCAL_STORAGE_INFO,this.state)
        }
    }

    /**this will update the questionIndex and id of question which points to new question  now */
    nextQuestionHandler = () => {
        if (this.state.questionIndex < this.state.questionIds.length - 1) {
            this.setState({
                questionId: this.state.questionIds[this.state.questionIndex + 1].id,
                questionIndex: this.state.questionIndex + 1,
                isValid: false
            }, () => { this.getQuestion() })
        } else {
            this.setState({
                showModal: Constants.THANKYOU
            }, () => LocalStorage.setLocalStorage(Constants.LOCAL_STORAGE_INFO,this.state));
        }


    }

     /**this will update the questionIndex and id of question which points to prev question  now */
    prevQuestionHandler = () => {
        if (this.state.questionIndex) {
            if (this.state.questionIndex > 0) {
                this.setState({
                    questionId: this.state.questionIds[this.state.questionIndex - 1].id,
                    questionIndex: this.state.questionIndex - 1,
                }, () => {
                    this.getQuestion();
                })
            }
        }
    }

    /**this method is handling api call and updates the questionInfo state by fetching info from server */
    getQuestion = () => {
        Axios.get(Constants.GETQUESTION + this.state.questionId)
            .then(response => {
                let answerObject = {};
                Object.keys(response.data.data[0].elementName).map(type => {
                    if (type === "checkbox") {
                        return answerObject[response.data.data[0].elementName[type]] = [];
                    } else {
                        return answerObject[response.data.data[0].elementName[type]] = "null";
                    }

                })
                this.setState({
                    loading: false,
                    questionInfo: response.data.data[0],
                    answer: answerObject,
                }, () => this.loadOldState(this.state.questionIndex));
            })
            .catch(error => {
                this.setState({
                    showModal:error
                })
            });
    }

    /**this method saves the answer in questionIds's answer object permanently */
    submitHandler = () => {
        const newIds = this.state.questionIds;
        newIds[this.state.questionIndex].answer = this.state.answer;
        this.setState({
            questionIds: newIds
        }, () => this.nextQuestionHandler());
    }

    /**will show response if clicked */
    showResponseHandler = () => {
        this.setState({
            showResponse: !this.state.showResponse
        })
    }

    /**validating all the rules if there are rules present */
    validity = (targetName, targetValue) => {
        let isValid = true;
        if (this.state.questionInfo.validation[targetName]) {
            Object.keys(this.state.questionInfo.validation[targetName]).map(rule => {
                if (rule === Constants.MAXLENGTH) {
                   return  isValid = targetValue.length < this.state.questionInfo.validation[targetName][rule] && isValid;
                }
                if (rule === Constants.MINLENGTH) {
                    return isValid = targetValue.length > this.state.questionInfo.validation[targetName][rule] && isValid;
                }
                if (rule === Constants.MAIL) {
                    return isValid = targetValue && isValid;
                } else {
                    return isValid = true
                }
            });
        }
        this.setState({
            isValid: isValid
        })
    }

    /**modal will be showm or hide if present  */
    showModalHandler = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    render() {
        let question = <Spinner />;
        let answer = null;
        let responses = null;
        let modal = null;

        if (this.state.questionInfo) {
            question = <Question question={this.state.questionInfo.question} />
            answer = Object.keys(this.state.questionInfo.elementConfig).map(elementType => {
                return <CardAns key={"card"+elementType}><Input key={"input" + elementType} answer={this.state.answer} change={this.answerHandler} elementType={elementType} elementConfig={this.state.questionInfo.elementConfig[elementType]} /></CardAns>
            })

        }

        if (this.state.showResponse) {
            responses = Object.keys(this.state.questionIds).map(response => {
                return <ShowResponse response={this.state.questionIds[response]} />
            })
        }

        if (this.state.showModal) {
            modal = <Modal show={this.state.showModal} modalClosed={this.showModalHandler}>{this.state.showModal}</Modal>
        }

        return (
            <div>
                {question}
                <Answer>
                    {answer}
                </Answer>
                <div className={classes.ButtonSet}>
                    <Button btnType={Constants.SUCCESS} disabled={!this.state.questionIndex} clicked={() => this.prevQuestionHandler()}>PREV</Button>
                    <Button btnType={Constants.SUCCESS} disabled={!this.state.isValid} clicked={() => this.submitHandler()}>SUBMIT</Button>
                    <Button btnType={Constants.SUCCESS} clicked={() => this.showResponseHandler()}>RESPONSES</Button>
                </div>
                {responses}
                {modal}
            </div>

        )
    }
}

export default QuizPanel;