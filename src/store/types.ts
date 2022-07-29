export interface ImageProps {
  _id?: string
  url?: string
  fitUrl?: string
  createdAt?: string
}

export interface UserProps {
  isLogin: boolean
  nickName?: string
  _id?: string
  column?: string
  email?: string
  description?: string
  avatar?: ImageProps
}

export interface ColumnProps {
  _id: string
  title: string
  avatar?: ImageProps
  description: string
}

export interface PostProps {
  _id?: string
  title: string
  excerpt?: string
  content?: string
  image?: ImageProps | string
  createdAt?: string
  column?: string
  author?: string | UserProps
  isHTML?: boolean
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

interface ListProps<P> {
  [id: string]: P
}

export interface GlobalDataProps {
  loading: boolean
  error: GlobalErrorProps
  columns: {
    data: ListProps<ColumnProps>
    isLoaded: boolean
  }
  posts: {
    data: ListProps<PostProps>
    loadedColumns: Array<string>
  }
  user: UserProps
  token: string
}

export interface ResponseType<P> {
  code: number
  msg: string
  data: P
}
