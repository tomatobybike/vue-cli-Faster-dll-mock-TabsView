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
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="formData" label-position="left"    class="demo-form-inline" label-width="70px" >
        <el-form-item
                prop="name"
                label="名称"
                :rules="rules.title"
        >
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item
                label="球队图标"
        >
          <el-upload
                  action="/api/upload"
                  list-type="picture-card"
                  :file-list="fileList"
                  :limit="3"
                  :on-success="handleAvatarSuccess"
                  :on-exceed="handleExceed"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
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
  import core from '@/utils/util'
  import { getList, createTeam, updateTeam, deleteTeam } from '@/api/kickerteam'
  export default {
    data () {
      return {
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
        },
        fileList: [
          {url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
          {url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
        ],
        dialogImageUrl: '',
        dialogVisible: false
      }
    },
    created () {
      console.log(core.isMobile)
      console.log(core.elPager.layout)
      this.getList()
    },
    methods: {
      getList () {
        let params = {
          pageNum: this.paginator.pageNum,
          displayNum: this.paginator.displayNum
        }
        const loading = this.$loading(this.Global.loadingOption)
        getList(params).then(response => {
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
          deleteTeam(param).then(() => {
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
            createTeam(param).then(() => {
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
              fileList: this.fileList
            }
            let loading = this.$loading(this.Global.loadingOption)
            updateTeam(param).then(() => {
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
      getUrlList (fileList) {
        var newArray = []
        for (var value of fileList) {
          newArray.push({
            url: value.url
          })
        }
        return newArray
      },
      handleAvatarSuccess (res, file, fileList) {
        let thisItem = fileList.find(function (value, index, arr) {
          return value.uid === file.uid
        })
        if (thisItem !== -1) {
          thisItem.url = res.data
        } else {
          this.fileList.push(res.data)
        }
        this.fileList = Object.assign([], this.fileList, fileList)
        console.warn(this.fileList)
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
        this.fileList = this.getUrlList(fileList)
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      handleExceed (files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      }
    }
  }
</script>