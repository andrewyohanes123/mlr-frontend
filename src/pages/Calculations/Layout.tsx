import RouteContainer from 'components/RouteContainer'
import { FC, ReactElement } from 'react'
import { SquareRoot2 } from 'tabler-icons-react'

const Layout: FC = (): ReactElement => {
  return (
    <RouteContainer title="Perhitungan" icon={<SquareRoot2 strokeWidth={1} />}>
      Calculations
    </RouteContainer>
  )
}

export default Layout