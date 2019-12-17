import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, FormText, Input } from 'reactstrap'
import FileBase64 from 'react-file-base64'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import './input.css'



class Upload extends Component {

    state = {
        confirmation: null,
        isLoading: null,
        files: null,
        invoice: null,
        date: null,
        vendor: null,
        description: null,

    }

    getFiles = async (files) => {

        this.setState({
            isLoading: "extracting data...", files: files
        })

        const UID = Math.round(1 + Math.random() * (100000 - 1))

        let data = {
            fileExt: 'png',
            imageId: UID,
            folder: UID,
            img: this.state.files[0].base64
        }

        await fetch('https://enxdkp3bw8.execute-api.us-west-2.amazonaws.com/Production/',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application-json'
                },
                body: JSON.stringify(data)
            }).then(function (res) {
                console.log("This is res:", res)
            })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ confirmation: "Uploading..." })

    }

    render() {
        const processing = 'processing document...'
        return (
            <div className='row'>
                <div className='col-6 offset-3'>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <h3 className='text-danger'>
                                {processing}
                            </h3>
                            <h6>Upload Invoice</h6>
                            <div className='form-group files color'>
                                <FileBase64 multiple={true} onDone={this.getFiles.bind(this)}></FileBase64>
                            </div>
                            <FormText color='muted'> PNG, JPG</FormText>
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                <h6> Invoice</h6>

                            </Label>
                            <Input type='text' name='invoice' id='invoice' value={this.state.invoice} required />
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                <h6> Amount</h6>

                            </Label>
                            <Input type='text' name='amount' id='amount' value={this.state.amount} required />
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                <h6> Date</h6>

                            </Label>
                            <Input type='text' name='date' id='date' value={this.state.date} required />
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                <h6> Vendor</h6>

                            </Label>
                            <Input type='text' name='vendor' id='vendor' value={this.state.vendor} required />
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                <h6> Description</h6>

                            </Label>
                            <Input type='text' name='description' id='description' value={this.state.description} required />
                        </FormGroup>
                        <Button className='btn btn-lg btn-block btn-success'> Submit</Button>
                    </Form>
                </div>

            </div>
        )
    }
}

export default Upload
