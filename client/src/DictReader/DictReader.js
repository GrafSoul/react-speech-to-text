import React, { useState, useEffect, useRef } from 'react';
import {
    Container,
    Button,
    Form,
    FormGroup,
    Input,
    FormText,
} from 'reactstrap';

import classes from './DictReader.module.css';

const DictReader = () => {
    // eslint-disable-next-line no-undef
    const recognition = useRef(null);
    const textRef = useRef(null);
    const panelRef = useRef(null);
    const wordRef = useRef(null);

    const [text, setText] = useState('');

    const [isSpeak, setIsSpeak] = useState(true);
    const [isRecord, setIsRecord] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line no-undef
        recognition.current = new webkitSpeechRecognition();
        recognition.current.continuous = true;
        recognition.current.interimResults = true;
    }, [recognition]);

    const handlerText = (e) => {
        setText(e.target.value);
        if (text === '') {
            setIsSpeak(true);
        }
    };

    const handlerToggleRecord = () => {
        if (!isRecord) {
            setIsRecord(true);
            recognition.current.onresult = (event) => {
                let output = text === '' ? text : text + ' ';

                for (var i = 0; i < event.results.length; i++) {
                    output = output + event.results[i][0].transcript;
                }

                setText(output);
            };
            recognition.current.start();
        } else {
            setIsRecord(false);
            recognition.current.stop();
        }
    };

    const handlerCreateEmail = () => {
        setIsRecord(false);
        recognition.current.stop();

        let n = text.indexOf('\n');
        if (n < 0 || n >= 80) {
            n = 40 + text.substring(40).indexOf(' ');
        }
        let subject = encodeURI(text.substring(0, n));
        let body = encodeURI(text.substring(n + 1));
        window.location.href = 'mailto:?subject=' + subject + '&body=' + body;
    };

    const handleCopyLink = () => {
        setIsRecord(false);
        recognition.current.stop();

        navigator.clipboard
            .writeText(text)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 1000);
            })
            .catch((err) => {
                console.log('Something went wrong', err);
            });
    };

    return (
        <>
            <Container className={classes.content}>
                <div className={classes.contentWrap}>
                    <div className={`mt-4 p-5 rounded ${classes.jumbotron}`}>
                        <Form action="" method="get">
                            <FormText className={classes.info}>
                                Simple app for demonstration. The app allows you
                                to convert text spoken by voice to text.
                                <br />
                                <b>
                                    The app only works stably in Google Chrome.
                                </b>
                                <br />
                                The application is implemented using - React.js
                                and the Web Speech API. <br />
                                Click the "Record" button and say a few words,
                                the spoken text will appear in the text field of
                                the app. <br /> You can send the dictated text
                                using Gmail or save it to the clipboard
                            </FormText>

                            <FormGroup className={classes.formGroup}>
                                <div
                                    ref={panelRef}
                                    className={
                                        isSpeak ? null : classes.panelText
                                    }
                                ></div>
                                <div
                                    className={
                                        isSpeak ? null : classes.textareaBlocked
                                    }
                                >
                                    <div
                                        ref={wordRef}
                                        className={
                                            isSpeak ? null : classes.currentWord
                                        }
                                    ></div>
                                </div>

                                <Input
                                    disabled={isSpeak ? false : true}
                                    type="textarea"
                                    id="text"
                                    ref={textRef}
                                    className={classes.inputText}
                                    value={text}
                                    onChange={(e) => handlerText(e)}
                                ></Input>
                            </FormGroup>
                            <FormGroup className={classes.buttonGroup}>
                                <Button
                                    type="button"
                                    id="button-record"
                                    color={isRecord ? 'danger' : 'success'}
                                    className={[
                                        classes.button,
                                        isRecord ? classes.blink : null,
                                    ].join(' ')}
                                    onClick={handlerToggleRecord}
                                >
                                    <i className="fas fa-microphone-alt"></i>{' '}
                                    Record
                                </Button>

                                <Button
                                    disabled={!text ? true : false}
                                    type="button"
                                    id="button-record"
                                    color="info"
                                    className={classes.button}
                                    onClick={handlerCreateEmail}
                                >
                                    <i className="fas fa-envelope"></i> Email
                                </Button>

                                <Button
                                    disabled={!text ? true : false}
                                    type="button"
                                    id="button-record"
                                    color={isCopied ? 'success' : 'info'}
                                    className={classes.button}
                                    onClick={handleCopyLink}
                                    style={{
                                        display: 'inline-block',
                                        width: '100px',
                                    }}
                                >
                                    <i className="fas fa-copy"></i>{' '}
                                    {isCopied ? 'Copied' : 'Copy'}
                                </Button>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default DictReader;
