import React, { Component } from 'react'
import Comment from '../presentation/Comment'
import Superagent from 'superagent'

class Comments extends Component {

    constructor(){
        super()
        this.state = {
            comment: {
                username: '',
                body: '',
                timestamp: ''
            },
            list: []
        }
    }

    componentDidMount(){
        console.log('componentDidMount')
        Superagent
        .get('/api/comment')
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

    submitComment(){
        console.log('submitComment: '+JSON.stringify(this.state.list))
        let updatedList = Object.assign([], this.state.list)
        updatedList.push(this.state.comment)

        this.setState({
            list: updatedList
        })
    }

    updateUsername(event){
        //this.state.comment['username'] = event.target.value// WRONG!!
        let updatedComment = Object.assign({}, this.state.comment)
        updatedComment['username'] = event.target.value
        this.setState({
            comment: updatedComment
        })
    }

    updateBody(event){
        let updatedComment = Object.assign({}, this.state.comment)
        updatedComment['body'] = event.target.value
        this.setState({
            comment: updatedComment
        })
    }
    updateTime(event){
        let updatedComment = Object.assign({}, this.state.comment)
        updatedComment['time'] = event.target.value
        this.setState({
            comment: updatedComment
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
                        <input onChange={this.updateUsername.bind(this)} className="form-control" type="text" placeholder="Username" /><br />
                        <input onChange={this.updateBody.bind(this)} className="form-control" type="text" placeholder="Comment" /><br />
                        <input onChange={this.updateTime.bind(this)} className="form-control" type="text" placeholder="Time" /><br />
                        <button onClick={this.submitComment.bind(this)} className="btn btn-info">Submit Comment</button>

                    </div>
                </div>
            </div>
        )
    }
}
export default Comments
