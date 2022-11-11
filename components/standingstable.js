import { useEffect, useState } from 'react'
import { Player } from './player';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody } from '@coreui/react';

export function StandingsTable({playerData}) {

    return (
      <CTable color="dark" striped>
        <CTableHead>
            <CTableRow>
                <CTableHeaderCell>
                    Position
                </CTableHeaderCell>
                <CTableHeaderCell>
                    Name
                </CTableHeaderCell>
                <CTableHeaderCell>
                    Points/Strikes
                </CTableHeaderCell>
            </CTableRow>
        </CTableHead>
        <CTableBody>
        {
            playerData.map(player => ( 
                <Player key={player.name} player={player}/>
            )) 
        }
        </CTableBody>
    </CTable>
    )
}

export default StandingsTable
