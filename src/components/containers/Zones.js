import React, { Component } from 'react'
import Zone from '../presentation/Zone'
import Superagent from 'superagent'

class Zones extends Component {

    constructor(){
        super()
        this.state = {
            zone: {
                name: '',
                zipCodes: '',
                numComments: ''
            },
            list: []
        }
    }

    componentDidMount(){
        console.log('componentDidMount')
        Superagent
        .get('/api/zone')
        .query(null)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if(err){
                alert('Error: '+err)
                return
            }
            console.log(JSON.stringify(response.body))
            let results = response.body.results

            this.setState({
                list: results
            })
        })
    }

    submitZone(){
        let updatedList = Object.assign([], this.state.list)
        updatedList.push(this.state.zone)

        this.setState({
            list: updatedList
        })
    }
    newZone(event){
        let newZone = Object.assign({}, this.state.zone)
        newZone[event.target.id] = event.target.value
        this.setState({
            zone: newZone
        })
    }


    render(){

        const listItems = this.state.list.map((zone, i) => {
            return (
                <li key={i}>
                    <Zone currentZone={zone} />
                </li>
            )
        })

        return(
            <div>
                <ol>
                    {listItems}
                </ol>
                <div>
                    <input id="name" onChange={this.newZone.bind(this)} className="form-control" type="text" placeholder="Enter Zone Name" /><br />
                    <input id="zipCodes" onChange={this.newZone.bind(this)} className="form-control" type="text" placeholder="Enter Zip Code" /><br />
                    <input id="numComments" onChange={this.newZone.bind(this)} className="form-control" type="text" placeholder="Enter number of comments" /><br />
                    <button onClick={this.submitZone.bind(this)} className="btn btn-danger">Submit Comment</button>
                </div>
            </div>
        )
    }
}
export default Zones
