import NotFoundPage from 'pages/404'
import Calculations from 'pages/Calculations'
import Questioners from 'pages/Questioners'
import Upload from 'pages/Upload'
import { FC, ReactElement } from 'react'
import { Routes as ReactRoutes, Route } from 'react-router-dom'

const Routes: FC = (): ReactElement => {
  return (
    <ReactRoutes>
      <Route index element={<Upload />} />
      <Route path="/kuesioner" element={<Questioners />} />
      <Route path="/perhitungan" element={<Calculations />} />
      <Route path="*" element={<NotFoundPage />} />
    </ReactRoutes>
  )
}

export default Routes