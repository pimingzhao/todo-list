<!--
 * @Author: pimzh
 * @Date: 2021-10-27 09:36:46
 * @LastEditors: pimzh
 * @LastEditTime: 2021-12-03 11:01:56
 * @Description: file content
-->
<script>
import { getTimeRange } from '@/utils'

export default {
  name: 'RenderHeader',
  props: {
    data: {
      require: true,
      type: Array,
      default: () => []
    },
    initial: {
      type: Boolean,
      default: true
    },
    headOpt: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {
      params: {},
      renderTemp: Object.create(null),
      gridsOpt: {
        xs: 24,
        sm: 12,
        md: 8,
        lg: 6,
        xl: 4
      },
      dateGrids: {
        xs: 24,
        sm: 12,
        md: 12,
        lg: 8,
        xl: 8
      },
      selectOpt: {
        placeholder: '请选择',
        clearable: true,
        'collapse-tags': true,
        filterable: false
      },
      inputOpt: {
        placeholder: '请输入',
        clearable: true
      },
      dateOpt: {
        value: '',
        type: 'daterange',
        placeholder: '请选择',
        options: {
          shortcuts: [
            {
              text: '今天',
              value: () => getTimeRange(null, 0)
            },
            {
              text: '昨天',
              value: () => {
                const start = new Date()
                const end = new Date()
                const day = start.getDate()
                start.setDate(day - 1)
                end.setDate(day - 1)
                start.setHours(0, 0, 0, 0)
                end.setHours(23, 59, 59, 59)
                return [start, end]
              }
            },
            {
              text: '近一周',
              value: () => getTimeRange(null, 6)
            },
            {
              text: '近一月',
              value: () => getTimeRange(null, 30)
            }
          ]
        }
      },
      autocompleteOpt: {
        placeholder: '请输入',
        clearable: true,
        'trigger-on-focus': false
      }
    }
  },
  created () {
    this.data.forEach(item => {
      // set new property in reactive
      item.name && this.$set(this.params, item.name, 'value' in item ? item.value : '')
    })
    this.$nextTick(() => {
      this.initial && this.handleQuery()
    })
  },
  methods: {
    // merge options
    mergeOption (defaultOpt, ...opts) {
      return Object.assign({}, defaultOpt, ...opts)
    },
    // form methods copy
    validate (cb) {
      this.$refs.form.validate(valid => valid ? cb(valid, this.params) : cb(valid))
    },
    validateField (cb) {
      this.$refs.form.validateField(cb)
    },
    resetFields () {
      this.$refs.form.resetFields()
    },
    clearValidate () {
      this.$refs.form.clearValidate()
    },
    handleQuery () {
      this.validate(valid => valid && this.$emit('on-query', this.params))
    },
    handleReset () {
      this.resetFields()
      this.$emit('on-reset', this.params)
    },
    renderInput (item) {
      return (
        <i-input
          attrs={this.mergeOption(this.inputOpt, item.props)}
          v-model={this.params[item.name]}
          onchange={() => item.onChange && item.onChange(this.params[item.name])}
        />
      )
    },
    renderSelect (item) {
      const props = this.mergeOption(this.selectOpt, item.props)
      return (
        <i-select
          attrs={props}
          v-model={this.params[item.name]}
          onchange={() => item.onChange && item.onChange(this.params[item.name])}
        >
          { item['empty-select'] && <i-option label='全部' value='' /> }
          {
            item.data.map((opt, i) => <i-option key={i} label={opt.label} value={opt.id} />)
          }
        </i-select>
      )
    },
    renderDate (item) {
      return (
        <DatePicker
          attrs={this.mergeOption(this.dateOpt, item.props)}
          v-model={this.params[item.name]}
          onchange={() => item.onChange && item.onChange(this.params[item.name])}
        />
      )
    },
    renderRadio (item) {
      return (
        <i-radio-group v-model={this.params[item.name]}>
          {
            item.data.map(opt => (
              <i-radio label={opt.value}>{opt.label}</i-radio>
            ))
          }
        </i-radio-group>
      )
    },
    renderInputGroup (item) {
      return (
        <div class="flex item-center">
          <i-input
            attrs={this.mergeOption(this.inputOpt, item.props)}
            v-model={this.params[item.name][0]}
            onchange={() => item.onChange && item.onChange(this.params[item.name])}
          />
          <span style="white-space: nowrap;margin: 0 4px;">--</span>
          <i-input
            attrs={this.mergeOption(this.inputOpt, item.props)}
            v-model={this.params[item.name][1]}
            onchange={() => item.onChange && item.onChange(this.params[item.name])}
          />
        </div>
      )
    },
    renderAutocomplete (item) {
      return (
        <i-autocomplete
          style="width: 100%"
          v-model={this.params[item.name]}
          attrs={this.mergeOption(this.autocompleteOpt, item.props)}
          onselect={data => item.onSelect && item.onSelect(data)}
          onchange={val => item.onChange && item.onChange(val)}
        />
      )
    },
    renderOption (item) {
      if (item.tag in this.renderTemp) {
        return this.renderTemp[item.tag](item)
      }
      let template
      switch (item.tag) {
        case 'input':
          template = this.renderInput
          break
        case 'select':
          template = this.renderSelect
          break
        case 'date':
          template = this.renderDate
          break
        case 'radio':
          template = this.renderRadio
          break
        case 'input-group':
          template = this.renderInputGroup
          break
        case 'autocomplete':
          template = this.renderAutocomplete
          break
        default:
          template = (opt) => opt.value || null
          break
      }
      this.renderTemp[item.tag] = template
      return template(item)
    }
  },
  render () {
    return (
      <i-form ref='form' class='form-wrap rounded' size={this.standardSize} props={this.mergeOption({ model: this.params, inline: true }, this.headOpt?.props)}>
        <Row gutter={10}>
          {this.data.map((item, i) => (
            <i-col
              key={i}
              props={this.mergeOption(this.gridsOpt, item.tag === 'input-group' ? this.dateGrids : null, item.grids)}
            >
              <FormItem label={item.label} prop={item.name}>
                {
                  (item.name + '-search') in this.$scopedSlots
                    ? this.$scopedSlots[item.name + '-search'](this.params)
                    : this.renderOption(item)
                }
              </FormItem>
            </i-col>
          ))}
          {/** btn groups */}
          <i-col props={this.mergeOption(this.gridsOpt, this.headOpt?.grids)} class='text-right btn-group' style='padding-bottom: 15px'>
            {
              'btn-search' in this.$scopedSlots
                ? this.$scopedSlots['btn-search']()
                : (<div>
                  <i-button
                    type="primary"
                    icon="ios-search"
                    size={this.standardSize}
                    onClick={this.handleQuery}
                  >查询</i-button>
                  <i-button
                    type="primary"
                    icon="md-refresh"
                    size={this.standardSize}
                    onClick={this.handleReset}
                  >重置</i-button>
                  {
                    'btn-end-search' in this.$scopedSlots && this.$scopedSlots['btn-end-search']()
                  }
                </div>)
            }
          </i-col>
        </Row>
      </i-form>
    )
  }
}
</script>

<style lang="scss" scoped>
.form-wrap {
  padding: 20px 10px 0;
  border: 1px solid #dcdee2;
  margin-bottom: 20px;
  ::v-deep.ivu-form-item {
    display: flex;
    flex-wrap: nowrap;
    margin-right: 0;
    .ivu-form-item-label {
      white-space: nowrap;
    }
    .ivu-form-item-content {
      flex: 1 1;
      .ivu-input, .ivu-date-picker, .ivu-select {
        width: 100%;
      }
    }
  }
  .btn-group {
    .ivu-btn:not(:last-child) {
      margin-right: 6px;
    }
  }
}
</style>
