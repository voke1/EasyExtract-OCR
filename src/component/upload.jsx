import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, FormText, Input } from 'reactstrap'
import FileBase64 from 'react-file-base64'
import './input.css'
import Axios from 'axios'




class Upload extends Component {


    /**
     * @description class to get extracted input
     * @type {Class}
     * @property [Function] - extractText
     */
    state = {
        confirmation: "",
        isLoading: "",
        files: "",
        invoice: "",
        invoiceDate: "",
        vendor: "",
        description: "",
        amount: "",

    }


    /**
     * @description function to extract data from uploaded document
     * @type {Function}
     * @returns void
     */
    extractText = async (UID) => {

        this.setState({
            isLoading: "extracting data..."
        })
        const targetImage = UID + '.png';


        //FIXME: Fix AWS CORS errors occurence
        const response = await fetch('https://enxdkp3bw8.execute-api.us-west-2.amazonaws.com/Production/ocr',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(targetImage)
            })

        const OCRBody = await response.json();
        this.setState({ amount: OCRBody.body[0], invoice: OCRBody.body[1], invoiceDate: OCRBody.body[2], isLoading: null })

    }

    /**
    * @description function to upload document to AWS S3
    * @type {Function}
    * @callback extractText
    */
    getFiles = async (files) => {

        this.setState({
            isLoading: "processing document...", files: files
        })

        const UID = Math.round(1 + Math.random() * (100000 - 1))

        let data = {
            fileExt: 'png',
            imageID: UID,
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
            })

        this.extractText(UID);

    }

    handleChange = (event) => {

        event.preventDefault()

        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({ name: value })

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ confirmation: "Uploading..." })

    }

    render() {
        const processing = this.state.isLoading
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
                            <Input type='text' name='invoice' id='invoice' value={this.state.invoice} onChange={this.handleChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                <h6> Amount</h6>

                            </Label>
                            <Input type='text' name='amount' id='amount' value={this.state.amount} onChange={this.handleChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                <h6> Date</h6>

                            </Label>
                            <Input type='text' name='invoiceDate' id='invoiceDate' value={this.state.invoiceDate} onChange={this.handleChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                <h6> Vendor</h6>

                            </Label>
                            <Input type='text' name='vendor' id='vendor' value={this.state.vendor} onChange={this.handleChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                <h6> Description</h6>

                            </Label>
                            <Input type='text' name='description' id='description' value={this.state.description} onChange={this.handleChange} required />
                        </FormGroup>
                        <Button className='btn btn-lg btn-block btn-success'> Submit</Button>
                    </Form>
                </div>

            </div>
        )
    }
}

export default Upload
