import axios from 'axios'
const baseUrl = '/quiz'

const getAll = async () => {
  const data = await axios.get(baseUrl)
  return data.data
}

export default { getAll }