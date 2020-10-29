import React from 'react'

const SelectClassList = ({ classList, onClass }) => {
    return (
        <select onChange={onClass} style={{ width: '100px', textAlignLast: 'center' }}>
            <option>---</option>
            {classList.map(item => (
                <option key={item}>{item}</option>
            ))}
        </select>
    )
}

export default SelectClassList