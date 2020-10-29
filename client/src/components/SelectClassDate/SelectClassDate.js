import React from 'react'

const SelectClassDate = ({ classDate, onDate }) => {
    return (
        <select onChange={onDate} style={{ width: '250px', textAlignLast: 'center' }}>
            <option>---</option>
            {
                classDate.map(item => (
                    <option key={item._id} value={item._id}>{item.date}</option>
                ))
            }
        </select >
    )
}

export default SelectClassDate