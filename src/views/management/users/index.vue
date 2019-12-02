<template>
  <div>
    <m-table :formList="formList" :table-obj="tableObj" :page-obj="pageObj" @changePage="getList" />
  </div>
</template>

<script>
import { getUsers } from "@/api/management";
import mTable from "@/components/table";
export default {
  components: { mTable },
  data() {
    return {
      formList:[ { type: "input" },{ type: "submit" }],
      pageObj: {
        layout: "total, prev, pager, next, sizes",
        total: 100,
        pageNumber: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 40, 50]
      },
      tableObj: {
        tableHead: ["name", "gender", "email", "phone"],
        tableFiled: ["name", "gender", "email", "phone", "id"],
        tableData: []
      },
      o: {
        results: [
          {
            gender: "male",
            name: { title: "Mr", first: "Mari", last: "Schilt" },
            location: {
              street: { number: 9396, name: "Jan van Tourainestraat" },
              city: "Winkel",
              state: "Flevoland",
              country: "Netherlands",
              postcode: 39369,
              coordinates: { latitude: "37.9733", longitude: "-120.1120" },
              timezone: {
                offset: "-3:00",
                description: "Brazil, Buenos Aires, Georgetown"
              }
            },
            email: "mari.schilt@example.com",
            login: {
              uuid: "995fdf25-42b8-446e-ba53-47b9a8d7e2ef",
              username: "greenduck372",
              password: "overkill"
            },
            dob: { date: "1969-04-20T04:12:59.082Z", age: 50 },
            registered: { date: "2014-08-09T09:53:21.387Z", age: 5 },
            phone: "(658)-481-9920",
            cell: "(713)-171-8922",
            id: { name: "BSN", value: "91165363" },
            picture: {
              large: "https://randomuser.me/api/portraits/men/60.jpg",
              medium: "https://randomuser.me/api/portraits/med/men/60.jpg",
              thumbnail: "https://randomuser.me/api/portraits/thumb/men/60.jpg"
            },
            nat: "NL"
          }
        ],
        info: { seed: "dd53c2bd8a9b57cb", results: 1, page: 1, version: "1.3" }
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      this.tableObj.tableData = [];
      // const o = await getUsers({
      // page: this.pageObj.pageNumber,
      // results: this.pageObj.pageSize
      // });
      const o = this.o;
      o.results.forEach(item => {
        this.tableObj.tableData.push({
          name: item.name.first,
          gender: item.gender,
          email: item.email,
          phone: item.phone,
          id: item.id.value
        });
      });
    }
  }
};
</script>