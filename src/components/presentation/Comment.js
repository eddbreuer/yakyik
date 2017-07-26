import React, { Component } from 'react'
import styles from './styles'

class Comment extends Component {
    render(){
        return(
            <div style={styles.container}>
                <span>{this.props.currentComment.body}</span><br/>
                <span >At {this.props.currentComment.timestamp} | </span>
                <span style={styles.heading}><a style={styles.linkzones} href="#">{this.props.currentComment.username}</a></span>
            </div>
        )
    }
}

export default Comment
