<template>
  <div class="text-center">
    <form @submit.prevent="onSubmit">
      <textarea v-model="plainText"
                rows="10"
                class="form-control" />

      <div>
        <b>Hours: </b>
        <span class="text-danger">{{ hours }}</span>
      </div>

      <div>
        <button type="submit"
                class="btn btn-primary">Calculate</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    plainText: '',
    hours: 0
  }),

  methods: {
    onSubmit(e) {
      this.hours = 0

      let hourTextSegments = this.plainText.trim().split('\n')

      for (var i in hourTextSegments) {
        let hourSegment = hourTextSegments[i].trim()

        if (! hourSegment) {
          continue
        }

        let hourMatches = hourSegment.replace(/^[^\()]+/, '')
            .match(/^\(([0-9\.]+)\)/)

        if (! hourMatches.length) {
          continue
        }

        let hour = parseFloat(
            hourMatches[1]
        )

        this.hours += hour
      }
    }
  }
}
</script>

<style scoped>

</style>