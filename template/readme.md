## 模板文件使用方法
### 字段名
```json
 create_table "bricks", force: :cascade do |t|
     t.string "name"
     t.string "table_type"
     t.string "name_plural"
     t.string "parent_dir"
     t.string "api_path"
     t.datetime "created_at", precision: 6, null: false
     t.datetime "updated_at", precision: 6, null: false
     t.string "cnname"
     t.integer "project_id"
   end
 
   create_table "dfields", force: :cascade do |t|
     t.string "field_ame"
     t.string "field_type"
     t.boolean "is_required"
     t.boolean "is_show_in_list"
     t.boolean "is_editable"
     t.string "api"
     t.integer "brick_id", null: false
     t.datetime "created_at", precision: 6, null: false
     t.datetime "updated_at", precision: 6, null: false
     t.string "cnname"
     t.index ["brick_id"], name: "index_dfields_on_brick_id"
     t.integer "sort" 
     t.integer "width"  
     t.string "regx"  
   end
```
* 模块名<%= @brick[:name]%>
* 模块复数<%= @brick[:name_plural]%>
* 首字母大写<%=titleize(@brick[:name])%>
* 首字母大写复数<%=titleize(@brick[:name_plural])%>
* 循环
``` html
<% @brick.dfields.each do |f|%>
 <el-table-column prop="<%= f[:field_ame] %>" label="<%= f[:cnname] %>" ></el-table-column>
<%end%>
```
* 条件判断        
```aidl
 <% if f[:is_show_in_list] %>show<%else%>noshow<%end%>
```
* 排序
```aidl
.order('sort').
```

