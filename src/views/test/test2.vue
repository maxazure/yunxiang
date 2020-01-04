<template>
  <div class="app-container">
    <yForm ref="yForm" :form-data="formData" :rules="rules">
      <template>

        <div v-for="item of list" :key="item.value">
          <component
            :is="item.ctype"
            v-model="item.value"
            class="item"
            :options="item.options"
          />
        </div>
      </template>
    </yForm>
  </div>
</template>

<script>
import yForm from '@/components/yForm'

import request from '../../utils/request'

export default {
  components: {
    yForm
  },
  data() {
    return {
      list: [{
        'id': 26,
        'name': 'email',
        'cnname': '邮箱',
        'field_type': 'string',
        'api': null,
        'sort': null,
        'ctype': 'YRadio'
      }, {
        'id': 26,
        'name': 'email',
        'cnname': '邮箱',
        'field_type': 'string',
        'api': null,
        'sort': null,
        'ctype': 'YCheckbox'
      }, {
        'id': 26,
        'name': 'email',
        'cnname': '邮箱',
        'field_type': 'string',
        'api': null,
        'sort': null,
        'ctype': 'YDatepicker'
      }, {
        'id': 26,
        'name': 'email',
        'cnname': '邮箱',
        'field_type': 'string',
        'api': null,
        'sort': null,
        'ctype': 'YNumber'
      }, {
        'id': 26,
        'name': 'email',
        'cnname': '邮箱',
        'field_type': 'string',
        'api': '/api/siteconfig/companies',
        'sort': null,
        'ctype': 'YSelect'
      }
      ],
      rules: null,
      formData: null
    }
  },
  created() {
    this.get()
  },
  mounted() {
  },
  methods: {
    async get() {
      this.list.map(async(item) => {
        if (item.api) {
          this.$set(item, 'options', [])
          const res = await request({ url: item.api, method: 'get' })
          item.options = res.data
        }
      })
    }
  }
}
</script>

<style scope>
</style>
