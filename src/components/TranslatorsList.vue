<template>
    <div class="w-full mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4 text-center text-gray-800">Translators</h1>

        <div class="mb-4">
            <label class="text-gray-800 font-medium mr-2" for="availability">Filter by Availability:</label>
            <select id="availability" v-model="selectedAvailability" @change="fetchTranslators"
                class="border border-gray-300 rounded p-2 bg-white text-gray-800 hover:border-blue-400 transition duration-200">
                <option value="">All</option>
                <option value="weekdays">Weekdays</option>
                <option value="weekend">Weekend</option>
            </select>
        </div>

        <ul class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <li v-for="translator in translators" :key="translator.id"
                class="p-4 w-full border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
                <div class="flex justify-between items-center">
                    <div>
                        <h2 class="text-lg font-semibold text-gray-900">{{ translator.name }}</h2>
                        <p class="text-gray-600">{{ translator.email }}</p>
                    </div>
                    <span :class="{
                        'bg-green-200 text-green-800': translator.availability === 'weekend',
                        'bg-blue-200 text-blue-800': translator.availability === 'weekdays'
                    }" class="px-3 py-1 rounded-full text-sm font-medium">
                        {{ translator.availability }}
                    </span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getTranslators } from '../api';

const translators = ref([]);
const selectedAvailability = ref('');

const fetchTranslators = async () => {
    try {
        const response = await getTranslators(selectedAvailability.value);
        translators.value = response;
    } catch (error) {
        console.error('Error fetching translators:', error);
    }
};

onMounted(fetchTranslators);
</script>