## 模板文件使用方法
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

