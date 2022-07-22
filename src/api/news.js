import request from '@/utils/request'

export const getActiveList = (channelId, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}

// /v1_0/articles/:article_id
export const getDetailsActive = (id) => {
  return request({
    url: `/v1_0/articles/${id}`
  })
}

export const PostLike = (id) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target: id
    }
  })
}
// /v1_0/user/followings/:target
export const PostFurkLike = (target) => {
  return request({
    url: `/v1_0/user/followings/${target}`,
    method: 'DELETE'
  })
}

export const PostNice = (id) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target: id
    }
  })
}
// /v1_0/article/likings

export const PostFurkNice = (target) => {
  return request({
    url: `/v1_0/article/collections/${target}`,
    method: 'DELETE'
  })
}
// /v1_0/article/collections/:target

export const PostZang = (id) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target: id
    }
  })
}
// /v1_0/article/likings

export const PostFurkZang = (target) => {
  return request({
    url: `/v1_0/article/likings/${target}`,
    method: 'DELETE'
  })
}
// /v1_0/article/likings/:target
