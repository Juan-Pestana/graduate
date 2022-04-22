import React, { useState, useEffect } from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import axios from "axios"
import Iframe from "react-iframe"
import * as queryString from "query-string"

const IndexPage = ({ location }) => {
  //const name = "Operario"

  const feedbck = "No"
  //const candidatura = "Repartidor"

  const isBrowser = typeof window !== "undefined"
  let { sid } = queryString.parse(location.search)

  let lsSession =
    isBrowser && localStorage.getItem("session")
      ? localStorage.getItem("session")
      : null

  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState("no sesion")

  const headers = {
    Authorization: "bearer 40b3ff5fdeaf4ca6851eecadd6eec23c",
  }

  useEffect(() => {
    if (sid) {
      setSession(sid)
      setLoading(false)
    } else {
      getBotId()
    }
  }, [])

  const getBotId = async () => {
    try {
      const getBotId = await axios({
        method: "get", //you can set what request you want to be
        url: "https://api.33bot.io/v1/conversation/chat/6231fcef33a63700098212b5/bots",
        headers,
      })
      //const bot_id = getBotId.data[0].id

      const newSession = await axios({
        method: "post", //you can set what request you want to be
        url: "https://api.33bot.io/v1/conversation/create",
        data: {
          bot_id: getBotId.data[0].id,
        },
        headers,
      })

      const someSession = newSession.data.id
      setSession(someSession)

      const updateSession = await axios({
        method: "post", //you can set what request you want to be
        url: "https://api.33bot.io/v1/conversation/update",
        data: {
          session_id: someSession,
          global_vars: {
            bot_url: {
              text: `${location.origin}${location.pathname}?sid=${someSession}`,
              value: `${location.origin}${location.pathname}?sid=${someSession}`,
            },
            feedback: {
              text: feedbck,
              value: feedbck,
            },
          },
        },
        headers,
      })

      if (updateSession.data.status === "ok") {
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
    console.log(`iniciando chatbot con sesión ${session}`)
  }

  return (
    <>
      <Seo title="Graduate 2022" />
      <div style={{ width: "100vw", height: "100vh" }}>
        {loading ? (
          <div>Cargando...</div>
        ) : (
          <Iframe
            url={`https://chat.33bot.io/623d996cc9be8f0009eef0d6?r=web&close=0&session=${session}`}
            width="100%"
            height="100%"
            allow="camera;microphone"
            frameborder="0"
          />
        )}
      </div>
    </>
  )
}

export default IndexPage
