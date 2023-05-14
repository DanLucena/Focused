<template>
  <div class="mt-2">
    <div class="px-4 py-2 bg-neutral-200 flex justify-between">
      <span>{{domainName}}</span>
      <button @click="deleteDomain(domainName)">x</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    domainName: {
      type: String,
      required: true
    },
  },
  methods: {
    deleteDomain(domainName) {
      this.$emit('delete-domain', domainName);
    }
  }
}
</script>
