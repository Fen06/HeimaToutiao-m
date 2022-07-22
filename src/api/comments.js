import request from '@/utils/request'
export const getComments = (a, id) => {
  return request({
    url: '/v1_0/comments',
    params: {
      type: a,
      source: id,
      offset: 1,
      limit: 10
    }
  })
}

export const getMyComments = (target, artId, text) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: {
      target: target,
      content: text,
      artId: artId
    }
  })
}
// /v1_0/comments
