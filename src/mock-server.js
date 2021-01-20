import { Response, Server } from 'miragejs'
// Create a new server instance - Intercepts the requests
if (process.env.NODE_ENV === 'development') {
  const server = new Server({
    urlPrefix: 'http://localhost:8000/',
    namespace: '',
    routes() {
      this.get('/countries/:id', (schema, request) => {
        let { id } = request.params
        switch (id) {
          case '1':
            return new Response(
              404,
              { 'Content-Type': 'application/json' },
              { error: 'Country not found' }
            )
        }
      })
    }
  })
  server.passthrough()
}
