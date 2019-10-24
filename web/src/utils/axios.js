const setToken = (http, token = null) => {
  delete http.defaults.headers['Authorization']
  if (token !== null) {
    http.defaults.headers['Authorization'] = 'Token ' + token
  }
}

const parserHttpError = error => {
  if (error.response) {
    if (error.response.status === 400 || error.response.status === 500) {
      const data = error.response.data
      Object.keys(data).forEach(m => {
        if (Array.isArray(data[m])) {
          data[m].forEach(k => {
            throw new Error(`${m}: ${k}`)
          })
        } else {
          throw new Error(`${m}: ${data[m]}`)
        }
      })
    }
  } else if (error.request) {
    throw new Error(error.request)
  } else {
    throw new Error(error.message)
  }
}

export {
  setToken,
  parserHttpError
}
