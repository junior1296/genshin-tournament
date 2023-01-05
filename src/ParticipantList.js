import { useState, useRef } from 'react'
import ParticipantItem from './ParticipantItem'

export default function ParticipantList({items, remove, edit}) {

  return (
    <table className="Table">
      <thead>
        <tr>
          <th>N°</th>
          <th>Name</th>
          <th>Server</th>
          <th>Pre-Time</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody className="">
        {
          items.map(item => <ParticipantItem key={item.id} item={item} remove={remove} edit={edit}/>)
        }
      </tbody>
    </table>
  )
}