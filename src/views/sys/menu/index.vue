<template>
  <div class="app-container">
    <el-tree
            :data="data2"
            default-expand-all
            node-key="id"
            ref="tree"
            highlight-current
            @node-click="handleNodeClick"
            :expand-on-click-node="false"
            :props="defaultProps">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                    <el-popover
                        placement="left-end"
                        title="提示"
                        width="200"
                        trigger="hover"
                        content="系统菜单需要和前端在开发阶段配合，否则是无效的"
                        >
                        <el-button slot="reference" type="text" size="mini" @click="() => append(data)">添加子节点
                        </el-button>
                    </el-popover>

                    <el-button
                        type="text"
                        size="mini"
                        @click="() => remove(node, data)">
                      删除
                    </el-button>
                </span>
              </span>
    </el-tree>


  </div>
</template>
<script>
  import {getList} from '@/api/menu'
  let id = 1000
  export default {
    data () {
      return {
        data2: [],
        defaultProps: {
          children: 'children',
          label: 'title'
        }
      }
    },
    created () {
      this.getList()
    },
    methods: {
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
      getList () {
        const loading = this.$loading(this.Global.loadingOption)
        getList().then(response => {
          loading.close()
          this.data2 = response.data
          this.data2 = this.parseData(this.data2)
          console.log(this.data2)
        }).catch(error => {
          loading.close()
          console.log(error)
        })
      },
      handleNodeClick (data) {
        console.log(data)
      },
      append (data) {
        const newChild = { id: id++, title: 'testtest', children: [] }
        if (!data.children) {
          this.$set(data, 'children', [])
        }
        data.children.push(newChild)
        console.log('xxx', data)
      },
      remove (node, data) {
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === data.id)
        children.splice(index, 1)
      }

    }
  }
</script>
<style>
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
</style>
