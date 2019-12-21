import axios from 'axios'
const baseUrl = 'https://opentdb.com/api.php?amount=10&category=27&type=boolean'

const getAll = async () => {
  const data = await axios.get(baseUrl)
  return data.data
}

export default { getAll }