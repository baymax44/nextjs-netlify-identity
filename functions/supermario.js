exports.handler = async () => {
  const data = { name: 'mario', age: 35, job: 'plumber' }

  // return response to the browser
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
}