<template>
  <div>
    <div id="filter">
      <div id="date-range">
        <p>Filter by Transaction Date Range:</p>
        <date-picker v-model:value="range" range></date-picker>
      </div>
    </div>
    <data-table
      @clickedrow="handleClickedRow"
      :heading="headings"
      :rows="computedAccounts"
    ></data-table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { Ref } from "vue";
import DatePicker from "vue-datepicker-next";
import "vue-datepicker-next/index.css";
import { useRouter } from "vue-router";
import { useQuery, useResult } from "@vue/apollo-composable";
import gql from "graphql-tag";
import DataTable from "@/components/DataTable.vue";
import moment from "moment";

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

const range: Ref<null[] | Date[]> = ref([null, null]);
const router = useRouter();

const { result, loading } = useQuery(gql`
  query getTransactions {
    allTransactions {
      id
      account
      description
      category
      reference
      currency
      amount
      status
      transactionDate
      createdAt
      updatedAt
    }
  }
`);

const accounts = useResult(
  result,
  [
    {
      id: "",
      account: "",
      description: "",
      category: "",
      reference: "",
      currency: "",
      amount: "",
      status: "",
      transactionDate: "",
      createdAt: "",
      updatedAt: "",
    },
  ],
  (data) => data.allTransactions
);

const variables = computed(() => ({
  lowerLimit: range.value[0] !== null ? range.value[0].toString() : null,
  upperLimit: range.value[1] !== null ? range.value[1].toString() : null,
}));

const { result: filtredResult } = useQuery(
  gql`
    query getRangedTransactions($lowerLimit: String!, $upperLimit: String!) {
      rangedTransactions(lowerLimit: $lowerLimit, upperLimit: $upperLimit) {
        id
        account
        description
        category
        reference
        currency
        amount
        status
        transactionDate
        createdAt
        updatedAt
      }
    }
  `,
  variables
);

const filteredResults = useResult(
  filtredResult,
  [],
  (data) => data.rangedTransactions
);

const computedAccounts = computed(() => {
  let rawComputedAccounts =
    range.value[0] !== null && range.value[1] !== null
      ? filteredResults.value
      : accounts.value;
  return rawComputedAccounts.length
    ? rawComputedAccounts.map((rCAccount: Heading) => ({
        ...rCAccount,
        transactionDate: moment(new Date(+rCAccount.transactionDate)).format("Do, MMM YYYY hh:mma"),
        createdAt: moment(new Date(+rCAccount.createdAt)).format("Do, MMM YYYY hh:mma"),
        updatedAt: moment(new Date(+rCAccount.updatedAt)).format("Do, MMM YYYY hh:mma"),
      }))
    : rawComputedAccounts;
});

const headings = ref(Object.keys(accounts.value[0]));

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
