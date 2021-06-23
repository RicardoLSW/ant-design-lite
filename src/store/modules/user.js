import { auth } from '../../api/api'

const user = {
  state: {
    token: '',
    name: '',
    roles: [],
    info: {}
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },
  actions: {
    getUserInfo({ commit }, code) {
      return new Promise((resolve, reject) => {
        auth(code)
          .then(response => {
            const result = response.result
            result.role = {
              id: result.orgCode,
              name: result.orgName,
              permissions: result.roleCodes.map(item => ({
                roleId: result.orgCode,
                permissionId: item,
                permissionName: item,
                actions: '',
                actionEntitySet: [],
                actionList: null,
                dataAccess: null
              }))
            }

            if (result.role && result.role.permissions.length > 0) {
              const role = result.role
              role.permissions = result.role.permissions
              role.permissions.map(per => {
                if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                  const action = per.actionEntitySet.map(action => {
                    return action.action
                  })
                  per.actionList = action
                }
              })
              role.permissionList = role.permissions.map(permission => {
                return permission.permissionId
              })
              commit('SET_ROLES', result.role)
              commit('SET_INFO', result)
              commit('SET_TOKEN', result.token)
            } else {
              reject(new Error('getInfo: roles must be a non-null array !'))
            }

            resolve(response)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}

export default user
