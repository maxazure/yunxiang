const fieldTypes = [
  { value: 'string', label: 'string' },
  { value: 'integer', label: 'integer' },
  {
    value: 'boolean',
    label: 'boolean'
  },
  { value: 'date', label: 'date' }]

const product = {
  product_gender: [
    { value: '0', label: '男' }, { value: '1', label: '女' },
    { value: '2', label: '中性' }, { value: '3', label: '其他' }],
  goods_season: [
    { value: '0', label: '春' }, { value: '1', label: '夏' },
    { value: '2', label: '秋' }, { value: '3', label: '冬' },
    { value: '5', label: '四季' },
    { value: '6', label: '春秋冬' },
    { value: '7', label: '春秋' },
    { value: '8', label: '其他' }
  ],
  purcash_model: [
    { value: '0', label: '买断' },
    { value: '1', label: '限期退' },
    { value: '2', label: '部分退' },
    { value: '3', label: '代销' },
    { value: '4', label: '其他' }
  ]

}
export default {
  fieldTypes,
  product
}
