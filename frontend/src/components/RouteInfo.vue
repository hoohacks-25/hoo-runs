<template>
<div>
  <form class="w-full mb-5">
    <div class="w-[20rem] bg-gray-100 p-3 rounded-2xl m-auto shadow-md">
    <div class="relative">
      <input
        type="text"
        id="startLocation"
        class="w-full p-4 bg-white rounded-t-2xl  focus:outline-none border border-gray-300 "
        placeholder="Start Location"
      />
    </div>
    <input
      type="text"
      id="endLocation"
      class="w-full p-4 bg-white rounded-b-2xl focus:outline-none border border-gray-300"
      placeholder="End Location"
    />
      <!-- Run Distance Input -->
    <input
    type="number"
    class="w-full max-w-md p-3 border border-gray-300 rounded-lg bg-white focus:outline-none mt-4"
    placeholder="Run Distance (miles)"
  />
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
  const startInput = document.querySelector('input#startLocation');
  const endInput = document.querySelector('input#endLocation');

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
  return data;
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
<style scoped>
input[type="text"]:focus {
  border:none;
}
</style>