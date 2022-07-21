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
