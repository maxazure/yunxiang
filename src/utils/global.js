const fieldTypes = [
  { value: 'string', label: 'string' },
  { value: 'integer', label: 'integer' },
  {
    value: 'boolean',
    label: 'boolean'
  },
  { value: 'date', label: 'date' }]

const product = {
  gender: [{ value: '1', label: '男' }, { value: '2', label: '女' }, { value: '3', label: '中性' }],
  season: [{ value: '1', label: '春' }, { value: '2', label: '夏' }, { value: '3', label: '秋' }, { value: '4', label: '冬' }]

}
export default {
  fieldTypes,
  product
}
