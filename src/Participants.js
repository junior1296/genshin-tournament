import { useState, useRef } from 'react'
import { downloadExcel } from "react-export-table-to-excel";
import ParticipantList from './ParticipantList'

export default function Participants() {

  const inputReference = useRef(null);
  const [participant, setParticipant] = useState("")
  const [error, setError] = useState("")
  const [participants, setParticipants] = useState([
    {
      id: 1,
      name: "Juan",
      server: "America",
      preTime: "22:01",
      time: "20:59",
    },
    {
      id: 2,
      name: "Luciana",
      server: "America",
      preTime: "12:30",
      time: "12:20",
    },
    {
      id: 3,
      name: "Fishl",
      server: "Europa",
      preTime: "11:30",
      time: "11:10",
    },
  ])

  const changeParticipant = (e) => {
    const p = e.target.value
    setParticipant(p)
    setError("")
  }
  
  const editParticipant = (e, oldItem, newItem) => {
    const newParticipants = participants.filter(p => p.id !== oldItem.id)

    if (e.key === "Enter" || e.key === "Tab") {
      setParticipants([...newParticipants, newItem])
    }
    // setError("")
  }

  const listOrdered = () => {
    return participants.sort(function (a, b) {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      return 0;
    });
  }

  const removeParticipant = (p) => {
    setParticipants((current) =>
      current.filter((item) => item !== p)
    );
  }

  const addToTable = (e) => {
    e.preventDefault();
    const participantFormatted = participant.trim()
    const exists = participants.some(c => c.name === participantFormatted) 
      if (!exists) {
        setParticipants([...participants, {id: participants.length + 1, name: participantFormatted, server: "", preTime: "", time: ""}])
        setParticipant("")
        inputReference.current.focus(); 
      }
      if (exists) {
        setError("El participante ya existe!")
      }
  }

  const header = ["Id", "Name", "Server", "Pre-Time", "Time"];

  function handleDownloadExcel() {
    downloadExcel({
      fileName: "Genshin Tournament - Participants",
      sheet: "Participants",
      tablePayload: {
        header,
        // accept two different data structures
        body: participants,
      },
    });
  }

  return (
    <>
      <section className="Section">
        <div className="One-column">
          <h4>Participantes</h4>
          <form onSubmit={addToTable} className="One-column">
            <div>
              <div className="Row">
                <input className="Input Input-compact" autoComplete="off" type="text" name="participant" placeholder="Ingrese participante" value={participant} onChange={changeParticipant} ref={inputReference}/>
                <input className="Button Button-compact" type="submit" value="Agregar"/>
              </div>
              {error && <p className="Error">{error}</p>}
            </div>
          </form>
          <button className="Button" onClick={handleDownloadExcel}>Descargar Excel</button>
        </div>
      </section>
      <section className="Section">
        <ParticipantList 
          items={listOrdered()} remove={removeParticipant} edit={editParticipant}
        />
      </section>
    </>
  )
}