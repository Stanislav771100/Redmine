import axios from 'axios'
axios.defaults.baseURL = 'https://redmine.ekreative.com'
export function getProjects () {
  return axios.get('/projects.json', {
    headers: {
      // 'Content-Type': 'application/json'
      'X-Redmine-API-Key': '2fda745bb4cdd835fdf41ec1fab82a13ddc1a54c'
    }
  })
}
export function getIssues () {
  return axios.get('/issues.json', {
    headers: {
      // 'Content-Type': 'application/json'
      'X-Redmine-API-Key': '2fda745bb4cdd835fdf41ec1fab82a13ddc1a54c'
    }
  })
}
export function getUsers () {
  return axios.get('/users/current.json', {
    headers: {
      'Content-Type': 'application/json',
      'X-Redmine-API-Key': '2fda745bb4cdd835fdf41ec1fab82a13ddc1a54c'
    }
  })
}
export function postTime (data, key) {
  return axios.post('/time_entries.json', {
    project_id: 'test-project',
    time_entry: data
  },
  {
    headers: {
      'Content-Type': 'application/json',
      'X-Redmine-API-Key': '2fda745bb4cdd835fdf41ec1fab82a13ddc1a54c'
    }
  })
}
