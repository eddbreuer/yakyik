import React, { Component } from 'react'
import styles from './styles'

class Zone extends Component {
    render(){
        return(
            <div style={styles.container}>
                <h2 style={styles.heading}><a style={styles.linkzones} href="#">{this.props.currentZone.name}</a></h2>
                <span className="detail">{this.props.currentZone.zipCodes}</span><br/>
                <span className="detail">{this.props.currentZone.numComments} comments</span>
            </div>
        )
    }
}

export default Zone
