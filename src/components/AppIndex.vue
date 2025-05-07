<script setup>
    import { dataApi } from '../api/dataApi';
    import { defineProps, ref, computed, onMounted, onBeforeUnmount } from 'vue';
    import { formater } from '../utils/formater';

    const data = ref([]);
    const isLoading = ref(false);
    const interval = ref(null);
    const deviceIP = ref('');
    const deviceType = ref('');
    const searchQuery = ref('');

    const getData = async () => {
        isLoading.value = true;
        try {
            const serverResult = await dataApi.getData("api/v1/devices/");
            data.value = serverResult;
        } catch (error) {
            console.log(error);
        } finally {
            isLoading.value = false;
        }

    }

    const sortedData = computed(() => {
        if(!data.value || !Array.isArray(data.value)) return [];
        var query_items = data.value;
        if (searchQuery.value) {
            const query = searchQuery.value.toLowerCase();
            query_items = data.value.filter(item => 
                item.ip.toLowerCase().includes(query) || 
                item.device_type.toLowerCase().includes(query)
            );
        }
        return [...query_items].sort((a, b) => a.id - b.id);
    });

    const makeBackup = async (device) => {
        isLoading.value = true;
        try {
            const serverResult = await dataApi.getData("api/v1/devices/backup/" + device.id);
            data.value = serverResult;
        } catch (error) {
            console.log(error);
        } finally {
            isLoading.value = false;
            getData();
        }
    }

    const deleteDevice = async (device) => {
        isLoading.value = true;
        try {
            const serverResult = await dataApi.deleteData("api/v1/devices/" + device.id);
            data.value = serverResult;
        } catch (error) {
            console.log(error);
        } finally {
            isLoading.value = false;
            getData();
        }
    }

    const addDevice = async () => {
        isLoading.value = true;
        try {
            if (deviceIP.value !== '' && deviceType.value !== '')
            {
            const newDevice = {
                "ip": deviceIP.value,
                "device_type": deviceType.value,
                "backup_status": "Нет бэкапа"
                }
            const serverResult = await dataApi.postData("api/v1/devices/", newDevice);
            data.value = serverResult;
            }

        } catch (error) {
            console.log(error);
        } finally {
            isLoading.value = false;
            getData();
        }
    }

    onMounted(() => {
        getData();
        interval.value = setInterval(getData, 30 * 1000);
    });
    onBeforeUnmount(() => {
        clearInterval(interval.value);
    });
</script>

<template>
    <div class="container">
        <div class="row mt-3">
            <div class="col-7 mt-0 me-auto">
                <form class="form-floating">
                    <input v-model="searchQuery" type="search" class="form-control" id="SearchValue" 
                        placeholder="Поиск:" @keydown.enter.prevent>
                    <label for="SearchValue">Поиск:</label>
                </form>
            </div>
            <div class="col-3 mx-auto text-center">
                <button class="btn btn-primary" @click="getData"><i class="fas fa-rotate"></i> Обновить данные</button>
                <br>
                <span v-if="isLoading" class="text-danger">получение данных</span>
            </div>
        </div>
        <div class="row my-0">
            <span class="text-muted">Показано устройств {{ sortedData.length }} из {{ data.length }}</span>
        </div>
        <div class="row mt-1">
            <table class="table align-middle table-striped table-hover">
                <thead class="text-center">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">IP</th>
                    <th scope="col">Type</th>
                    <th scope="col">Created</th>
                    <th scope="col">Backup status</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="device in sortedData" class="text-center">
                    <th scope="row">{{ device.id }}</th>
                    <td>{{ device.ip }}</td>
                    <td>{{ device.device_type }}</td>
                    <td>{{ formater.getDateFormat(device.created_at) }}</td>
                    <td>{{ device.backup_status }}</td>
                    <td class="text-center">
                        <button class="btn btn-primary mx-1" @click="makeBackup(device)"><i class="fas fa-floppy-disk"></i></button>
                        <button class="btn btn-danger mx-1" @click="deleteDevice(device)"><i class="fas fa-trash"></i></button>
                    </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="row mt-5">
            <div class="col-12">
                <p>            
                    Добавить устройство: 
                </p>
            </div>
        </div>
        <div class="row mt-1">
            <div class="col-12 col-md-5 ms-auto">
                <form class="form-floating mb-3">
                    <input v-model="deviceIP" type="text" class="form-control" id="deviceIP" placeholder="IP" @keydown.enter.prevent>
                    <label for="deviceIP">IP:</label>
                </form>
            </div>
            <div class="col-12 col-md-5 mx-auto">
                <form class="form-floating mb-3">
                    <input  v-model="deviceType" type="text" class="form-control" id="deviceType" placeholder="Тип устройства" @keydown.enter.prevent>
                    <label for="deviceType">Тип устройства:</label>
                </form>
            </div>
            <div class="col-12 col-md-2 me-auto">
                <button @click="addDevice" class="btn btn-primary mt-2">Добавить</button>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>