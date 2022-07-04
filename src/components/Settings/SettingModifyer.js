import { React, Component } from 'react'

export default class SettingModifyer extends Component {
    onClick() {
        this.state.selectedIndex++;
        if (this.state.selectedIndex >= this.options.length) {
            this.state.selectedIndex = 0;
        }
        this.setState(this.state)

        this.callback(this.index, this.state.selectedIndex);
    }

    constructor(props){
        super(props);

        this.state = {
            selectedIndex: props.selectedIndex,
        }

        this.callback = props.callback
        this.name = props.name
        this.options = props.options
        this.index = props.index

        this.isBinary = this.options.length === 2;

        this.onClick = this.onClick.bind(this);
    }

    render() {

        return (
            <button className={`p-4 rounded transition-color duration-100 ease-linear ${!this.isBinary ? 'bg-purple-500' : this.state.selectedIndex === 0 ?  'bg-red-500' : 'bg-green-500'}`} onClick={this.onClick}>
                {this.name} <br/>
                {this.options[this.state.selectedIndex]}
            </button>
        )
    }
}
