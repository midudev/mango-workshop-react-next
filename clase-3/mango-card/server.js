import express from 'express'
import { readFile } from 'fs/promises'

import { render } from './ssr.jsx'
import { getProducts } from './src/logic/products.js'

const HTML_TEMPLATE = await readFile('./dist/index.html', 'utf-8') 

const app = express()

app.use('/assets', express.static('./dist/assets')) 

app.get('*', async (req, res) => {
  const context = {}

  const products = await getProducts() 
  const html = render(req.url.search, products)

  if (context.url) {
    res.redirect(301, context.url)
  } else {
    res.send(
      HTML_TEMPLATE
        .replace('<!-- APP REACT -->', html)
        .replace('</html>', `<script id="__MIDU_DATA__" type="application/json">${JSON.stringify(products)}</script></html>`)
    )
  }
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})