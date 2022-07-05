import { React, Component } from 'react'

const Option = ({ active, text, callback }) => {
    return (
        <button className={`flex-1 p-3 px-5 m-auto rounded-lg shadow-lg transition-color duration-300 ${active ? 'bg-sky-400' : ''}`} onClick={callback}>{ text }</button>
    )
}

export default class SettingModifyer extends Component {
    setIndex(index, event) {
        this.state.selectedIndex = index;

        this.setState(this.state)

        this.callback(this.index, this.state.selectedIndex);

    }

    incrementIndex(e) {
        e.stopPropagation();

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

        this.isBinary = (props.notBinary == undefined || !props.notBinary) && (this.options.length === 2 || this.options.length === 0);
        if (this.options.length === 0){
            this.options = [
                "Off",
                "On"
            ]
        }

        this.setIndex = this.setIndex.bind(this);
        this.incrementIndex = this.incrementIndex.bind(this);
    }

    render() {

        return (
            <div onClick={this.incrementIndex} className={`select-none p-4 rounded grid grid-cols-2 gap-0 transition-color duration-100 ease-linear ${!this.isBinary ? 'bg-sky-500' : this.state.selectedIndex === 0 ?  'bg-red-500' : 'bg-green-500'}`}>
                <div className='grid content-center'> {this.name} </div> 
                
                <div className={`flex justify-between p-0 bg-sky-700 rounded-lg ${this.isBinary ? 'flex-row-reverse' : 'flex-row'}`}>
                    {
                        this.options.map((option, index) => {
                            let callback = e => {
                                e.stopPropagation();
                                this.setIndex(index);
                            }
                            return <Option active={this.state.selectedIndex === index} text={option} callback={callback} key={index} />
                        })
                    }
                </div>
            </div>
        )
    }
}
