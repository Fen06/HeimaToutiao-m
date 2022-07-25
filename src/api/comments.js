import request from '@/utils/request'

// 发送评论
export const getMyComments = (target, text) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: {
      target: target,
      content: text
    }
  })
}
// /v1_0/comments
// 获取文章评论
export const getActiveComments = (type, source, id) => {
  return request({
    url: '/v1_0/comments',
    method: 'GET',
    params: {
      type: type,
      source: source,
      offset: id
    }
  })
}

export const getActiveCommentsYeshu = (params) => {
  return request({
    url: '/v1_0/comments',
    method: 'GET',
    params
  })
}
// 对文章评论进行点赞
export const getActiveCommentsNice = (target) => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target: target
    }
  })
}

// 对文章评论取消点赞
export const getActiveCommentsNoNice = (target) => {
  return request({
    url: `/v1_0/comment/likings/${target}`,
    method: 'DELETE'
  })
}

// 对文章里的评论进行评论
export const getMyInComments = (target, text, artId) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: {
      target: target,
      content: text,
      art_id: artId
    }
  })
}
