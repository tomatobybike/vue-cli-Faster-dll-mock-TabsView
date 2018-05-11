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
          <span >{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column
              label="Email"
              width="180">
        <template slot-scope="scope">
          <span >{{ scope.row.userEmail }}</span>
        </template>
      </el-table-column>
      <el-table-column
              label="电话"
              width="180">
        <template slot-scope="scope">
          <span >{{ scope.row.userPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column
              label="是否管理员"
              width="180"
              prop="isAdmin"
              :formatter="isAdminTransform"
      >

      </el-table-column>
      <el-table-column
              label="用户组"
              width="180">
        <template slot-scope="scope">
          <span >{{ scope.row.groupName }}</span>
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
                  v-if="scope.row.groupId===0"
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
                prop="userName"
                label="名称"
                :rules="rules.title"
        >
          <el-input v-model="formData.userName"></el-input>
        </el-form-item>
        <el-form-item
                prop="userEmail"
                label="Email"
                :rules="rules.title"
        >
          <el-input v-model="formData.userEmail"></el-input>
        </el-form-item>
        <el-form-item
                prop="userPhone"
                label="电话"
                :rules="rules.title"
        >
          <el-input v-model="formData.userPhone"></el-input>
        </el-form-item>

        <el-form-item label="管理员" prop="isAdmin">
            <el-radio-group v-model="formData.isAdmin">
                <el-radio :label=1>是</el-radio>
                <el-radio :label=0>否</el-radio>
            </el-radio-group>
        </el-form-item>

          <el-form-item label="用户组">
          <el-select v-model="formData.groupId"  placeholder="请选择">
            <el-option
                    v-for="item in group"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
            </el-option>
          </el-select>
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
    <power-dialog ref="powerDialog"></power-dialog>
  </div>
</template>

<script>
  import core from '@/utils/util'
  import { getListUser, createItemUser, updateItemUser, deleteItemUser } from '@/api/user'
  import { getListGroup } from '@/api/group'
  import powerDialog from './powerDialog.vue'
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
          isAdmin: 1,
          userName: '',
          userEmail: '',
          userPhone: ''
        },
        group: [],
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
        let params = {
          pageNum: this.paginator.pageNum,
          displayNum: this.paginator.displayNum
        }
        const loading = this.$loading(this.Global.loadingOption)
        getListUser(params).then(response => {
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
      handlePower (index, row) {
        this.$refs.powerDialog.init(row)
      },
      isAdminTransform (row, column, cellValue) {
        console.log('cellValue', cellValue)
        return cellValue ? '是' : '否'
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
        const loading = this.$loading(this.Global.loadingOption)
        getListGroup().then(response => {
          loading.close()
          this.group = response.data.list
          this.formData = Object.assign({}, row) // copy obj
          console.log('row', row)
          this.dialogStatus = 'update'
          this.dialogFormVisible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].clearValidate()
          })
        }).catch(error => {
          loading.close()
          console.log(error)
        })
      },
      handleDelete (index, row) {
        this.$confirm('确定要删除？').then(() => {
          const param = {
            id: row.id
          }
          let loading = this.$loading(this.Global.loadingOption)
          deleteItemUser(param).then(() => {
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
        const loading = this.$loading(this.Global.loadingOption)
        getListGroup().then(response => {
          loading.close()
          this.resetTemp()
          this.group = response.data.list
          this.dialogStatus = 'create'
          this.dialogFormVisible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].clearValidate()
          })
        }).catch(error => {
          loading.close()
          console.log(error)
        })
      },
      resetTemp () {
        this.formData = {
          id: null,
          userName: '',
          userEmail: '',
          userPhone: ''
        }
      },
      createData () {
        this.$refs['dataForm'].validate((valid) => {
          console.log('valid', valid)
          if (valid) {
            let param = {
              isAdmin: this.formData.isAdmin,
              userName: this.formData.userName,
              userEmail: this.formData.userEmail,
              userPhone: this.formData.userPhone,
              groupId: this.formData.group
            }
            let loading = this.$loading(this.Global.loadingOption)
            createItemUser(param).then(() => {
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
              isAdmin: this.formData.isAdmin,
              userName: this.formData.userName,
              userEmail: this.formData.userEmail,
              userPhone: this.formData.userPhone,
              groupId: this.formData.group
            }
            let loading = this.$loading(this.Global.loadingOption)
            updateItemUser(param).then(() => {
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
