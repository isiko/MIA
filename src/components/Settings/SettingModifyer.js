
//export default function SettingModifyer({ name, options, selectedIndex, callback }) {

import { React, Component } from 'react'

export default class SettingModifyer extends Component {
    onClick() {
        this.state.selectedIndex++;
        if (this.state.selectedIndex >= this.options.length) {
            this.state.selectedIndex = 0;
        }
        this.setState(this.state)

        this.callback(this.name, this.state.selectedIndex);
    }

    constructor(props){
        super(props);

        this.state = {
            selectedIndex: props.selectedIndex,
        }

        this.callback = props.callback
        this.name = props.name
        this.options = props.options

        this.onClick = this.onClick.bind(this);
    }

    render() {
        return (
            <button className='bg-purple-500 p-4 rounded' onClick={this.onClick}>
                {this.name} <br/>
                {this.options[this.state.selectedIndex]}
            </button>
        )
    }
}

