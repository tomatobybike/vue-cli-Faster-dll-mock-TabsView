<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-edit" size="small" @click="handleCreate">新建</el-button>
    </div>
    <el-table
            :data="list"
            v-loading.body="listLoading" element-loading-text="Loading"
            stripe
            border
            style="width: 100%">
      <el-table-column
              label="id"
              width="180">
        <template slot-scope="scope">
          <span >{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
              label="名称"
              width="180">
        <template slot-scope="scope">
          <span >{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
              label="创建时间"
              width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date | moment}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
                  size="mini"
                  @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
          <el-button
                  size="mini"
                  @click="handlePower(scope.$index, scope.row)">权限</el-button>
          <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="formData" label-position="left"    class="demo-form-inline" label-width="70px" >
        <el-form-item
                prop="name"
                label="名称"
                :rules="rules.title"
        >
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确定</el-button>
        <el-button v-else type="primary" @click="updateData">确定</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </div>
    </el-dialog>


    <power-dialog ref="powerDialog"></power-dialog>
  </div>
</template>

<script>
  import core from '@/utils/util'
  import {getListGroup, createItemGroup, updateItemGroup, deleteItemGroup} from '@/api/group'
  import powerDialog from './powerDialog.vue'
  export default {
    data () {
      return {
        list: [],
        formData: {
          id: null,
          name: ''
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '修改',
          create: '新建'
        },
        rules: {
          title: [{ required: true, message: '必填项', trigger: 'blur' }],
          name: [{ required: true, message: '必填项', trigger: 'blur' }]
        }
      }
    },
    components: {
      powerDialog
    },
    created () {
      console.log(core.isMobile)
      console.log(core.elPager.layout)
      this.getList()
    },
    methods: {
      getList () {
        const loading = this.$loading(this.Global.loadingOption)
        getListGroup().then(response => {
          loading.close()
          this.list = response.data.list
        }).catch(error => {
          loading.close()
          console.log(error)
        })
      },
      handlePower (index, row) {
        this.$refs.powerDialog.init(row)
      },
      handleUpdate (index, row) {
        this.formData = Object.assign({}, row) // copy obj
        console.log('row', row)
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      handleDelete (index, row) {
        this.$confirm('确定要删除？').then(() => {
          const param = {
            id: row.id
          }
          let loading = this.$loading(this.Global.loadingOption)
          deleteItemGroup(param).then(() => {
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
      },
      handleCreate () {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      resetTemp () {
        this.formData = {
          id: null,
          name: ''
        }
      },
      createData () {
        this.$refs['dataForm'].validate((valid) => {
          console.log('valid', valid)
          if (valid) {
            let param = {
              name: this.formData.name
            }
            let loading = this.$loading(this.Global.loadingOption)
            createItemGroup(param).then(() => {
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
      },
      updateData () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            let param = {
              id: this.formData.id,
              name: this.formData.name
            }
            let loading = this.$loading(this.Global.loadingOption)
            updateItemGroup(param).then(() => {
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
      }
    }
  }
</script>
