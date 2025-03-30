<template>
    <div>
        <h1></h1>
        <RouteInfo ref="routeInfo"/>
        <div id="map" class="mb-4 rounded" style="height: 250px; width: 100%;"></div>
        <div class="grid grid-cols-2 gap-1 content-center">
          <button  class="btn hover:outline-none"  @click="generateRoute">Find Route</button>
          <Transition>
              <LoadingDots v-if="loadingRoute" />
          </Transition>
            
        </div>

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

const show = ref(false);
const store = useMainStore();
const routeInfo = ref(null);
const loadingRoute = ref(false);

let map;
window.onload = function () {
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

onMounted(async () => {

})
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const generateRoute = async () => {
    loadingRoute.value = true;
    const data = (await routeInfo.value.generateRoute()).data;
    loadingRoute.value = false;
    const encodedPolyline = data.polyline;

    console.log(encodedPolyline);
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
    

}
</script>
<style scoped>
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
