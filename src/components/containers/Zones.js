import React, { Component } from 'react'
import { Zone, CreateZone  } from '../presentation'
import { APImanager } from '../../utils'

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
        APImanager.get('/api/zone', null, (err, response) => {
            if(err){
                alert('Error in zones: '+err.message)
                return
            }

            this.setState({
                list: response.results
            })
        })
     }

    submitZone(zone){
        let newZone = Object.assign({}, zone)

        APImanager.post('/api/zone', newZone, (err, response) => {
            if(err) {
                alert('ERROR in New Zone: '+err.message)
                return
            }
            console.log('NewZone: '+JSON.stringify(response))
            let updatedList = Object.assign([], this.state.list)
            updatedList.push(response.result)
            this.setState({
                list: updatedList
            })


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
                    <CreateZone onCreate={this.submitZone} />
                </div>
            </div>
        )
    }
}
export default Zones
