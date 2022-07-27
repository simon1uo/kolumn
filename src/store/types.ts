export interface ColumnProps {
  id: number
  title: string
  avatar?: string
  description: string
}

export interface PostProps {
  id: number
  title: string
  content: string
  image?: string
  createdAt: string
  columnId: number
}

export interface UserProps {
  isLogin: boolean
  name?: string
  id?: string
  columnId?: number
}

interface RuleProp {
  type: 'required' | 'email' | 'range' | 'validator'
  message: string
  min?: number
  max?: number
  validator?: () => boolean
}

export type RulesProp = RuleProp[]

export type TagType = 'input' | 'textarea'

export interface GlobalDataProps {
  columns: ColumnProps[]
  posts: PostProps[]
  user: UserProps
}
