<script lang="ts" setup>
import { onMounted, ref, computed, onUnmounted } from "vue";
import type { Ref } from "vue";
import { useRouter } from "vue-router";
import { wordify, trueCapitalize } from "@/utils/helper";
const router = useRouter();
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
const heading: Ref<Heading> = ref({
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
});
onMounted(() => {
  const currentRow = sessionStorage.getItem("current_row");
  if (currentRow) {
    heading.value = JSON.parse(currentRow);
  } else {
    router.push("/");
  }
});
onUnmounted(() => {
  sessionStorage.removeItem("current_row");
});
const headingKeys = computed(
  () => Object.keys(heading.value) as Array<keyof Heading>
);
</script>

<template>
  <div id="single-page">
    <div class="single-page__card">
      <h3>Transaction Details</h3>
      <p>Below are the details of your selected transaction</p>
      <div
        v-for="(header, index) in headingKeys"
        :key="`single_heading_${index}`"
      >
        <h5>{{ wordify(header) }}</h5>
        <p>{{ heading[header] }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
#single-page {
  width: 100%;
  min-height: 100vh;
  background: #f1f1f1;
  display: flex;
  justify-content: center;
}
.single-page__card {
  background: white;
  width: 100%;
  max-width: 600px;
  border-radius: 6px;
  box-shadow: 0 0 8px rgba(0,0,0,.08);
  padding: 30px;
  margin-top: 45px;
}
h5 {
  text-transform: uppercase;
}
h5 {
  margin-top: 1rem;
  margin-bottom: 8px;
}
p {
  color: #666;
  font-size: 14px;
}
</style>
