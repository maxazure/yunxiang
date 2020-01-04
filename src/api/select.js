import request from '@/utils/request'

export function selectAll() {
  return request({
    url: '/api/siteconfig/select-api-all',
    method: 'get'
  })
}

const selectCompanies = '/api/siteconfig/companies'

const selectRoles = '/api/siteconfig/roles'

export { selectRoles, selectCompanies }

