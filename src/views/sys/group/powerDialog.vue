<template>
    <el-dialog title="权限"
               :visible.sync="visible">
      <div style="margin-bottom: 20px">
        <el-button type="primary" @click="handleCheckAllChange(true)" size="mini" >全选</el-button>
        <el-button type="primary" @click="handleCheckAllChange(false)" size="mini">清空</el-button>
      </div>
      <el-form :model="formData" label-width="120px" >
        <el-tree
                :data="data"
                default-expand-all
                node-key="id"
                ref="tree"
                highlight-current
                show-checkbox
                @check-change="handleNodeClick"
                :expand-on-click-node="false"
                :props="defaultProps">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
              </span>
        </el-tree>
        <el-form-item>
          <el-button @click="visible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="onSave" size="small">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
</template>

<script>
  import {getList} from '@/api/menu'
  import {updatePowerGroup} from '@/api/group'
  var lastMenus = []
  export default {
    data () {
      return {
        data: [],
        originalData: [],
        group: null,
        defaultProps: {
          children: 'children',
          label: 'title'
        },
        checkAll: false,
        checkedMenuIds: [],
        visible: false,
        formData: this._initFormData()
      }
    },

    methods: {
      _initFormData () {
        return {
          menuIds: []
        }
      },
      init (groupItem) {
        this.getList()
        console.log('groupItem', groupItem.menus)
        this.group = groupItem
        this.checkedMenuIds = groupItem.menus
        this.visible = true
      },
      parseData (data) {
        var i = 0
        for (let item of data) {
          if (item.meta) {
            item.title = item.meta.title + ' (' + item.path + ')'
          }
          if (item.children && item.children.length) {
            if (item.children.length === 1) {
              item.title = item.meta.title + ' (' + item.path + ')'
              item.children = this.parseData(item.children)
              // delete item.children
            } else {
              item.title = item.meta.title + ' (' + item.path + ')'
              item.children = this.parseData(item.children)
            }
          }
          i = i + 1
        }
        return data
      },
      getFilterHasChild (data, myMenus) {
        if (!myMenus) {
          return []
        }
        lastMenus = myMenus
        const dataNoDead = data.filter(item => {
          if (item.children && item.children.length) {
            lastMenus = lastMenus.filter(i => {
              return i !== item.id
            })
            console.warn('lastMenus===', lastMenus)
            item.children = this.getFilterHasChild(item.children, lastMenus)
            return true
          }
          return lastMenus
        })
        return dataNoDead
      },
      getList () {
        const loading = this.$loading(this.Global.loadingOption)
//        var that = this
        getList().then(response => {
          loading.close()
          this.data = response.data
          this.data = this.parseData(this.data)
          let originalData = JSON.parse(JSON.stringify(this.data))
          console.log('data', this.data)
          this.getFilterHasChild(originalData, this.checkedMenuIds)
          let filterHasChild = lastMenus
          console.log('filterHasChild', filterHasChild)
          this.$refs.tree.setCheckedKeys(filterHasChild)
          console.log(this.data)
        }).catch(error => {
          loading.close()
          console.log(error)
        })
      },
      handleCheckAllChange (val) {
        console.log('val', val)
        this.checkedMenuIds = val ? this.$refs.tree.setCheckedNodes(this.data) : this.resetChecked()
      },
      resetChecked () {
        this.$refs.tree.setCheckedKeys([])
      },
      onSave () {
        let halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys()
        let checkedKeys = this.$refs.tree.getCheckedKeys()
        let allCheckKeys = halfCheckedKeys.concat(checkedKeys)
        if (allCheckKeys.length > 0) {
          allCheckKeys = allCheckKeys.join(',')
        } else {
          allCheckKeys = ''
        }
        const param = {
          id: this.group.id,
          menuIds: allCheckKeys
        }
        let loading = this.$loading(this.Global.loadingOption)
        updatePowerGroup(param).then(() => {
          loading.close()
          this.getList()
          this.visible = false
          this.$notify({
            title: '成功',
            message: '添加权限成功',
            type: 'success',
            duration: 2000
          })
        }).catch(() => {
          loading.close()
        })
      }
    }
  }
</script>

<style>
</style>