<template>
  <div v-if="gallery.images">
    <b-carousel id="carousel1"
                style="text-shadow: 1px 1px 2px #333;"
                controls
                indicators
                background="#ababab"
                :interval="0"
                img-width="1024"
                img-height="480"
    >

      <!-- Slides with custom text -->
        <div v-for="imageURL in gallery.images" :key="imageURL.id" :imageURL="imageURL">
            <a :href="imageURL.image_url" target="_blank">
                <b-carousel-slide :caption="gallery.title"
                                :img-src="imageURL.image_url"

                />
            </a>
        </div>

    </b-carousel>

  </div>
</template>

<script>
export default {
  props: {
      gallery: {
          type: Object,
          required: true
      }
  }
}
</script>

<style scoped>

</style>
