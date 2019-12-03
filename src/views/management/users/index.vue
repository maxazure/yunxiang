<template>
  <div class="app-container">
    <m-table
      :formList="formList"
      :table-obj="tableObj"
      :page-obj="pageObj"
      @changePage="getList"
      @del="del"
    >


    </m-table>
  </div>
</template>

<script>
import { getUsers } from "@/api/user";
import mTable from "@/components/table";
import user from "@/store/modules/user";
export default {
  components: { mTable },
  data() {
    return {
      formList: [
        { type: "input", field: "name", placeholder: "name" },
        { type: "input" },
        { type: "input" },
        { type: "submit", url: "" },
        { type: "button", value: "新用户" }
      ],
      pageObj: {
        layout: "total, prev, pager, next, sizes",
        total: 10,
        pageNumber: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 40, 50]
      },
      tableObj: {
        tableHead: [
          "编号",
          "key",
          "姓名",
          "用户名",
          "邮箱",
          "手机",
          "角色",
          "公司"
        ],
        tableData: []
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      getUsers({
        page: this.pageObj.pageNumber,
        pagesize: this.pageObj.pageSize
      }).then(response => {
        this.tableObj.tableData = [];
        const list = response.data.list;
        this.pageObj.total = response.data.pagination.total;

        this.tableObj.tableFiled = Object.keys(list[0]);

        list.forEach(item => {
          let temp = {};
          for (const o in item) {
            temp[o] = item[o];
          }
          this.tableObj.tableData.push(temp);
        });
      });
    },
    del(row) {
      console.log(row);
    }
  }
};
</script>