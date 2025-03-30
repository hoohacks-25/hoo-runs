<template>
    <div>
        <div class = "flex items-center justify-end mt-3">
          <!-- <button @click = "toggleTheme" class="p-1 border rounded" style="padding: 0.5rem 1rem">
            {{ isDark ? '🌙 ' : '☀️' }}
          </button> -->
        </div>
        <div class="flex items-center justify-between w-[20rem] m-auto text-3xl mb-1 mt-2">
          <h2 ><strong>Stride </strong></h2>
          <i class="fa-solid fa-person-running"></i>
        </div>
        <h6 class="mb-4 ml-1 text-sm italics text-start"><em>A run route generator project for Hoohacks 2025</em></h6>



        <RouteInfo ref="routeInfo"/>
        
        <transition>
        <div v-if="hasRouteData" class="bg-gray-100 p-4 rounded mb-3 text-center flex items-center ">
          <div class=" grid grid-cols-1 grid-rows-2 gap-3 size-fit">
          </div>
            <table >
              <thead>
                <tr>
            
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><i class="fa fa-solid fa-ruler-horizontal mr-2"></i> <strong>{{routeData.distance.toFixed(2)}} mi</strong></td>
                  <td></td>
                  <td><i class="fa fa-solid fa-clock mr-2"></i> <strong>{{ routeTimes.low.toFixed(0) }}-{{ routeTimes.high.toFixed(0) }} min</strong></td>
                </tr>
                <tr>
                </tr>
              </tbody>
            </table>
        </div>
      </transition>

        <div id="map" class="mb-4 rounded" style="height: 250px; width: 100%;"></div>
        
        <div class="grid grid-cols-2 gap-1 content-center">
            <button  class="btn hover:outline-none"  @click="generateRoute">Find Route</button>
            <Transition>
                <LoadingDots v-if="loadingRoute" />
            </Transition>
            <transition>
              <a v-if="routeData.google_link && showing_google_link && !loadingRoute" :href="routeData.google_link"><button class="btn">Go to Maps</button></a>
            </transition>
        </div>

        <footer class="bg-white rounded-lg shadow-sm mt-4 dark:bg-gray-800">
    <div class="w-full  w-all p-4 md:flex md:items-center md:justify-between">
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <a href="https://github.com/hoohacks-25" class="hover:underline">HooHackers Team™</a>. All Rights Reserved.
    </span>
    </div>
</footer>

    </div>
    
</template>

<script>
</script>

<script setup>
import { useMainStore } from '@/stores/store';

import RouteInfo  from '../components/RouteInfo.vue'
import Map from '@/components/Map.vue'
import LoadingDots from '@/components/LoadingDots.vue'

import { onMounted, ref } from 'vue';
import LoadingDotsVue from '../components/LoadingDots.vue';

const showing_google_link = ref(false);
const store = useMainStore();
const routeInfo = ref(null);
const loadingRoute = ref(false);
const hasRouteData = ref(false);

const routeTimes = ref({low: null, high: null})

let routeData = ref({distance: 0});
let map;

const loadMap = () => {
  // Set location (Example: San Francisco)
  const location = { lat: 37.7749, lng: -122.4194 };

  // Create map instance
  map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: location
  });

  // Add a marker
  new google.maps.Marker({
      position: location,
      map: map,
      title: "San Francisco"
  });
}
window.onload = loadMap

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const generateRoute = async () => {
    loadMap();
    loadingRoute.value = true;
    const data = (await routeInfo.value.generateRoute()).data;

    loadingRoute.value = false;
    const encodedPolyline = data.polyline;

    const path = google.maps.geometry.encoding.decodePath(encodedPolyline);

    const polyline = new google.maps.Polyline({
      path: path,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 4
    });

    new google.maps.Marker({
        position: path[0],
        map: map,
        title: "Start Location",
        icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png", // Optional: Green marker
    });
    new google.maps.Marker({
        position: path[path.length-1],
        map: map,
        title: "End Location",
        icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // Optional: Green marker
    });
    // Adjust map bounds to fit the polyline
    
    const bounds = new google.maps.LatLngBounds();
    path.forEach(point => bounds.extend(point));
    map.fitBounds(bounds);

    polyline.setMap(map);
    routeData.value = data;

    routeTimes.value = {low: routeData.value.distance * 7, high: routeData.value.distance * 12}
    hasRouteData.value = true;
    console.log(routeData.value.distance);
    await sleep(700);
    showing_google_link.value = true;

}
</script>
<style scoped>
table {
  margin:auto;
  font-size: 15pt;
}
td {
  padding: 10px 10px;
}
p {
  margin:none;
}
.fa {
  width: 20px;
}
.btn {
    background: #3e91fe;
    border:none;
    color: antiquewhite;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>
