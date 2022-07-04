import React from 'react'
import SettingModifyer from './SettingModifyer'

export default function SettingsSection({ title, settings, callback, index}) {

    return (
        <>
            <h1 className={`text-2xl  ${index===0 ? 'mb-5':'my-5'}`}> { title } </h1>
            <div className="grid grid-cols-2 gap-4 content-start text-center text-white">
                {
                    settings.slice(0).map((setting, index) => 
                        <SettingModifyer
                            options={setting.options}
                            selectedIndex={setting.currentSetting}
                            name={setting.name}
                            callback={(settingIndex, selectedIndex) => callback(settingIndex, index, selectedIndex)}
                            key={index}
                            index={index}/>
                    )
                }
            </div>
        </>
    )
}
