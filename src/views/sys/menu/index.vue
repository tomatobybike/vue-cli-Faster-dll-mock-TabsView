<template>
  <div class="app-container">
    <el-tree
            :data="data2"
            default-expand-all
            node-key="id"
            ref="tree"
            highlight-current
            @node-click="handleNodeClick"
            :props="defaultProps">
    </el-tree>


  </div>
</template>
<script>
  import {getList} from '@/api/menu'
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
              item.title = item.children[0].meta.title + ' (' + item.path + item.children[0].path + ')'
              item.child = item.children
              delete item.children
            } else {
              item.title = item.meta.title + ' (' + item.path + ')'
              item.children = this.parseData(item.children)
              item.child = item.children
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
      }
    }
  }
</script>