<script lang="ts" setup>
import { onMounted, ref, computed, onUnmounted } from "vue";
import type { Ref } from "vue";
import { useRouter } from "vue-router";
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
  <div>
    <div v-for="(header, index) in headingKeys">
      <h1>{{ header }}</h1>
      <p>{{ heading[header] }}</p>
    </div>
  </div>
</template>

<style scoped></style>
