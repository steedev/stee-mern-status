import React from 'react'
import styles from './TablePupils.module.scss'

const TablePupils = ({ pupils }) => {
    return (
        <table style={{ margin: '0 auto' }}>
            <thead><tr>
                <td></td>
                <td></td>
            </tr></thead>
            <tbody>
                {pupils.map((item, index) => (
                    <tr key={item.name}>
                        <td className={styles.indexes}>{index + 1}</td>
                        <td className={item.status ? styles.present : styles.absent}>{item.name}</td>
                    </tr>
                ))}
            </tbody>
        </table >
    )
}

export default TablePupils