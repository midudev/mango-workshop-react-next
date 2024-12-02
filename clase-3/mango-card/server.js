import express from 'express'
import { readFile } from 'fs/promises'

import { renderReactServer } from './ssr.jsx'
import { getServerSideProps } from './src/App.jsx'

const HTML_TEMPLATE = await readFile('./dist/index.html', 'utf-8')

const app = express()

app.use('/assets', express.static('./dist/assets'))

app.get('/', async (req, res) => {
  const [, search] = req.url.split('?')
  const { props } = await getServerSideProps({ req, context: {} })

  const html = renderReactServer({ props, search })

  res.send(
    HTML_TEMPLATE
      .replace('<!-- APP REACT -->', html)
      .replace(
          '</html>',
          `<script id="__MIDU__" type="application/json">${JSON.stringify(props)}</script></html>`
      )
  )
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
