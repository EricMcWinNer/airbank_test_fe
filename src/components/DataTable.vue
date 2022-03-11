<template>
  <table class="data-table" v-if="rows !== undefined && rows !== null">
    <thead>
      <tr>
        <th v-for="(head, index) in heading" :key="`heading__${index}`">
          {{ wordify(head) }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="row in rows"
        @click="$emit('clickedrow', row)"
        :key="`row-${row.id}`"
      >
        <td
          v-for="(column, kindex) in Object.values(row)"
          :key="`row-${row.id}.${kindex}`"
        >
          {{ column }}
        </td>
      </tr>
    </tbody>
  </table>
  <p class="no-results" v-if="!rows.length">There are no results matching that range.</p>
</template>

<script setup lang="ts">
import { wordify } from "@/utils/helper";
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
interface Props {
  heading: string[];
  rows: Heading[];
}
defineProps<Props>();
const emit = defineEmits<{
  (e: "clickedrow", row: Heading): null;
}>();
</script>

<style scoped>
table {
  width: 100%;
}
table.data-table {
  border-collapse: collapse;
}
table.data-table th {
  font-weight: bold;
  font-size: 11px;
  padding: 16px;
  text-transform: uppercase;
  background: #f9fafb;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
table.data-table td {
  font-size: 12px;
  padding: 8px 16px;
  text-align: left;
  transition: 0.8s;
}
table.data-table tbody tr:nth-child(even) {
  background: #f9fafb;
}
table.data-table tbody tr {
  cursor: pointer;
  transition: 0.8s;
}
table.data-table tbody tr:hover {
  background: #e7eaec;
}
.no-results {
  text-align: center;
  margin-top: 1rem;
}
</style>
