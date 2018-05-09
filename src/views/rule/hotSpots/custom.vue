<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-edit" size="small" @click="handleCreate">新建自定义热点</el-button>
    </div>
    <el-table
            :data="list"
            v-loading.body="listLoading" element-loading-text="Loading"
            stripe
            border
            style="width: 100%" v-cloak>
      <el-table-column
              label="名称"
              width="180">
        <template slot-scope="scope">
          <span >{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column
              label="URL"
              width="180">
        <template slot-scope="scope">
          <span >{{ scope.row.url }}</span>
        </template>
      </el-table-column>
      <el-table-column
              label="创建人"
              width="180">
        <template slot-scope="scope">
          <span>{{scope.row.creater}}</span>
        </template>
      </el-table-column>
      <el-table-column
              label="备注"
              width="180">
        <template slot-scope="scope">
          <span>{{scope.row.note}}</span>
        </template>
      </el-table-column>
      <el-table-column
              label="最后操作时间"
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
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="formData" label-position="left"    class="demo-form-inline" label-width="70px" >
        <el-form-item
                prop="title"
                label="名称"
                :rules="rules.title"
        >
          <el-input v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item
                prop="url"
                label="url"
                :rules="rules.url"
        >
          <el-input v-model="formData.url"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="formData.note"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确定</el-button>
        <el-button v-else type="primary" @click="updateData">确定</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <div class="pager-box" ng-show="paginator.totalNum">
      <el-pagination :layout="elPager.layout"
                     background
                     :current-page="paginator.pageNum"
                     :page-sizes="elPager.pageSizes"
                     :page-size="paginator.displayNum"
                     @current-change="changePage"
                     @size-change="changePageSize"
                     :total="paginator.totalNum">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { isValidURL } from '@/utils/validate'
  import core from '@/utils/util'
  import { getListCustomHotNews, createCustomHotNews, updateCustomHotNews, deleteCustomHotNews } from '@/api/hotnews'
  export default {
    data () {
      return {
        listLoading: false,
        list: [],
        paginator: {
          pageNum: 1,
          displayNum: 20,
          totalNum: 0
        },
        elPager: {
          layout: core.elPager.layout,
          pageSizes: core.elPager.pageSizes
        },
        sourcesList: [],
        formData: {
          id: null,
          title: '',
          url: ''
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '修改',
          create: '新建'
        },
        rules: {
          title: [{ required: true, message: '必填项', trigger: 'blur' }],
          url: [
            {
              required: true,
              message: '请输入正确的url',
              trigger: 'blur',
              type: 'text',
              validator: function (rule, value, callback) {
                console.log('是否url：', !isValidURL(value))
                if (isValidURL(value) === false) {
                  callback(new Error('请输入正确的url'))
                } else {
                  callback()
                }
              }
            }
          ]
        }
      }
    },
    created () {
      this.getList()
    },
    methods: {
      getList () {
        const loading = this.$loading(this.Global.loadingOption)
        let params = {
          pageNum: this.paginator.pageNum,
          displayNum: this.paginator.displayNum
        }
        getListCustomHotNews(params).then(response => {
          loading.close()
          this.list = response.data.list
          Object.assign(this.paginator, {
            totalNum: response.data.total
          })
        }).catch(error => {
          loading.close()
          console.log(error)
        })
      },
      changePage (id) {
        this.paginator.pageNum = id
        this.getList()
      },
      changePageSize (pageSize) {
        this.paginator.displayNum = pageSize
        this.changePage(1)
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
        this.$confirm('确定要删除规则？').then(() => {
          const param = {
            id: row.id
          }
          let loading = this.$loading(this.Global.loadingOption)
          deleteCustomHotNews(param).then(() => {
            loading.close()
            this.getList()
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
          }).catch(error => {
            loading.close()
            console.log(error)
          })
        }).catch(error => {
          console.log(error)
        })
      },
      handleCreate () {
        this.resetFormData()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      resetFormData () {
        this.formData = {
          id: null,
          title: '',
          url: ''
        }
      },
      createData () {
        this.$refs['dataForm'].validate((valid) => {
          console.log('valid', valid)
          if (valid) {
            const param = {
              'title': this.formData.title,
              'url': this.formData.url,
              'note': this.formData.note
            }
            let loading = this.$loading(this.Global.loadingOption)
            createCustomHotNews(param).then(() => {
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
            const param = {
              'id': this.formData.id,
              'title': this.formData.title,
              'url': this.formData.url,
              'note': this.formData.note
            }
            let loading = this.$loading(this.Global.loadingOption)
            updateCustomHotNews(param).then(() => {
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