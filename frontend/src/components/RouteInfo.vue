<template>
<div>
  <div class = "flex items-center justify-end">
    <button @click = "toggleTheme" class="p-1 border rounded" style="padding: 0.5rem 1rem">
      {{ isDark ? '🌙 ' : '☀️' }}
    </button>
  </div>
  <div class="flex items-center justify-between w-[20rem] m-auto text-3xl mb-4 mt-2">
    <h2>HooRuns</h2>
    <i class="fa-solid fa-person-running"></i>
  </div>
  <form class="w-full mb-5 dark: ">
    <div class="w-[20rem] bg-gray-100 p-3 rounded-2xl shadow-md m-auto">
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
    max="100"
    min="0"
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
const isDark = ref(false);

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
    startCoords.value = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()}
  });

  end.addListener('place_changed', () => {
    const place = end.getPlace();
    endLocation.value = place.formatted_address;
    endCoords.value = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()}
  });
  start.addListener
}


// Your Google Maps API key
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const generate_api_url = '/api/run/generate';

const generateRoute = async () => {
  const params = {
    start: {lat: startCoords.value.lat, lng: startCoords.value.lng},
    end: {lat: startCoords.value.lat, lng: startCoords.value.lng},
    miles: distance,
  }
  console.log(params);
  const data = await axios.post(generate_api_url, params);
  return data;
}

onMounted(() => {

  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places,geometry`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);

  script.onload = () => {
    InitializeLocationSuggestions();
  };

  if (localStorage.getItem('theme') === 'dark') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
});

defineExpose({
  generateRoute
})

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark')
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

</script>
<style scoped>
h2 {
  font-weight: bold;
}

input[type="text"]:focus {
  border:none;
}
</style>