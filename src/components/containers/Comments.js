import React, { Component } from 'react'
import { Comment, CreateComment  } from '../presentation'
import { APImanager } from '../../utils'

class Comments extends Component {

    constructor(){
        super()
            this.state = {
                list: [ ]
            }
    }

    componentDidMount(){
        // console.log('componentDidMount')
        APImanager.get('/api/comment', null, (err, response) => {
            if(err){
                alert('Error in zones: '+err.message)
                return
            }
            // console.log(JSON.stringify(response))
            this.setState({
                list: response.results
            })
        })
    }

    submitComment(comment){
        console.log('NewComment to update state: '+JSON.stringify(this.state.list))
        // console.log('NewComment: '+JSON.stringify(comment))
        let newComment = Object.assign({}, comment)
        APImanager.post('/api/comment', newComment, (err, response) => {
            if(err) {
                alert('ERROR in New Zone: '+err.message)
                return
            }

            let updatedList = Object.assign([], this.state.list)
            console.log('NewComment to update state: '+JSON.stringify(updatedList))
            updatedList.push(response.result)
            this.setState({
                list: updatedList
            })
        })
    }

    render(){

        const commentListItems = this.state.list.map((comment, i) => {
            return (
                <li key={i}>
                    <Comment currentComment={comment} />

                </li>
            )
        })

        return(
            <div>
                <h3>Zone 1</h3>
                <div>
                    <ul>
                        {commentListItems}
                    </ul>
                    <div>
                        <CreateComment onCreate={this.submitComment} />
                    </div>
                </div>
            </div>
        )
    }
}
export default Comments
