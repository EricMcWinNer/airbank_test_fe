<template>
  <div>
    <div id="filter">
      <div id="date-range">
        <p>Filter by Date Range:</p>
        <date-picker
          @change="runQuery"
          v-model:value="range"
          range
        ></date-picker>
      </div>
    </div>
    <data-table
      @clickedrow="handleClickedRow"
      :heading="headings"
      :rows="accounts"
    ></data-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import DatePicker from "vue-datepicker-next";
import "vue-datepicker-next/index.css";
import DataTable from "@/components/DataTable.vue";
import { useRouter } from "vue-router";

type Heading = {
  id: string;
  account: string;
  description: string;
  category: string;
  reference: string;
  currency: string;
  amount: string;
  status: string;
  transactionDate: string;
  createdAt: string;
  updatedAt: string;
};

const range = ref(null);
const router = useRouter();

const accounts: Ref<Heading[]> = ref([
  {
    id: "e206619a-6dd2-4cc1-8603-429631d46476",
    account: "Sydney Beard",
    description: "sadsad",
    category: "Another One",
    reference: "",
    currency: "GBP",
    amount: "-23",
    status: "BOOKED",
    transactionDate: "2021-06-22 12:55:26",
    createdAt: "2021-06-23 17:09:31",
    updatedAt: "2021-06-23 17:09:31",
  },
  {
    id: "e206619a-6dd2-4cc1-8603-429631d46476",
    account: "Sydney Beard",
    description: "sadsad",
    category: "Another One",
    reference: "",
    currency: "GBP",
    amount: "-23",
    status: "BOOKED",
    transactionDate: "2021-06-22 12:55:26",
    createdAt: "2021-06-23 17:09:31",
    updatedAt: "2021-06-23 17:09:31",
  },
  {
    id: "e206619a-6dd2-4cc1-8603-429631d46476",
    account: "Sydney Beard",
    description: "sadsad",
    category: "Another One",
    reference: "",
    currency: "GBP",
    amount: "-23",
    status: "BOOKED",
    transactionDate: "2021-06-22 12:55:26",
    createdAt: "2021-06-23 17:09:31",
    updatedAt: "2021-06-23 17:09:31",
  },
  {
    id: "e206619a-6dd2-4cc1-8603-429631d46476",
    account: "Sydney Beard",
    description: "sadsad",
    category: "Another One",
    reference: "",
    currency: "GBP",
    amount: "-23",
    status: "BOOKED",
    transactionDate: "2021-06-22 12:55:26",
    createdAt: "2021-06-23 17:09:31",
    updatedAt: "2021-06-23 17:09:31",
  },
  {
    id: "e206619a-6dd2-4cc1-8603-429631d46476",
    account: "Sydney Beard",
    description: "sadsad",
    category: "Another One",
    reference: "",
    currency: "GBP",
    amount: "-23",
    status: "BOOKED",
    transactionDate: "2021-06-22 12:55:26",
    createdAt: "2021-06-23 17:09:31",
    updatedAt: "2021-06-23 17:09:31",
  },
]);

const headings = ref(Object.keys(accounts.value[0]));

const runQuery = () => {
  alert("I got triggered. I'll re-run query for filters!");
};

const handleClickedRow = (row: Heading) => {
  sessionStorage.setItem("current_row", JSON.stringify(row));
  router.push("/transaction");
};
</script>
<style scoped>
#filter {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding: 16px;
}
#date-range p {
  text-transform: uppercase;
  font-size: 12px;
  margin-bottom: 8px;
}
</style>
