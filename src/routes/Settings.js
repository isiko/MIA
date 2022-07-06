import { React, Component } from 'react'
import Headline from '../components/Headline'
import SettingsSection from '../components/Settings/SettingsSection';

export default class Settings extends Component {

  //TOOD Replace this with call to Backend
  settings = [
    {
      name: "Multi Option Test Section",
      settings: [
        {
          name: "Test Setting",
          currentSetting: 0,
          options: [
            "Option 1",
            "Option 2",
            "Option 3",
          ]
        }
      ]
    },
    {
      name: "Binary Test Section",
      settings: [
        {
          name: "Binary Test Setting",
          currentSetting: 0,
          options: [
            "Off",
            "On",
          ]
        },
        {
          name: "Binary Test Setting with 0 options",
          currentSetting: 0,
          options: [
          ]
        },
        {
          name: "Binary Test Setting with null options",
          currentSetting: 0,
        },
        {
          name: "Non binary Test Setting",
          currentSetting: 0,
          notBinary: true,
          options: [
            "Option 1",
            "Option 2",
          ]
        }
      ]
    }
  ]

  changeSetting(settingIndex, sectionIndex, selectedIndex) {
    //console.log(settingIndex, sectionIndex, selectedIndex);
    console.log(`Set "${this.settings[sectionIndex].settings[settingIndex].name}" of section "${this.settings[sectionIndex].name}" to "${this.settings[sectionIndex].settings[settingIndex].options[selectedIndex]}"`);

    //TODO Communicate this to Backend
  }

  constructor(props) {
    super(props);

    this.state = {}

    this.changeSetting = this.changeSetting.bind(this)
  }

  render() {
    return (
      <div>
        <Headline text={"Settings"} />

        <div className='p-5 font-semibold text-white'>
          {
            this.settings.slice(0).map((section, index) => {
              return <SettingsSection settings={section.settings} title={section.name} key={index} sectionIndex={index} callback={this.changeSetting} />
            })
          }
        </div>
      </div>
    )
  }
}
