import useSWR from "swr"

const fetcher = (...args) => fetch(...args).then(r => r.json())
const baseUrl = 'https://matchplay.events/data/series/'

function getPlayers(series_id){
  if (!series_id) {
    throw new Error("Series ID is required")
  }

  const url = baseUrl + series_id + '/standings'
  console.log(url)
  const {data, error} = useSWR(url, fetcher)
  return { data, error }
}