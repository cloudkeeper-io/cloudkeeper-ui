import { SVGProps, FunctionComponent } from 'react'

import { ReactComponent as lock } from './lock.svg'
import { ReactComponent as mail } from './mail.svg'
import { ReactComponent as logo } from './logo.svg'
import { ReactComponent as lambda } from './lambda.svg'
import { ReactComponent as dynamo } from './dynamo.svg'
import { ReactComponent as darkSun } from './dark-sun.svg'

export type IconsType =
  | 'lock'
  | 'mail'
  | 'logo'
  | 'lambda'
  | 'dynamo'
  | 'darkSun'
  | string

type Icons<T> = {
  [K in IconsType]: FunctionComponent<SVGProps<SVGSVGElement>>
}

const icons: Icons<IconsType> = {
  lock,
  mail,
  logo,
  lambda,
  dynamo,
  darkSun,
}


export default icons
