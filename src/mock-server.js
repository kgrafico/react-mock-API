import { Response, Server } from 'miragejs'

if (process.env.NODE_ENV === 'development') {
  const server = new Server({
    urlPrefix: 'http://localhost:8000/',
    namespace: '',
    // routes() {
    //   this.get('/employees/:id', (schema, request) => {})
    // }
  })
  server.passthrough()
}
