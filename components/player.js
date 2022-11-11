import { CTableDataCell, CTableRow } from "@coreui/react"

export function Player({player}) {
    const {name, position, points_adj, points, custom_count} = player;
    return (
        <CTableRow>
            <CTableDataCell>{position}</CTableDataCell>
            <CTableDataCell>{name}</CTableDataCell>
            {custom_count
            ? <CTableDataCell>{custom_count}</CTableDataCell>
            : <CTableDataCell>{points_adj ? points_adj : points}</CTableDataCell>
            }
        </CTableRow>
    )
}

export default Player