import request from '@/utils/request'
import storage from '@/utils/storage'
export const getMyChannels = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}

export const getAllChannels = () => {
  return request({
    url: '/v1_0/channels'
  })
}

export const removeChannel = (target) => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}

export const addChannel = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    channels: [{ id, seq }]
  })
}

const HEIMATOUTIAO = 'HEIMATOUTIAO'
export const getMyChannelsLocal = () => storage.get(HEIMATOUTIAO)

export const setMyChannelsLocal = (channels) =>
  storage.set(HEIMATOUTIAO, channels)
