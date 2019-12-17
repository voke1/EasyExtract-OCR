import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, FormText}  from 'reactstrap'
import FileBase64 from 'react-file-base64' 
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'



class Upload extends Component {

    state = {
        
    }
    processing='processing document...'

    handleSubmit=(e)=>{
        e.preventDefault();
    }

    render() {
        return (
            <div className='row'>
                <div className='col-6 offset-3'>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <h3 className='text-danger'>
                                {this.processing}
                            </h3>
                            <h6>Upload Invoice</h6>
                            <FormText color='muted'> PNG, JPG</FormText>
                        </FormGroup>
                    </Form>
                </div>
                
            </div>
        )
    }
}

export default Upload
