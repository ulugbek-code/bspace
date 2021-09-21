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
      <tr v-for="sheet in tableSheets" :key="sheet">
        <td>{{ sheet.first }}</td>
        <td>{{ sheet.second }}</td>
        <td>{{ sheet.third }}</td>
        <td>
          {{ sheet.fourth }}
          <fa
            :class="sheet.fourth < sheet.fifth ? 'greenish' : 'redish'"
            class="icons"
            :icon="[
              'fas',
              `level-${sheet.fourth < sheet.fifth ? 'up' : 'down'}-alt`
            ]"
          />
        </td>
        <td>{{ sheet.fifth }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableSheets: [
        {
          first: 'Долгосрочные биологические активы',
          second: 100,
          third: 'A120',
          fourth: 631,
          fifth: 599
        },
        {
          first: 'Основные Ср-ва',
          second: 350,
          third: 'AA420',
          fourth: 631,
          fifth: 599
        },
        {
          first: 'Нематериальные Активы',
          second: 100,
          third: 'A820',
          fourth: 691,
          fifth: 199
        },
        {
          first: 'инвестиции, учитываемые методом долевого участия',
          second: 100,
          third: 'A120',
          fourth: 631,
          fifth: 999
        },
        {
          first: 'прочие долгосрочные инвестиции',
          second: 520,
          third: 'A524',
          fourth: 211,
          fifth: 345
        },
        {
          first: 'Отложенные налоговые активы',
          second: 320,
          third: 'A540',
          fourth: 620,
          fifth: 539
        },
        {
          first: 'долгосрочная дебиторская задолженность',
          second: 100,
          third: 'A120',
          fourth: 631,
          fifth: 999
        },
        {
          first: 'долгосрочная займы выданные',
          second: 500,
          third: 'A123',
          fourth: 531,
          fifth: 439
        }
      ]
    };
  }
};
</script>

<style scoped>
.box-table {
  flex: 2;
  width: 100%;
  border-top: 1px solid rgba(221, 221, 221, 1);
  /* background: rgba(221, 221, 221, 0.3); */
  /* background: blue; */
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
.greenish {
  color: rgba(76, 175, 80, 1);
}
.redish {
  color: rgba(204, 24, 24, 1);
}
</style>
