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

import dragInput from '@/components/drag-component/drag-input'
import dragSelect from '@/components/drag-component/drag-select'
import dragCheckbox from '@/components/drag-component/drag-checkbox'
import dragDatepicker from '@/components/drag-component/drag-datepicker'
import dragNumber from '@/components/drag-component/drag-number'
import dragRadio from '@/components/drag-component/drag-radio'
import dragTextarea from '@/components/drag-component/drag-textarea'
import request from '../../utils/request'

export default {
  components: {
    yForm, dragInput,
    dragSelect,
    dragCheckbox,
    dragDatepicker,
    dragNumber,
    dragRadio,
    dragTextarea
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
        'ctype': 'dragRadio'
      }, {
        'id': 26,
        'name': 'email',
        'cnname': '邮箱',
        'field_type': 'string',
        'api': null,
        'sort': null,
        'ctype': 'dragCheckbox'
      }, {
        'id': 26,
        'name': 'email',
        'cnname': '邮箱',
        'field_type': 'string',
        'api': null,
        'sort': null,
        'ctype': 'dragDatepicker'
      }, {
        'id': 26,
        'name': 'email',
        'cnname': '邮箱',
        'field_type': 'string',
        'api': null,
        'sort': null,
        'ctype': 'dragNumber'
      }, {
        'id': 26,
        'name': 'email',
        'cnname': '邮箱',
        'field_type': 'string',
        'api': '/api/siteconfig/companies',
        'sort': null,
        'ctype': 'dragSelect'
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
          res.data.map((option) => {
            item.options.push({ value: option.id, label: option.name })
          })
        }
      })
    }
  }
}
</script>

<style scope>
</style>
