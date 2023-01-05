import { useState, useRef } from 'react'

export default function ParticipantItem({item, remove, edit}) {

  const [name, setName] = useState(item.name)
  const [server, setServer] = useState(item.server)
  const [preTime, setPreTime] = useState(item.preTime)
  const [time, setTime] = useState(item.time)

  const changeParticipant = (e) => {
    switch (e.target.name) {
      case "name": setName(e.target.value)
        break;
      case "server": setServer(e.target.value)
        break;
      case "preTime": setPreTime(e.target.value)
        break;
      case "time": setTime(e.target.value)
        break;
      default:
        break;
    }
  }

  return (
    <tr>
        <td>{item.id}</td>
        <td><input className="Input" autoComplete="off" type="text" name="name" value={name} onChange={changeParticipant} onKeyDown={(e) => edit(e, item, {...item, name})}/></td>
        <td><input className="Input" autoComplete="off" type="text" name="server" value={server} onChange={changeParticipant} onKeyDown={(e) => edit(e, item, {...item, server})}/></td>
        <td><input className="Input" autoComplete="off" type="text" name="preTime" value={preTime} onChange={changeParticipant} onKeyDown={(e) => edit(e, item, {...item, preTime})}/></td>
        <td><input className="Input" autoComplete="off" type="text" name="time" value={time} onChange={changeParticipant} onKeyDown={(e) => edit(e, item, {...item, time})}/></td>
        <td><button className="Button" onClick={() => remove(item)}>Delete</button></td>
    </tr>
  )
}