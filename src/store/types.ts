export interface UserProps {
  isLogin: boolean
  nickName?: string
  _id?: string
  column?: string
  email?: string
  description?: string
  avatar?: ImageProps
}

export interface ImageProps {
  _id?: string
  url: string
  createdAt?: string
}

export interface ColumnProps {
  _id: string
  title: string
  avatar?: ImageProps
  description: string
}

export interface PostProps {
  _id: string
  title: string
  excerpt?: string
  content?: string
  image?: ImageProps
  createdAt: string
  column: string
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

export type MessageType = 'success' | 'error' | 'default'

export interface GlobalErrorProps {
  status: boolean
  message?: string
}

export interface GlobalDataProps {
  loading: boolean
  error: GlobalErrorProps
  columns: ColumnProps[]
  posts: PostProps[]
  user: UserProps
  token: string
}
