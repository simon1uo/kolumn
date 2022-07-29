import { ColumnProps, PostProps, UserProps } from '@/store/types'
import { arrToObj, objToArr } from '@/libs/helper'

// export const testColumns: ColumnProps[] = [
//   {
//     id: 1,
//     title: 'test1的专栏',
//     description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
//     avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
//   },
//   {
//     id: 2,
//     title: 'test2的专栏',
//     description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
//     avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
//   },
//   {
//     id: 3,
//     title: 'test3的专栏',
//     description: '这是的test3专栏，有一段非常有意思的简介，可以更新一下欧',
//     avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
//   },
//   {
//     id: 4,
//     title: 'test4的专栏',
//     description: '这是的test4专栏，有一段非常有意思的简介，可以更新一下欧',
//     avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
//   }
// ]
//
// export const testPosts: PostProps[] = [
//   {
//     id: 1,
//     title: '这是我的第一篇文章',
//     content: '这是我的第一篇文章这是我的第一篇文章这是我的第一篇文章这是我的第一篇文章这是我的第一篇文章这是我的第一篇文章',
//     image: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100',
//     createdAt: '2020-06-11 10:34:22',
//     columnId: 1
//   },
//   {
//     id: 2,
//     title: '这是我的第一篇文章',
//     content: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
//     image: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100',
//     createdAt: '2020-06-11 10:34:22',
//     columnId: 1
//   },
//   {
//     id: 1,
//     title: '这是我的第一篇文章',
//     content: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
//     createdAt: '2020-06-11 10:34:22',
//     columnId: 2
//   }
// ]

export const currentUser: UserProps = {
  isLogin: false,
  nickName: 'simon',
  _id: 'test',
  column: 'test'
}

interface TestProps {
  _id: string
  name: string
}

const testData1: TestProps[] = [
  {
    _id: '1',
    name: 'a'
  },
  {
    _id: '2',
    name: 'b'
  }
]

const testData2: {[key: string]: TestProps} = {
  1: { _id: '1', name: 'a' },
  2: { _id: '2', name: 'b' }
}

// const result1 = arrToObj(testData1)
// console.log(result1)
// const result2 = objToArr(testData2)
// console.log(result2)
