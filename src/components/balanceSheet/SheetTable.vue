<template>
  <div class="box-table">
    <table>
      <tr>
        <th>
          Наименование показателя<br />
          <span>10</span>
        </th>
        <th>
          Код строки<br />
          <span>20</span>
        </th>
        <th>
          Примечание<br />
          <span>30</span>
        </th>
        <th>
          На 01.01.2020<br />
          <span>40</span>
        </th>
        <th>
          На 31.12.2020<br />
          <span>50</span>
        </th>
      </tr>
      <tr>
        <td><h3>Активы</h3></td>
      </tr>
      <tr>
        <td>adaddad</td>
        <td>adaddad</td>
        <td>adaddad</td>
        <td>adaddad</td>
        <td>adaddad</td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.box-table {
  flex: 2;
  width: 100%;
  /* background: rgba(221, 221, 221, 0.3); */
  /* background: blue; */
}
table {
  width: 94%;
  margin: 0 auto;
  border-collapse: collapse;
  text-align: left;
}

th {
  color: rgba(170, 170, 170, 1);
  /* margin: 0 10px; */
  padding: 3px 6px;
}
th span {
  font-size: 12px;
  font-weight: 400;
  padding: 2px 8px;
  color: rgba(67, 97, 238, 1);
  background: rgba(67, 97, 238, 0.3);
  border-radius: 12px;
}
td {
  background: #fff;
  font-size: 14px;
  padding: 16px 12px;
}
</style>
