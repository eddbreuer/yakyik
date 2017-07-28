import React, { Component } from 'react'

class CreateZone extends Component {
    constructor(){
        super()
            this.state = {
                zone: {
                    name: '',
                    zipCodes: []
                }
            }
    }

    newZone(event){
        let newZone = Object.assign({}, this.state.zone)
        newZone[event.target.id] = event.target.value
        this.setState({
            zone: newZone
        })
    }
    submitZone(event){
        this.props.onCreate(this.state.zone)
    }

    render(){
        return(
            <div>
            <input id="name" onChange={this.newZone.bind(this)} className="form-control" type="text" placeholder="Enter Zone Name" /><br />
            <input id="zipCodes" onChange={this.newZone.bind(this)} className="form-control" type="text" placeholder="Enter Zip Code" /><br />
            <button onClick={this.submitZone.bind(this)} className="btn btn-danger">Submit Comment</button>
            </div>
        )
    }
}
export default CreateZone
