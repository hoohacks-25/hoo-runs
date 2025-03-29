<template>
  
  <div class="w-full max-w-lg">
   
    <form class="w-full max-w-lg">
  <div class="flex flex-wrap -mx-3 mb-1">
    <div class="w-full md:w-1/2 px-3 mb-2 md:mb-0 ">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
      for="grid-start-pos">
        Start Location
      </label>
      <input v-model="startLocation" class="appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border" 
      id="grid-start-pos" 
      type="text" 
      placeholder="Where do you want to start?">
    </div>
    <div class="w-full md:w-1/2 px-3 mb-2 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
      for="grid-end-pos">
        End location
      </label>
      <input v-model="endLocation" class="appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border" 
      id="grid-end-pos" 
      type="text" 
      placeholder="Where do you want to go?">
    </div>
    <div class="w-full md:w-1/2 px-3 mb-2 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
      for="grid-distance">
        Distance 
      </label>
      <input v-model="distance" class="text-center appearance-none block w-25 m-auto bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border" 
      id="grid-distance" 
      type="number" 
      max="500"
      min="0"
      placeholder="Miles">
    </div>
  </div>
</form>
</div>
</template>


<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

const startLocation = ref("");
const endLocation = ref("");
const distance = ref(0);

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY
const AUTOCOMPLETE_API_URL ="https://maps.googleapis.com/maps/api/place/autocomplete/json"

const startCoords = ref({});
  const endCoords = ref({});


const InitializeLocationSuggestions = async () => {
  const startInput = document.querySelector('input#grid-start-pos');
  const endInput = document.querySelector('input#grid-end-pos');

  const start = new google.maps.places.Autocomplete(startInput);
  const end = new google.maps.places.Autocomplete(endInput);


  start.addListener('place_changed', () => {
    const place = start.getPlace();
    startLocation.value = place.formatted_address;
    startCoords.value = {lat: place.geometry.location.lat(), long: place.geometry.location.lng()}
  });

  end.addListener('place_changed', () => {
    const place = end.getPlace();
    endLocation.value = place.formatted_address;
    endCoords.value = {lat: place.geometry.location.lat(), long: place.geometry.location.lng()}
  });
  start.addListener
}


// Your Google Maps API key
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const generate_api_url = '/api/run/generate';

const generateRoute = async () => {
  const params = {
    startLocation: startCoords,
    endLocation: endCoords,
    distance: distance,
  }
  const data = await axios.get(generate_api_url, params);
  console.log(data);
}

onMounted(() => {
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);

  generateRoute();
  script.onload = () => {
    InitializeLocationSuggestions();
  };
});

defineExpose({
  generateRoute
})

</script>
<style lang="scss" scoped>

</style>