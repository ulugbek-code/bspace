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
      <tr v-for="r in repo" :key="r">
        <td>{{ r.name }}</td>
        <td>{{ r.code }}</td>
        <td>{{ r.note ? r.note : 'No note' }}</td>
        <td>
          {{ r.internationalOpeningAmount }}
          <fa
            :class="
              r.internationalOpeningAmount < r.internationalClosingAmount
                ? 'greenish'
                : 'redish'
            "
            class="icons"
            :icon="[
              'fas',
              `level-${
                r.internationalOpeningAmount < r.internationalClosingAmount
                  ? 'up'
                  : 'down'
              }-alt`
            ]"
          />
        </td>
        <td>{{ r.internationalClosingAmount }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ['repo'],
  data() {
    return {
      tableSheets: [
        {
          first: 'Долгосрочные биологические активы',
          second: 100,
          third: 'A120',
          fourth: 631,
          fifth: 599
        }
      ]
    };
  }
};
</script>

<style scoped>
.box-table {
  flex: 2;
  height: 83vh;
  width: 100%;
  border-top: 1px solid rgba(221, 221, 221, 1);
  overflow-y: scroll;
  overflow-x: hidden;
}
table {
  width: 94%;
  margin: 0 auto;
  border-collapse: collapse;
  text-align: left;
}
tr:not(:nth-child(1)) {
  border-bottom: 1px solid rgba(170, 170, 170, 0.2);
}
th {
  background: #fff;
  position: sticky;
  top: 0%;
  z-index: 1;
  color: rgba(170, 170, 170, 1);
  padding: 3px 6px;
}
th::after {
  content: '';
  height: 1.5px;
  width: 100%;
  position: absolute;
  bottom: -2%;
  left: 0;
  background: rgba(170, 170, 170, 0.7);
  /* have to change cause little space is appers when scrolling */
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
.greenish {
  color: rgba(76, 175, 80, 1);
}
.redish {
  color: rgba(204, 24, 24, 1);
}
</style>
