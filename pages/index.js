import Head from 'next/head'
//import styles from '../styles/Home.module.css'
import '@coreui/coreui/dist/css/coreui.min.css'
import { CContainer, CHeader, CHeaderBrand, CForm, CFormSelect, CFormInput, CButton } from '@coreui/react'
import { StandingsTable } from '../components/standingstable'
import { useEffect, useState } from 'react'

export default function Home() {
  const [leagueData, setLeagueData] = useState({
    name: "Please select a type and ID",
    players: []
  });
  const [leagueInfo, setLeagueInfo] = useState({
    eventType: null,
    eventID: null
  });

  const getLeagueData = async (eventType, eventID) => {
    const response = await fetch('/api/' + eventType + '/' + eventID);
    const jsonData = await response.json();
    setLeagueData({name: jsonData.name, players: jsonData.players});
  };
  
  useEffect(() => {
    if(leagueInfo.eventID) {
      getLeagueData(leagueInfo.eventType, leagueInfo.eventID);
    }
    const interval = setInterval(() => {
      if(leagueInfo.eventID) {
        getLeagueData(leagueInfo.eventType, leagueInfo.eventID);
      }
    }, 30000)
    return () => clearInterval(interval);

  }, [leagueInfo.eventID, leagueInfo.eventType])
  
  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true);
    setLeagueInfo({
      eventType: event.target.eventType.value,
      eventID: event.target.eventID.value
    });
    event.preventDefault();
  }

  return (
    <CContainer fluid>
      <Head>
        <title>Matchplay.Events Series Dashboard</title>
        <meta name="description" content="Matchplay.events real-time dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CHeader>
            <CContainer fluid>
                <CHeaderBrand>{leagueData.name}</CHeaderBrand>
                <CForm className="d-flex" onSubmit={handleSubmit}>
                    <CFormSelect name="eventType" className="me-3" required aria-label="Default select example" options={[
                        { label: 'Series', value: 'series' },
                        { label: 'Tournament', value: 'tournament' }
                    ]}/>
                    <CFormInput name='eventID' required className="me-3" type="search" placeholder="Tournament or Series" />
                    <CButton type="submit" color="success" variant="outline">
                        Go
                    </CButton>
                </CForm>
            </CContainer>
        </CHeader>
      <StandingsTable playerData={leagueData.players}/>
    </CContainer>
  )
}