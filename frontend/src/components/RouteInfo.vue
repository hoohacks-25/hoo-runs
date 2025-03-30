<template>
<div>
  <form class="w-full mb-5 dark: ">
    <div class="w-[20rem] bg-gray-100 p-3 rounded-2xl shadow-md m-auto">
      <h2 class="text-s mb-2 text-start">Enter information about your run:</h2>
    <div class="relative">
        <div class="flex">
          <input
            type="text"
            id="startLocation"
            class="w-full p-4 bg-white rounded-t-2xl  focus:outline-none border border-gray-300 "
            placeholder="Start Location "
          />
        </div>
    </div>
    <input
      type="text"
      id="endLocation"
      class="w-full p-4 bg-white  focus:outline-none border border-gray-300"
      placeholder="Where would you like to visit?"
    />
      <!-- Run Distance Input -->
    <div class="flex">
      <input
      type="number"
      v-model="distance"
      class="w-40 max-w-md p-3 border border-gray-300 rounded-bl-2xl bg-white focus:outline-none"
      placeholder="How far?"
      max="100"
      min="0"
        />
        <select class="w-full max-w-md p-3 border border-gray-300 rounded-r bg-white  rounded-br-2xl" v-model="model" id="plan">
          <option value="gemini-2.0-flash" selected>Gemini 2.0 Flash</option>
          <option value="gemini-2.0-flash-lite	">Gemini 2.0 Flash-Lite</option>
          <option value="gemini-1.5-flash	">Gemini 1.5 Flash </option>
          <option value="gemini-1.5-pro	">Gemini 1.5 Pro        </option>
          <option value="gemini-2.5-pro-exp-03-25">Gemini 2.5 Pro Experimental</option>
      </select>
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
const distance = ref(null);
const isDark = ref(false);

const model = ref("gemini-2.0-flash");

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
    miles: distance.value,
    model: model.value,
  }
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