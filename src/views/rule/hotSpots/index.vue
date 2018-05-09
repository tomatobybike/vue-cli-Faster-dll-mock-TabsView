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
              label="名称"
              width="180">
        <template slot-scope="scope">
          <span >{{ scope.row.name }}</span>
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
                prop="name"
                label="名称"
                :rules="rules.title"
        >
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-row v-for='(item , index) in formData.items' :key="formData.key">
          <el-col :span="12">
            <el-form-item label="来源" :prop="'items.' + index + '.source'" :rules="rules.name">
              <el-input v-model="item.source" placeholder="来源" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="个数" :prop="'items.' + index + '.limit'" :rules="rules.number">
              <el-input  v-model="item.limit" placeholder="个数" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
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
  import { isValidNumber } from '@/utils/validate'
  import core from '@/utils/util'
  import { getListHotNews, createHotNews, updateHotNews, deleteHotNews, getSources } from '@/api/hotnews'
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
          name: '',
          items: []
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '修改',
          create: '新建'
        },
        rules: {
          title: [{ required: true, message: '必填项', trigger: 'blur' }],
          name: [{ required: true, message: '必填项', trigger: 'blur' }],
          number: [
            {
              required: true,
              message: '请输入整数',
              trigger: 'blur',
              type: 'number',
              validator: function (rule, value, callback) {
                console.log('是否数字：', !isValidNumber(value))
                if (isValidNumber(value) === false) {
                  callback(new Error('请输入正确的数字'))
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
      console.log(core.isMobile)
      console.log(core.elPager.layout)
      this.getSources()
    },
    methods: {
      getSources () {
        let loading = this.$loading(this.Global.loadingOption)
        return getSources().then(response => {
          loading.close()
          this.sourcesList = []
          for (var i = 0, len = response.data.length; i < len; i++) {
            this.sourcesList.push({
              source: response.data[i],
              limit: null,
              readonly: true
            })
          }
          this.list = null
          this.getList()
        }).catch(error => {
          loading.close()
          console.log(error)
        })
      },
      getList () {
        let params = {
          pageNum: this.paginator.pageNum,
          displayNum: this.paginator.displayNum
        }
        const loading = this.$loading(this.Global.loadingOption)
        getListHotNews(params).then(response => {
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
          deleteHotNews(param).then(() => {
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
        this.sourcesList = this.sourcesList.map(function (item) {
          return Object.assign(item, {limit: null})
        })
        this.formData = {
          id: null,
          name: '',
          items: []
        }
        this.formData.items = this.sourcesList
      },
      createData () {
        this.$refs['dataForm'].validate((valid) => {
          console.log('valid', valid)
          if (valid) {
            let param = {
              name: this.formData.name,
              note: this.formData.note,
              items: []
            }
            param.items = this.formData.items.map(function (item, key, ary) {
              return {
                source: item.source,
                limit: item.limit
              }
            })
            let loading = this.$loading(this.Global.loadingOption)
            createHotNews(param).then(() => {
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
              name: this.formData.name,
              note: this.formData.note,
              items: []
            }
            param.items = this.formData.items.map(function (item, key, ary) {
              return {
                source: item.source,
                limit: item.limit
              }
            })
            let loading = this.$loading(this.Global.loadingOption)
            updateHotNews(param).then(() => {
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