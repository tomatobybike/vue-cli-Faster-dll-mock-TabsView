<template>
  <div class="app-container">
    <el-tree
            :data="data"
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
                        <el-button slot="reference" type="text" size="mini" @click="() => handleCreateChild(data)">添加子节点
                        </el-button>
                    </el-popover>
                    <el-button
                            type="text"
                            size="mini"
                            @click="() => handleCreateSiblings(data)"
                    >
                      添加兄弟节点
                    </el-button>
                    <el-button
                        type="text"
                        size="mini"
                        @click="() => handleDelete(node, data)">
                      删除
                    </el-button>
                </span>
              </span>
    </el-tree>


    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" @close='closeDialog'>
      <el-form ref="dataForm" :model="formData" label-position="left"    class="demo-form-inline" label-width="70px" >
        <el-form-item
                prop="name"
                label="name"
                :rules="rules.title"
        >
          <el-input v-model="formData.name" placeholder="重要，必须唯一"></el-input>
        </el-form-item>
        <el-form-item
                prop="title"
                label="菜单名"
                :rules="rules.title"
        >
          <el-input v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item
                prop="path"
                label="路由"
        >
          <el-input v-model="formData.path" placeholder="可不填"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="dialogStatus=='updateNode'" type="primary" @click="updateNode">确定</el-button>
        <el-button v-else="dialogStatus=='createChild'" type="primary" @click="createChild">确定</el-button>
        <el-button v-else="dialogStatus=='createSiblings'" type="primary" @click="createSiblings">确定</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {getListNode, createChild, createSiblings, updateNode, deleteNode} from '@/api/menu'
  export default {
    data () {
      return {
        data: [],
        itemData: null,
        formData: {
          id: null,
          name: 1,
          path: ''
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          updateNode: '修改',
          createChild: '新建子节点',
          createSiblings: '新建兄弟节点'
        },
        isNodeButton: false,
        defaultProps: {
          children: 'children',
          label: 'title'
        },
        rules: {
          title: [{ required: true, message: '必填项', trigger: 'blur' }]
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
            item.title = item.meta.title
          }
          if (item.children && item.children.length) {
            if (item.children.length === 1) {
              item.title = item.meta.title
              item.children = this.parseData(item.children)
              // delete item.children
            } else {
              item.title = item.meta.title
              item.children = this.parseData(item.children)
            }
          }
          i = i + 1
        }
        return data
      },
      getList () {
        const loading = this.$loading(this.Global.loadingOption)
        getListNode().then(response => {
          loading.close()
          this.data = response.data
          this.data = this.parseData(this.data)
          this.isNodeButton = false
          console.log(this.data)
        }).catch(error => {
          loading.close()
          console.log(error)
        })
      },
      resetTemp () {
        this.formData = {
          id: null,
          name: '',
          title: '',
          path: ''
        }
      },
      closeDialog () {
        this.isNodeButton = false
        console.log('closeDialog')
      },
      handleNodeClick (row) {
        console.log(row)
        if (this.isNodeButton) {
          return false
        }
        this.formData = Object.assign({}, row) // copy obj
        this.dialogStatus = 'updateNode'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateNode () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            let param = {
              id: this.formData.id,
              name: this.formData.name,
              title: this.formData.title,
              path: this.formData.path
            }
            let loading = this.$loading(this.Global.loadingOption)
            updateNode(param).then(() => {
              loading.close()
              this.getList()
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            }).catch(error => {
              loading.close()
              console.log(error)
            })
          }
        })
      },
      handleCreateChild (data) {
        this.isNodeButton = true
        this.resetTemp()
        console.log('ddddddddddddd', data)
        this.formData.parentId = data.id
        this.dialogStatus = 'createChild'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createChild (node, data) {
        this.isNodeButton = true
        this.$refs['dataForm'].validate((valid) => {
          console.log('valid', valid)
          if (valid) {
            let param = {
              parentId: this.formData.parentId,
              name: this.formData.name,
              title: this.formData.title,
              path: this.formData.path
            }
            let loading = this.$loading(this.Global.loadingOption)
            createChild(param).then(() => {
              loading.close()
              this.getList()
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            }).catch(error => {
              loading.close()
              console.log(error)
            })
          }
        })
        return false
      },
      handleCreateSiblings (data) {
        this.isNodeButton = true
        this.resetTemp()
        this.formData.parentId = data.id
        this.dialogStatus = 'createSiblings'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createSiblings (node, data) {
        this.isNodeButton = true
        this.$refs['dataForm'].validate((valid) => {
          console.log('valid', valid)
          if (valid) {
            let param = {
              parentId: this.formData.parentId,
              name: this.formData.name,
              title: this.formData.title,
              path: this.formData.path
            }
            let loading = this.$loading(this.Global.loadingOption)
            createSiblings(param).then(() => {
              loading.close()
              this.getList()
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            }).catch(error => {
              loading.close()
              console.log(error)
            })
          }
        })
        return false
      },
      handleDelete (node, data) {
        this.isNodeButton = true
        this.$confirm('确定要删除？').then(() => {
          const param = {
            id: data.id
          }
          let loading = this.$loading(this.Global.loadingOption)
          deleteNode(param).then(() => {
            loading.close()
            this.getList()
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
          }).catch(() => {
            loading.close()
          })
        }).catch(error => {
          console.log(error)
        })
        return false
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
