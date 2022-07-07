import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <Seo title="404: Not found" />
    <h1>No se admiten más solicitudes este año</h1>
    <p>Nos vemos el año que viene...😅</p>
  </Layout>
)

export default NotFoundPage
