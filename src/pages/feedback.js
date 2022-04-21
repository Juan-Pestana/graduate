import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import axios from "axios"
import Iframe from "react-iframe"

const Feedback = () => {
  //const name = "Operario"

  const feedbck = "Sí"

  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState("no sesion")

  const headers = {
    Authorization: "bearer 40b3ff5fdeaf4ca6851eecadd6eec23c",
  }

  useEffect(() => {
    getBotId()
  }, [])

  const getBotId = async () => {
    try {
      const getBotId = await axios({
        method: "get", //you can set what request you want to be
        url: "https://api.33bot.io/v1/conversation/chat/5fda29f1481e91000916689c/bots",
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
            // candidatura_seleccionada: {
            //   text: name,
            //   value: name,
            // },
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
      <Seo title="Trabaja en Aquaservice" />
      <div style={{ width: "100vw", height: "100vh" }}>
        {loading ? (
          <div>Cargando...</div>
        ) : (
          <Iframe
            url={`https://chat.33bot.io/5fe1b0c80008060de6?r=web&close=0&session=${session}`}
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

export default Feedback
