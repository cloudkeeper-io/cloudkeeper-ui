import { SVGProps, FunctionComponent } from 'react'

import { ReactComponent as lock } from './lock.svg'
import { ReactComponent as mail } from './mail.svg'
import { ReactComponent as logo } from './logo.svg'

export type IconsType =
  | 'lock'
  | 'mail'
  | 'logo'
  | string

type Icons<T> = {
  [K in IconsType]: FunctionComponent<SVGProps<SVGSVGElement>>
}

const icons: Icons<IconsType> = {
  lock,
  mail,
  logo,
}


export default icons
